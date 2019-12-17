import { AuthenticatorData } from "./AuthenticatorData";
import { CollectedClientData } from "./CollectedClientData";

export interface IAttestationStatement {
    decode(cborObject: any): Promise<IAttestationStatement>;
    encode(): Buffer;
    validateSignature(collectedClientData: CollectedClientData,
                      authenticatorData: AuthenticatorData): Promise<any>;
}
