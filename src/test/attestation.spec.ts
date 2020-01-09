import { expect } from "chai";
import "mocha";
import { ServiceResponse } from "Service/ServiceResponse";
import { User } from "../Lib/Model/User";
import { AttestationService } from "../Lib/Service/AttestationService";

const attestationService = new AttestationService();

describe("Attestation options test function", () => {
    it("Should return attestation options JSON", () => {

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

        attestationService.result(request, challenge).then((result: ServiceResponse) => {
            expect(result.$statusCode).to.equal(200);
        });
    });
});

describe("Full Packed attestation result test function", () => {
    it("Should validate full packed attestation result successfully", () => {
        const challenge = "YMWETf-P79iMb-BqdTkySNReOva7nK2iVC9fiC8iGvYypunEOCZGZ6-Y5OV1rvMiDgAjWfFi6UC0WyKGsjA-gA";
        const request = JSON.parse("{ \"rawId\": \"wsLryOAxXMU54s2fCSWPzWjXHOBKPploN-UHftj4_rpIu6BZxNXppm82f7Y6iX9FEOKKeS5-N2TALeyzLnJfAA\", \"id\": \"wsLryOAxXMU54s2fCSWPzWjXHOBKPploN-UHftj4_rpIu6BZxNXppm82f7Y6iX9FEOKKeS5-N2TALeyzLnJfAA\", \"response\": { \"clientDataJSON\":  \"eyJjaGFsbGVuZ2UiOiJZTVdFVGYtUDc5aU1iLUJxZFRreVNOUmVPdmE3bksyaVZDOWZpQzhpR3ZZeXB1bkVPQ1pHWjYtWTVPVjFydk1pRGdBaldmRmk2VUMwV3lLR3NqQS1nQSIsIm9yaWdpbiI6Imh0dHBzOi8vd2ViYXV0aG4ub3JnIiwidHlwZSI6IndlYmF1dGhuLmNyZWF0ZSJ9\", \"attestationObject\":  \"o2NmbXRmcGFja2VkZ2F0dFN0bXSjY2FsZyZjc2lnWEcwRQIhAIzOihC6Ba80o5JnoYOJJ_EtEVmWQcAvxVCnsCFnVRQZAiAfeIddLPsPl1FeSX8B5xZANcQKGNoO7pb0TZPnuJdebGN4NWOBWQKzMIICrzCCAZegAwIBAgIESFs9tjANBgkqhkiG9w0BAQsFADAhMR8wHQYDVQQDDBZZdWJpY28gRklETyBQcmV2aWV3IENBMB4XDTE4MDQxMjEwNTcxMFoXDTE4MTIzMTEwNTcxMFowbzELMAkGA1UEBhMCU0UxEjAQBgNVBAoMCVl1YmljbyBBQjEiMCAGA1UECwwZQXV0aGVudGljYXRvciBBdHRlc3RhdGlvbjEoMCYGA1UEAwwfWXViaWNvIFUyRiBFRSBTZXJpYWwgMTIxMzkzOTEyNjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABPss3TBDKMVySlDM5vYLrX0nqRtZ4eZvKXuJydQ9wrLHeIm08P-dAijLlG384BsZWJtngEqsl38oGJzNsyV0yiijbDBqMCIGCSsGAQQBgsQKAgQVMS4zLjYuMS40LjEuNDE0ODIuMS42MBMGCysGAQQBguUcAgEBBAQDAgQwMCEGCysGAQQBguUcAQEEBBIEEPigEfOMCk0VgAYXER-e3H0wDAYDVR0TAQH_BAIwADANBgkqhkiG9w0BAQsFAAOCAQEAMvPkvVjXQiuvSZmGCB8NqTvGqhxyEfkoU-vz63PaaTsG3jEzjl0C7PZ26VxCvqWPJdM3P3e7Kp18sj4RjEHUmkya2PPipOwBd3p0qMQSQ8MeziCPLQ9uvGGb4YShcvaprMv4c21b4piza-znHneNCmmq-ZS4Y23o-vYv085_BEwyLPcmPjSZ5qWysCq7rVvZ7OWwcU1zu5RhSZyUKl8dzK9lAzs5OdRH2fzEewsW2OkB_Ow_jBvAxqwLXXTHuwMFaRfpmBoZuQlcofSrnwJ8KA-K-e0dKTz2zC8EbZrWYrSpbrHKyqxeBT6DkUd8H4tgAd5lOr_yqrtVmIaRfq07NmhhdXRoRGF0YVjElWkIjx7O4yMpVANdvRDXyuORMFonUbVZu4_Xy7IpvdRBAAAAAPigEfOMCk0VgAYXER-e3H0AQMLC68jgMVzFOeLNnwklj81o1xzgSj6ZaDflB37Y-P66SLugWcTV6aZvNn-2Ool_RRDiinkufjdkwC3ssy5yXwClAQIDJiABIVggAYD1TSpf120DSVxen8ki56kF1bmT4EXO-P0JnSk5mMwiWCB3TlMZBRqPY6llzDcfHd-oW0EHdaFNgBdlGGFobpHKlw\" }, \"type\":  \"public-key\" }");

        attestationService.result(request, challenge).then((result) => {
            expect(result.$statusCode).to.equal(200);
        });
    });
});

