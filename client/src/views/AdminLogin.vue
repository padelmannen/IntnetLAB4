<template>
  <div class="row">
    <div class="col"></div>
    <form class="col" @submit.prevent="authenticate()">
      <label for="admin" class="form-label h4">Admin login:</label>
      <input
        id="username"
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Username"
        required
        autofocus
      />
      <input
        id="password"
        v-model="password"
        type="text"
        class="form-control"
        placeholder="Password"
        required
        autofocus
      />
      <button type="submit" class="btn btn-dark mt-4 float-end">Login</button>
    </form>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "adminLoginView",
  components: {},
  data: () => ({
    username: "",
  }),
  methods: {
    authenticate() {
      const { commit } = this.$store;
      const { push } = this.$router;

      fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.username }),
      })
        .then((res) => res.json())
        .then(({ authenticated }) => {
          commit("setAuthenticated", authenticated);
          push(authenticated === true ? "/admin" : "/booking");
        })
        .catch(console.error);
    },
  },
};
</script>
