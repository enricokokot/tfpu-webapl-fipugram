<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="/">
      <img
        src="@/assets/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse justify-content-between"
      id="navbarNavAltMarkup"
    >
      <ul class="navbar-nav">
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/login" class="px-2">Login</router-link>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/signup" class="px-2">Signup</router-link>
        </li>
        <li v-if="store.currentUser" class="nav-item">
          <a href="#" @click="logout" class="px-2">Logout</a>
        </li>
      </ul>

      <div class="row">
        <NavbarButtons v-if="store.currentUser" />

        <form class="form-inline my-2 my-lg-0">
          <input
            v-model="store.searchTerm"
            class="form-control mr-sm-2 px-2"
            type="search"
            placeholder="Pretraga"
            aria-label="Search"
          />
        </form>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import NavbarButtons from "@/components/NavbarButtons.vue";
import store from "@/store";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "@/firebase";
import router from "@/router";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("***", user.email);
    store.currentUser = user.email;
  } else {
    // User is not signed in
    console.log("*** No user");
    store.currentUser = null;
    if (router.name !== "Login") {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "App",
  data() {
    return { store };
  },
  components: {
    NavbarButtons,
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log(this.$router);
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
