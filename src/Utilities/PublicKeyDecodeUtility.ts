import * as cbor from "cbor";

import { CredentialPublicKey } from "Model/CredentialPublicKey";
import { EccKey } from "../Lib/Model/EccKey";
import { RsaKey } from "../Lib/Model/RsaKey";

export class PublicKeyDecodeUtility {
  private static crvLabel: number = -1;
  private static xLabel: number = -2;
  private static yLabel: number = -3;
  private static nLabel: number = -1;
  private static eLabel: number = -2;
  private static ktyLabel: number = 1;
  private static algLabel: number = 3;

  public static async decode(buffer: Buffer): Promise<CredentialPublicKey> {
    const decoded: any = await cbor.decodeAll(buffer);
    const map: cbor.Map = decoded[0];
    let publicKey: CredentialPublicKey = null;

    if (map.size === 5) {
      const eccKey: EccKey = new EccKey();

      for (const item of map.entries()) {
        const key: number = item[0];
        switch (key) {
          case this.crvLabel:
            eccKey.$curve = item[1];
            break;
          case this.xLabel:
            eccKey.$x = item[1];
            break;
          case this.yLabel:
            eccKey.$y = item[1];
            break;
          case this.ktyLabel:
            eccKey.$kty = item[1];
            break;
          case this.algLabel:
            eccKey.$algorithm = item[1];
            break;
        }
      }
      publicKey = eccKey;
    } else {
      const rsaKey: RsaKey = new RsaKey();

      for (const item of map.entries()) {
        const key: number = item[0];
        switch (key) {
          case this.nLabel:
            rsaKey.$n = item[1];
            break;
          case this.eLabel:
            rsaKey.$e = item[1];
            break;
          case this.ktyLabel:
            rsaKey.$kty = item[1];
            break;
          case this.algLabel:
            rsaKey.$algorithm = item[1];
            break;
        }
      }

      publicKey = rsaKey;
    }

    return publicKey;
  }
}
