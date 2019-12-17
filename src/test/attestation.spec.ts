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
            console.log(result.$data);
            expect(result.$statusCode).to.equal(200);
            // expect(result.$data).to.contain("timeout");
            // expect(result.$data).to.contain("user");
            // expect(result.$data).to.contain("challenge");
        });
    });
});

describe("Attestation result test function", () => {
    // TODO: Add test for attestation result processing.
});
