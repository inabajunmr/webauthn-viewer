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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
