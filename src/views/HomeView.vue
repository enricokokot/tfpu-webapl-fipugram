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
      <instagram-card v-for="card in filterCards" :key="card.id" :card="card" />
    </div>
    <div class="col-3">Sidebar</div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  getDocs,
} from "firebase/firestore";

export default {
  name: "HomeView",
  data: function () {
    return {
      cards: [],
      store,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.cards = [];

      const q = query(
        collection(db, "posts"),
        orderBy("posted_at", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();

        this.cards.push({
          id: doc.id,
          time: data.posted_at,
          description: data.desc,
          url: data.url,
        });
      });
    },
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
        this.getPosts();
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
