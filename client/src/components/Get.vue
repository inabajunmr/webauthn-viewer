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
        <label class="label is-small">allowCredenials[]</label>
        <div
          class="field box"
          v-for="allowCredential in reqAllowCredentials"
          v-bind:key="allowCredential.alg"
        >
          <div class="columns">
            <div class="column">
              <label class="label is-small">.type</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Text input"
                  v-model="allowCredential.type"
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
                    v-model="allowCredential.transports"
                  />
                  usb
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="ble"
                    v-model="allowCredential.transports"
                  />
                  ble
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="nfc"
                    v-model="allowCredential.transports"
                  />
                  nfc
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="internal"
                    v-model="allowCredential.transports"
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
              v-model="allowCredential.id"
            />
          </div>
        </div>

        <div class="field">
          <input
            type="button"
            value="Add allowCredentials"
            class="button is-primary is-small"
            @click="addAllowCredentials()"
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
          class="button is-primary is-large"
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
              <th>.id</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.id }}
              </td>
            </tr>
            <tr>
              <th>.response</th>
              <td></td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.clientDataJSON</th>
              <td style="word-wrap: break-word">
                {{ getResponseResponseClientDataJSON }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.authData</th>
              <td></td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.rpidHash</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.rpidHash }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.up</th>
              <td>
                {{
                  getResponseView.flag == undefined
                    ? ""
                    : getResponseView.flag.up
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.uv</th>
              <td>
                {{
                  getResponseView.flag == undefined
                    ? ""
                    : getResponseView.flag.uv
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.at</th>
              <td>
                {{
                  getResponseView.flag == undefined
                    ? ""
                    : getResponseView.flag.at
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.ed</th>
              <td>
                {{
                  getResponseView.flag == undefined
                    ? ""
                    : getResponseView.flag.ed
                }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.signCount</th>
              <td>
                {{ getResponseView.signCount }}
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
      reqAllowCredentials: [],
      reqTimeout: 60000,
      reqChallenge: this.generateChallenge(),
      reqUserVerification: "",
      createResult: "",
      resResponseClientDataJSON: "",
      getResponse: {},
      transports: ["usb", "ble", "nfc", "internal"]
    };
  },
  computed: {
    challengeForView: function() {
      return btoa(String.fromCharCode(...this.reqChallenge));
    },
    buildGetRequest: function() {
      let request = {};
      request.publicKey = {};
      if (this.reqRpid) {
        request.publicKey.rpid = this.reqRpid;
      }
      request.publicKey.allowCredentials = [];
      for (let i = 0; i < this.reqAllowCredentials.length; i++) {
        let exist = false;
        let allowCredenial = this.reqAllowCredentials[i];
        let credentials = {};
        if (allowCredenial.id) {
          credentials.id = Uint8Array.from(atob(allowCredenial.id), c =>
            c.charCodeAt(0)
          );
          exist = true;
        }
        if (allowCredenial.type) {
          credentials.type = allowCredenial.type;
          exist = true;
        }
        if (exist) {
          request.publicKey.allowCredenials.push(credentials);
        }
      }
      if (this.reqUserVerification) {
        request.publicKey.userVerification = this.reqUserVerification;
      }
      request.publicKey.timeout = this.reqTimeout;
      request.publicKey.challenge = this.reqChallenge;
      return request;
    },
    getResponseRawId: function() {
      return new Int8Array(this.getResponse.rawId);
    },
    getResponseView: function() {
      var responseView = {};
      responseView.flag = {};
      console.log("RESULT1", responseView);

      responseView.id = this.getResponse.id;
      if (this.getResponse.response != undefined) {
        let authDataArray = new Uint8Array(
          this.getResponse.response.authenticatorData
        );
        const rpidHash = authDataArray.slice(0, 32);
        responseView.rpidHash = Buffer.from(rpidHash).toString("hex");
        const flag = authDataArray.slice(32, 33); //.readUInt8(0)
        const signCountArray = authDataArray.slice(33, 37);
        const clength = signCountArray.length;
        const cbuffer = Buffer.from(signCountArray);
        const signCount = cbuffer.readUIntBE(0, clength);
        responseView.signCount = signCount;
        const length = flag.length;
        const buffer = Buffer.from(flag);
        const result = buffer.readUIntBE(0, length);
        const up = 1 == result.toString(2)[0];
        const uv = 1 == result.toString(2)[2];
        const at = 1 == result.toString(2)[6];
        const ed = 1 == result.toString(2)[7];
        responseView.flag.up = up;
        responseView.flag.uv = uv;
        responseView.flag.at = at;
        responseView.flag.ed = ed;
      }
      // https://webauthn.guide/
      // TODO signature
      // TODO userhandle
      return responseView;
    },
    getResponseResponseAttestationObjectExtension: function() {
      return require("cbor").decodeAllSync(
        new Buffer(this.getResponse.response.extensions)
      )[0];
    },
    getResponseResponseClientDataJSON: function() {
      if (this.getResponse.response == undefined) {
        return "";
      }
      var enc = new TextDecoder("utf-8");
      return enc.decode(this.getResponse.response.clientDataJSON);
    },
    getResponseId: function() {
      return this.getResponse.id;
    },
    getResponseType: function() {
      return this.getResponse.type;
    }
  },
  methods: {
    get() {
      // reset
      this.errorType = "";
      this.errorMessage = "";
      this.getResponse = {};

      // call webauthn api
      console.log(this.buildGetRequest);
      navigator.credentials
        .get(this.buildGetRequest)
        .then(res => {
          console.log(res);
          this.getResponse = res;
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
    addAllowCredentials() {
      this.reqAllowCredentials.push({ transports: [] });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
