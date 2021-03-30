export class ServerPublicKeyCredentialDescriptor {

    private publicKeyCredentialType: string;
    private id: string;
    private transports: string[];

    constructor(publicKeyCredentialType: string, id: string, transports: string[] = []) {
        this.publicKeyCredentialType = publicKeyCredentialType;
        this.id = id;
        this.transports = transports;
    }

    /**
     * Getter $publicKeyCredentialType
     * @return {string}
     */
    public get $publicKeyCredentialType(): string {
        return this.publicKeyCredentialType;
    }

    /**
     * Setter $publicKeyCredentialType
     * @param {string} value
     */
    public set $publicKeyCredentialType(value: string) {
        this.publicKeyCredentialType = value;
    }

    /**
     * Getter $id
     * @return {string}
     */
    public get $id(): string {
        return this.id;
    }

    /**
     * Setter $id
     * @param {string} value
     */
    public set $id(value: string) {
        this.id = value;
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
}
