<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <label for="timetable" class="form-label h4">Time Slots:</label>
      <div
        v-if="notAvailable"
        :class="errorMessage"
        class="alert alert-danger alert-dismissable"
      >
        Tiden kan inte bokas!
      </div>

      <button
        v-for="timeslot in timeslots"
        :key="timeslot.time"
        :class="timeslot.status"
        type="button"
        class="list-group-item list-group-item-action my-2 py-2"
        @click="bookTime(timeslot)"
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
        :timeslot-i-d="timeslotID"
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
    notAvailable: false,
  }),
  created() {
    fetch("/api/timeslots")
      .then((res) => res.json())
      .then(({ timeslots }) => {
        console.log(timeslots);
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
    socket.on("add", () => {
      console.log("addTimeslotSocket");
      this.updateTimeslots();
    });
    socket.on("remove", () => {
      console.log("removeTimeslotSocket");
      this.updateTimeslots();
    });
  },
  methods: {
    bookTime(timeslot) {
      const timeslotStatus = timeslot.status;
      console.log(timeslotStatus);

      if (timeslotStatus === "available") {
        this.notAvailable = false;
        this.timeslotID = timeslot.id;
        fetch("/api/reserve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timeslotID: this.timeslotID }),
        });
        this.showConfirmWindow = true;
      } else {
        this.notAvailable = true;
      }
    },
    closeConfirmWindow() {
      fetch("/api/unreserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeslotID: this.timeslotID }),
      });
      this.showConfirmWindow = false;
      console.log("unreserved", this.timeslotID);
      // this.updateTimeslots();
    },
    updateTimeslots() {
      console.log("update");
      fetch("/api/timeslots")
        .then((res) => res.json())
        .then(({ timeslots }) => {
          console.log(timeslots);
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
        }) // denna är helt fel!
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
  box-shadow: 0 12px 16px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);
}

.available {
  background-color: rgb(14 167 14 / 35%);
}

.reserved {
  background-color: rgb(255 255 0 / 35%);
}

.booked {
  background-color: rgb(255 0 0 / 35%);
}

/* div.errorMessage {
  border-radius: 24px;
} */
</style>
