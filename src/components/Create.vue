<template>
  <div class="container is-size-7">
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title">Request</h3>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">rp.name</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="rp.name"
                  v-model="reqRpName"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">rp.id</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="rp.id"
                  v-model="reqRpid"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">rp.icon</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="https://example/rp.png"
              v-model="reqRpIcon"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small">user.id(hex)</label>
          <div class="columns">
            <div class="column">
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="user.id"
                  v-model="reqUserId"
                />
              </div>
            </div>
            <div class="column">
              <input
                type="button"
                value="Generate"
                class="button is-primary is-small"
                @click="generateRandomUserId()"
              />
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">user.name</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="user.name"
                  v-model="reqUserName"
                />
              </div>
            </div>
          </div>
          <div class="field">
            <div class="column">
              <label class="label is-small">user.displayName</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="user.displayName"
                  v-model="reqUserDisplayName"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">user.icon</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="https://example/rp.png"
              v-model="reqUserIcon"
            />
          </div>
        </div>
        <label class="label is-small">pubKeyCredParams[]</label>
        <div
          class="field box"
          v-for="pubKeyCredParam in reqPubKeyCredParams"
          v-bind:key="pubKeyCredParam.alg"
        >
          <div class="columns">
            <div class="column">
              <label class="label is-small">.type</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="public-key"
                  v-model="pubKeyCredParam.type"
                />
              </div>
            </div>
            <div class="column">
              <label class="label is-small">.alg</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="-7"
                  v-model="pubKeyCredParam.alg"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <input
            type="button"
            value="Add pubKeyCredParam"
            class="button is-primary is-small"
            @click="addPubKeyCredParam()"
          />
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">attestation</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="none or direct or indirect"
                  v-model="reqAttestation"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">timeout</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="60000"
                  v-model="reqTimeout"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSection.authenticationAttachment</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="platform or closs-platform"
              v-model="reqAuthenticatorSectionAuthenticationAttachment"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSection.requireResidentKey</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="true"
              v-model="reqAuthenticatorSectionRequireResidentKey"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSection.userVerification</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="preferred"
              v-model="reqAuthenticatorSectionUserVerification"
            />
          </div>
        </div>
        <label class="label is-small">excludeCredentials[]</label>
        <div
          class="field box"
          v-for="excludeCredential in reqExcludeCredentials"
          v-bind:key="excludeCredential.id"
        >
          <div class="columns">
            <div class="column">
              <label class="label is-small">.type</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="public-key"
                  v-model="excludeCredential.type"
                />
              </div>
            </div>
            <div class="column">
              <label class="label is-small">.transports</label>
              <div class="control" style="font-size: 0.75rem;">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="usb"
                    v-model="excludeCredential.transports"
                  />
                  usb
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="ble"
                    v-model="excludeCredential.transports"
                  />
                  ble
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="nfc"
                    v-model="excludeCredential.transports"
                  />
                  nfc
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="internal"
                    v-model="excludeCredential.transports"
                  />
                  internal
                </label>
              </div>
            </div>
          </div>
          <label class="label is-small">.id(hex)</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="id"
              v-model="excludeCredential.id"
            />
          </div>
        </div>
        <div class="field">
          <input
            type="button"
            value="Add excludeCredentials"
            class="button is-primary is-small"
            @click="addExcludeCredentials()"
          />
        </div>
        <div class="field">
          <label class="label is-small">challenge(hex)</label>
          <div class="columns">
            <div class="column">
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="challenge"
                  v-model="this.reqChallenge"
                />
              </div>
            </div>
            <div class="column">
              <input
                type="button"
                value="Generate"
                class="button is-primary is-small"
                @click="generateChallenge()"
              />
            </div>
          </div>
        </div>
        <input
          type="button"
          value="navigator.credentials.create()"
          class="button is-primary is-large"
          @click="create()"
        />
      </div>
      <div class="column">
        <h3 class="title">Response</h3>
        <table
          class="table is-responsive"
          style="table-layout: fixed; width: 100%"
        >
          <tbody>
            <tr>
              <th>Error</th>
              <td style="word-wrap: break-word" class="has-text-danger">
                {{ errorType }}
              </td>
            </tr>
            <tr>
              <th>Error message</th>
              <td style="word-wrap: break-word" class="has-text-danger">
                {{ errorMessage }}
              </td>
            </tr>
            <tr>
              <th>.response</th>
              <td></td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.clientDataJSON</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.clientDataJSON }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.attestationObject</th>
              <td></td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.authData</th>
              <td></td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.rpidHash</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.rpidHash }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.up</th>
              <td>
                {{ createResponseView.up }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.uv</th>
              <td>
                {{ createResponseView.uv }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.at</th>
              <td>
                {{ createResponseView.at }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.ed</th>
              <td>
                {{ createResponseView.ed }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.signCount</th>
              <td>
                {{ createResponseView.signCount }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.aaguid</th>
              <td>
                {{ createResponseView.aaguid }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.credentialId</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.credentialId }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.credentialPublicKey</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.credentialPublicKey }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.fmt</th>
              <td>{{ createResponseView.fmt }}</td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.attStmt</th>
              <td>
                {{ createResponseView.attStmt }}
              </td>
            </tr>
            <tr>
              <th>.id</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.id }}
              </td>
            </tr>
            <tr>
              <th>.type</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.type }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorType: "",
      errorMessage: "",
      reqRpName: "Acme",
      reqRpid: window.location.hostname,
      reqRpIcon: "",
      reqUserId: this.generateRandomUserId(),
      reqUserName: "john.p.smith@example.com",
      reqUserIcon: "",
      reqUserDisplayName: "John P. Smith",
      reqPubKeyCredParams: [{ type: "public-key", alg: -7 }],
      reqAuthenticatorSectionAuthenticationAttachment: "",
      reqAuthenticatorSectionRequireResidentKey: false,
      reqAuthenticatorSectionUserVerification: "preferred",
      reqAttestation: "direct",
      reqTimeout: 60000,
      reqChallenge: this.generateChallenge(),
      reqExcludeCredentials: [],
      createResponse: {}
    };
  },
  computed: {
    buildCreateRequest: function() {
      let request = {};
      request.publicKey = {};
      request.publicKey.rp = {};
      request.publicKey.rp.name = this.reqRpName;
      request.publicKey.rp.id = this.reqRpid;
      request.publicKey.rp.icon = this.reqRpIcon;
      request.publicKey.user = {};
      request.publicKey.user.id = Buffer.from(this.reqUserId, "hex");
      request.publicKey.user.name = this.reqUserName;
      request.publicKey.user.icon = this.reqUserIcon;
      request.publicKey.user.displayName = this.reqUserDisplayName;
      request.publicKey.pubKeyCredParams = this.reqPubKeyCredParams;
      request.publicKey.authenticatorSelection = {};
      if (this.reqAuthenticatorSectionAuthenticationAttachment) {
        request.publicKey.authenticatorSelection.authenticatorAttachment = this.reqAuthenticatorSectionAuthenticationAttachment;
      }
      if (this.reqAuthenticatorSectionRequireResidentKey) {
        request.publicKey.authenticatorSelection.requireResidentKey = this.reqAuthenticatorSectionRequireResidentKey;
      }
      if (this.reqAuthenticatorSectionUserVerification) {
        request.publicKey.authenticatorSelection.userVerification = this.reqAuthenticatorSectionUserVerification;
      }
      if (this.reqAuthenticatorSectionUserVerification) {
        request.publicKey.authenticatorSelection.userVerification = this.reqAuthenticatorSectionUserVerification;
      }
      request.publicKey.attestation = this.reqAttestation;
      request.publicKey.timeout = this.reqTimeout;
      request.publicKey.challenge = Buffer.from(this.reqChallenge, "hex");

      request.publicKey.excludeCredentials = [];
      for (let i = 0; i < this.reqExcludeCredentials.length; i++) {
        let exist = false;
        let excludeCredential = this.reqExcludeCredentials[i];
        let credentials = {};
        if (excludeCredential.id) {
          credentials.id = Buffer.from(excludeCredential.id, "hex");
          exist = true;
        }
        if (excludeCredential.type) {
          credentials.type = excludeCredential.type;
          exist = true;
        }
        if (exist) {
          request.publicKey.excludeCredentials.push(credentials);
        }
      }
      return request;
    },
    createResponseView: function() {
      // refference https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770
      let result = {};
      result.id = this.createResponse.id;
      result.type = this.createResponse.type;
      if (this.createResponse.response) {
        /** clientDataJSON */
        let enc = new TextDecoder("utf-8");
        result.clientDataJSON = enc.decode(
          this.createResponse.response.clientDataJSON
        );

        /** attestationObject */
        const cbor = require("cbor");
        const vanillacbor = require("vanillacbor");

        let attestationObject = cbor.decodeAllSync(
          new Buffer(this.createResponse.response.attestationObject)
        )[0];
        result.fmt = attestationObject.fmt;
        result.attStmt = attestationObject.attStmt;

        let buffer = attestationObject.authData;
        let rpIdHash = buffer.slice(0, 32);
        buffer = buffer.slice(32);
        result.authData = {};
        result.rpidHash = rpIdHash.toString("hex");

        /* Flags */
        let flagsBuffer = buffer.slice(0, 1);
        buffer = buffer.slice(1);
        let flagsInt = flagsBuffer[0];
        result.up = !!(flagsInt & 0x01); // Test of User Presence
        result.uv = !!(flagsInt & 0x04); // User Verification
        result.at = !!(flagsInt & 0x40); // Attestation data
        result.ed = !!(flagsInt & 0x80); // Extension data

        let counterBuffer = buffer.slice(0, 4);
        buffer = buffer.slice(4);
        result.signCount = counterBuffer.readUInt32BE(0);

        /* Attested credential data */
        let aaguid = undefined;
        let aaguidBuffer = undefined;
        let credIdBuffer = undefined;
        let cosePublicKeyBuffer = undefined;
        let attestationMinLen = 16 + 2 + 16 + 77; // aaguid + credIdLen + credId + pk

        if (result.at) {
          // Attested Data
          if (buffer.byteLength < attestationMinLen)
            throw new Error(
              `It seems as the Attestation Data flag is set, but the remaining data is smaller than ${attestationMinLen} bytes. You might have set AT flag for the assertion response.`
            );

          aaguid = buffer.slice(0, 16).toString("hex");
          buffer = buffer.slice(16);
          aaguidBuffer = `${aaguid.slice(0, 8)}-${aaguid.slice(
            8,
            12
          )}-${aaguid.slice(12, 16)}-${aaguid.slice(16, 20)}-${aaguid.slice(
            20
          )}`;
          result.aaguid = aaguidBuffer;

          let credIdLenBuffer = buffer.slice(0, 2);
          buffer = buffer.slice(2);
          let credIdLen = credIdLenBuffer.readUInt16BE(0);
          credIdBuffer = buffer.slice(0, credIdLen);
          buffer = buffer.slice(credIdLen);
          result.credentialId = credIdBuffer.toString("hex");

          let pubKeyLength = vanillacbor.decodeOnlyFirst(buffer).byteLength;
          cosePublicKeyBuffer = buffer.slice(0, pubKeyLength);
          buffer = buffer.slice(pubKeyLength);
          result.credentialPublicKey = cosePublicKeyBuffer.toString("hex");
        }

        let coseExtensionsDataBuffer = undefined;
        if (result.ed) {
          // Extension Data
          let extensionsDataLength = vanillacbor.decodeOnlyFirst(buffer)
            .byteLength;

          coseExtensionsDataBuffer = buffer.slice(0, extensionsDataLength);
          buffer = buffer.slice(extensionsDataLength);
          result.coseExtensionsDataBuffer = coseExtensionsDataBuffer.toString(
            "hex"
          );
        }

        if (buffer.byteLength)
          throw new Error(
            "Failed to decode authData! Leftover bytes been detected!"
          );
      }

      return result;
    }
  },
  methods: {
    create() {
      // reset
      this.errorType = "";
      this.errorMessage = "";
      this.createResponse = {};

      // call webauthn api
      console.log("Create Request", this.buildCreateRequest);
      navigator.credentials
        .create(this.buildCreateRequest)
        .then(res => {
          console.log("Create Response", res);
          this.createResponse = res;
        })
        .catch(err => {
          console.log("Create Error", err);
          this.errorType = err.name;
          this.errorMessage = err.message;
        });
    },
    generateRandomUserId() {
      this.reqUserId = require("crypto")
        .randomBytes(32)
        .toString("hex");
      return this.reqUserId;
    },
    generateChallenge() {
      this.reqChallenge = require("crypto")
        .randomBytes(32)
        .toString("hex");
      return this.reqChallenge;
    },
    addExcludeCredentials() {
      this.reqExcludeCredentials.push({ transports: [] });
    },
    addPubKeyCredParam() {
      this.reqPubKeyCredParams.push({ type: "public-key" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
