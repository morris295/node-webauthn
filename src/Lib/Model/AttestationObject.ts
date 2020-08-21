import * as cbor from "cbor";

import { AuthenticatorData } from "./AuthenticatorData";
import { FidoU2FAttestationStatement } from "./FidoU2FAttestationStatement";
import { IAttestationStatement } from "./IAttestationStatement";
import { PackedAttestationStatement } from "./PackedAttestationStatement";
import base64url from "base64url";

export class AttestationObject {
  private authenticatorData: AuthenticatorData;
  private format: string;
  private attestationStatement: IAttestationStatement;

  private static async decodeAttestationStatement(
    format: string,
    attestationStatement: IAttestationStatement
  ) {
    let statement = null;
    switch (format) {
      case "fido-u2f":
        statement = new FidoU2FAttestationStatement();
        await statement.decode(attestationStatement);
        break;
      // case "android-safetynet":
      //     statement = new AndroidSafetynetAttestationStatement();
      //     await statement.decode(attestationStatement);
      //     break;
      case "packed":
        statement = new PackedAttestationStatement();
        await statement.decode(attestationStatement);
        break;
      // case "tpm":
      //     statement = new TpmAttestationStatement();
      //     await statement.decode(attestationStatement);
      //     break;
      // case "none":
      //     statement = new NoneAttestationStatement();
      //     await statement.decode(attestationStatement);
      //     break;
    }

    return statement;
  }

  public static async decode(urlString: string): Promise<AttestationObject> {
    try {
      const attestationBuffer: Buffer = base64url.toBuffer(urlString);
      const decoded = await cbor.decodeAll(attestationBuffer);
      const result = new AttestationObject();

      result.format = decoded[0].fmt;
      result.authenticatorData = await AuthenticatorData.decode(
        decoded[0].authData
      );
      result.authenticatorData.$bytes = decoded[0].authData;
      result.attestationStatement = await this.decodeAttestationStatement(
        result.format,
        decoded[0].attStmt
      );

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
  public get $attestationStatement(): IAttestationStatement {
    return this.attestationStatement;
  }

  /**
   * Setter $attestationStatement
   * @param {AttestationStatement} value
   */
  public set $attestationStatement(value: IAttestationStatement) {
    this.attestationStatement = value;
  }
}
