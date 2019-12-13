import { AttestationData } from "./AttestationData";

export class AuthenticatorData {

    public static async decode(authData) {
        const authenticatorData = new AuthenticatorData();
        if (authData.length < 37) {
            throw new Error("Invalid input");
        }

        let index = 0;
        authenticatorData.rpIdHash = authData.slice(0, 32);
        index += 32;
        authenticatorData.flags = authData[index++];
        const signCountBytes = authData.slice(index, index+4);
        authenticatorData.signCount = signCountBytes.readUInt32BE(0);
        index += 4;
        const definedIndex = index;
        const hasAttestationData = (authenticatorData.flags & 1 << 6) != 0;
        const hasExtensionData = (authenticatorData.flags & 1 << 7) != 0;

        if (hasAttestationData) {
            const remainder = authData.slice(index, authData.length);
            authenticatorData.attestationData = await AttestationData.decode(remainder);
        }

        if (hasExtensionData) {
            //
        }

        return authenticatorData;
    }

    private rpIdHash: Buffer;
    private flags: number;
    private signCount: number;
    private attestationData: AttestationData;
    private extensions: Buffer;
    private bytes: Buffer;

    /**
     * Getter $rpIdHash
     * @return {Buffer}
     */
    public get $rpIdHash(): Buffer {
        return this.rpIdHash;
    }

    /**
     * Setter $rpIdHash
     * @param {Buffer} value
     */
    public set $rpIdHash(value: Buffer) {
        this.rpIdHash = value;
    }

    /**
     * Getter $flags
     * @return {number}
     */
    public get $flags(): number {
        return this.flags;
    }

    /**
     * Setter $flags
     * @param {number} value
     */
    public set $flags(value: number) {
        this.flags = value;
    }

    /**
     * Getter $signCount
     * @return {number}
     */
    public get $signCount(): number {
        return this.signCount;
    }

    /**
     * Setter $signCount
     * @param {number} value
     */
    public set $signCount(value: number) {
        this.signCount = value;
    }

    /**
     * Getter $attestationData
     * @return {AttestationData}
     */
    public get $attestationData(): AttestationData {
        return this.attestationData;
    }

    /**
     * Setter $attestationData
     * @param {AttestationData} value
     */
    public set $attestationData(value: AttestationData) {
        this.attestationData = value;
    }

    /**
     * Getter $extensions
     * @return {Buffer}
     */
    public get $extensions(): Buffer {
        return this.extensions;
    }

    /**
     * Setter $extensions
     * @param {Buffer} value
     */
    public set $extensions(value: Buffer) {
        this.extensions = value;
    }

    /**
     * Getter $bytes
     * @return {Buffer}
     */
    public get $bytes(): Buffer {
        return this.bytes;
    }

    /**
     * Setter $bytes
     * @param {Buffer} value
     */
    public set $bytes(value: Buffer) {
        this.bytes = value;
    }

    public isUserPresent(): boolean {
        return (this.flags & 1) !== 0;
    }

    public isUserVerified(): boolean {
        return (this.flags & 1 << 2) !== 0;
    }

    public hasAttestationData() {
        return (this.flags & 1 << 6) !== 0;
    }

    public hasExtensionData() {
        return (this.flags & 1 << 7) !== 0;
    }
}
