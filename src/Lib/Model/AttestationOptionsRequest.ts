import { AttestationConveyance } from "./AttestationConveyance";
import { AuthenticatorSelection } from "./AuthenticatorSelection";

export class AttestationOptionsRequest {
  private userName: string;
  private displayName: string;
  private authenticatorSelection: AuthenticatorSelection;
  private attestation: AttestationConveyance;
  private extensions: any;

  constructor(attestation: AttestationConveyance, authenticatorSelection: AuthenticatorSelection, 
              displayName: string, userName: string) {
      this.attestation = attestation;
      this.authenticatorSelection = authenticatorSelection;
      this.displayName = displayName;
      this.userName = userName;
  }

  /**
   * Getter $userName
   * @return {string}
   */
  public get $userName(): string {
    return this.userName;
  }

  /**
   * Setter $userName
   * @param {string} value
   */
  public set $userName(value: string) {
    this.userName = value;
  }

  /**
   * Getter $displayName
   * @return {string}
   */
  public get $displayName(): string {
    return this.displayName;
  }

  /**
   * Setter $displayName
   * @param {string} value
   */
  public set $displayName(value: string) {
    this.displayName = value;
  }

  /**
   * Getter $attestation
   * @return {AttestationConveyance}
   */
  public get $attestation(): AttestationConveyance {
    return this.attestation;
  }

  /**
   * Setter $attestation
   * @param {AttestationConveyance} value
   */
  public set $attestation(value: AttestationConveyance) {
    this.attestation = value;
  }

  /**
   * Getter $authenticatorSelection
   * @return {AuthenticatorSelection}
   */
  public get $authenticatorSelection(): AuthenticatorSelection {
    return this.authenticatorSelection;
  }

  /**
   * Setter $authenticatorSelection
   * @param {AuthenticatorSelection} value
   */
  public set $authenticatorSelection(value: AuthenticatorSelection) {
    this.authenticatorSelection = value;
  }

  /**
   * Getter $extensions
   * @return {any}
   */
  public get $extensions(): any {
    return this.extensions;
  }

  /**
   * Setter $extensions
   * @param {any} value
   */
  public set $extensions(value: any) {
    this.extensions = value;
  }
}
