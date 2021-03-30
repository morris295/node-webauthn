import { AuthenticatorAttachment } from "./AuthenticatorAttachment";
import { UserVerification } from "./UserVerification";

export class AuthenticatorSelection {

    /**
     * Getter $residentKey
     * @return {boolean}
     */
    public get $residentKey(): boolean {
        return this.residentKey;
    }

    /**
     * Setter $residentKey
     * @param {boolean} value
     */
    public set $residentKey(value: boolean) {
        this.residentKey = value;
    }
    private residentKey: boolean;

    /**
     * Getter $authenticatorAttachment
     * @return {AuthenticatorAttachment}
     */
    public get $authenticatorAttachment(): AuthenticatorAttachment {
        return this.authenticatorAttachment;
    }

    /**
     * Setter $authenticatorAttachment
     * @param {AuthenticatorAttachment} value
     */
    public set $authenticatorAttachment(value: AuthenticatorAttachment) {
        this.authenticatorAttachment = value;
    }
    private authenticatorAttachment: AuthenticatorAttachment;

    /**
     * Getter $userVerification
     * @return {UserVerification}
     */
    public get $userVerification(): UserVerification {
        return this.userVerification;
    }

    /**
     * Setter $userVerification
     * @param {UserVerification} value
     */
    public set $userVerification(value: UserVerification) {
        this.userVerification = value;
    }
    private userVerification: UserVerification;

    constructor(residentKey: boolean,
                authenticatorAttachment: AuthenticatorAttachment,
                userVerification: UserVerification) {
        this.residentKey = residentKey;
        this.authenticatorAttachment = authenticatorAttachment;
        this.userVerification = userVerification;
    }
}
