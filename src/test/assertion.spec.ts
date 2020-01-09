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
            expect(result.$statusCode).to.equal(200);
        });
    });
});

describe("Assertion result test function", () => {
    it("Should successfully validate the provided assertion", () => {
        const request = JSON.parse("{ \"id\":\"LFdoCFJTyB82ZzSJUHc-c72yraRc_1mPvGX8ToE8su39xX26Jcqd31LUkKOS36FIAWgWl6itMKqmDvruha6ywA\", \"rawId\":\"LFdoCFJTyB82ZzSJUHc-c72yraRc_1mPvGX8ToE8su39xX26Jcqd31LUkKOS36FIAWgWl6itMKqmDvruha6ywA\", \"response\":{ \"authenticatorData\":\"SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MBAAAAAA\", \"signature\":\"MEYCIQCv7EqsBRtf2E4o_BjzZfBwNpP8fLjd5y6TUOLWt5l9DQIhANiYig9newAJZYTzG1i5lwP-YQk9uXFnnDaHnr2yCKXL\", \"userHandle\":\"\", \"clientDataJSON\":\"eyJjaGFsbGVuZ2UiOiJ4ZGowQ0JmWDY5MnFzQVRweTBrTmM4NTMzSmR2ZExVcHFZUDh3RFRYX1pFIiwiY2xpZW50RXh0ZW5zaW9ucyI6e30sImhhc2hBbGdvcml0aG0iOiJTSEEtMjU2Iiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwidHlwZSI6IndlYmF1dGhuLmdldCJ9\" }, \"type\":\"public-key\"}");
        const assertionService = new AssertionService();
        const token = new Token();
        token.$aaguid = "";

        assertionService.result(request, "", new Token(), {}, "preferred").then((result) => {
            expect(result.$statusCode).to.equal(200);
        });
    });
});
