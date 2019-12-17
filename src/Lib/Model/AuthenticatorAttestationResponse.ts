import { AttestationObject } from "./AttestationObject";

export class AuthenticatorAttestationResponse {
    private clientDataJson: JSON;
    private attestationObject: AttestationObject;

    /**
     * Getter $clientDataJson
     * @return {JSON}
     */
    public get $clientDataJson(): JSON {
        return this.clientDataJson;
    }

    /**
     * Setter $clientDataJson
     * @param {JSON} value
     */
    public set $clientDataJson(value: JSON) {
        this.clientDataJson = value;
    }

    /**
     * Getter $attestationObject
     * @return {AttestationObject}
     */
    public get $attestationObject(): AttestationObject {
        return this.attestationObject;
    }

    /**
     * Setter $attestationObject
     * @param {AttestationObject} value
     */
    public set $attestationObject(value: AttestationObject) {
        this.attestationObject = value;
    }
}
