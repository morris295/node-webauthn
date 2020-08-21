export class CoseRsaScheme {
    public static getByIdentifier(code: number) {
        switch (code) {
            case -3:
                return "pss-sha256";
            case -39:
                return "pss-sha512";
            case -38:
                return "pss-sha384";
            case -65535:
                return "pkcs1-sha1";
            case -257:
                return "pkcs1-sha256";
            case -258:
                return "pkcs1-sha384";
            case -259:
                return "pkcs1-sha512";
        }
    }
}
