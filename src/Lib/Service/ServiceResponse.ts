export class ServiceResponse {
    private statusCode: number;
    private message: string;
    private hasError: boolean;

    /**
     * Getter $statusCode
     * @return {number}
     */
    public get $statusCode(): number {
        return this.statusCode;
    }

    /**
     * Setter $statusCode
     * @param {number} value
     */
    public set $statusCode(value: number) {
        this.statusCode = value;
    }

    /**
     * Getter $message
     * @return {string}
     */
    public get $message(): string {
        return this.message;
    }

    /**
     * Setter $message
     * @param {string} value
     */
    public set $message(value: string) {
        this.message = value;
    }

    /**
     * Getter $hasError
     * @return {boolean}
     */
    public get $hasError(): boolean {
        return this.hasError;
    }

    /**
     * Setter $hasError
     * @param {boolean} value
     */
    public set $hasError(value: boolean) {
        this.hasError = value;
    }

    /**
     * Getter $data
     * @return {any}
     */
    public get $data(): any {
        return this.data;
    }

    /**
     * Setter $data
     * @param {any} value
     */
    public set $data(value: any) {
        this.data = value;
    }
    private data: any;
}
