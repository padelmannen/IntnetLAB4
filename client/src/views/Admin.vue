<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <label for="timetable" class="form-label h4">This is the admin page!</label>
        <button
          v-for="timeslot in timeslots"
          :key="timeslot.time"
          type="button"
          class="list-group-item list-group-item-action my-2 py-2"
          @click="bookTime(timeslot.time)"
        >
          {{ timeslot.time }}
        </button>
        <button
          type="button"
          class="btn btn-dark mt-4 float-end"
          @click="logout()"
        >
          Logout
        </button>
        
      </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  components: {},
  data: () => ({
    username: "",
    timeslots: [],
  }),
  created() {
    fetch("/api/timeslots")
      .then((res) => res.json())
      .then(({ timeslots }) => {
        this.timeslots = timeslots;
      })
      .catch(console.error);
  },
  methods: {
    bookTime(time) {
      //this.$router.push(`/rooms/${name}`);
      alert("TID VALD: "+ time);
    },
    logout() {
      //this.$router.push(`/rooms/${name}`);
      alert("Tried to logout!");
    },
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
          push(authenticated === true ? "/timeslots" : "/booking");
        })//denna är helt fel!
        .catch(console.error);
    },
  },
};
</script>
