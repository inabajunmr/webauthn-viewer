<template>
  <div>
    <b-tabs>
      <b-tab-item label="create">
        <Create />
      </b-tab-item>

      <b-tab-item label="conditional create">
        <ConditionalCreate />
      </b-tab-item>

      <b-tab-item label="get">
        <Get />
      </b-tab-item>

      <b-tab-item label="signal">
        <Signal />
      </b-tab-item>

      <b-tab-item label="capabilities">
        <ClientCapabilities />
      </b-tab-item>
     
    </b-tabs>
  </div>
</template>

<script>
import Create from "./Create.vue";
import ConditionalCreate from "./ConditionalCreate.vue";
import Get from "./Get.vue";
import Signal from "./Signal.vue";
import ClientCapabilities from "./ClientCapabilities.vue";

export default {
  name: "app",
  components: {
    Create,
    ConditionalCreate,
    Get,
    Signal,
    ClientCapabilities
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
