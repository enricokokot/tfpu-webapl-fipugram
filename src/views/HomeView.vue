<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4"><img alt="Vue logo" src="../assets/logo.png" /></h1>
      <p class="lead">
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
