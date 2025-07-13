<template>
  <div class="container is-size-7">
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title">getClientCapabilities</h3>
        <h4 class="title">Request</h4>
        
        <input
          type="button"
          value="getClientCapabilities()"
          class="button is-primary is-large"
          @click="getClientCapabilities()"
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
            <tr v-for="(value, key) in clientCapabilities" :key="key">
              <th>{{ key }}</th>
              <td style="word-wrap: break-word">
                {{ value }}
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
      clientCapabilities: {}
    };
  },
  methods: {
    async getClientCapabilities() {
      this.errorType = "";
      this.errorMessage = "";
      this.clientCapabilities = {};

      if(!window.PublicKeyCredential || !window.PublicKeyCredential.getClientCapabilities) {
        this.errorMessage = "PublicKeyCredential.getClientCapabilities is undefined";
        return;
      }

      try {
        const capabilities = await window.PublicKeyCredential.getClientCapabilities();
        console.log("Client Capabilities", capabilities);
        this.clientCapabilities = capabilities;
      } catch(err) {
        console.log("getClientCapabilities Error", err);
        this.errorType = err.name;
        this.errorMessage = err.message;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>