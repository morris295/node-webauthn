export class PublicKeyCredentialParameter {
  private type: string;
  private alg: string;

  constructor(credentialType: string, algorithm: string) {
    this.type = credentialType;
    this.alg = algorithm;
  }

  /**
   * Getter $credentialType
   * @return {string}
   */
  public get $credentialType(): string {
    return this.type;
  }

  /**
   * Setter $credentialType
   * @param {string} value
   */
  public set $credentialType(value: string) {
    this.type = value;
  }

  /**
   * Getter $algorithm
   * @return {string}
   */
  public get $algorithm(): string {
    return this.alg;
  }

  /**
   * Setter $algorithm
   * @param {string} value
   */
  public set $algorithm(value: string) {
    this.alg = value;
  }
}
