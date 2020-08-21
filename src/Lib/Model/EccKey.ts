"use strict";

import { CredentialPublicKey } from "./CredentialPublicKey";

export class EccKey extends CredentialPublicKey {
  private curve: number;
  private x: Buffer;
  private y: Buffer;

  /**
   * Getter $curve
   * @return {number}
   */
  public get $curve(): number {
    return this.curve;
  }

  /**
   * Setter $curve
   * @param {number} value
   */
  public set $curve(value: number) {
    this.curve = value;
  }

  /**
   * Getter $x
   * @return {Buffer}
   */
  public get $x(): Buffer {
    return this.x;
  }

  /**
   * Setter $x
   * @param {Buffer} value
   */
  public set $x(value: Buffer) {
    this.x = value;
  }

  /**
   * Getter $y
   * @return {Buffer}
   */
  public get $y(): Buffer {
    return this.y;
  }

  /**
   * Setter $y
   * @param {Buffer} value
   */
  public set $y(value: Buffer) {
    this.y = value;
  }

  public getAsBuffer(): Buffer {
    let tag: Buffer;
    tag = Buffer.from([0x04]);
    return Buffer.concat([tag, this.x, this.y]);
  }
}
