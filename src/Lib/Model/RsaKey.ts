import { CredentialPublicKey } from "./CredentialPublicKey";

export class RsaKey extends CredentialPublicKey {
    public getAsBuffer(): Buffer {
        throw new Error("Method not implemented.");
    }
}
