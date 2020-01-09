import { CredentialPublicKey } from "./CredentialPublicKey";

export class RsaKey extends CredentialPublicKey {

    private n: Buffer;
    private e: Buffer;

    /**
     * Getter $n
     * @return {Buffer}
     */
    public get $n(): Buffer {
        return this.n;
    }

    /**
     * Setter $n
     * @param {Buffer} value
     */
    public set $n(value: Buffer) {
        this.n = value;
    }

    /**
     * Getter $e
     * @return {Buffer}
     */
    public get $e(): Buffer {
        return this.e;
    }

    /**
     * Setter $e
     * @param {Buffer} value
     */
    public set $e(value: Buffer) {
        this.e = value;
    }

    public getAsBuffer(): Buffer {
        throw new Error("Method not implemented.");
    }
}
