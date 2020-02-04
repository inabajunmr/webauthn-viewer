<template>
  <div>
    <b-tabs>
      <b-tab-item label="navigator.credentias.create()">
        <Create />
      </b-tab-item>

      <b-tab-item label="navigator.credentias.get()">
        <Get />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Create from "./Create.vue";
import Get from "./Get.vue";

export default {
  name: "app",
  components: {
    Create,
    Get
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
