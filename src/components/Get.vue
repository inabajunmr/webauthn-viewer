<template>
  <div class="container is-size-7">
    <div class="columns">
      <div class="column is-one-third">
        <div class="level is-mobile is-align-items-center">
          <div class="level-left">
            <div class="level-item">
              <h3 class="title">Request</h3>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button
                type="button"
                class="button is-small is-light"
                @click="saveRequestToClipboard"
              >
                Save Request to Clipboard
              </button>
            </div>
          </div>
        </div>
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
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="hybrid"
                    v-model="allowCredential.transports"
                  />
                  hybrid
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="smart-card"
                    v-model="allowCredential.transports"
                  />
                  smart-card
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
        <div class="field">
          <label class="label is-small">hints</label>
          <div class="control" style="font-size: 0.75rem;">
            <label class="checkbox">
              <input
                type="checkbox"
                value="security-key"
                v-model="reqHints"
              />
              security-key
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="client-device"
                v-model="reqHints"
              />
              client-device
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="hybrid"
                v-model="reqHints"
              />
              hybrid
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">extensions</label>
          <div class="columns">
            <div class="column">
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder='{"appid":"https://example.com"}'
                  v-model="reqExtensions"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Autofill</label>
          <div class="columns">
            <div class="column">
              <div class="control">
                <input
                  class="input is-small" autocomplete="username webauthn"
                  type="text"
                />
              </div>
            </div>
            <div class="column">
            <b-field>
                <b-switch v-model="isConditionalUIEnabled" @click="conditionalUI()">
                    Conditional UI
                </b-switch>
            </b-field>
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
              <th>.rawId</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.rawId }}
              </td>
            </tr>
            <tr>
              <th>.type</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.type }}
              </td>
            </tr>
            <tr>
              <th>.authenticatorAttachment</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.authenticatorAttachment }}
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
              <th style="padding-left: 40px">.flag.be</th>
              <td>
                {{ getResponseView.be }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 40px">.flag.bs</th>
              <td>
                {{ getResponseView.bs }}
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
            <tr>
              <th>getClientExtensionResults</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.getClientExtensionResults }}
              </td>
            </tr>
            <tr>
              <th>toJSON</th>
              <td style="word-wrap: break-word">
                {{ getResponseView.toJSON }}
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
  requestQueryKeys: [
    "rpid",
    "allowCredentials",
    "timeout",
    "challenge",
    "userVerification",
    "hints",
    "extensions",
    "conditionalUi",
  ],
  data() {
    return {
      errorType: "",
      errorMessage: "",
      isConditionalUIEnabled: false,
      reqRpid: window.location.hostname,
      reqAllowCredentials: [],
      reqTimeout: 60000,
      reqChallenge: this.generateChallenge(),
      reqUserVerification: "preferred",
      reqHints: [],
      reqExtensions: "",
      getResponse: {},
      abortController: new AbortController(),
    };
  },
  computed: {
    challengeForView: function() {
      return this.reqChallenge.toString("hex");
    },
    getResponseView: function() {
      // refference https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770
      let result = {};
      result.id = this.getResponse.id;
      result.rawId = this.toHex(this.getResponse.rawId);
      result.type = this.getResponse.type;
      result.authenticatorAttachment = this.getResponse.authenticatorAttachment;
      result.getClientExtensionResults = this.callOrRead(
        this.getResponse,
        "getClientExtensionResults"
      );
      result.toJSON = this.stringifyJson(
        this.callOrRead(this.getResponse, "toJSON")
      );
      if (this.getResponse.response) {
        /** clientDataJSON */
        let enc = new TextDecoder("utf-8");
        result.clientDataJSON = enc.decode(
          this.getResponse.response.clientDataJSON
        );

        /** attestationObject */
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
        result.be = !!(flagsInt & 0x08);
        result.bs = !!(flagsInt & 0x10);
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
  watch: {
    isConditionalUIEnabled: function(newVal, oldVal) {
      console.log(oldVal + "" + newVal);
      if(newVal) {
        // reset
        this.errorType = "";
        this.errorMessage = "";
        this.getResponse = {};

        // call webauthn api
        let req;
        try {
          req = this.buildGetRequest();
        } catch (err) {
          console.log("Get Request Error", err);
          this.errorType = err.name;
          this.errorMessage = err.message;
          return;
        }
        req.mediation = 'conditional';
        req.signal = this.abortController.signal;
        console.log("Get Request for ConditionalUI", req);
        navigator.credentials
          .get(req)
          .then(res => {
            console.log("Get Response", res);
            this.getResponse = res;
          })
          .catch(err => {
            console.log("Get Error", err);
            this.errorType = err.name;
            this.errorMessage = err.message;
          });
      } else {
        console.log("abort")
        this.abortController.abort();
        this.abortController = new AbortController();
      }
    },
    "$route.query": {
      handler(query) {
        this.restoreRequestFromQuery(query);
      },
      immediate: true,
    }
  },
  methods: {
    toHex(value) {
      if (!value) {
        return "";
      }
      return Buffer.from(value).toString("hex");
    },
    callOrRead(target, name, transform = (value) => value) {
      if (!target) {
        return "";
      }
      const member = target[name];
      if (typeof member === "function") {
        try {
          return transform(member.call(target));
        } catch (error) {
          return `${name}() failed: ${error.message}`;
        }
      }
      if (member !== undefined) {
        return transform(member);
      }
      return `${name}() is undefined`;
    },
    stringifyJson(value) {
      if (typeof value === "string") {
        return value;
      }
      if (value === undefined || value === null) {
        return "";
      }
      try {
        return JSON.stringify(value);
      } catch (error) {
        return String(value);
      }
    },
    collectRequestQueryParams() {
      const params = {};
      const pushValue = (key, value) => {
        if (value === null || value === undefined) {
          return;
        }
        if (typeof value === "boolean") {
          if (value) {
            params[key] = "true";
          }
          return;
        }
        if (Array.isArray(value)) {
          const filtered = value.filter(
            (item) =>
              item !== null &&
              item !== undefined &&
              !(
                typeof item === "string" &&
                item.trim &&
                item.trim().length === 0
              )
          );
          if (filtered.length > 0) {
            params[key] = filtered.map((item) => String(item));
          }
          return;
        }
        if (typeof value === "number") {
          if (!Number.isNaN(value)) {
            params[key] = value.toString();
          }
          return;
        }
        if (typeof value === "string") {
          if (value.trim().length > 0) {
            params[key] = value;
          }
          return;
        }
        params[key] = value;
      };

      pushValue("rpid", this.reqRpid);
      pushValue("userVerification", this.reqUserVerification);
      pushValue("timeout", this.reqTimeout);
      pushValue("challenge", this.reqChallenge);
      pushValue("hints", this.reqHints);
      pushValue("extensions", this.reqExtensions);
      pushValue("conditionalUi", this.isConditionalUIEnabled);

      if (this.reqAllowCredentials.length > 0) {
        const sanitized = this.reqAllowCredentials
          .map((entry) => {
            const copy = Object.assign({}, entry || {});
            copy.transports = Array.isArray(copy.transports)
              ? copy.transports
              : copy.transports
              ? [copy.transports]
              : [];
            return copy;
          })
          .filter((entry) => {
            const hasId =
              entry.id !== undefined && entry.id !== null && entry.id !== "";
            const hasType =
              entry.type !== undefined &&
              entry.type !== null &&
              entry.type !== "";
            return hasId || hasType || entry.transports.length > 0;
          });
        if (sanitized.length > 0) {
          params.allowCredentials = JSON.stringify(sanitized);
        }
      }

      return params;
    },
    async saveRequestToClipboard() {
      const params = this.collectRequestQueryParams();
      const managedKeys = this.$options.requestQueryKeys || [];

      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);

      managedKeys.forEach((key) => {
        searchParams.delete(key);
      });

      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            searchParams.append(key, item);
          });
        } else {
          searchParams.set(key, value);
        }
      });

      url.search = searchParams.toString();

      try {
        await this.writeToClipboard(url.toString());
        if (this.$buefy && this.$buefy.toast) {
          this.$buefy.toast.open({
            message: "URL copied to clipboard",
            type: "is-success",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Failed to copy URL", error);
        if (this.$buefy && this.$buefy.toast) {
          this.$buefy.toast.open({
            message: "Failed to copy URL",
            type: "is-danger",
            duration: 3000,
          });
        }
      }
    },
    async writeToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
      this.fallbackCopyText(text);
    },
    fallbackCopyText(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-1000px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);

      const selection = document.getSelection();
      const selectedRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      textarea.focus();
      textarea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }

      if (!successful) {
        throw new Error("execCommand copy failed");
      }
    },
    restoreRequestFromQuery(query) {
      if (!query || Object.keys(query).length === 0) {
        return;
      }

      const pickSingle = (value) =>
        Array.isArray(value) ? value[value.length - 1] : value;
      const normalizeString = (raw) => {
        if (raw === undefined || raw === null) {
          return "";
        }
        const str = String(raw);
        return str === "null" || str === "undefined" ? "" : str;
      };
      const toArray = (value) => {
        if (Array.isArray(value)) {
          return value.filter(
            (item) =>
              item !== null &&
              item !== undefined &&
              !(typeof item === "string" && item.trim().length === 0)
          );
        }
        if (typeof value === "string" && value.trim().length > 0) {
          return [value];
        }
        return [];
      };

      if (Object.prototype.hasOwnProperty.call(query, "rpid")) {
        this.reqRpid = normalizeString(pickSingle(query.rpid));
      }
      if (Object.prototype.hasOwnProperty.call(query, "userVerification")) {
        this.reqUserVerification = normalizeString(
          pickSingle(query.userVerification)
        );
      }
      if (Object.prototype.hasOwnProperty.call(query, "timeout")) {
        const raw = pickSingle(query.timeout);
        const parsed = parseInt(raw, 10);
        this.reqTimeout = Number.isNaN(parsed) ? normalizeString(raw) : parsed;
      }
      if (Object.prototype.hasOwnProperty.call(query, "challenge")) {
        this.reqChallenge = normalizeString(pickSingle(query.challenge));
      }
      if (Object.prototype.hasOwnProperty.call(query, "hints")) {
        this.reqHints = toArray(query.hints);
      }
      if (Object.prototype.hasOwnProperty.call(query, "extensions")) {
        this.reqExtensions = normalizeString(pickSingle(query.extensions));
      }
      if (Object.prototype.hasOwnProperty.call(query, "conditionalUi")) {
        const value = pickSingle(query.conditionalUi);
        this.isConditionalUIEnabled = value === "true" || value === true;
      }
      if (Object.prototype.hasOwnProperty.call(query, "allowCredentials")) {
        const raw = pickSingle(query.allowCredentials);
        const parsed = this.safeParseJson(raw, null);
        if (Array.isArray(parsed)) {
          this.reqAllowCredentials = parsed.map((entry) => {
            const result = Object.assign({}, entry);
            if (result.id === undefined || result.id === null) {
              result.id = "";
            }
            if (result.type === undefined || result.type === null) {
              result.type = "public-key";
            }
            if (Array.isArray(result.transports)) {
              result.transports = result.transports.slice();
            } else if (result.transports) {
              result.transports = [result.transports];
            } else {
              result.transports = [];
            }
            return result;
          });
        }
      }
    },
    safeParseJson(value, fallback = null) {
      if (typeof value !== "string") {
        return fallback;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        console.warn("Failed to parse JSON from query parameter:", error);
        return fallback;
      }
    },
    buildGetRequest() {
      let request = {};
      request.publicKey = {};
      if (this.reqRpid) {
        request.publicKey.rpId = this.reqRpid;
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
      if(this.reqHints.length > 0) {
        request.publicKey.hints = this.reqHints;
      }
      if (this.reqExtensions.length != 0) {
        request.publicKey.extensions = JSON.parse(this.reqExtensions);
      }
      request.publicKey.timeout = this.reqTimeout;
      request.publicKey.challenge = Buffer.from(this.reqChallenge, "hex");
      return request;
    },    
    get() {
      // reset
      this.errorType = "";
      this.errorMessage = "";
      this.getResponse = {};

      let request;
      try {
        request = this.buildGetRequest();
      } catch (err) {
        console.log("Get Request Error", err);
        this.errorType = err.name;
        this.errorMessage = err.message;
        return;
      }

      // call webauthn api
      console.log("Get Request", request);
      navigator.credentials
        .get(request)
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
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
