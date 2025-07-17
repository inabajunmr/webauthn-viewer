<template>
  <div class="container is-size-7">
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title">Conditional Create with Password Form</h3>
        
        <!-- Password Login Form -->
        <!-- Browser Support Information -->
        <div class="box">
          <h4 class="subtitle is-size-6">Browser Support Information</h4>
          <table class="table is-size-7">
            <tbody>
              <tr>
                <th>Browser</th>
                <td>{{ browserInfo }}</td>
              </tr>
              <tr>
                <th>WebAuthn Support</th>
                <td>{{ webAuthnSupport }}</td>
              </tr>
              <tr>
                <th>Conditional Mediation Available</th>
                <td :class="conditionalMediationClass">{{ conditionalMediationSupport }}</td>
              </tr>
              <tr>
                <th>HTTPS</th>
                <td :class="httpsClass">{{ httpsStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="box">
          <h4 class="subtitle is-size-6">Password Login (Conditional Create)</h4>
          <form @submit.prevent="submitPasswordAndConditionalCreate">
            <div class="field">
              <label class="label is-small">Username</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  v-model="username"
                  autocomplete="username webauthn"
                />
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Password</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  v-model="password"
                  autocomplete="current-password webauthn"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button type="submit" class="button is-info is-large">
                  Submit Password (Triggers Conditional Create)
                </button>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button type="button" class="button is-warning" @click="testConditionalCreateDirectly">
                  Test Conditional Create (Direct)
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- WebAuthn Settings -->
        <div class="box">
          <h4 class="subtitle is-size-6">WebAuthn Settings</h4>
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
            <div class="column">
              <div class="field">
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
          <div class="field">
            <label class="label is-small">challenge(hex)</label>
            <div class="columns">
              <div class="column">
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    placeholder="challenge"
                    v-model="reqChallenge"
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
        </div>

        <!-- Manual Create Button -->
        <input
          type="button"
          value="Manual Create (Non-Conditional)"
          class="button is-secondary is-large"
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
              <th>Status</th>
              <td style="word-wrap: break-word" :class="statusClass">
                {{ status }}
              </td>
            </tr>
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
      // Password form data
      username: "",
      password: "",
      status: "Ready",
      
      // WebAuthn data
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
      abortController: new AbortController(),
    };
  },
  computed: {
    statusClass() {
      if (this.status === "Waiting for conditional create...") {
        return "has-text-info";
      } else if (this.status === "Success") {
        return "has-text-success";
      } else if (this.status === "Error") {
        return "has-text-danger";
      }
      return "";
    },
    buildCreateRequest() {
      let request = {};
      request.publicKey = {};
      request.publicKey.rp = {};
      request.publicKey.rp.name = this.reqRpName;
      request.publicKey.rp.id = this.reqRpid;
      request.publicKey.rp.icon = this.reqRpIcon;
      request.publicKey.user = {};
      request.publicKey.user.id = Buffer.from(this.reqUserId, "hex");
      request.publicKey.user.name = this.reqUserName || this.username;
      request.publicKey.user.displayName = this.reqUserDisplayName || this.username;
      request.publicKey.user.icon = this.reqUserIcon;
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
    createResponseView() {
      // refference https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770
      let result = {};
      result.getClientExtensionResults = this.createResponse.getClientExtensionResults;
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
  methods: {
    async submitPasswordAndConditionalCreate() {
      // Simulate password authentication success
      console.log("Password authentication for:", this.username, this.password);
      
      // Check if conditional create is supported
      if (window.PublicKeyCredential && window.PublicKeyCredential.isConditionalMediationAvailable) {
        const isConditionalSupported = await window.PublicKeyCredential.isConditionalMediationAvailable();
        console.log("Conditional mediation available:", isConditionalSupported);
        
        if (!isConditionalSupported) {
          this.errorType = "Not Supported";
          this.errorMessage = "Conditional mediation is not available in this browser/environment";
          return;
        }
      }
      
      // Important: Allow a small delay for password managers to detect the form submission
      setTimeout(() => {
        // Update user info from form
        if (this.username) {
          this.reqUserName = this.username;
          this.reqUserDisplayName = this.username;
        }
        
        // Generate new challenge for conditional create
        this.generateChallenge();
        
        // Call conditional create after "successful" password auth
        this.conditionalCreate();
      }, 100); // Small delay to allow password manager to trigger
    },
    
    conditionalCreate() {
      // reset
      this.status = "Waiting for conditional create...";
      this.errorType = "";
      this.errorMessage = "";
      this.createResponse = {};

      // Create request matching demo site structure exactly
      let plainRequest = {
        mediation: 'conditional',
        publicKey: {
          rp: {
            name: "Passkeys demo",
            id: window.location.hostname
          },
          user: {
            id: new Uint8Array([49]), // Simple 1-byte ID like demo
            name: this.username || "test@example.com",
            displayName: this.username || "test@example.com"
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 }
          ],
          attestation: "indirect", // Changed from "direct"
          timeout: 30000, // Shorter timeout like demo
          challenge: new Uint8Array(Buffer.from(this.reqChallenge, "hex")),
          extensions: {
            conditionalCreate: true // Key extension from demo
          }
        }
      };
      
      // No authenticatorSelection - removed completely like demo
      // No excludeCredentials - removed completely like demo
      
      console.log("Conditional Create Request (Demo Style)", plainRequest);
      console.log("pubKeyCredParams is array:", Array.isArray(plainRequest.publicKey.pubKeyCredParams));
      console.log("Has conditionalCreate extension:", plainRequest.publicKey.extensions.conditionalCreate);
      
      navigator.credentials
        .create(plainRequest)
        .then(res => {
          console.log("Conditional Create Response", res);
          this.createResponse = res;
          this.createResponse.getClientExtensionResults = res.getClientExtensionResults();
          if (this.createResponse.response && this.createResponse.response.getTransports) {
            this.createResponse.response.getTransports = res.response.getTransports();
          } else {
            this.createResponse.response.getTransports = "getTransports() is undefined";
          }
          this.status = "Success";
        })
        .catch(err => {
          console.log("Conditional Create Error", err);
          
          // Handle Chrome Mac specific errors gracefully
          if (err.name === 'NotAllowedError') {
            if (err.message.includes("doesn't meet the condition") || 
                err.message.includes("not allowed by the user agent")) {
              console.log("Conditional create not available - this is expected on Mac Chrome");
              this.errorType = "Chrome Mac Limitation";
              this.errorMessage = "Conditional create is not fully supported on Mac Chrome yet. This is a known issue.";
            } else {
              this.errorType = err.name;
              this.errorMessage = err.message;
            }
          } else if (err.name === 'InvalidStateError') {
            this.errorType = "Passkey Already Exists";
            this.errorMessage = "A passkey already exists for this user";
          } else if (err.name === 'AbortError') {
            this.errorType = "Request Aborted";
            this.errorMessage = "WebAuthn request was aborted";
          } else {
            this.errorType = err.name;
            this.errorMessage = err.message;
          }
          this.status = "Error";
        });
    },
    
    create() {
      // Regular (non-conditional) create
      this.status = "Creating...";
      this.errorType = "";
      this.errorMessage = "";
      this.createResponse = {};

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
          this.status = "Success";
        })
        .catch(err => {
          console.log("Create Error", err);
          this.errorType = err.name;
          this.errorMessage = err.message;
          this.status = "Error";
        });
    },
    
    testConditionalCreateDirectly() {
      // Test conditional create without password requirement
      console.log("Testing conditional create directly");
      
      // Check browser capabilities first
      if (window.PublicKeyCredential) {
        if (window.PublicKeyCredential.isConditionalMediationAvailable) {
          window.PublicKeyCredential.isConditionalMediationAvailable().then(available => {
            console.log("Conditional mediation available:", available);
            if (!available) {
              this.errorType = "Not Supported";
              this.errorMessage = "Conditional mediation is not available";
              return;
            }
            
            // Try conditional create directly
            this.directConditionalCreate();
          });
        } else {
          console.log("isConditionalMediationAvailable not supported");
          this.directConditionalCreate();
        }
      } else {
        this.errorType = "Not Supported";
        this.errorMessage = "WebAuthn is not supported in this browser";
      }
    },
    
    directConditionalCreate() {
      // Simple conditional create test
      let simpleRequest = {
        mediation: 'conditional',
        publicKey: {
          rp: {
            name: "Test App",
            id: "localhost"
          },
          user: {
            id: new Uint8Array(16),
            name: "testuser",
            displayName: "Test User"
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 }
          ],
          challenge: new Uint8Array(32),
          timeout: 60000,
          authenticatorSelection: {
            userVerification: "preferred"
          },
          attestation: "none"
        }
      };
      
      console.log("Direct conditional create request:", simpleRequest);
      
      navigator.credentials.create(simpleRequest)
        .then(credential => {
          console.log("Direct conditional create success:", credential);
          this.errorType = "";
          this.errorMessage = "";
          this.createResponse = credential;
          this.status = "Success";
        })
        .catch(error => {
          console.log("Direct conditional create error:", error);
          this.errorType = error.name;
          this.errorMessage = `Direct test: ${error.message}`;
          this.status = "Error";
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
  }
};
</script>

<style scoped>
.box {
  margin-bottom: 1rem;
}
</style>