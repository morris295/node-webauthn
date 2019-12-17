import base64url from "base64url";

export class Base64Utility {
    public static isBase64Encoded(value: string) {
        let result = (value !== "" && value !== null);

        if (value.indexOf("+") >= 0) {
           result = false;
        }

        if (value.indexOf("/") >= 0) {
            result = false;
        }

        if (value.indexOf("=") >= 0) {
            result = false;
        }

        if (typeof(value) !== "string") {
            result = false;
        }

        try {
            const decoded = base64url.decode(value);
        } catch (error) {
            result = false;
            return result;
        }

        return result;
    }
}
