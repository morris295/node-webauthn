import base64url from "base64url";
import * as crypto from "crypto";
import { AuthenticationExtensions } from "./AuthenticationExtensions";
import { TokenBinding } from "./TokenBinding";


export class CollectedClientData {
    private bytes: Buffer;
    private type: string;
    private challenge: string;
    private origin: string;
    private hashAlgorithm: string;
    private tokenBinding: TokenBinding;
    private clientExtensions: AuthenticationExtensions;
    private authenticatorExtensions: AuthenticationExtensions;

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

    /**
     * Getter $type
     * @return {string}
     */
    public get $type(): string {
        return this.type;
    }

    /**
     * Setter $type
     * @param {string} value
     */
    public set $type(value: string) {
        this.type = value;
    }

    /**
     * Getter $challenge
     * @return {string}
     */
    public get $challenge(): string {
        return this.challenge;
    }

    /**
     * Setter $challenge
     * @param {string} value
     */
    public set $challenge(value: string) {
        this.challenge = value;
    }

    /**
     * Getter $origin
     * @return {string}
     */
    public get $origin(): string {
        return this.origin;
    }

    /**
     * Setter $origin
     * @param {string} value
     */
    public set $origin(value: string) {
        this.origin = value;
    }

    /**
     * Getter $hashAlgorithm
     * @return {string}
     */
    public get $hashAlgorithm(): string {
        return this.hashAlgorithm;
    }

    /**
     * Setter $hashAlgorithm
     * @param {string} value
     */
    public set $hashAlgorithm(value: string) {
        this.hashAlgorithm = value;
    }

    /**
     * Getter $tokenBinding
     * @return {TokenBinding}
     */
    public get $tokenBinding(): TokenBinding {
        return this.tokenBinding;
    }

    /**
     * Setter $tokenBinding
     * @param {TokenBinding} value
     */
    public set $tokenBinding(value: TokenBinding) {
        this.tokenBinding = value;
    }

    /**
     * Getter $clientExtensions
     * @return {AuthenticationExtensions}
     */
    public get $clientExtensions(): AuthenticationExtensions {
        return this.clientExtensions;
    }

    /**
     * Setter $clientExtensions
     * @param {AuthenticationExtensions} value
     */
    public set $clientExtensions(value: AuthenticationExtensions) {
        this.clientExtensions = value;
    }

    /**
     * Getter $authenticatorExtensions
     * @return {AuthenticationExtensions}
     */
    public get $authenticatorExtensions(): AuthenticationExtensions {
        return this.authenticatorExtensions;
    }

    /**
     * Setter $authenticatorExtensions
     * @param {AuthenticationExtensions} value
     */
    public set $authenticatorExtensions(value: AuthenticationExtensions) {
        this.authenticatorExtensions = value;
    }

    public constructor(encoded: string) {
        const json: any = JSON.parse(base64url.decode(encoded));
        this.bytes = base64url.toBuffer(encoded);

        if ("type" in json) {
            this.type = json.type;
        }

        if ("challenge" in json) {
            this.challenge = json.challenge;
        } else {
            throw new Error("Challenge not found or invalid.");
        }

        if ("origin" in json) {
            this.origin = json.origin;
        }

        if ("hashAlgorithm" in json) {
            this.hashAlgorithm = json.hashAlgorithm;
        }

        if ("tokenBinding" in json) {
            this.tokenBinding = json.tokenBinding;
        }

        if ("clientExtensions" in json) {
            this.clientExtensions = json.clientExtensions;
        }

        if ("authenticatorExtensions" in json) {
            this.authenticatorExtensions = json.authenticatorExtensions;
        }
    }

    public getHash() {
        return crypto.createHash("SHA256").update(this.bytes).digest();
    }
}
