import { base64url } from "base64url";
import * as cbor from "cbor";
import { AttestationStatement } from "./AttestationStatement";
import { AuthenticatorData } from "./AuthenticatorData";

export class AttestationObject {

    public static async decode(urlString): Promise<AttestationObject> {
        try {
            const attestationBuffer: Buffer = base64url.toBuffer(urlString);
            const decoded = await cbor.decodeAll(attestationBuffer);
            const result = new AttestationObject();

            result.format = decoded[0].fmt;
            result.authenticatorData = await
                AuthenticatorData.decode(decoded[0].authData);
            result.attestationStatement = await
                AttestationStatement.decode(result.format, decoded[0].attStmt);

            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Getter $authenticatorData
     * @return {AuthenticatorData}
     */
    public get $authenticatorData(): AuthenticatorData {
        return this.authenticatorData;
    }

    /**
     * Setter $authenticatorData
     * @param {AuthenticatorData} value
     */
    public set $authenticatorData(value: AuthenticatorData) {
        this.authenticatorData = value;
    }

    /**
     * Getter $format
     * @return {string}
     */
    public get $format(): string {
        return this.format;
    }

    /**
     * Setter $format
     * @param {string} value
     */
    public set $format(value: string) {
        this.format = value;
    }

    /**
     * Getter $attestationStatement
     * @return {AttestationStatement}
     */
    public get $attestationStatement(): AttestationStatement {
        return this.attestationStatement;
    }

    /**
     * Setter $attestationStatement
     * @param {AttestationStatement} value
     */
    public set $attestationStatement(value: AttestationStatement) {
        this.attestationStatement = value;
    }

    private authenticatorData: AuthenticatorData;
    private format: string;
    private attestationStatement: AttestationStatement;
}
