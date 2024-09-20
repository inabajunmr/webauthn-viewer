<template>
  <div class="container is-size-7">
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title">signalCurrentUserDetails</h3>
        <h4 class="title">Request</h4>
        <div class="field">
          <label class="label is-small">rpid</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="rpId"
              v-model="signalCurrentUserDetailsRpId"
            />
          </div>
          <label class="label is-small">userId</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="userId"
              v-model="signalCurrentUserDetailsUserId"
            />
          </div>
          <label class="label is-small">name</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="name"
              v-model="signalCurrentUserDetailsName"
            />
          </div>
          <label class="label is-small">displayName</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="displayName"
              v-model="signalCurrentUserDetailsDisplayName"
            />
          </div>          
        </div>

        <input
          type="button"
          value="signalCurrentUserDetails()"
          class="button is-primary is-large"
          @click="signalCurrentUserDetails()"
        />

        <br>
        <br>

        <h3 class="title">signalAllAcceptedCredentials</h3>
        <h4 class="title">Request</h4>
        <div class="field">
          <label class="label is-small">rpid</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="rpId"
              v-model="signalAllAcceptedCredentialsRpId"
            />
          </div>
          <label class="label is-small">userId</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="userId"
              v-model="signalAllAcceptedCredentialsUserId"
            />
          </div>
          <label class="label is-small">allAcceptedCredentalIds</label>
          <div
            class="field box"
            v-for="credential in signalAllAcceptedCredentialsAllAcceptedCredentals"
            v-bind:key="credential.r"
          >
            <div class="control">
              <input
                class="input is-small"
                type="text"
                placeholder="id"
                v-model="credential.id"
              />
            </div>            
          </div>
          <div class="field">
            <input
              type="button"
              value="Add acceptedCredentals"
              class="button is-primary is-small"
              @click="addAcceptedCredentals()"
            />
          </div>          
        </div>

        <input
          type="button"
          value="signalAllAcceptedCredentials()"
          class="button is-primary is-large"
          @click="signalAllAcceptedCredentials()"
        />
        
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
      signalCurrentUserDetailsRpId: window.location.hostname,
      signalCurrentUserDetailsUserId: this.generateRandomUserId(),
      signalCurrentUserDetailsName: "john.p.smith@example.com",
      signalCurrentUserDetailsDisplayName: "John P. Smith",
      signalAllAcceptedCredentialsRpId: window.location.hostname,
      signalAllAcceptedCredentialsUserId: this.generateRandomUserId(),
      signalAllAcceptedCredentialsAllAcceptedCredentals: [{id:"", r:Math.random()}],
    };
  },
  computed: {
    challengeForView: function() {
      return this.reqChallenge.toString("hex");
    },
    getResponseView: function() {
      return null;
    }
  },
  methods: {
    generateRandomUserId() {
      this.reqUserId = require("crypto")
        .randomBytes(32)
        .toString("hex");
      return this.reqUserId;
    },
    signalCurrentUserDetails() {
      window.PublicKeyCredential.signalCurrentUserDetails({
        rpId: this.signalCurrentUserDetailsRpId,
        userId: Buffer.from(this.signalCurrentUserDetailsUserId, "hex").toString('base64').replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, ''),
        name: this.signalCurrentUserDetailsName,
        displayName: this.signalCurrentUserDetailsDisplayName
      });
    },
    signalAllAcceptedCredentials() {
      window.PublicKeyCredential.signalAllAcceptedCredentials({
        rpId: this.signalAllAcceptedCredentialsRpId,
        userId: Buffer.from(this.signalAllAcceptedCredentialsUserId, "hex").toString('base64').replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, ''),
        allAcceptedCredentialIds:this.signalAllAcceptedCredentialsAllAcceptedCredentals.map(obj => obj.id)
      });
    },
    addAcceptedCredentals() {
      this.signalAllAcceptedCredentialsAllAcceptedCredentals.push({id:"", r:Math.random()});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
