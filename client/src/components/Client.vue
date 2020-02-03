<template>
  <div>
    <div class="container is-size-7">
      <div class="columns">
        <div class="column is-one-third">
          <h3 class="title">Request</h3>
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
          <div class="field">
            <label class="label is-small">user.id</label>
            <div class="control">
              <input
                class="input is-small"
                type="text"
                placeholder="Text input"
                v-model="reqUserId"
              />
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
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label is-small">pubKeyCredParams.type</label>
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    placeholder="Text input"
                    v-model="reqPubKeyCredParamsType"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label is-small">pubKeyCredParams.alg</label>
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    placeholder="Text input"
                    v-model="reqPubKeyCredParamsAlg"
                  />
                </div>
              </div>
            </div>
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
            <label class="label is-small">challenge</label>
            <div class="control">
              <input
                class="input is-small"
                type="text"
                placeholder="Text input"
                v-model="reqChallenge"
              />
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
          <table class="table is-responsive" style="table-layout: fixed; width: 100%">
            <tbody>
              <!-- TODO tab for each object -->
              <tr>
                <th>.response</th>
                <td></td>
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
                <th style="padding-left: 20px">.clientDataJSON</th>
                <td style="word-wrap: break-word">{{ createResponseResponseClientDataJSON }}</td>
              </tr>
              <tr>
                <th style="padding-left: 40px">.fmt</th>
                <td>{{ createResponseResponseAttestationObjectFmt }}</td>
              </tr>
              <tr>
                <th style="padding-left: 40px">.attStmt</th>
                <td>{{ createResponseResponseAttestationObjectAttStmt }}</td>
              </tr>              
              <tr>
                <th>.id</th>
                <td style="word-wrap: break-word">{{ createResponseId }}</td>
              </tr>
              <tr>
                <th>.type</th>
                <td style="word-wrap: break-word">{{ createResponseType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reqRpName: "Acme",
      reqUserId: new Uint8Array(16),
      reqUserName: "john.p.smith@example.com",
      reqUserDisplayName: "John P. Smith",
      reqPubKeyCredParamsType: "public-key",
      reqPubKeyCredParamsAlg: -7,
      reqAttestation: "direct",
      reqTimeout: 60000,
      reqChallenge: new Uint8Array([
        // サーバーから暗号学的にランダムな値が送られていなければならない
        0x8c,
        0x0a,
        0x26,
        0xff,
        0x22,
        0x91,
        0xc1,
        0xe9,
        0xb9,
        0x4e,
        0x2e,
        0x17,
        0x1a,
        0x98,
        0x6a,
        0x73,
        0x71,
        0x9d,
        0x43,
        0x48,
        0xd5,
        0xa7,
        0x6a,
        0x15,
        0x7e,
        0x38,
        0x94,
        0x52,
        0x77,
        0x97,
        0x0f,
        0xef
      ]).buffer,
      createResult: "",
      resRawId: "",
      resResponseAttestationObject: "",
      resResponseClientDataJSON: "",
      resId: "",
      resType: "",
      createResponse: {}
    };
  },
  computed: {
    buildCreateRequest: function() {
      return {
        publicKey: {
          rp: {
            name: this.reqRpName
          },
          user: {
            id: this.reqUserId,
            name: this.reqUserName,
            displayName: this.reqUserDisplayName
          },
          pubKeyCredParams: [
            {
              type: this.reqPubKeyCredParamsType,
              alg: this.reqPubKeyCredParamsAlg
            }
          ],
          attestation: this.reqAttestation,
          timeout: this.reqTimeout,
          // TODO
          challenge: new Uint8Array([
            // サーバーから暗号学的にランダムな値が送られていなければならない
            0x8c,
            0x0a,
            0x26,
            0xff,
            0x22,
            0x91,
            0xc1,
            0xe9,
            0xb9,
            0x4e,
            0x2e,
            0x17,
            0x1a,
            0x98,
            0x6a,
            0x73,
            0x71,
            0x9d,
            0x43,
            0x48,
            0xd5,
            0xa7,
            0x6a,
            0x15,
            0x7e,
            0x38,
            0x94,
            0x52,
            0x77,
            0x97,
            0x0f,
            0xef
          ]).buffer
        }
      };
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
      var cbor = require("cbor");
      var authDataArray = cbor.decodeAllSync(
        new Buffer(this.createResponse.response.attestationObject)
      )[0].authData;

      // parse authDataArray https://www.w3.org/TR/webauthn/#authenticator-data
      const rpidHash = authDataArray.slice(0, 32);
      const flag = authDataArray.slice(32, 33); //.readUInt8(0)
      const signCountArray = authDataArray.slice(33, 37); //.readUInt32BE(0) // TODO
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

      // TODO この後はatによっては存在しない
      const aaguid = authDataArray.slice(37, 53);
      const credentialIdLengthTmp = authDataArray.slice(53, 55);
      const credentialIdLength =
        (credentialIdLengthTmp[0] << 8) + credentialIdLengthTmp[1];
      // TODO base64かもしれん
      const credentialId = authDataArray.slice(55, 55 + credentialIdLength);
      const credentialPublicKey = authDataArray.slice(55 + credentialIdLength);

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
        aaguid: Buffer.from(aaguid).toString("hex"),
        credentialId: new Int8Array(credentialId),
        credentialPublicKey: new Int8Array(credentialPublicKey)
      };
    },
    createResponseResponseAttestationObjectExtension: function() {
      // TODO
      return require("cbor").decodeAllSync(
        new Buffer(this.createResponse.response.extensions)
      )[0];
    },
    createResponseResponseClientDataJSON: function() {
      if (this.createResponse.response == undefined) {
        return "";
      }
      // TODO decode
      return new Int8Array(this.createResponse.response.clientDataJSON);
    },
    createResponseId: function() {
      return this.createResponse.id;
    },
    createResponseType: function() {
      return this.createResponse.type;
    }
  },
  methods: {
    clear() {
      this.rpName = "";
    },
    create() {
      navigator.credentials
        .create(this.buildCreateRequest)
        .then(res => {
          console.log(res);
          this.createResponse = res;
        })
        .catch(err => {
          console.log(err);
          // TODO
          // this.createResponse = JSON.stringify(err)
          // this.createResponse = "ERROR"
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
