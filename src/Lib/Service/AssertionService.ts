import base64url from "base64url";
import * as crypto from "crypto";
import { Base64Utility } from "../../Utilities/Base64Utility";
import { CryptoUtility } from "../../Utilities/CryptoUtility";
import { AuthenticatorData } from "../Model/AuthenticatorData";
import { CollectedClientData } from "../Model/CollectedClientData";
import { Token } from "../Model/Token";
import { User } from "../Model/User";
import { IFido2Service } from "./IFido2Service";
import { ServiceResponse } from "./ServiceResponse";

export class AssertionService implements IFido2Service {

    public options(user: User, request: any, existingTokens: Token[]): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>((resolve, reject) => {
            const response = new ServiceResponse();
            const responseData: any = {};

            responseData.timeout = 240000;
            responseData.rpId = "localhost";

            if ("userVerification" in request) {
                responseData.userVerification = request.userVerification;
            }

            if (existingTokens.length > 0) {
                responseData.allowCredentials = [];
                existingTokens.forEach((token: Token) => {
                    responseData.allowCredentials.push({
                        id: token.$credentialId,
                        type: "public-key",
                    });
                });
            } else {
                reject("No registered tokens");
            }

            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    reject(err);
                }

                responseData.challenge = base64url.encode(buffer);
                response.$data = responseData;
                response.$message = "Authentication options generated successfully.";
                response.$statusCode = 200;
                response.$hasError = false;

                resolve(response);
            });
        });
    }

    public result(request: any,
        challenge: string,
        token: Token,
        deviceMetadata: any,
        userVerification: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(async (resolve, reject) => {
            try {
                if (request.id === null ||
                    request.id === "" ||
                    typeof (request.id) !== "string" ||
                    request.id === undefined ||
                    !Base64Utility.isBase64UrlEncoded(request.id)) {
                    throw new Error("Invalid request, no Id provided.");
                }

                if (request.type === "" ||
                    request.type !== "public-key" ||
                    typeof (request.type) !== "string") {
                    throw new Error("Invalid request, type incorrect.");
                }

                if (request.response === null
                    || request.response === undefined
                    || typeof (request.response) !== "object") {
                    throw new Error("Invalid object, no response.");
                }

                const response = request.response;

                if ("attestationObject" in response) {
                    throw new Error("Invalid object, not an assertion");
                }

                if (response.clientDataJSON === undefined ||
                    response.clientDataJSON === null) {
                    throw new Error("Invalid object, no client data provided.");
                }

                const clientData = new CollectedClientData(response.clientDataJSON);
                const clientDataHash = clientData.getHash();
                const authenticatorData: AuthenticatorData =
                    await AuthenticatorData.decode(
                        base64url.toBuffer(response.authenticatorData));
                authenticatorData.$bytes = base64url.toBuffer(response.authenticatorData);

                if (clientData.$challenge === undefined ||
                    clientData.$challenge === null ||
                    typeof (clientData.$challenge) !== "string" ||
                    clientData.$challenge.length === 0 ||
                    clientData.$challenge !== challenge) {
                    throw new Error("Challenge invalid or not provided.");
                }

                const publicKey = base64url.toBuffer(token.$publicKey);
                const publicKeyPem = CryptoUtility.getAsn1AsPem(publicKey);
                let algorithm = 0;
                let format = 0;

                if (token.$aaguid === "00000000-0000-0000-0000-000000000000" ||
                    token.$aaguid === null) {
                    algorithm = 1;
                } else {
                    algorithm = deviceMetadata.authenticationAlgorithm;
                }

                if (publicKey.length === 259) {
                    format = 258;
                }
                if (publicKey.length === 65) {
                    format = 256;
                }

                if (userVerification === "required") {
                    if (!response.authenticatorData.IsUserPresent()) {
                        throw new Error("User presence has not been verified.");
                    }
                    if (!response.authenticatorData.IsUserVerified()) {
                        throw new Error("User has not been verified.");
                    }
                }

                const signature = base64url.toBuffer(response.signature);
                const signatureBase = Buffer.concat([authenticatorData.$bytes, clientDataHash]);

                const signatureValidationResult = crypto.createVerify("SHA256")
                    .update(signatureBase)
                    .verify(publicKeyPem, signature);

                if (signatureValidationResult) {
                    // Do some additional tasks, increment the token counter etc.
                } else {
                    throw new Error("Unable to validate assertion signature.");
                }

            } catch (error) {
                reject(error);
            }
        });
    }
}
