<template>
  <!-- https://stackoverflow.com/questions/18969051/bootstrap-3-why-is-row-class-is-wider-than-its-container -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-7">
        <!-- nova forma za post -->
        <form v-if="!loading" @submit.prevent="postNewImage" class="mb-5">
          <UploadImages
            :max="1"
            maxError="Max files exceed"
            @changed="handleImages"
          />
          <div class="form-group">
            <label for="imageDescription">Description</label>
            <input
              v-model="newImageDescription"
              type="text"
              class="form-control"
              placeholder="Enter the image description"
              id="imageDescription"
            />
          </div>
          <button type="submit" class="btn btn-primary">Post image</button>
        </form>
        <img v-if="loading" src="@/assets/loading.gif" width="400" />
        <!-- listanje kartica -->
        <instagram-card
          v-for="card in filterCards"
          :key="card.id"
          :card="card"
        />
      </div>
      <div class="col-3">Sidebar</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db, storage } from "@/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "HomeView",
  data: function () {
    return {
      cards: [],
      store,
      newImageDescription: "",
      imageReference: null,
      loading: false,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    handleImages(files) {
      this.imageReference = files[0];
    },
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
        // console.log(doc.id, " => ", doc.data());
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
      try {
        this.loading = true;
        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";

        const storageRef = ref(storage, imageName);

        await uploadBytes(storageRef, this.imageReference);
        const url = await getDownloadURL(storageRef);
        console.log("javni link", url);
        const imageDescription = this.newImageDescription;

        const docRef = addDoc(collection(db, "posts"), {
          url: url,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        });
        console.log("Spremljeno", docRef);
        this.newImageDescription = "";
        this.imageReference = null;
        this.getPosts();
        this.loading = false;
      } catch (e) {
        console.log("Greška:", e);
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
