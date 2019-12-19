import { expect } from "chai";
import "mocha";
import { ServiceResponse } from "Service/ServiceResponse";
import { Token } from "../Lib/Model/Token";
import { User } from "../Lib/Model/User";
import { AssertionService } from "../Lib/Service/AssertionService";

describe("Assertion options test function", () => {
    it("Should generate assertion options", () => {
        const assertionService = new AssertionService();

        const user = new User();
        user.$username = "johndoe@example.com";
        user.$displayName = "John Doe";
        user.$id = "IElyZHmTnbRzU8nsdyh6qw";

        const request: any = {
            userVerification: "preferred",
            username: "johndoe@example.com",
        };

        // Only needs credential Id for the purposes of this test.
        const token: Token = new Token();
        token.$credentialId = "nYrLFMz7yiaAH15tqA9lzzbjIen5GJEwE4fimZUPgAE";

        assertionService.options(user, request, [token]).then((result: ServiceResponse) => {
            console.log(result.$data);
            expect(result.$statusCode).to.equal(200);
        });
    });
});

describe("Assertion result test function", () => {
    it("Should successfully validate the provided assertion", () => {
        //
    });
});
