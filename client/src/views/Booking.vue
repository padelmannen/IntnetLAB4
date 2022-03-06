<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <label for="timetable" class="form-label h4">Available times:</label>
        <button
          v-for="room in rooms"
          :key="room.time"
          type="button"
          class="list-group-item list-group-item-action my-2 py-2"
          @click="bookTime(room.time)"
        >
          {{ room.time }}
        </button>
      </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "BookingView",
  components: {},
  data: () => ({
    username: "",
    rooms: [],
  }),
  created() {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then(({ rooms }) => {
        this.rooms = rooms;
      })
      .catch(console.error);
  },
  methods: {
    bookTime(time) {
      //this.$router.push(`/rooms/${name}`);
      alert("TID VALD: "+ time);
    },
    authenticate() {
      const { commit } = this.$store;
      const { push } = this.$router;

      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.username }),
      })
        .then((res) => res.json())
        .then(({ authenticated }) => {
          commit("setAuthenticated", authenticated);
          push(authenticated === true ? "/rooms" : "/login");
        })
        .catch(console.error);
    },
  },
};
</script>
