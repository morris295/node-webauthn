export class TokenBinding {
    private status: string;
    // base64url encoded id value.
    private id: string;

    /**
     * Getter $status
     * @return {string}
     */
    public get $status(): string {
        return this.status;
    }

    /**
     * Setter $status
     * @param {string} value
     */
    public set $status(value: string) {
        this.status = value;
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

}
