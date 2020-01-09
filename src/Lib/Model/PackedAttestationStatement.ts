import base64url from "base64url";
import * as crypto from "crypto";
import Elliptic from "elliptic";
import jsrsasign from "jsrsasign";
import NodeRSA from "node-rsa";
import nodeuuid from "node-uuid";
import { AuthenticatorData } from "./AuthenticatorData";
import { CollectedClientData } from "./CollectedClientData";
import { CoseAlgorithm } from "./CoseAlgorithm";
import { CoseKty } from "./CoseKty";
import { CoseRsaScheme } from "./CoseRsaScheme";
import { EccKey } from "./EccKey";
import { IAttestationStatement } from "./IAttestationStatement";
import { RsaKey } from "./RsaKey";

export class PackedAttestationStatement implements IAttestationStatement {

    private signature: Buffer;
    private attestationCertificate: Buffer;
    private caCert: Buffer[];
    private algorithm: string;
    private ecdaaKeyId: Buffer;
    private x5c: boolean;

    public async decode(cborObject: any): Promise<IAttestationStatement> {
        this.signature = cborObject.sig;

        if ("x5c" in cborObject) {
            this.x5c = true;

            // first item in the x5c list is the attestation cert.
            this.attestationCertificate = cborObject.x5c.splice(0, 1)[0];

            // subsequent items comprise the certificate chain.
            if (cborObject.x5c.length > 0) {
                cborObject.x5c.foreach((cert: Buffer) => {
                    this.caCert.push(cert);
                });
            }
        }

        this.algorithm = cborObject.alg;

        if ("ecdaaKeyId" in cborObject) { this.ecdaaKeyId = cborObject.ecdaaKeyId; }

        return this;
    }

    public encode(): Buffer {
        throw new Error("Method not implemented.");
    }

