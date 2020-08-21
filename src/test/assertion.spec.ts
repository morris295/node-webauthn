import "mocha";

import { AssertionService } from "../Lib/Service/AssertionService";
import { ServiceResponse } from "Service/ServiceResponse";
import { Token } from "../Lib/Model/Token";
import { User } from "../Lib/Model/User";
import { expect } from "chai";
import { fail } from "assert";

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

    assertionService
      .options(user, request, [token])
      .then((result: ServiceResponse) => {
        expect(result.$statusCode).to.equal(200);
      });
  });
});

describe("Assertion result test function", () => {
  it("Should successfully validate the provided assertion", () => {
    const request = JSON.parse(
      '{"id": "kGjySJ3u3RXIoIQIFq3ZfEbj8-a1Xd_-CLS7AAoBbYNe89Z2iUNRi7KMPMKAm83z80knsSvWiHCK2w8T4b_v50CPilwBwVOL6fVOoE_0tYPLM842mGOTqNfII44TK42b", "rawId": "kGjySJ3u3RXIoIQIFq3ZfEbj8-a1Xd_-CLS7AAoBbYNe89Z2iUNRi7KMPMKAm83z80knsSvWiHCK2w8T4b_v50CPilwBwVOL6fVOoE_0tYPLM842mGOTqNfII44TK42b", "response": { "authenticatorData": "Rsx_uWedVbLbkJLhyNnl4dArdYDwtIEsdwli4eSPWtgBAAAABw", "signature": "MEYCIQDzky0obUVAHFE27veVz6jRDBsSuxVF_NMRP2R-dkJgngIhANve7UngHIklBlYcwcYQ41yERxIwisW3C3Yb5gijNFV_", "clientDataJSON": "eyJjaGFsbGVuZ2UiOiJQakctMXVyR2lYeWNvdldxMFF3amtLcUJpUVQtMGFQVER0UTNmbmJTcFZJIiwib3JpZ2luIjoiaHR0cHM6Ly93ZWJhdXRobmRlbW8uYXBwc3BvdC5jb20iLCJ0eXBlIjoid2ViYXV0aG4uZ2V0In0" }, "type": "public-key" }'
    );
    const assertionService = new AssertionService();
    const token = new Token();
    const challenge = "PjG-1urGiXycovWq0QwjkKqBiQT-0aPTDtQ3fnbSpVI";
    token.$aaguid = "00000000-0000-0000-0000-000000000000"; // U2F authenticator
    token.$publicKey =
      "BNPY07wKCZGpezZRfmVpeEDBZMQJJj801bl" +
      "_A4ffwNH2DJ-Z4wh68qPNYu5HHHJYpRX01ZXQKsTy1bjse4Ae68I";
    token.$counter = 1;
    const metadata = {}; // Blank metadata is acceptable for a U2F authenticator.

    assertionService
      .result(request, challenge, token, {}, "preferred")
      .then((result) => {
        expect(result.$statusCode).to.equal(200);
      })
      .catch((error) => {
        fail(error);
      });
  });
});
