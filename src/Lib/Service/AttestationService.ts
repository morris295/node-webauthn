import * as crypto from "crypto";

import { AttestationObject } from "../Model/AttestationObject";
import { Base64Utility } from "../../Utilities/Base64Utility";
import { CollectedClientData } from "../Model/CollectedClientData";
import { IFido2Service } from "./IFido2Service";
import { ServiceResponse } from "./ServiceResponse";
import { Token } from "../Model/Token";
import { User } from "../Model/User";
import base64url from "base64url";

export class AttestationService implements IFido2Service {
    /**
     *
     * @param user The stored user information.
     * @param request The fido2 attestation options request.
     */
    public options(
        user: User,
        request: any,
        existingTokens: Token[]
    ): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>((resolve, reject) => {
            const response = new ServiceResponse();
            const responseData: any = {};

            responseData.user = {
                displayName: user.$displayName,
                id: user.$id,
                name: user.$username,
            };
            responseData.attestation = request.attestation;

            if (
                request.authenticatorSelection !== undefined &&
                request.authenticatorSelection !== null
            ) {
                responseData.authenticatorSelection =
                    request.authenticatorSelection;
            }

            // This should be set up in a config somewhere.
            responseData.rp = {
                id: "localhost",
                name: "http://localhost",
            };

            responseData.pubKeyCredParams = [
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -7 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -35 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -36 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -37 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -38 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -39 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -257 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -258 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -259 },
                // tslint:disable-next-line:object-literal-key-quotes
                { type: "public-key", alg: -65535 },
            ];

            if (existingTokens.length > 0) {
                responseData.excludeCredentials = [];
                existingTokens.forEach((token) => {
                    responseData.excludeCredentials.push({
                        type: "public-key",
                        id: token.$credentialId,
                    });
                });
            }

            if (
                request.extensions !== undefined &&
                request.extensions !== null
            ) {
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
                response.$message =
                    "Successfully retrieved attestation options.";
                response.$hasError = false;

                resolve(response);
            });
        });
    }

    public result(request: any, challenge: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(async (resolve, reject) => {
            try {
                if (
                    request.id === null ||
                    request.id === "" ||
                    typeof request.id !== "string" ||
                    request.id === undefined ||
                    !Base64Utility.isBase64UrlEncoded(request.id)
                ) {
                    throw new Error("Invalid request, no Id provided.");
                }

                if (
                    request.type === "" ||
                    request.type !== "public-key" ||
                    typeof request.type !== "string"
                ) {
                    throw new Error("Invalid request, type incorrect.");
                }

                if (
                    request.response === null ||
                    request.response === undefined ||
                    typeof request.response !== "object"
                ) {
                    throw new Error("Invalid object, no response.");
                }

                const response = request.response;

                if (
                    response.attestationObject === undefined ||
                    response.attestationObject === null
                ) {
                    throw new Error("Invalid object, not an attestation");
                }
                if (
                    response.clientDataJSON === undefined ||
                    response.clientDataJSON === null
                ) {
                    throw new Error("Invalid object, no client data provided.");
                }

                const clientData = new CollectedClientData(
                    response.clientDataJSON
                );

                const attestationObject = await AttestationObject.decode(
                    response.attestationObject
                );
                const attestationStatement =
                    attestationObject.$attestationStatement;
                const authenticatorData = attestationObject.$authenticatorData;
                const transports = response.transports;

                if (clientData.$type !== "webauthn.create") {
                    reject("Invalid type in client data.");
                    return;
                }

                if (
                    clientData.$challenge === undefined ||
                    clientData.$challenge === null ||
                    typeof clientData.$challenge !== "string" ||
                    clientData.$challenge.length === 0 ||
                    clientData.$challenge !== challenge
                ) {
                    throw new Error("Challenege invalid or not provided.");
                }

                const verificationResponse = await attestationStatement.validateSignature(
                    clientData,
                    authenticatorData
                );

                if (verificationResponse.verified) {
                    const publicKey = base64url.encode(
                        authenticatorData.$attestationData.$publicKey.getAsBuffer()
                    );

                    const token = new Token();
                    token.$transports = transports;
                    token.$credentialId =
                        verificationResponse.authenticatorInfo.credentialId;
                    token.$publicKey =
                        verificationResponse.authenticatorInfo.publicKey;
                    token.$counter = authenticatorData.$signCount;
                    token.$aaguid =
                        verificationResponse.authenticatorInfo.aaguid;

                    const result = new ServiceResponse();
                    result.$data = token;
                    result.$message = "Registration completed successfully.";
                    result.$statusCode = 200;
                    result.$hasError = false;
                } else {
                    reject("Unable to validate attestation signature.");
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}
