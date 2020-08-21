export class Token {

    private publicKey: string;
    private transports: string[];
    private credentialId: string;
    private counter: number;
    private aaguid: string;

    /**
     * Getter $publicKey
     * @return {string}
     */
    public get $publicKey(): string {
        return this.publicKey;
    }

    /**
     * Setter $publicKey
     * @param {string} value
     */
    public set $publicKey(value: string) {
        this.publicKey = value;
    }

    /**
     * Getter $transports
     * @return {string[]}
     */
    public get $transports(): string[] {
        return this.transports;
    }

    /**
     * Setter $transports
     * @param {string[]} value
     */
    public set $transports(value: string[]) {
        this.transports = value;
    }

    /**
     * Getter $credentialId
     * @return {string}
     */
    public get $credentialId(): string {
        return this.credentialId;
    }

    /**
     * Setter $credentialId
     * @param {string} value
     */
    public set $credentialId(value: string) {
        this.credentialId = value;
    }

    /**
     * Getter $counter
     * @return {number}
     */
    public get $counter(): number {
        return this.counter;
    }

    /**
     * Setter $counter
     * @param {number} value
     */
    public set $counter(value: number) {
        this.counter = value;
    }

    /**
     * Getter $aaguid
     * @return {string}
     */
    public get $aaguid(): string {
        return this.aaguid;
    }

    /**
     * Setter $aaguid
     * @param {string} value
     */
    public set $aaguid(value: string) {
        this.aaguid = value;
    }
}
