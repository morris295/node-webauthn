export class CryptoUtility {
    public static getAsn1AsPem(buffer: Buffer) {
        if (!Buffer.isBuffer(buffer)) {
            throw new Error("Invalid parameter provided, must be buffer.");
        }

        let type;

        if (buffer.length === 65 && buffer[0] === 0x04) {
            buffer = Buffer.concat([
                Buffer.from("3059301306072a8648ce3d020106082a8648ce3d030107034200", "hex"),
                buffer,
            ]);

            type = "PUBLIC KEY";
        } else {
            type = "CERTIFICATE";
        }

        const b64cert = buffer.toString("base64");

        let pemValue = "";

        for (let i = 0; i < Math.ceil(b64cert.length / 64); i++) {
            const start = 64 * i;

            pemValue += b64cert.substr(start, 64) + "\n";
        }

        pemValue = `-----BEGIN ${type}-----\n` + pemValue + `-----END ${type}-----\n`;

        return pemValue;
    }
}
