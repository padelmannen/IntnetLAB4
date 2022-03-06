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
    <div class="row">
      <div class="col"></div>
      <Confirm
        v-if="showConfirmWindow"
      />
      <!-- behöver nog använda props för att skicka in rätt tid -->
    </div>
    <div class="col"></div>
  </div>
</template>


<script>
import Confirm from "./ConfirmBooking.vue";

export default {
  name: "BookingView",
  components: {
    Confirm,
  },

  data: () => ({
    username: "",
    rooms: [],
    showConfirmWindow: false,
    curTimePressed: "",
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
      console.log("time pressed")
      this.showConfirmWindow = true
      this.curTimePressed = time;

      //this.$router.push(`/confirm`);


      //alert("TID VALD: "+ time);
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
          push(authenticated === true ? "/rooms" : "/booking");
        })
        .catch(console.error);
    },
  },
};
</script>
