import base64url from "base64url";
import * as crypto from "crypto";
import { Token } from "../Model/Token";
import { User } from "../Model/User";
import { IFido2Service } from "./IFido2Service";
import { ServiceResponse } from "./ServiceResponse";

export class AttestationService implements IFido2Service {

    /**
     *
     * @param user The stored user information.
     * @param request The fido2 attestation options request.
     */
    public options(user: User, request: any, existingTokens: Token[]): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>((resolve, reject) => {
            const response = new ServiceResponse();
            const responseData: any = {};

            responseData.user = {
                displayName: user.$displayName,
                id: user.$id,
                name: user.$username,
            };
            responseData.attestation = request.attestation;

            if (request.authenticatorSelection !== undefined &&
                request.authenticatorSelection !== null) {
                    responseData.authenticatorSelection = request.authenticatorSelection;
            }

            // This should be set up in a config somewhere.
            responseData.rp = {
                id: "localhost",
                name: "http://localhost",
            };

            responseData.pubKeyCredParams = [
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -7 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -35 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -36 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -37 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -38 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -39 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -257 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -258 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -259 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", "alg": -65535 },
            ];

            if (existingTokens.length > 0) {
                responseData.excludeCredentials = [];
                existingTokens.forEach((token) => {
                    responseData.excludeCredentials.push(
                        { type: "public-key", id: token.$credentialId });
                });
            }

            if (request.extensions !== undefined && request.extensions !== null) {
                responseData.extensions = request.extensions;
            }

            responseData.timeout = 240000;

            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    reject(err);
                }

                responseData.challenge = base64url.encode(buffer);

                response.$data = responseData;
                response.$statusCode = 200;
                response.$message = "Successfully retrieved attestation options.";
                response.$hasError = false;

                resolve(response);
            });
        });
    }

    public result(): ServiceResponse {
        throw new Error("Method not implemented.");
    }
}
