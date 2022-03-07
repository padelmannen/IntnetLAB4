<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <label for="timetable" class="form-label h4">Available times:</label>
        <button
          v-for="timeslot in timeslots"
          :key="timeslot.time"
          type="button"
          class="list-group-item list-group-item-action my-2 py-2"
          @click="bookTime(timeslot.time)"
        >
          {{ timeslot.time }}
        </button>
      </div>
    <div class="col"></div>
    <div class="row">
      <div class="col"></div>
      <Confirm
        v-if="showConfirmWindow"
        :time="curTimePressed"
        @close="() => closeConfirmWindow()"
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
    timeslots: [],
    showConfirmWindow: false,
    curTimePressed: "",
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
      console.log("time pressed")
      this.curTimePressed = time;
      this.showConfirmWindow = true
      timeslots[time].

      //this.$router.push(`/confirm`);

      //alert("TID VALD: "+ time);
    },

    closeConfirmWindow(){
      this.showConfirmWindow = false;
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
