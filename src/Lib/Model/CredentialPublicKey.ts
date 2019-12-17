"use strict";

export abstract class CredentialPublicKey {
    protected cborEncodedKey: Buffer;
    protected algorithm: number;
    protected kty: number;

    public set $cborEncodedKey(value: Buffer) {
        this.cborEncodedKey = value;
    }
    public get $cborEncodedKey() {
        return this.cborEncodedKey;
    }

    public set $algorithm(value: number) {
        this.algorithm = value;
    }
    public get $algorithm() {
        return this.algorithm;
    }

    public set $kty(value: number) {
        this.kty = value;
    }
    public get $kty() {
        return this.kty;
    }

    public abstract getAsBuffer(): Buffer;
}
