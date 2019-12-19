import { expect } from "chai";
import "mocha";
import { ServiceResponse } from "Service/ServiceResponse";
import { User } from "../Lib/Model/User";
import { AttestationService } from "../Lib/Service/AttestationService";

describe("Attestation options test function", () => {
    it("Should return attestation options JSON", () => {
        const attestationService = new AttestationService();

        const user = new User();
        user.$username = "johndoe@example.com";
        user.$displayName = "John Doe";
        user.$id = "IElyZHmTnbRzU8nsdyh6qw";

        const request = {
            attestation: "direct",
            authenticatorSelection: {
                authenticatorAttachment: "cross-platform",
                residentKey: false,
                userVerification: "preferred",
            },
            displayName: user.$displayName,
            username: user.$username,
        };

        attestationService.options(user, request, []).then((result: ServiceResponse) => {
            expect(result.$statusCode).to.equal(200);
        });
    });
});

describe("Attestation result test function", () => {
    it("Should validate attestation result successfully.", () => {
        const challenge = "z0q0b7VXI64BiX4jEfbTVkx-8CpAXKOkryUaBHA7C8M";
        const request = JSON.parse("{\"id\":\"ZZFq4dRymM6a2Ob4zg-4bpBPFmkoEPKmgKtPO9RMfIngihHUBtbxaR_Y3N0Opp5vuWjxbX4uPixAmdSoEoon_IZoY6mhLDkvDIKpBpriufLW7q906nkm1oM44JJUqdhX\",\"rawId\":\"ZZFq4dRymM6a2Ob4zg-4bpBPFmkoEPKmgKtPO9RMfIngihHUBtbxaR_Y3N0Opp5vuWjxbX4uPixAmdSoEoon_IZoY6mhLDkvDIKpBpriufLW7q906nkm1oM44JJUqdhX\",\"type\":\"public-key\",\"response\":{\"clientDataJSON\":\"eyJjaGFsbGVuZ2UiOiJ6MHEwYjdWWEk2NEJpWDRqRWZiVFZreC04Q3BBWEtPa3J5VWFCSEE3QzhNIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdCIsInR5cGUiOiJ3ZWJhdXRobi5jcmVhdGUifQ\",\"attestationObject\":\"o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEYwRAIgZaYm9BKJ3P6WevaR86YSpXw_w55OjLw5fxyWQ3x-PHMCIBtpG42kBDKdDjXW-GAKt-_hna7pDKQJy7zYRF4xuzWYY3g1Y4FZAaMwggGfMIIBRaADAgECAgIQEzAKBggqhkjOPQQDAjA6MQswCQYDVQQGEwJDQTESMBAGA1UECgwJSFlQRVJTRUNVMRcwFQYDVQQDDA5IWVBFUkZJRE8gMDIwMDAgFw0xODAxMDEwMDAwMDBaGA8yMDMyMTIzMTIzNTk1OVowPTELMAkGA1UEBhMCQ0ExEjAQBgNVBAoMCUhZUEVSU0VDVTEaMBgGA1UEAwwRSFlQRVJGSURPIDAyMDAgMDgwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATRAoPu3tAg68LmVh2NWZzQNz995-99t4dw4yUX288E6owiPE7cdGydj_bjvz8cjxAKWBNbvHQ_zG9SF9XGTmqHozYwNDAdBgNVHQ4EFgQULrn_NXL2dijRKRo7V5JPgYqtnnIwEwYLKwYBBAGC5RwCAQEEBAMCBSAwCgYIKoZIzj0EAwIDSAAwRQIhAI4W-qPi-48RMthJAgeMD7m1donuW41IYaLBWRhMG-bgAiBdhbw6p18a_lr4baGTHgVSVqbyY5Z8uJiY366pvnz0YWhhdXRoRGF0YVjkSZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NBAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGWRauHUcpjOmtjm-M4PuG6QTxZpKBDypoCrTzvUTHyJ4IoR1AbW8Wkf2NzdDqaeb7lo8W1-Lj4sQJnUqBKKJ_yGaGOpoSw5LwyCqQaa4rny1u6vdOp5JtaDOOCSVKnYV6UBAgMmIAEhWCC4aDFP6FlTy1Fbd__ehNrBiSi6oGjEYhcsPRbuwYWPSyJYIBc-UZG64gSnwrFUYBfMESGyYnJYz5sl8nBvGPX-fCMd\",\"transports\":[\"usb\"]}}");

        const attestationService = new AttestationService();

        attestationService.result(request, challenge).then((result: ServiceResponse) => {
            expect(result.$statusCode).to.equal(200);
        });
    });
});
