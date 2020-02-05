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
                  placeholder="Text input"
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
                  placeholder="Text input"
                  v-model="reqRpId"
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
              placeholder="Text input"
              v-model="reqRpIcon"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small">user.id(Base64 encoded)</label>
          <div class="columns">
            <div class="column">
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Text input"
                  v-model="useridForView"
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
                  placeholder="Text input"
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
                  placeholder="Text input"
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
              placeholder="Text input"
              v-model="reqUserIcon"
            />
          </div>
        </div>
        <label class="label is-small">excludeCredentials[]</label>
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
                  placeholder="Text input"
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
                  placeholder="Text input"
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
                  placeholder="Text input"
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
                  placeholder="Text input"
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
              placeholder="Text input"
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
              placeholder="Text input"
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
              placeholder="Text input"
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
                  placeholder="Text input"
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
          <label class="label is-small">.id(Base64 encoded)</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="Text input"
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
          <label class="label is-small">challenge(Base64 encoded)</label>
          <div class="columns">
            <div class="column">
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Text input"
                  v-model="challengeForView"
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
          class="button is-primary"
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
              <td style="word-wrap: break-word">
                {{ errorType }}
              </td>
            </tr>
            <tr>
              <th>Error message</th>
              <td style="word-wrap: break-word">
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
                {{ createResponseResponseClientDataJSON }}
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
                {{
                  createResponseResponseAttestationObjectAuthDataForView.rpidHash
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.up</th>
              <td>
                {{
                  createResponseResponseAttestationObjectAuthDataForView.flag ==
                  undefined
                    ? ""
                    : createResponseResponseAttestationObjectAuthDataForView
                        .flag.up
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.uv</th>
              <td>
                {{
                  createResponseResponseAttestationObjectAuthDataForView.flag ==
                  undefined
                    ? ""
                    : createResponseResponseAttestationObjectAuthDataForView
                        .flag.uv
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.at</th>
              <td>
                {{
                  createResponseResponseAttestationObjectAuthDataForView.flag ==
                  undefined
                    ? ""
                    : createResponseResponseAttestationObjectAuthDataForView
                        .flag.at
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.ed</th>
              <td>
                {{
                  createResponseResponseAttestationObjectAuthDataForView.flag ==
                  undefined
                    ? ""
                    : createResponseResponseAttestationObjectAuthDataForView
                        .flag.ed
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.signCount</th>
              <td>
                {{
                  createResponseResponseAttestationObjectAuthDataForView.signCount
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.aaguid</th>
              <td>
                {{
                  createResponseResponseAttestationObjectAuthDataForView.aaguid
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.credentialId</th>
              <td style="word-wrap: break-word">
                {{
                  createResponseResponseAttestationObjectAuthDataForView.credentialId
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.credentialPublicKey</th>
              <td style="word-wrap: break-word">
                {{
                  createResponseResponseAttestationObjectAuthDataForView.credentialPublicKey
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.fmt</th>
              <td>{{ createResponseResponseAttestationObjectFmt }}</td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.attStmt</th>
              <td>
                {{ createResponseResponseAttestationObjectAttStmt }}
              </td>
            </tr>
            <tr>
              <th>.id</th>
              <td style="word-wrap: break-word">
                {{ createResponseId }}
              </td>
            </tr>
            <tr>
              <th>.type</th>
              <td style="word-wrap: break-word">
                {{ createResponseType }}
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
      reqRpId: window.location.hostname,
      reqRpIcon: "",
      reqUserId: this.generateRandomUserId(),
      reqUserName: "john.p.smith@example.com",
      reqUserIcon: "",
      reqUserDisplayName: "John P. Smith",
      reqPubKeyCredParams: [{ type: "public-key", alg: -7 }],
      reqAuthenticatorSectionAuthenticationAttachment: "cross-platform",
      reqAuthenticatorSectionRequireResidentKey: false,
      reqAuthenticatorSectionUserVerification: "required",
      reqAttestation: "direct",
      reqTimeout: 60000,
      reqChallenge: this.generateChallenge(),
      createResult: "",
      resRawId: "",
      resResponseAttestationObject: "",
      resResponseClientDataJSON: "",
      resId: "",
      resType: "",
      reqExcludeCredentials: [],
      createResponse: {},
      transports: ["usb", "ble", "nfc", "internal"]
    };
  },
  computed: {
    useridForView: function() {
      return btoa(String.fromCharCode(...this.reqUserId));
    },
    challengeForView: function() {
      return btoa(String.fromCharCode(...this.reqChallenge));
    },
    buildCreateRequest: function() {
      let request = {};
      request.publicKey = {};
      request.publicKey.rp = {};
      request.publicKey.rp.name = this.reqRpName;
      request.publicKey.rp.id = this.reqRpId;
      request.publicKey.rp.icon = this.reqRpIcon;
      request.publicKey.user = {};
      request.publicKey.user.id = this.reqUserId;
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
      request.publicKey.challenge = this.reqChallenge;

      request.publicKey.excludeCredentials = [];
      for (let i = 0; i < this.reqExcludeCredentials.length; i++) {
        let exist = false;
        let excludeCredential = this.reqExcludeCredentials[i];
        let credentials = {};
        if (excludeCredential.id) {
          credentials.id = Uint8Array.from(atob(excludeCredential.id), c =>
            c.charCodeAt(0)
          );
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
    createResponseRawId: function() {
      return new Int8Array(this.createResponse.rawId);
    },
    createResponseResponseAttestationObjectFmt: function() {
      if (this.createResponse.response == undefined) {
        return "";
      }
      var cbor = require("cbor");
      return cbor.decodeAllSync(
        new Buffer(this.createResponse.response.attestationObject)
      )[0].fmt;
    },
    createResponseResponseAttestationObjectAttStmt: function() {
      if (this.createResponse.response == undefined) {
        return "";
      }
      var cbor = require("cbor");
      return cbor.decodeAllSync(
        new Buffer(this.createResponse.response.attestationObject)
      )[0].attStmt;
    },
    createResponseResponseAttestationObjectAuthDataForView: function() {
      if (this.createResponse.response == undefined) {
        return "";
      }
      console.log(this.createResponse.response);
      var cbor = require("cbor");
      var authDataArray = cbor.decodeAllSync(
        new Buffer(this.createResponse.response.attestationObject)
      )[0].authData;

      // parse authDataArray https://www.w3.org/TR/webauthn/#authenticator-data
      const rpidHash = authDataArray.slice(0, 32);
      const flag = authDataArray.slice(32, 33); //.readUInt8(0)
      const signCountArray = authDataArray.slice(33, 37);
      const clength = signCountArray.length;
      const cbuffer = Buffer.from(signCountArray);
      const signCount = cbuffer.readUIntBE(0, clength);

      const length = flag.length;
      const buffer = Buffer.from(flag);
      const result = buffer.readUIntBE(0, length);
      const up = 1 == result.toString(2)[0];
      const uv = 1 == result.toString(2)[2];
      const at = 1 == result.toString(2)[6];
      const ed = 1 == result.toString(2)[7];

      let aaguid;
      let credentialId;
      let credentialPublicKey;
      if (at) {
        aaguid = Buffer.from(authDataArray.slice(37, 53)).toString("hex");
        const credentialIdLengthTmp = authDataArray.slice(53, 55);
        const credentialIdLength =
          (credentialIdLengthTmp[0] << 8) + credentialIdLengthTmp[1];
        credentialId = btoa(
          String.fromCharCode(
            ...authDataArray.slice(55, 55 + credentialIdLength)
          )
        );
        credentialPublicKey = btoa(
          String.fromCharCode(...authDataArray.slice(55 + credentialIdLength))
        );
      }

      // TODO Extension data
      return {
        rpidHash: Buffer.from(rpidHash).toString("hex"),
        flag: {
          up: up,
          uv: uv,
          at: at,
          ed: ed
        },
        signCount: signCount,
        aaguid: aaguid,
        credentialId: credentialId,
        credentialPublicKey: credentialPublicKey
      };
    },
    createResponseResponseAttestationObjectExtension: function() {
      return require("cbor").decodeAllSync(
        new Buffer(this.createResponse.response.extensions)
      )[0];
    },
    createResponseResponseClientDataJSON: function() {
      if (this.createResponse.response == undefined) {
        return "";
      }
      var enc = new TextDecoder("utf-8");
      return enc.decode(this.createResponse.response.clientDataJSON);
    },
    createResponseId: function() {
      return this.createResponse.id;
    },
    createResponseType: function() {
      return this.createResponse.type;
    }
  },
  methods: {
    create() {
      // reset
      this.errorType = "";
      this.errorMessage = "";
      this.createResponse = {};

      // call webauthn api
      console.log(this.buildCreateRequest);
      navigator.credentials
        .create(this.buildCreateRequest)
        .then(res => {
          console.log(res);
          this.createResponse = res;
        })
        .catch(err => {
          console.log(err);
          this.errorType = err.name;
          this.errorMessage = err.message;
        });
    },
    generateRandomUserId() {
      this.reqUserId = require("crypto").randomBytes(32);
      return this.reqUserId;
    },
    generateChallenge() {
      this.reqChallenge = require("crypto").randomBytes(32);
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
