<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <!-- nova forma za post -->
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <!-- listanje kartica -->
      <instagram-card
        v-for="card in filterCards"
        :key="card.url"
        :card="card"
      />
    </div>
    <div class="col-3">Sidebar</div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

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
      store,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  methods: {
    async postNewImage() {
      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      try {
        const docRef = await addDoc(collection(db, "posts"), {
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        });
        console.log("Spremljeno", docRef);
        this.newImageDescription = "";
        this.newImageUrl = "";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
  computed: {
    filterCards() {
      return this.cards.filter((card) =>
        card.description.includes(this.store.searchTerm)
      );
    },
  },
  components: {
    InstagramCard,
  },
};
</script>