    public validateSignature(
        collectedClientData: CollectedClientData,
        authenticatorData: AuthenticatorData): Promise<any> {

        const clientDataHash = collectedClientData.getHash();
        const signatureBase = Buffer.concat([authenticatorData.$bytes, clientDataHash]);
        let valid = false;
        const response: any = {};

        if (this.x5c) {
            const leafCert =
                this.base64ToPem(
                    this.attestationCertificate.toString("base64"));
            const certificateInfo = this.getCertificateInfo(leafCert);

            if (certificateInfo.subject.OU !== "Authenticator Attestation") {
            throw new Error('Batch certificate OU MUST be set strictly to "Authenticator Attestation"!');
            }

            if (!certificateInfo.subject.CN) {
                throw new Error("Batch certificate CN MUST no be empty!");
            }

            if (!certificateInfo.subject.O) {
                throw new Error("Batch certificate CN MUST no be empty!");
            }

            if (!certificateInfo.subject.C || certificateInfo.subject.C.length !== 2) {
                throw new Error("Batch certificate C MUST be set to two character ISO 3166 code!");
            }

            if (certificateInfo.basicConstraintsCA) {
                throw new Error("Batch certificate basic constraints CA MUST be false!");
            }

            if (certificateInfo.version !== 3) {
                throw new Error("Batch certificate version MUST be 3(ASN1 2)!");
            }

            valid = crypto.createVerify("sha256")
            .update(signatureBase)
            .verify(leafCert, this.signature);

            if (valid) {
                response.verified = true;
                response.authenticatorInfo = {
                    aaguid: nodeuuid.unparse(authenticatorData.$attestationData.$aaguid),
                    counter: authenticatorData.$signCount,
                    credentialId: base64url.encode(authenticatorData.$attestationData.$credentialId),
                    fmt: "fido-u2f",
                    publicKey: base64url.encode(
                        authenticatorData.$attestationData.$publicKey.getAsBuffer()),
                };
            } else {
                response.verified = false;
            }

        } else if (this.ecdaaKeyId) {
            throw new Error("ECDAA not currently supported.");
        } else {
            const publicKeyCose = authenticatorData.$attestationData.$publicKey;
            const hashingAlgorithm = CoseAlgorithm.getByIdentifier(publicKeyCose.$algorithm);

            if (publicKeyCose instanceof EccKey) {
                const pubKey = publicKeyCose as EccKey;
                const x  = pubKey.$x;
                const y = pubKey.$y;
                const ansiKey = Buffer.concat([Buffer.from([0x04]), x, y]);

                const signatureHash = crypto
                    .createHash(hashingAlgorithm)
                    .update(signatureBase)
                    .digest();

                const ellipticCurve  = new Elliptic.ec(pubKey.$curve.toString());
                const key = ellipticCurve.keyFromPublic(ansiKey);

                valid = key.verify(signatureHash, this.signature.toString());

                if (valid) {
                    response.verified = true;
                    response.authenticatorInfo = {
                        aaguid: nodeuuid.unparse(authenticatorData.$attestationData.$aaguid),
                        counter: authenticatorData.$signCount,
                        credentialId: base64url.encode(authenticatorData.$attestationData.$credentialId),
                        fmt: "fido-u2f",
                        publicKey: base64url.encode(
                            authenticatorData.$attestationData.$publicKey.getAsBuffer()),
                    };
                } else {
                    response.verified = false;
                }

            } else if (publicKeyCose instanceof RsaKey) {
                const rsaKey = publicKeyCose as RsaKey;
                const signingScheme = CoseRsaScheme.GetByIdentifier(rsaKey.$algorithm);

                const key = new NodeRSA(undefined, "pkcs1");
                key.importKey({
                    e: 65537,
                    n: rsaKey.$n,
                }, "components-public");

                valid = key.verify(signatureBase, this.signature);

                if (valid) {
                    response.verified = true;
                    response.authenticatorInfo = {
                        aaguid: nodeuuid.unparse(authenticatorData.$attestationData.$aaguid),
                        counter: authenticatorData.$signCount,
                        credentialId: base64url.encode(authenticatorData.$attestationData.$credentialId),
                        fmt: "fido-u2f",
                        publicKey: base64url.encode(
                            authenticatorData.$attestationData.$publicKey.getAsBuffer()),
                    };
                } else {
                    response.verified = false;
                }

            } else if (publicKeyCose.$kty === CoseKty.OKP) {
                const pubKey = publicKeyCose as EccKey;

                const x = pubKey.$x;
                const signatureHash = crypto
                    .createHash(hashingAlgorithm)
                    .update(signatureBase)
                    .digest();

                const key = new Elliptic.eddsa("ed25519");
                key.keyFromPublic(x);

                valid = key.verify(signatureBase, this.signature, pubKey.getAsBuffer());

                if (valid) {
                    response.verified = true;
                    response.authenticatorInfo = {
                        aaguid: nodeuuid.unparse(authenticatorData.$attestationData.$aaguid),
                        counter: authenticatorData.$signCount,
                        credentialId: base64url.encode(authenticatorData.$attestationData.$credentialId),
                        fmt: "fido-u2f",
                        publicKey: base64url.encode(
                            authenticatorData.$attestationData.$publicKey.getAsBuffer()),
                    };
                } else {
                    response.verified = false;
                }
            }
        }

        return response;
    }

    private base64ToPem(b64String: string) {
        let pemcert = "";

        for (let i = 0; i < b64String.length; i += 64) {
            pemcert += b64String.slice(i, i + 64) + "\n";
        }

        return "-----BEGIN CERTIFICATE-----\n" + pemcert + "-----END CERTIFICATE-----";
    }

    private getCertificateInfo(certificate: string) {
        let basicConstraintsCA = false;
        const subject: any = {};
        let version = 3;
        try {
            const subjectCert = new jsrsasign.X509();
            subjectCert.readCertPEM(certificate);

            const subjectString = subjectCert.getSubjectString();
            const subjectParts  = subjectString.slice(1).split("/");

            for (const field of subjectParts) {
                const kv = field.split("=");
                subject[kv[0]] = kv[1];
            }

            version = subjectCert.getVersion();
            basicConstraintsCA = !!subjectCert.getExtBasicConstraints().cA;

        } catch (error) {
            // Ignore for now.
        }

        return {
            basicConstraintsCA, subject, version,
        };
    }
}
