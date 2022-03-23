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
        type="password"
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
  name: "AdminLoginView",
  components: {},
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    authenticate() {
      const { commit } = this.$store;
      const { push } = this.$router;

      fetch("/api/checkLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((resp) => {
          if (resp.ok) {
            commit("setAuthenticated", true);
            commit("setAdminUser", this.username);
            push({
              path: `/admin${this.username}`,
            });
          } else {
            this.$store.commit("setAuthenticated", false);
            this.username = "";
            this.password = "";
          }
        })
        .catch((error) => {
          // Ändrar inte datan här - måste jag sätta upp mutationen i store kankse?
          this.loginFail = true;

          console.info("Could not log in.", error);
        });
    },
  },
};
</script>
