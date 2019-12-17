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

    constructor(encoded: string) {
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
        return crypto
            .createHash("SHA256")
            .update(this.bytes)
            .digest();
    }
}
