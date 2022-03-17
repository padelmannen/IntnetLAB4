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
    timeSlotID: ""
  }),
  created() {
    fetch("/api/timeslots")
      .then((res) => res.json())
      .then(({ timeslots }) => {
        console.log(timeslots)
        this.timeslots = timeslots;
      })
      .catch(console.error);

    //color buttons depending on status
    for(const timeslot in this.timeslots){
      const curTimeSlot = this.timeslots[timeslot]
      //kolla om curTimeSlot är bokad
      //om bokad, lägga till CSS element background-color
    }
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
      //this.$router.push(`/confirm`);
      alert("TID VALD: "+ timeslotID);
    },
    closeConfirmWindow(){
      fetch("/api/unreserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({timeslotID: this.timeslotID}),
      })
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
<style>
button {
  border-radius: 12px;


  /* display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit; */
}
button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>
