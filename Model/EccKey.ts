"use strict";

import { CredentialPublicKey } from "./CredentialPublicKey";

export class EccKey extends CredentialPublicKey {

   public curve: number;
   public x: Buffer;
   public y: Buffer;

   public getAsBuffer(): Buffer {
       let tag: Buffer;
       tag = Buffer.from([0x04]);
       return Buffer.concat([tag, this.x, this.y]);
   }
}

module.exports = EccKey;
