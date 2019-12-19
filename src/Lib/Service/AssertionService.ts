import base64url from "base64url";
import * as crypto from "crypto";
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
            }
            // else {
            //     reject("No registered tokens");
            // }

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

    public result(request: any, challenge: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>((resolve, reject) => {
            //
        });
    }
}
