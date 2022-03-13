<template>
  <div class="card text-center mb-3">
    <div class="card-header">Featured</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="photo" />
    </div>
    <PostButtons />
    <div class="card-footer text-muted">2 days ago</div>
  </div>
</template>

<script>
import PostButtons from "@/components/PostButtons.vue";

export default {
  props: ["photo"],
  name: "InstagramCard",
  components: {
    PostButtons,
  },
};
</script>
