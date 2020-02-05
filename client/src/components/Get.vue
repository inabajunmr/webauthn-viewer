<template>
  <div class="container is-size-7">
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title">Request</h3>
        <div class="field">
          <label class="label is-small">rpid</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="Text input"
              v-model="reqRpid"
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
        <div class="field">
          <label class="label is-small">userVerification</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="Text input"
              v-model="reqUserVerification"
            />
          </div>
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
          value="navigator.credentials.get()"
          class="button is-primary"
          @click="get()"
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
      reqRpid: window.location.hostname,
      reqPubKeyCredParams: [{ type: "public-key", alg: -7 }],
      reqTimeout: 60000,
      reqChallenge: this.generateChallenge(),
      createResult: "",
      resResponseClientDataJSON: "",
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
      // TODO
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
    get() {
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
