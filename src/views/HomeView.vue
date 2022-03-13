<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <instagram-card v-for="card in cards" :key="card.url" :card="card" />
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";

const cards = [
  {
    url: "https://picsum.photos/id/1/800",
    description: "laptop #1",
    time: "few minutes ago...",
  },
  {
    url: "https://picsum.photos/id/2/800",
    description: "laptop #2",
    time: "hour ago...",
  },
  {
    url: "https://picsum.photos/id/3/800",
    description: "laptop #3",
    time: "few hours ago...",
  },
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
