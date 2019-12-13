import { base64url } from "./node_modules/base64url";
import * as crypto from "crypto";

export class CollectedClientData {

    private bytes: Buffer;
    private type: string;
    private challenge: string;
    private origin: string;
    private hashAlgorithm: string;
    private tokenBinding: TokenBinding;
    private clientExtensions: AuthenticationExtensions
    private authenticatorExtensions: AuthenticationExtensions

    constructor(encoded: Buffer) {
        let json: object = JSON.parse(base64url.decode(encoded));
        this._bytes = base64url.toBuffer(encoded);

        if ("type" in json) {
            this._type = json.type;
        }

        if ("challenge" in json) {
            this._challenge = json.challenge;
        } else {
            throw new Error("Challenge not found or invalid.");
        }

        if ("origin" in json) {
            this._origin = json.origin;
        }

        if ("hashAlgorithm" in json) {
            this._hashAlgorithm = json.hashAlgorithm;
        }
        
        if ("tokenBinding" in json) {
            this._tokenBinding = json.tokenBinding;
        }

        if ("clientExtensions" in json) {
            this._clientExtensions = json.clientExtensions;
        }

        if ("authenticatorExtensions" in json) {
            this._authenticatorExtensions = json.authenticatorExtensions;
        }
    }

    getHash() {
        return crypto
            .createHash('SHA256')
            .update(this._bytes)
            .digest();
    }
}

module.exports = CollectedClientData;