<template>
  <div class="card text-center mb-3">
    <div class="card-header">{{ card.description }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="card.url" />
    </div>
    <PostButtons class="text-left mt-2 ml-2" />
    <div class="card-footer text-muted">{{ postedFromNow }}</div>
  </div>
</template>

<script>
import PostButtons from "@/components/PostButtons.vue";
import moment from "moment";

export default {
  props: ["card"],
  name: "InstagramCard",
  computed: {
    postedFromNow() {
      return moment(this.card.time).fromNow();
    },
  },
  components: {
    PostButtons,
  },
};
</script>
