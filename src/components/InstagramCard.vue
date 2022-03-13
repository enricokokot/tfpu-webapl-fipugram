<template>
  <div class="card text-center mb-3">
    <div class="card-header">{{ card.description }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="card.url" />
    </div>
    <PostButtons />
    <div class="card-footer text-muted">{{ card.time }}</div>
  </div>
</template>

<script>
import PostButtons from "@/components/PostButtons.vue";

export default {
  props: ["card"],
  name: "InstagramCard",
  components: {
    PostButtons,
  },
};
</script>
