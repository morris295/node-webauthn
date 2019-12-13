"use strict";

import * as cbor from "cbor";
import { EccKey } from "./EccKey";
import { RsaKey } from "./RsaKey";

export abstract class CredentialPublicKey {

    public static async decode(buffer: Buffer): Promise<CredentialPublicKey> {
        const decoded: any = await cbor.decodeAll(buffer);
        const map: cbor.Map = decoded[0];
        let publicKey: CredentialPublicKey = null;

        if (map.size === 5) {
            const eccKey: EccKey = new EccKey();

            for (const item of map.entries()) {
                const key: number = item[0];
                switch (key) {
                    case CredentialPublicKey.crvLabel:
                        eccKey.curve = item[1];
                        break;
                    case CredentialPublicKey.xLabel:
                        eccKey.x = item[1];
                        break;
                    case CredentialPublicKey.yLabel:
                        eccKey.y = item[1];
                        break;
                    case CredentialPublicKey.ktyLabel:
                        eccKey.kty = item[1];
                        break;
                    case CredentialPublicKey.algLabel:
                        eccKey.algorithm = item[1];
                        break;
                }
            }
            publicKey = eccKey;
        } else {
            const rsaKey: RsaKey = new RsaKey();

            publicKey = rsaKey;
        }

        return publicKey;
    }
    
    public abstract getAsBuffer(): Buffer;

    private static crvLabel: number = -1;
    private static xLabel: number = -2;
    private static yLabel: number = -3;
    private static nLabel: number = -1;
    private static eLabel: number = -2;
    private static ktyLabel: number = 1;
    private static algLabel: number = 3;
    protected cborEncodedKey: Buffer;
    protected algorithm: number;
    protected kty: number;

}
