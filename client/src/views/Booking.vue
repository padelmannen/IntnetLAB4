<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <label for="timetable" class="form-label h4">Time Slots:</label>
        <button
          v-for="timeslot in timeslots"
          v-bind:class="timeslot.status"
          :key="timeslot.time"
          type="button"
          class="list-group-item list-group-item-action my-2 py-2"
          @click="bookTime(timeslot.id)"
        >
          {{ timeslot.time }}
        </button>
        <div class="row"></div>
      </div>
    <div class="col"></div>
    <div class="row">
      <div class="col"></div>
      <Confirm
        v-if="showConfirmWindow"
        :timeslotID="timeslotID"
        @close="() => closeConfirmWindow()"
      />
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
    timeslots: [],
    showConfirmWindow: false,
    timeslotID: "",
  }),
  created() {
    fetch("/api/timeslots")
      .then((res) => res.json())
      .then(({ timeslots }) => {
        console.log(timeslots)
        this.timeslots = timeslots;
      })
      .catch(console.error);

    const { socket } = this.$root;

    socket.on("reserve", () => {
      this.updateTimeslots();
    });
    socket.on("unreserve", () => {
      this.updateTimeslots();
    });
    socket.on("book", () => {
      this.updateTimeslots();
    });
  },
  methods: {
    bookTime(timeslotID) {
      console.log("time pressed")
      this.timeslotID = timeslotID
      fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({timeslotID: timeslotID}),
      })
      this.showConfirmWindow = true
      //updateTimeslots();
    },
    closeConfirmWindow(){
      fetch("/api/unreserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({timeslotID: this.timeslotID}),
      })
      this.showConfirmWindow = false;
      console.log("unreserved", this.timeslotID)
      //this.updateTimeslots();
    },
    updateTimeslots(){
      console.log("update")
      fetch("/api/timeslots")
        .then((res) => res.json())
        .then(({ timeslots }) => {
          console.log(timeslots)
          this.timeslots = timeslots;
        })
        .catch(console.error);
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
<style>
button {
  border-radius: 12px;
}
button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.available{
  background-color: rgba(14, 167, 14, 0.350);
}
.reserved{
  background-color: rgba(255, 255, 0, 0.350);
}
.booked{
  background-color: rgba(255, 0, 0, 0.350);
}
</style>
