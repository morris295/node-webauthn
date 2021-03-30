import { AttestationConveyance } from "./AttestationConveyance";
import { AuthenticatorSelection } from "./AuthenticatorSelection";
import { PublicKeyCredentialParameter } from "./PublicKeyCredentialParameter";
import { PublicKeyCredentialRPEntity } from "./PublicKeyCredentialRPEntity";
import { ServerPublicKeyCredentialDescriptor } from "./ServerPublicKeyCredentialDescriptor";
import { User } from "./User";
import { UserVerification } from "./UserVerification";

export class AttestationOptionsResponse {
  private rp: PublicKeyCredentialRPEntity;
  private user: User;
  private challenge: string;
  private pubKeyCredParams: PublicKeyCredentialParameter[];
  private timeout: number;
  private excludeCredentials: ServerPublicKeyCredentialDescriptor[];
  private authenticatorSelection: AuthenticatorSelection;
  private attestation: AttestationConveyance;
  private extensions: any;

  /**
   * Getter $relyingParty
   * @return {PublicKeyCredentialRPEntity}
   */
  public get $relyingParty(): PublicKeyCredentialRPEntity {
    return this.rp;
  }

  /**
   * Setter $relyingParty
   * @param {PublicKeyCredentialRPEntity} value
   */
  public set $relyingParty(value: PublicKeyCredentialRPEntity) {
    this.rp = value;
  }

  /**
   * Getter $user
   * @return {User}
   */
  public get $user(): User {
    return this.user;
  }

  /**
   * Setter $user
   * @param {User} value
   */
  public set $user(value: User) {
    this.user = value;
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
   * Getter $publicKeyCredentialParameters
   * @return {PublicKeyCredentialParameter[]}
   */
  public get $publicKeyCredentialParameters(): PublicKeyCredentialParameter[] {
    return this.pubKeyCredParams;
  }

  /**
   * Setter $publicKeyCredentialParameters
   * @param {PublicKeyCredentialParameter[]} value
   */
  public set $publicKeyCredentialParameters(
    value: PublicKeyCredentialParameter[],
  ) {
    this.pubKeyCredParams = value;
  }

  /**
   * Getter $timeout
   * @return {number}
   */
  public get $timeout(): number {
    return this.timeout;
  }

  /**
   * Setter $timeout
   * @param {number} value
   */
  public set $timeout(value: number) {
    this.timeout = value;
  }

  /**
   * Getter $excludeCredentials
   * @return {ServerPublicKeyCredentialDescriptor[]}
   */
  public get $excludeCredentials(): ServerPublicKeyCredentialDescriptor[] {
    return this.excludeCredentials;
  }

  /**
   * Setter $excludeCredentials
   * @param {ServerPublicKeyCredentialDescriptor[]} value
   */
  public set $excludeCredentials(value: ServerPublicKeyCredentialDescriptor[]) {
    this.excludeCredentials = value;
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
