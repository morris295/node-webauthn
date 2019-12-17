import { AuthenticatorData } from "./AuthenticatorData";
import { CollectedClientData } from "./CollectedClientData";

export interface ICborAttestation {
    encode(): Buffer;
    decode(cborObject: any): Promise<ICborAttestation>;
    validateSignature(clientData: CollectedClientData,
                      authenticatroData: AuthenticatorData): Promise<boolean>;
}
