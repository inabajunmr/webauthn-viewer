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
          <label class="label is-small">attestationFormats</label>
          <div class="control" style="font-size: 0.75rem;">
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
              <input
                type="checkbox"
                v-model="conditionalMeditation"
              />
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
      conditionalMeditation: false
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
      request.publicKey.pubKeyCredParams = [...this.reqPubKeyCredParams];
      request.publicKey.authenticatorSelection = {};
      if (this.reqauthenticatorSelectionAuthenticationAttachment) {
        request.publicKey.authenticatorSelection.authenticatorAttachment = this.reqauthenticatorSelectionAuthenticationAttachment;
      }
      if (this.reqauthenticatorSelectionRequireResidentKey) {
        request.publicKey.authenticatorSelection.requireResidentKey = this.reqauthenticatorSelectionRequireResidentKey;
      }
      if (this.reqauthenticatorSelectionResidentKey) {
        request.publicKey.authenticatorSelection.residentKey = this.reqauthenticatorSelectionResidentKey;
      }
      if (this.reqauthenticatorSelectionUserVerification) {
        request.publicKey.authenticatorSelection.userVerification = this.reqauthenticatorSelectionUserVerification;
      }
      if (this.reqauthenticatorSelectionUserVerification) {
        request.publicKey.authenticatorSelection.userVerification = this.reqauthenticatorSelectionUserVerification;
      }
      request.publicKey.attestation = this.reqAttestation;
      if(this.reqAttestationFormats.length > 0) {
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
      if(this.reqHints.length > 0) {
        request.publicKey.hints = [...this.reqHints];
      }
      if(this.reqExtensions.length != 0) {
        request.publicKey.extensions = JSON.parse(this.reqExtensions);
      }
      return request;
    },
    createResponseView: function() {
      // refference https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770
      let result = {};
      result.getClientExtensionResults = this.createResponse.getClientExtensionResults;
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
          let extensionsDataLength = vanillacbor.decodeOnlyFirst(buffer)
            .byteLength;
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
    }
  },
  mounted() {
    this.checkMeditationResult();
  },
  methods: {
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
        this.errorMessage = "navigator.credentials is not available. Please use HTTPS or a supported browser.";
        console.error("WebAuthn Error: navigator.credentials is not available");
        return;
      }

      // call webauthn api
      console.log("Create Request", this.buildCreateRequest);
      navigator.credentials
        .create(this.buildCreateRequest)
        .then(res => {
          console.log("Create Response", res);
          this.createResponse = res;
          this.createResponse.getClientExtensionResults = res.getClientExtensionResults();
          if (this.createResponse.response && this.createResponse.response.getTransports) {
            this.createResponse.response.getTransports = res.response.getTransports();
          } else {
            this.createResponse.response.getTransports = "getTransports() is undefined";
          }
        })
        .catch(err => {
          console.log("Create Error", err);
          this.errorType = err.name;
          this.errorMessage = err.message;
        });
    },
    redirectToLogin() {
      // Prepare current settings as query parameters
      const params = {
        rpName: this.reqRpName,
        rpId: this.reqRpid,
        rpIcon: this.reqRpIcon,
        userId: this.reqUserId,
        userName: this.reqUserName,
        userIcon: this.reqUserIcon,
        userDisplayName: this.reqUserDisplayName,
        pubKeyCredParams: JSON.stringify(this.reqPubKeyCredParams),
        authenticatorSelectionAuthenticationAttachment: this.reqauthenticatorSelectionAuthenticationAttachment,
        authenticatorSelectionRequireResidentKey: this.reqauthenticatorSelectionRequireResidentKey,
        authenticatorSelectionResidentKey: this.reqauthenticatorSelectionResidentKey,
        authenticatorSelectionUserVerification: this.reqauthenticatorSelectionUserVerification,
        attestation: this.reqAttestation,
        attestationFormats: JSON.stringify(this.reqAttestationFormats),
        timeout: this.reqTimeout,
        challenge: this.reqChallenge,
        excludeCredentials: JSON.stringify(this.reqExcludeCredentials),
        hints: JSON.stringify(this.reqHints),
        extensions: this.reqExtensions
      };
      
      // Navigate to login screen using Vue Router
      this.$router.push({
        name: 'Login',
        query: params
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
    },
    
    checkMeditationResult() {
      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      
      // Execute conditional meditation API if login completed
      if (urlParams.get('loginCompleted') === 'true') {
        this.handleLoginCompleted(urlParams);
        return;
      }
    },
    
    handleLoginCompleted(urlParams) {
      // Restore configuration parameters
      if (urlParams.get('rpName')) this.reqRpName = urlParams.get('rpName');
      if (urlParams.get('rpId')) this.reqRpid = urlParams.get('rpId');
      if (urlParams.get('rpIcon')) this.reqRpIcon = urlParams.get('rpIcon');
      if (urlParams.get('userId')) this.reqUserId = urlParams.get('userId');
      if (urlParams.get('userName')) this.reqUserName = urlParams.get('userName');
      if (urlParams.get('userIcon')) this.reqUserIcon = urlParams.get('userIcon');
      if (urlParams.get('userDisplayName')) this.reqUserDisplayName = urlParams.get('userDisplayName');
      if (urlParams.get('pubKeyCredParams')) {
        try {
          this.reqPubKeyCredParams = JSON.parse(urlParams.get('pubKeyCredParams'));
        } catch (e) {
          console.warn('Failed to parse pubKeyCredParams:', e);
        }
      }
      if (urlParams.get('authenticatorSelectionAuthenticationAttachment')) {
        this.reqauthenticatorSelectionAuthenticationAttachment = urlParams.get('authenticatorSelectionAuthenticationAttachment');
      }
      if (urlParams.get('authenticatorSelectionRequireResidentKey')) {
        this.reqauthenticatorSelectionRequireResidentKey = urlParams.get('authenticatorSelectionRequireResidentKey');
      }
      if (urlParams.get('authenticatorSelectionResidentKey')) {
        this.reqauthenticatorSelectionResidentKey = urlParams.get('authenticatorSelectionResidentKey');
      }
      if (urlParams.get('authenticatorSelectionUserVerification')) {
        this.reqauthenticatorSelectionUserVerification = urlParams.get('authenticatorSelectionUserVerification');
      }
      if (urlParams.get('attestation')) this.reqAttestation = urlParams.get('attestation');
      if (urlParams.get('attestationFormats')) {
        try {
          this.reqAttestationFormats = JSON.parse(urlParams.get('attestationFormats'));
        } catch (e) {
          console.warn('Failed to parse attestationFormats:', e);
        }
      }
      if (urlParams.get('timeout')) this.reqTimeout = parseInt(urlParams.get('timeout'));
      if (urlParams.get('challenge')) this.reqChallenge = urlParams.get('challenge');
      if (urlParams.get('excludeCredentials')) {
        try {
          this.reqExcludeCredentials = JSON.parse(urlParams.get('excludeCredentials'));
        } catch (e) {
          console.warn('Failed to parse excludeCredentials:', e);
        }
      }
      if (urlParams.get('hints')) {
        try {
          this.reqHints = JSON.parse(urlParams.get('hints'));
        } catch (e) {
          console.warn('Failed to parse hints:', e);
        }
      }
      if (urlParams.get('extensions')) this.reqExtensions = urlParams.get('extensions');
      
      // Set conditional:meditation flag
      this.conditionalMeditation = true;
      
      // Clear parameters from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Login completion message
      this.$buefy.toast.open({
        message: `Login completed: ${urlParams.get('email')} - Starting conditional:meditation passkey creation`,
        type: 'is-success',
        duration: 3000
      });
      
      // Execute conditional meditation API after short delay
      setTimeout(() => {
        this.executeConditionalMeditation();
      }, 1000);
    },
    
    async executeConditionalMeditation() {
      try {
        // Reset previous results
        this.errorType = "";
        this.errorMessage = "";
        this.createResponse = {};
        
        console.log('🔄 Starting conditional:meditation passkey creation');
        
        if (!navigator.credentials) {
          throw new Error('navigator.credentials is not available. Please use HTTPS or a supported browser.');
        }
        
        // Process challenge and userId
        let challenge;
        try {
          if (this.reqChallenge && this.reqChallenge.trim()) {
            const hexString = this.reqChallenge.replace(/\s+/g, '');
            if (hexString.match(/^[0-9a-fA-F]+$/)) {
              challenge = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            } else {
              throw new Error('Invalid hex format');
            }
          } else {
            challenge = require("crypto").randomBytes(32);
          }
        } catch (e) {
          console.warn('Challenge parsing failed, generating new challenge:', e.message);
          challenge = require("crypto").randomBytes(32);
        }
        
        let userId;
        try {
          if (this.reqUserId && this.reqUserId.trim()) {
            const hexString = this.reqUserId.replace(/\s+/g, '');
            if (hexString.match(/^[0-9a-fA-F]+$/)) {
              userId = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            } else {
              throw new Error('Invalid hex format');
            }
          } else {
            userId = Buffer.from(this.reqUserId || 'default-user-id', 'hex');
          }
        } catch (e) {
          console.warn('UserId parsing failed, using default value:', e.message);
          userId = Buffer.from(this.reqUserId || 'default-user-id', 'hex');
        }
        
        // Build request using same logic as buildCreateRequest
        const createOptions = {
          publicKey: {
            rp: {
              name: this.reqRpName,
              id: this.reqRpid
            },
            user: {
              id: userId,
              name: this.reqUserName,
              displayName: this.reqUserDisplayName
            },
            challenge: challenge,
            pubKeyCredParams: [...this.reqPubKeyCredParams],
            authenticatorSelection: {},
            attestation: this.reqAttestation,
            timeout: this.reqTimeout,
            excludeCredentials: []
          },
          // Use conditional meditation
          mediation: "conditional"
        };
        
        if (this.reqRpIcon) {
          createOptions.publicKey.rp.icon = this.reqRpIcon;
        }
        if (this.reqUserIcon) {
          createOptions.publicKey.user.icon = this.reqUserIcon;
        }
        
        // authenticatorSelection
        if (this.reqauthenticatorSelectionAuthenticationAttachment) {
          createOptions.publicKey.authenticatorSelection.authenticatorAttachment = this.reqauthenticatorSelectionAuthenticationAttachment;
        }
        if (this.reqauthenticatorSelectionRequireResidentKey) {
          createOptions.publicKey.authenticatorSelection.requireResidentKey = this.reqauthenticatorSelectionRequireResidentKey;
        }
        if (this.reqauthenticatorSelectionResidentKey) {
          createOptions.publicKey.authenticatorSelection.residentKey = this.reqauthenticatorSelectionResidentKey;
        }
        if (this.reqauthenticatorSelectionUserVerification) {
          createOptions.publicKey.authenticatorSelection.userVerification = this.reqauthenticatorSelectionUserVerification;
        }
        
        // attestationFormats
        if (this.reqAttestationFormats.length > 0) {
          createOptions.publicKey.attestationFormats = [...this.reqAttestationFormats];
        }
        
        // excludeCredentials
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
            createOptions.publicKey.excludeCredentials.push(credentials);
          }
        }
        
        // hints
        if (this.reqHints.length > 0) {
          createOptions.publicKey.hints = [...this.reqHints];
        }
        
        // extensions
        if (this.reqExtensions.length != 0) {
          createOptions.publicKey.extensions = JSON.parse(this.reqExtensions);
        }
        
        console.log("conditional:meditation Create Request", createOptions);
        
        // Create passkey with conditional meditation
        const credential = await navigator.credentials.create(createOptions);
        
        console.log("conditional:meditation Create Response", credential);
        
        // Set result in same format as normal createResponse
        this.createResponse = credential;
        this.createResponse.getClientExtensionResults = credential.getClientExtensionResults();
        if (this.createResponse.response && this.createResponse.response.getTransports) {
          this.createResponse.response.getTransports = credential.response.getTransports();
        } else {
          this.createResponse.response.getTransports = "getTransports() is undefined";
        }
        
        this.$buefy.toast.open({
          message: 'conditional:meditation passkey creation succeeded!',
          type: 'is-success',
          duration: 4000
        });
        
      } catch (error) {
        console.log("conditional:meditation Create Error", error);
        this.errorType = error.name;
        this.errorMessage = error.message;
        
        this.$buefy.toast.open({
          message: `conditional:meditation passkey creation failed: ${error.message}`,
          type: 'is-danger',
          duration: 4000
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
