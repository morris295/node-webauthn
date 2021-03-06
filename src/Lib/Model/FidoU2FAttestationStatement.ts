import base64url from "base64url";
import * as cbor from "cbor";
import * as crypto from "crypto";
import nodeuuid from "node-uuid";
import { CryptoUtility } from "../../Utilities/CryptoUtility";
import { AuthenticatorData } from "./AuthenticatorData";
import { CollectedClientData } from "./CollectedClientData";
import { IAttestationStatement } from "./IAttestationStatement";

export class FidoU2FAttestationStatement implements IAttestationStatement {
    public caCert: Buffer[];
    public signature: Buffer;
    public attestationCertificate: Buffer[];

    constructor() {
        this.caCert = [];
    }

    /**
     *
     * @param {CBOR Object} cborObject
     */
    public async decode(cborObject: any): Promise<IAttestationStatement> {
        this.signature = cborObject.sig;

        // first item in the x5c list is the attestation cert.
        this.attestationCertificate = cborObject.x5c.splice(0, 1);

        // subsequent items comprise the certificate chain.
        if (cborObject.x5c.length > 0) {
            cborObject.x5c.foreach((cert: Buffer) => {
                this.caCert.push(cert);
            });
        }

        return this;
    }

    public encode(): Buffer | ArrayBufferView {
        return cbor.encode([
            this.signature,
            this.caCert,
            this.attestationCertificate,
        ]);
    }

    /**
     *
     * @param {CollectedClientData} collectedClientData
     * @param {AuthenticatorData} authenticatorData
     */
    public async validateSignature(
        collectedClientData: CollectedClientData,
        authenticatorData: AuthenticatorData,
    ): Promise<any> {
        let result: boolean = false;
        const response: any = {};
        const aaguidTest: Buffer = Buffer.from([
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
        ]);
        const assertedAaguid: Buffer =
            authenticatorData.$attestationData.$aaguid;

        if (Buffer.compare(assertedAaguid, aaguidTest) !== 0) {
            return result;
        }

        const clientDataHash = collectedClientData.getHash();
        const certificatePem = CryptoUtility.getAsn1AsPem(
            this.attestationCertificate[0],
        );
        const reservedByte = Buffer.from([0x00]);
        const publicKeyBytes = authenticatorData.$attestationData.$publicKey.getAsBuffer();
        const publicKeyPem = CryptoUtility.getAsn1AsPem(publicKeyBytes);
        const signatureBase = Buffer.concat([
            reservedByte,
            authenticatorData.$rpIdHash,
            clientDataHash,
            authenticatorData.$attestationData.$credentialId,
            publicKeyBytes,
        ]);

        result = await this.verifySignature(
            this.signature,
            signatureBase,
            certificatePem,
        );

        if (result) {
            response.verified = true;
            response.authenticatorInfo = {
                aaguid: nodeuuid.unparse(
                    authenticatorData.$attestationData.$aaguid,
                ),
                counter: authenticatorData.$signCount,
                credentialId: base64url.encode(
                    authenticatorData.$attestationData.$credentialId,
                ),
                fmt: "fido-u2f",
                publicKey: base64url.encode(publicKeyBytes),
            };
        }

        return response;
    }

    private async verifySignature(
        signature: Buffer,
        data: Buffer,
        publicKey: string,
    ) {
        return crypto
            .createVerify("SHA256")
            .update(data)
            .verify(publicKey, signature);
    }
}
