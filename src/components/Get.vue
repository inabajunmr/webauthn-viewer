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
              placeholder="rp.id"
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
                  placeholder="public-key"
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
          <label class="label is-small">.id(hex)</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="id"
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
              placeholder="60000"
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
              placeholder="preferred"
              v-model="reqUserVerification"
            />
          </div>
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
                {{ getResponseView.clientDataJSON }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.authData</th>
              <td></td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.rpidHash</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.rpIdHash }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.up</th>
              <td>
                {{ getResponseView.up }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.uv</th>
              <td>
                {{ getResponseView.uv }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.at</th>
              <td>
                {{ getResponseView.at }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.ed</th>
              <td>
                {{ getResponseView.ed }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.signCount</th>
              <td>
                {{ getResponseView.signCount }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.userHandle</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.userHandle }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 20px">.signature</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.signature }}
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
      reqUserVerification: false,
      createResult: "",
      resResponseClientDataJSON: "",
      getResponse: {},
      transports: ["usb", "ble", "nfc", "internal"]
    };
  },
  computed: {
    challengeForView: function() {
      return this.reqChallenge.toString("hex");
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
          credentials.id = Buffer.from(allowCredenial.id, "hex");
          exist = true;
        }
        if (allowCredenial.type) {
          credentials.type = allowCredenial.type;
          exist = true;
        }
        if (allowCredenial.transports) {
          credentials.transports = allowCredenial.transports;
          exist = true;
        }
        if (exist) {
          request.publicKey.allowCredentials.push(credentials);
        }
      }
      if (this.reqUserVerification) {
        request.publicKey.userVerification = this.reqUserVerification;
      }
      request.publicKey.timeout = this.reqTimeout;
      request.publicKey.challenge = Buffer.from(this.reqChallenge, "hex");
      return request;
    },
    getResponseView: function() {
      // refference https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770
      let result = {};
      result.id = this.getResponse.id;
      result.type = this.getResponse.type;
      if (this.getResponse.response) {
        /** clientDataJSON */
        let enc = new TextDecoder("utf-8");
        result.clientDataJSON = enc.decode(
          this.getResponse.response.clientDataJSON
        );

        /** attestationObject */
        // const cbor      = require('cbor');
        const vanillacbor = require("vanillacbor");

        let buffer = Buffer.from(
          this.getResponse.response.authenticatorData,
          "base64"
        );
        let rpIdHash = buffer.slice(0, 32);
        buffer = buffer.slice(32);
        result.authData = {};
        result.rpIdHash = rpIdHash.toString("hex");

        /* Flags */
        let flagsBuffer = buffer.slice(0, 1);
        buffer = buffer.slice(1);
        let flagsInt = flagsBuffer[0];
        result.up = !!(flagsInt & 0x01);
        result.uv = !!(flagsInt & 0x04);
        result.at = !!(flagsInt & 0x40);
        result.ed = !!(flagsInt & 0x80);

        result.signCount =
          (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3];
        buffer = buffer.slice(4);

        if (result.ed) {
          let extensionsDataLength = vanillacbor.decodeOnlyFirst(buffer)
            .byteLength;

          let coseExtensionsDataBuffer = buffer.slice(0, extensionsDataLength);
          buffer = buffer.slice(extensionsDataLength);
          result.coseExtensionsDataBuffer = coseExtensionsDataBuffer.toString(
            "hex"
          );
        }

        result.userHandle = Array.prototype.map
          .call(new Uint8Array(this.getResponse.response.userHandle), x =>
            ("00" + x.toString(16)).slice(-2)
          )
          .join("");
        result.signature = Array.prototype.map
          .call(new Uint8Array(this.getResponse.response.signature), x =>
            ("00" + x.toString(16)).slice(-2)
          )
          .join("");

        if (buffer.byteLength)
          throw new Error(
            "Failed to decode authData! Leftover bytes been detected!"
          );
      }

      return result;
    }
  },
  methods: {
    get() {
      // reset
      this.errorType = "";
      this.errorMessage = "";
      this.getResponse = {};

      // call webauthn api
      console.log("Get Request", this.buildGetRequest);
      navigator.credentials
        .get(this.buildGetRequest)
        .then(res => {
          console.log("Get Response", res);
          this.getResponse = res;
        })
        .catch(err => {
          console.log("Get Error", err);
          this.errorType = err.name;
          this.errorMessage = err.message;
        });
    },
    generateChallenge() {
      this.reqChallenge = require("crypto")
        .randomBytes(32)
        .toString("hex");
      return this.reqChallenge;
    },
    addAllowCredentials() {
      this.reqAllowCredentials.push({ type: "public-key", transports: [] });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
