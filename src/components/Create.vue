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
          <label class="label is-small">attestationFormats</label>
          <div class="control" style="font-size: 0.75rem">
            <label class="checkbox">
              <input
                type="checkbox"
                value="packed"
                v-model="reqAttestationFormats"
              />
              packed
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="tpm"
                v-model="reqAttestationFormats"
              />
              tpm
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="android-key"
                v-model="reqAttestationFormats"
              />
              android-key
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="android-safetynet"
                v-model="reqAttestationFormats"
              />
              android-safetynet
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="fido-u2f"
                v-model="reqAttestationFormats"
              />
              fido-u2f
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="apple-anonymous"
                v-model="reqAttestationFormats"
              />
              apple-anonymous
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                value="none"
                v-model="reqAttestationFormats"
              />
              none
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSelection.authenticationAttachment</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="platform or cross-platform"
              v-model="reqauthenticatorSelectionAuthenticationAttachment"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSelection.requireResidentKey</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="true"
              v-model="reqauthenticatorSelectionRequireResidentKey"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSelection.residentKey</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="required or preferred or discouraged"
              v-model="reqauthenticatorSelectionResidentKey"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small"
            >authenticatorSelection.userVerification</label
          >
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="preferred"
              v-model="reqauthenticatorSelectionUserVerification"
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
              <div class="control" style="font-size: 0.75rem">
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
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="hybrid"
                    v-model="excludeCredential.transports"
                  />
                  hybrid
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    value="smart-card"
                    v-model="excludeCredential.transports"
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
        <div class="field">
          <label class="label is-small">hints</label>
          <div class="control" style="font-size: 0.75rem">
            <label class="checkbox">
              <input type="checkbox" value="security-key" v-model="reqHints" />
              security-key
            </label>
            <label class="checkbox">
              <input type="checkbox" value="client-device" v-model="reqHints" />
              client-device
            </label>
            <label class="checkbox">
              <input type="checkbox" value="hybrid" v-model="reqHints" />
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
                  placeholder="extensions"
                  v-model="reqExtensions"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="conditionalMeditation" />
              conditional:meditation
            </label>
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
              <th style="padding-left: 60px">.flag.be</th>
              <td>
                {{ createResponseView.be }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.flag.bs</th>
              <td>
                {{ createResponseView.bs }}
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
              <th style="padding-left: 60px">.extension</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.extensions }}
              </td>
            </tr>
            <tr>
              <th style="padding-left: 60px">.extension(length)</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.extensionsDataLength }}
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
              <th>getTransports</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.getTransports }}
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
            <tr>
              <th>getClientExtensionResults</th>
              <td style="word-wrap: break-word">
                {{ createResponseView.getClientExtensionResults }}
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
    "rpName",
    "rpId",
    "rpIcon",
    "userId",
    "userName",
    "userDisplayName",
    "userIcon",
    "attestation",
    "attestationFormats",
    "timeout",
    "challenge",
    "pubKeyCredParams",
    "authenticatorSelectionAuthenticationAttachment",
    "authenticatorSelectionRequireResidentKey",
    "authenticatorSelectionResidentKey",
    "authenticatorSelectionUserVerification",
    "excludeCredentials",
    "hints",
    "extensions",
    "conditionalMeditation",
  ],
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
      reqauthenticatorSelectionAuthenticationAttachment: "",
      reqauthenticatorSelectionRequireResidentKey: null,
      reqauthenticatorSelectionResidentKey: "",
      reqauthenticatorSelectionUserVerification: "preferred",
      reqAttestation: "direct",
      reqAttestationFormats: [],
      reqTimeout: 60000,
      reqChallenge: this.generateChallenge(),
      reqExcludeCredentials: [],
      reqHints: [],
      reqExtensions: '{ "credProps": true }',
      createResponse: {},
      conditionalMeditation: false,
    };
  },
  computed: {
    buildCreateRequest: function () {
      let request = {};
      request.publicKey = {};
      request.publicKey.rp = {};
      request.publicKey.rp.name = this.reqRpName;
      request.publicKey.rp.id = this.reqRpid;
      request.publicKey.rp.icon = this.reqRpIcon;
      request.publicKey.user = {};
      request.publicKey.user.id = Uint8Array.from(this.reqUserId);
      request.publicKey.user.name = this.reqUserName;
      request.publicKey.user.icon = this.reqUserIcon;
      request.publicKey.user.displayName = this.reqUserDisplayName;
      request.publicKey.pubKeyCredParams = [...this.reqPubKeyCredParams];
      request.publicKey.authenticatorSelection = {};
      if (this.reqauthenticatorSelectionAuthenticationAttachment) {
        request.publicKey.authenticatorSelection.authenticatorAttachment =
          this.reqauthenticatorSelectionAuthenticationAttachment;
      }
      if (this.reqauthenticatorSelectionRequireResidentKey) {
        request.publicKey.authenticatorSelection.requireResidentKey =
          this.reqauthenticatorSelectionRequireResidentKey;
      }
      if (this.reqauthenticatorSelectionResidentKey) {
        request.publicKey.authenticatorSelection.residentKey =
          this.reqauthenticatorSelectionResidentKey;
      }
      if (this.reqauthenticatorSelectionUserVerification) {
        request.publicKey.authenticatorSelection.userVerification =
          this.reqauthenticatorSelectionUserVerification;
      }
      if (this.reqauthenticatorSelectionUserVerification) {
        request.publicKey.authenticatorSelection.userVerification =
          this.reqauthenticatorSelectionUserVerification;
      }
      request.publicKey.attestation = this.reqAttestation;
      if (this.reqAttestationFormats.length > 0) {
        request.publicKey.attestationFormats = [...this.reqAttestationFormats];
      }
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
      if (this.reqHints.length > 0) {
        request.publicKey.hints = [...this.reqHints];
      }
      if (this.reqExtensions.length != 0) {
        request.publicKey.extensions = JSON.parse(this.reqExtensions);
      }
      return request;
    },
    createResponseView: function () {
      // refference https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770
      let result = {};
      result.getClientExtensionResults =
        this.createResponse.getClientExtensionResults;
      //console.log(this.createResponse.getClientExtensionResults());
      result.id = this.createResponse.id;
      result.type = this.createResponse.type;
      if (this.createResponse.response) {
        result.getTransports = this.createResponse.response.getTransports;
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
        result.up = !!(flagsInt & 0x01);
        result.uv = !!(flagsInt & 0x04);
        result.be = !!(flagsInt & 0x08);
        result.bs = !!(flagsInt & 0x10);
        result.at = !!(flagsInt & 0x40);
        result.ed = !!(flagsInt & 0x80);

        let counterBuffer = buffer.slice(0, 4);
        buffer = buffer.slice(4);
        result.signCount = counterBuffer.readUInt32BE(0);

        /* Attested credential data */
        if (result.at) {
          let aaguid = buffer.slice(0, 16).toString("hex");
          buffer = buffer.slice(16);
          let aaguidBuffer = `${aaguid.slice(0, 8)}-${aaguid.slice(
            8,
            12
          )}-${aaguid.slice(12, 16)}-${aaguid.slice(16, 20)}-${aaguid.slice(
            20
          )}`;
          result.aaguid = aaguidBuffer;

          let credIdLenBuffer = buffer.slice(0, 2);
          buffer = buffer.slice(2);
          let credIdLen = credIdLenBuffer.readUInt16BE(0);
          let credIdBuffer = buffer.slice(0, credIdLen);
          buffer = buffer.slice(credIdLen);
          result.credentialId = credIdBuffer.toString("hex");

          let pubKeyLength = vanillacbor.decodeOnlyFirst(buffer).byteLength;
          let cosePublicKeyBuffer = buffer.slice(0, pubKeyLength);
          buffer = buffer.slice(pubKeyLength);
          result.credentialPublicKey = cosePublicKeyBuffer.toString("hex");
        }

        if (result.ed) {
          let extensionsDataLength =
            vanillacbor.decodeOnlyFirst(buffer).byteLength;
          result.extensionsDataLength = extensionsDataLength;
          let coseExtensionsDataBuffer = buffer.slice(0, extensionsDataLength);
          buffer = buffer.slice(extensionsDataLength);
          result.extensions = cbor.decodeAllSync(coseExtensionsDataBuffer)[0];
        }

        if (buffer.byteLength)
          throw new Error(
            "Failed to decode authData! Leftover bytes been detected!"
          );
      }

      return result;
    },
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.restoreRequestFromQuery(query);
      },
      immediate: true,
    },
  },
  mounted() {
    console.log("🏗️ Create component mounted");
    console.log("🏗️ Current route:", this.$route);
    this.checkMeditationResult();
  },
  methods: {
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

      pushValue("rpName", this.reqRpName);
      pushValue("rpId", this.reqRpid);
      pushValue("rpIcon", this.reqRpIcon);
      pushValue("userId", this.reqUserId);
      pushValue("userName", this.reqUserName);
      pushValue("userDisplayName", this.reqUserDisplayName);
      pushValue("userIcon", this.reqUserIcon);
      pushValue(
        "authenticatorSelectionAuthenticationAttachment",
        this.reqauthenticatorSelectionAuthenticationAttachment
      );
      pushValue(
        "authenticatorSelectionRequireResidentKey",
        this.reqauthenticatorSelectionRequireResidentKey
      );
      pushValue(
        "authenticatorSelectionResidentKey",
        this.reqauthenticatorSelectionResidentKey
      );
      pushValue(
        "authenticatorSelectionUserVerification",
        this.reqauthenticatorSelectionUserVerification
      );
      pushValue("attestation", this.reqAttestation);
      pushValue("attestationFormats", this.reqAttestationFormats);
      pushValue("timeout", this.reqTimeout);
      pushValue("challenge", this.reqChallenge);
      pushValue("hints", this.reqHints);
      pushValue("extensions", this.reqExtensions);
      pushValue("conditionalMeditation", this.conditionalMeditation);

      if (this.reqPubKeyCredParams.length > 0) {
        const sanitized = this.reqPubKeyCredParams
          .map((entry) => Object.assign({}, entry || {}))
          .filter((entry) => {
            const hasType =
              entry.type !== undefined &&
              entry.type !== null &&
              entry.type !== "";
            const hasAlg =
              entry.alg !== undefined && entry.alg !== null && entry.alg !== "";
            return hasType || hasAlg;
          });
        if (sanitized.length > 0) {
          params.pubKeyCredParams = JSON.stringify(sanitized);
        }
      }

      if (this.reqExcludeCredentials.length > 0) {
        const sanitizedExclude = this.reqExcludeCredentials
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
        if (sanitizedExclude.length > 0) {
          params.excludeCredentials = JSON.stringify(sanitizedExclude);
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

      if (Object.prototype.hasOwnProperty.call(query, "rpName")) {
        this.reqRpName = normalizeString(pickSingle(query.rpName));
      }
      if (Object.prototype.hasOwnProperty.call(query, "rpId")) {
        this.reqRpid = normalizeString(pickSingle(query.rpId));
      }
      if (Object.prototype.hasOwnProperty.call(query, "rpIcon")) {
        this.reqRpIcon = normalizeString(pickSingle(query.rpIcon));
      }
      if (Object.prototype.hasOwnProperty.call(query, "userId")) {
        this.reqUserId = normalizeString(pickSingle(query.userId));
      }
      if (Object.prototype.hasOwnProperty.call(query, "userName")) {
        this.reqUserName = normalizeString(pickSingle(query.userName));
      }
      if (Object.prototype.hasOwnProperty.call(query, "userDisplayName")) {
        this.reqUserDisplayName = normalizeString(
          pickSingle(query.userDisplayName)
        );
      }
      if (Object.prototype.hasOwnProperty.call(query, "userIcon")) {
        this.reqUserIcon = normalizeString(pickSingle(query.userIcon));
      }
      if (
        Object.prototype.hasOwnProperty.call(
          query,
          "authenticatorSelectionAuthenticationAttachment"
        )
      ) {
        this.reqauthenticatorSelectionAuthenticationAttachment =
          normalizeString(
            pickSingle(query.authenticatorSelectionAuthenticationAttachment)
          );
      }
      if (
        Object.prototype.hasOwnProperty.call(
          query,
          "authenticatorSelectionRequireResidentKey"
        )
      ) {
        this.reqauthenticatorSelectionRequireResidentKey = normalizeString(
          pickSingle(query.authenticatorSelectionRequireResidentKey)
        );
      }
      if (
        Object.prototype.hasOwnProperty.call(
          query,
          "authenticatorSelectionResidentKey"
        )
      ) {
        this.reqauthenticatorSelectionResidentKey = normalizeString(
          pickSingle(query.authenticatorSelectionResidentKey)
        );
      }
      if (
        Object.prototype.hasOwnProperty.call(
          query,
          "authenticatorSelectionUserVerification"
        )
      ) {
        this.reqauthenticatorSelectionUserVerification = normalizeString(
          pickSingle(query.authenticatorSelectionUserVerification)
        );
      }
      if (Object.prototype.hasOwnProperty.call(query, "attestation")) {
        this.reqAttestation = normalizeString(pickSingle(query.attestation));
      }
      if (Object.prototype.hasOwnProperty.call(query, "attestationFormats")) {
        this.reqAttestationFormats = toArray(query.attestationFormats);
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
      if (
        Object.prototype.hasOwnProperty.call(query, "conditionalMeditation")
      ) {
        const value = pickSingle(query.conditionalMeditation);
        this.conditionalMeditation = value === "true" || value === true;
      }
      if (Object.prototype.hasOwnProperty.call(query, "pubKeyCredParams")) {
        const value = pickSingle(query.pubKeyCredParams);
        const parsed = this.safeParseJson(value, null);
        if (Array.isArray(parsed)) {
          this.reqPubKeyCredParams = parsed.map((entry) => {
            const result = Object.assign({}, entry);
            if (
              result.type === undefined ||
              result.type === null ||
              result.type === ""
            ) {
              result.type = "public-key";
            }
            return result;
          });
        }
      }
      if (Object.prototype.hasOwnProperty.call(query, "excludeCredentials")) {
        const value = pickSingle(query.excludeCredentials);
        const parsed = this.safeParseJson(value, null);
        if (Array.isArray(parsed)) {
          this.reqExcludeCredentials = parsed.map((entry) => {
            const result = Object.assign({}, entry);
            if (result.id === undefined || result.id === null) {
              result.id = "";
            }
            if (result.type === undefined || result.type === null) {
              result.type = "";
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
    create() {
      // reset
      this.errorType = "";
      this.errorMessage = "";
      this.createResponse = {};

      // Navigate to virtual login screen for conditional:meditation flow
      if (this.conditionalMeditation) {
        this.redirectToLogin();
        return;
      }

      // WebAuthn support check
      if (!navigator.credentials) {
        this.errorType = "NotSupportedError";
        this.errorMessage =
          "navigator.credentials is not available. Please use HTTPS or a supported browser.";
        console.error("WebAuthn Error: navigator.credentials is not available");
        return;
      }

      // call webauthn api
      console.log("Create Request", this.buildCreateRequest);
      navigator.credentials
        .create(this.buildCreateRequest)
        .then((res) => {
          console.log("Create Response", res);
          this.createResponse = res;
          this.createResponse.getClientExtensionResults =
            res.getClientExtensionResults();
          if (
            this.createResponse.response &&
            this.createResponse.response.getTransports
          ) {
            this.createResponse.response.getTransports =
              res.response.getTransports();
          } else {
            this.createResponse.response.getTransports =
              "getTransports() is undefined";
          }
        })
        .catch((err) => {
          console.log("Create Error", err);
          this.errorType = err.name;
          this.errorMessage = err.message;
        });
    },
    redirectToLogin() {
      // Prepare current settings as query parameters, excluding null/empty values
      const rawParams = {
        rpName: this.reqRpName,
        rpId: this.reqRpid,
        rpIcon: this.reqRpIcon,
        userId: this.reqUserId,
        userName: this.reqUserName,
        userIcon: this.reqUserIcon,
        userDisplayName: this.reqUserDisplayName,
        pubKeyCredParams: JSON.stringify(this.reqPubKeyCredParams),
        authenticatorSelectionAuthenticationAttachment:
          this.reqauthenticatorSelectionAuthenticationAttachment,
        authenticatorSelectionRequireResidentKey:
          this.reqauthenticatorSelectionRequireResidentKey,
        authenticatorSelectionResidentKey:
          this.reqauthenticatorSelectionResidentKey,
        authenticatorSelectionUserVerification:
          this.reqauthenticatorSelectionUserVerification,
        attestation: this.reqAttestation,
        attestationFormats: JSON.stringify(this.reqAttestationFormats),
        timeout: this.reqTimeout,
        challenge: this.reqChallenge,
        excludeCredentials: JSON.stringify(this.reqExcludeCredentials),
        hints: JSON.stringify(this.reqHints),
        extensions: this.reqExtensions,
      };

      // Filter out null, undefined, empty string values
      const params = {};
      Object.keys(rawParams).forEach((key) => {
        const value = rawParams[key];
        if (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          value !== "null"
        ) {
          params[key] = value;
        }
      });

      console.log("🔧 Filtered params (nulls removed):", params);

      // Navigate to static login page
      const queryString = new URLSearchParams(params).toString();
      window.location.href = `/webauthn-viewer/login.html?${queryString}`;
    },
    generateRandomUserId() {
      this.reqUserId = require("crypto").randomBytes(32).toString("hex");
      return this.reqUserId;
    },
    generateChallenge() {
      this.reqChallenge = require("crypto").randomBytes(32).toString("hex");
      return this.reqChallenge;
    },
    addExcludeCredentials() {
      this.reqExcludeCredentials.push({ transports: [] });
    },
    addPubKeyCredParam() {
      this.reqPubKeyCredParams.push({ type: "public-key" });
    },

    checkMeditationResult() {
      console.log("🔍 checkMeditationResult called");

      // Check URL parameters from Vue Router query
      const queryParams = this.$route.query;
      console.log("🔍 Route query:", queryParams);
      console.log("🔍 loginCompleted value:", queryParams.loginCompleted);
      console.log("🔍 loginCompleted type:", typeof queryParams.loginCompleted);

      // Execute conditional meditation API if login completed
      if (queryParams.loginCompleted === "true") {
        console.log(
          "✅ Login completed detected, calling handleLoginCompleted"
        );
        this.handleLoginCompleted(queryParams);
        return;
      } else {
        console.log("❌ Login completed not detected");
      }
    },

    handleLoginCompleted(queryParams) {
      console.log("🎯 handleLoginCompleted called with:", queryParams);

      // Debug: Log specific problematic parameters
      console.log("🔍 Query parameter investigation:");
      console.log("  - Original reqChallenge before login:", this.reqChallenge);
      console.log("  - Query challenge:", queryParams.challenge);
      console.log("  - Query challenge type:", typeof queryParams.challenge);
      console.log("  - Original reqUserId before login:", this.reqUserId);
      console.log("  - Query userId:", queryParams.userId);
      console.log("  - Query userId type:", typeof queryParams.userId);
      console.log("  - Query userName:", queryParams.userName);
      console.log("  - Query userDisplayName:", queryParams.userDisplayName);

      // Restore configuration parameters
      if (queryParams.rpName) this.reqRpName = queryParams.rpName;
      if (queryParams.rpId) this.reqRpid = queryParams.rpId;
      if (queryParams.rpIcon) this.reqRpIcon = queryParams.rpIcon;
      if (queryParams.userId) this.reqUserId = queryParams.userId;
      if (queryParams.userName) this.reqUserName = queryParams.userName;
      if (queryParams.userIcon) this.reqUserIcon = queryParams.userIcon;
      if (queryParams.userDisplayName)
        this.reqUserDisplayName = queryParams.userDisplayName;
      if (queryParams.pubKeyCredParams) {
        try {
          this.reqPubKeyCredParams = JSON.parse(queryParams.pubKeyCredParams);
        } catch (e) {
          console.warn("Failed to parse pubKeyCredParams:", e);
        }
      }
      if (queryParams.authenticatorSelectionAuthenticationAttachment) {
        this.reqauthenticatorSelectionAuthenticationAttachment =
          queryParams.authenticatorSelectionAuthenticationAttachment;
      }
      // Only set requireResidentKey if it exists in query params and is not "null"
      if (
        queryParams.authenticatorSelectionRequireResidentKey &&
        queryParams.authenticatorSelectionRequireResidentKey !== "null"
      ) {
        this.reqauthenticatorSelectionRequireResidentKey =
          queryParams.authenticatorSelectionRequireResidentKey;
      }
      if (queryParams.authenticatorSelectionResidentKey) {
        this.reqauthenticatorSelectionResidentKey =
          queryParams.authenticatorSelectionResidentKey;
      }
      if (queryParams.authenticatorSelectionUserVerification) {
        this.reqauthenticatorSelectionUserVerification =
          queryParams.authenticatorSelectionUserVerification;
      }
      if (queryParams.attestation)
        this.reqAttestation = queryParams.attestation;
      if (queryParams.attestationFormats) {
        try {
          this.reqAttestationFormats = JSON.parse(
            queryParams.attestationFormats
          );
        } catch (e) {
          console.warn("Failed to parse attestationFormats:", e);
        }
      }
      if (queryParams.timeout) this.reqTimeout = parseInt(queryParams.timeout);
      if (queryParams.challenge) this.reqChallenge = queryParams.challenge;
      if (queryParams.excludeCredentials) {
        try {
          this.reqExcludeCredentials = JSON.parse(
            queryParams.excludeCredentials
          );
        } catch (e) {
          console.warn("Failed to parse excludeCredentials:", e);
        }
      }
      if (queryParams.hints) {
        try {
          this.reqHints = JSON.parse(queryParams.hints);
        } catch (e) {
          console.warn("Failed to parse hints:", e);
        }
      }
      if (queryParams.extensions) this.reqExtensions = queryParams.extensions;

      // Set conditional:meditation flag
      this.conditionalMeditation = true;

      // Clear parameters from URL
      this.$router.replace({ query: {} });

      // Login completion message
      this.$buefy.toast.open({
        message: `Login completed: ${queryParams.email} - Starting conditional:meditation passkey creation`,
        type: "is-success",
        duration: 3000,
      });

      // Wait for user interaction then start conditional mediation
      console.log("🚀 About to call initConditionalOnInteraction");
      this.initConditionalOnInteraction();
    },

    async executeConditionalMeditation() {
      try {
        console.log("🔄 executeConditionalMeditation called");
        this.logUserActivationState("executeConditionalMeditation start");
        this.logBrowserState();

        // Reset previous results
        this.errorType = "";
        this.errorMessage = "";
        this.createResponse = {};

        console.log("🔄 Starting conditional:meditation passkey creation");

        if (!navigator.credentials) {
          throw new Error(
            "navigator.credentials is not available. Please use HTTPS or a supported browser."
          );
        }

        // Use the same buildCreateRequest logic as normal create()
        console.log(
          "🔄 Using buildCreateRequest logic for conditional meditation"
        );
        console.log("🔄 Current req values:");
        console.log("  - reqChallenge:", this.reqChallenge);
        console.log("  - reqChallenge type:", typeof this.reqChallenge);
        console.log("  - reqUserId:", this.reqUserId);
        console.log("  - reqUserId type:", typeof this.reqUserId);
        console.log("  - reqUserName:", this.reqUserName);

        // Test Buffer conversion explicitly
        try {
          const challengeBuffer = Buffer.from(this.reqChallenge, "hex");
          console.log("🔍 Challenge Buffer conversion:");
          console.log("  - Input:", this.reqChallenge);
          console.log("  - Output:", challengeBuffer);
          console.log("  - Output type:", challengeBuffer.constructor.name);

          const userIdBuffer = Buffer.from(this.reqUserId, "hex");
          console.log("🔍 UserId Buffer conversion:");
          console.log("  - Input:", this.reqUserId);
          console.log("  - Output:", userIdBuffer);
          console.log("  - Output type:", userIdBuffer.constructor.name);
        } catch (e) {
          console.error("❌ Buffer conversion failed:", e);
        }

        // Build request using exactly the same logic as buildCreateRequest computed property
        const baseRequest = this.buildCreateRequest;
        console.log("🔄 Built request:", baseRequest);

        // Use buildCreateRequest as base, then add conditional mediation
        const createOptions = {
          ...baseRequest,
          // Add conditional mediation parameter
          mediation: "conditional",
        };

        // Keep all original values from buildCreateRequest
        console.log(
          "✅ Using all original values from buildCreateRequest for conditional mediation"
        );
        console.log("  - Challenge: original buildCreateRequest value");
        console.log("  - User ID: original buildCreateRequest value");
        console.log(
          "  - User name/displayName: original buildCreateRequest values"
        );

        console.log("🔧 Fixed createOptions:", createOptions);

        // Detailed logging of critical parameters
        console.log("🔍 Detailed parameter analysis:");
        console.log(
          "  - pubKeyCredParams:",
          createOptions.publicKey.pubKeyCredParams
        );
        console.log(
          "  - authenticatorSelection:",
          createOptions.publicKey.authenticatorSelection
        );
        console.log("  - attestation:", createOptions.publicKey.attestation);
        console.log(
          "  - user.id length:",
          createOptions.publicKey.user.id.length
        );
        console.log("  - user.name:", createOptions.publicKey.user.name);
        console.log(
          "  - challenge length:",
          createOptions.publicKey.challenge.length
        );

        console.log("conditional:meditation Create Request", createOptions);

        // Final user activation check before API call
        this.logUserActivationState(
          "immediately before navigator.credentials.create"
        );
        console.log(
          "🚀 Calling navigator.credentials.create with conditional mediation..."
        );

        // Create passkey with conditional meditation
        const credential = await navigator.credentials.create(createOptions);

        console.log("conditional:meditation Create Response", credential);

        // Set result in same format as normal createResponse
        this.createResponse = credential;
        this.createResponse.getClientExtensionResults =
          credential.getClientExtensionResults();
        if (
          this.createResponse.response &&
          this.createResponse.response.getTransports
        ) {
          this.createResponse.response.getTransports =
            credential.response.getTransports();
        } else {
          this.createResponse.response.getTransports =
            "getTransports() is undefined";
        }

        this.$buefy.toast.open({
          message: "conditional:meditation passkey creation succeeded!",
          type: "is-success",
          duration: 4000,
        });
      } catch (error) {
        console.log("conditional:meditation Create Error", error);
        this.errorType = error.name;
        this.errorMessage = error.message;

        this.$buefy.toast.open({
          message: `conditional:meditation passkey creation failed: ${error.message}`,
          type: "is-danger",
          duration: 4000,
        });
      }
    },

    // Wait for user interaction before conditional mediation
    initConditionalOnInteraction() {
      console.log("📱 initConditionalOnInteraction called");
      this.logUserActivationState("initConditionalOnInteraction");

      const startConditional = async (event) => {
        console.log("👆 ユーザーインタラクションを検出しました", event.type);
        this.logUserActivationState(`startConditional - ${event.type}`);

        document.removeEventListener("click", startConditional);
        document.removeEventListener("focus", startConditional);
        document.removeEventListener("keydown", startConditional);

        await this.setupConditionalPasskey();
      };

      document.addEventListener("click", startConditional, { once: true });
      document.addEventListener("focus", startConditional, { once: true });
      document.addEventListener("keydown", startConditional, { once: true });

      this.$buefy.toast.open({
        message: "ページをクリックするとパスキー作成を開始します",
        type: "is-info",
        duration: 4000,
      });
    },

    async setupConditionalPasskey() {
      console.log("🔧 setupConditionalPasskey called");
      this.logUserActivationState("setupConditionalPasskey start");

      // Wait for page focus if not focused
      if (!document.hasFocus()) {
        console.log("⏳ ページのフォーカスを待機中...");
        this.logUserActivationState("waiting for focus");

        await new Promise((resolve) => {
          const checkFocus = () => {
            if (document.hasFocus()) {
              resolve();
            } else {
              setTimeout(checkFocus, 100);
            }
          };
          checkFocus();
        });
      }

      console.log("✅ ページがフォーカスされました");
      this.logUserActivationState("page focused");

      // Wait a bit more then start conditional mediation
      setTimeout(() => {
        console.log(
          "⏰ About to call executeConditionalMeditation after timeout"
        );
        this.logUserActivationState("before executeConditionalMeditation");
        this.executeConditionalMeditation();
      }, 500);
    },

    // Debug methods
    logUserActivationState(context) {
      console.log(`🔍 User Activation State (${context}):`);

      // Check if user activation APIs are available
      if (navigator.userActivation) {
        console.log(
          `  - hasBeenActive: ${navigator.userActivation.hasBeenActive}`
        );
        console.log(`  - isActive: ${navigator.userActivation.isActive}`);
      } else {
        console.log(`  - navigator.userActivation: not supported`);
      }

      // Check document state
      console.log(`  - document.hasFocus(): ${document.hasFocus()}`);
      console.log(`  - document.hidden: ${document.hidden}`);
      console.log(`  - document.visibilityState: ${document.visibilityState}`);

      // Check timing
      console.log(`  - performance.now(): ${performance.now()}`);
      console.log(`  - context: ${context}`);
    },

    logBrowserState() {
      console.log(`🌐 Browser State:`);
      console.log(`  - User Agent: ${navigator.userAgent}`);
      console.log(`  - Location: ${window.location.href}`);
      console.log(`  - Origin: ${window.location.origin}`);
      console.log(`  - Hostname: ${window.location.hostname}`);
      console.log(`  - Protocol: ${window.location.protocol}`);
      console.log(`  - IsSecureContext: ${window.isSecureContext}`);

      // WebAuthn support
      console.log(`  - PublicKeyCredential: ${!!window.PublicKeyCredential}`);
      if (window.PublicKeyCredential) {
        console.log(
          `  - isUserVerifyingPlatformAuthenticatorAvailable: ${!!PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable}`
        );
        console.log(
          `  - isConditionalMediationAvailable: ${!!PublicKeyCredential.isConditionalMediationAvailable}`
        );
      }

      // Check if we're in an iframe
      console.log(
        `  - window.top === window.self: ${window.top === window.self}`
      );
      console.log(`  - window.parent === window: ${window.parent === window}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
