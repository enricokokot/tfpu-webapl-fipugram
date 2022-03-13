<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <instagram-card v-for="card in cards" :key="card" :photo="card" />
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";

const cards = [
  "https://picsum.photos/id/1/800",
  "https://picsum.photos/id/2/800",
  "https://picsum.photos/id/3/800",
];

export default {
  name: "HomeView",
  data: function () {
    return {
      cards,
    };
  },
  components: {
    InstagramCard,
  },
};
</script>
