import { Token } from "../Model/Token";
import { User } from "../Model/User";
import { ServiceResponse } from "./ServiceResponse";

export interface IFido2Service {
    options(user: User, request: any, existingTokens: Token[]): Promise<ServiceResponse>;
    result(): ServiceResponse;
}
