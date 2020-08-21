export class CoseAlgorithm {
    public static getByIdentifier(id: number) {
        switch (id) {
            case -257:
                return "sha256";
            case -258:
                return "sha384";
            case -259:
                return "sha512";
            case -65535:
                return "sha1";
            case -39:
                return "sha512";
            case -38:
                return "sha384";
            case -37:
                return "sha256";
            case -260:
                return "sha256";
            case -261:
                return "sha512";
            case -7:
                return "sha256";
            case -36:
                return "sha384";
        }
    }
}
