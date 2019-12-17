import { PublicKeyDecodeUtility } from "../../Utilities/PublicKeyDecodeUtility";
import { CredentialPublicKey } from "./CredentialPublicKey";

export class AttestationData {

    public static async decode(buffer: Buffer): Promise<AttestationData> {
        const attestationData: AttestationData = new AttestationData();
        let index: number = 0;
        if (buffer.length < 18) {
            throw new Error("Invalid input");
        }

        attestationData.aaguid = buffer.slice(0, 16);

        index += 16;
        buffer.slice(0, index);
        buffer = buffer.slice(index);
        const credIDLenBuffer: Buffer = buffer.slice(0, 2);
        buffer = buffer.slice(2);
        const credentialIdLength: number = credIDLenBuffer.readUInt16BE(0);
        attestationData.credentialId = buffer.slice(0, credentialIdLength);
        buffer = buffer.slice(credentialIdLength);
        const remainder: Buffer = buffer.slice(0, buffer.length);

        attestationData.publicKey = await PublicKeyDecodeUtility.decode(remainder);

        return attestationData;
    }

    private aaguid: Buffer;
    private credentialId: Buffer;
    private publicKey: CredentialPublicKey;

    /**
     * Getter $aaguid
     * @return {Buffer}
     */
    public get $aaguid(): Buffer {
        return this.aaguid;
    }

    /**
     * Setter $aaguid
     * @param {Buffer} value
     */
    public set $aaguid(value: Buffer) {
        this.aaguid = value;
    }

    /**
     * Getter $credentialId
     * @return {Buffer}
     */
    public get $credentialId(): Buffer {
        return this.credentialId;
    }

    /**
     * Setter $credentialId
     * @param {Buffer} value
     */
    public set $credentialId(value: Buffer) {
        this.credentialId = value;
    }

    /**
     * Getter $publicKey
     * @return {CredentialPublicKey}
     */
    public get $publicKey(): CredentialPublicKey {
        return this.publicKey;
    }

    /**
     * Setter $publicKey
     * @param {CredentialPublicKey} value
     */
    public set $publicKey(value: CredentialPublicKey) {
        this.publicKey = value;
    }
}