describe("Surrogate Packed attestation result test function", () => {
    it("Should validate attestation result " +
    "for surrogate packed attestation successfully", () => {
        const challenge = "AXkXWXPP3gLx8OLlpkJ3aRRhFWntnSENggnjDpBql1ngKol7xWwevUYvrpBDP3LEvdr2EOStOFpGGxnMvXk-Vw";
        const request = JSON.parse("{ \"id\":  \"H6X2BnnjgOzu_Oj87vpRnwMJeJYVzwM3wtY1lhAfQ14\", \"rawId\":  \"H6X2BnnjgOzu_Oj87vpRnwMJeJYVzwM3wtY1lhAfQ14\", \"response\": { \"attestationObject\":  \"o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZzn__mNzaWdZAQCPypMLXWqtCZ1sc5QdjhH-pAzm8-adpfbemd5zsym2krscwV0EeOdTrdUOdy3hWj5HuK9dIX_OpNro2jKrHfUj_0Kp-u87iqJ3MPzs-D9zXOqkbWqcY94Zh52wrPwhGfJ8BiQp5T4Q97E042hYQRDKmtv7N-BT6dywiuFHxfm1sDbUZ_yyEIN3jgttJzjp_wvk_RJmb78bLPTlym83Y0Ws73K6FFeiqFNqLA_8a4V0I088hs_IEPlj8PWxW0wnIUhI9IcRf0GEmUwTBpbNDGpIFGOudnl_C3YuXuzK3R6pv2r7m9-9cIIeeYXD9BhSMBQ0A8oxBbVF7j-0xXDNrXHZaGF1dGhEYXRhWQFnSZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NBAAAAOKjVmSRjt0nqud40p1PeHgEAIB-l9gZ544Ds7vzo_O76UZ8DCXiWFc8DN8LWNZYQH0NepAEDAzn__iBZAQDAIqzybPPmgeL5OR6JKq9bWDiENJlN_LePQEnf1_sgOm4FJ9kBTbOTtWplfoMXg40A7meMppiRqP72A3tmILwZ5xKIyY7V8Y2t8X1ilYJol2nCKOpAEqGLTRJjF64GQxen0uFpi1tA6l6N-ZboPxjky4aidBdUP22YZuEPCO8-9ZTha8qwvTgZwMHhZ40TUPEJGGWOnHNlYmqnfFfk0P-UOZokI0rqtqqQGMwzV2RrH2kjKTZGfyskAQnrqf9PoJkye4KUjWkWnZzhkZbrDoLyTEX2oWvTTflnR5tAVMQch4UGgEHSZ00G5SFoc19nGx_UJcqezx5cLZsny-qQYDRjIUMBAAE\", \"clientDataJSON\":  \"eyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjaGFsbGVuZ2UiOiJBWGtYV1hQUDNnTHg4T0xscGtKM2FSUmhGV250blNFTmdnbmpEcEJxbDFuZ0tvbDd4V3dldlVZdnJwQkRQM0xFdmRyMkVPU3RPRnBHR3huTXZYay1WdyIsInR5cGUiOiJ3ZWJhdXRobi5jcmVhdGUifQ\" }, \"type\":  \"public-key\" }");

        attestationService.result(request, challenge).then((result) => {
            expect(result.$statusCode).to.equal(200);
        });
    });
});
