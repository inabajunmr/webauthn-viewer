<template>
  <div>
    <b-tabs>
      <b-tab-item label="create">
        <Create @passkey-used="setLastPasskey" />
      </b-tab-item>

      <b-tab-item label="get">
        <Get @passkey-used="setLastPasskey" />
      </b-tab-item>

      <b-tab-item label="signal">
        <Signal :last-passkey="lastPasskey" />
      </b-tab-item>

      <b-tab-item label="capabilities">
        <ClientCapabilities />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Create from "./Create.vue";
import Get from "./Get.vue";
import Signal from "./Signal.vue";
import ClientCapabilities from "./ClientCapabilities.vue";

export default {
  name: "app",
  components: {
    Create,
    Get,
    Signal,
    ClientCapabilities,
  },
  data() {
    return {
      lastPasskey: null,
    };
  },
  methods: {
    setLastPasskey(passkey) {
      this.lastPasskey = Object.assign({}, passkey);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
