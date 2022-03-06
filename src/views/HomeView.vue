<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <div class="card text-center">
        <div class="card-header">Featured</div>
        <div class="card-body p-0">
          <img class="card-img-top" src="https://picsum.photos/800" />
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>
    <div class="col-3">... ovdje ide desni stupac!</div>
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
