import { FidoU2FAttestationStatement } from "./FidoU2FAttestationStatement";

export abstract class AttestationStatement {
    public static async decode(format, attestationStatement) {

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
            // case "packed":
            //     statement = new PackedAttestationStatement();
            //     await statement.decode(attestationStatement);
            //     break;
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

    public abstract encode(): Buffer;
}
