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
        <router-link to="/" class="px-2">Home</router-link>
        <router-link to="/login" class="px-2">Login</router-link>
        <router-link to="/signup" class="px-2">Signup</router-link>
      </ul>

      <div class="row">
        <NavbarButtons />

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
  {{ store.searchTerm }}
  <router-view />
</template>

<script>
import NavbarButtons from "@/components/NavbarButtons.vue";
import store from "@/store";

export default {
  name: "App",
  data() {
    return { store };
  },
  components: {
    NavbarButtons,
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
