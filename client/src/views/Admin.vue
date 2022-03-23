<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <label for="timetable" class="form-label h4"
        >Welcome {{ assistant }}!</label
      >
      <p>Dina tider:</p>
      <button
        v-for="timeslot in assistantTimeslots()"
        :key="timeslot.time"
        type="button"
        class="list-group-item list-group-item-action my-2 py-2"
        @click="configTimeslot(timeslot)"
      >
        {{ timeslot.time }}
      </button>
      <button
        type="button"
        class="btn btn-dark mt-4 float-end"
        @click="addTimeslot()"
      >
        Add Time Slot
      </button>
      <button
        type="button"
        class="btn btn-dark mt-4 float-end"
        @click="logout()"
      >
        Logout
      </button>
      <div class="row"></div>
    </div>
    <div class="col"></div>
    <div class="row">
      <div class="col"></div>
      <Configure
        v-if="showConfigWindow"
        :time="curTimePressed"
        :id="id"
        @close="() => closeConfigWindow()"
      />
      <Add
        v-if="showAddWindow"
        :assistant="assistant"
        @close="() => closeAddWindow()"
      />
      <!-- behöver nog använda props för att skicka in rätt tid -->
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import Configure from "./AdminRemoveTimeSlot.vue";
import Add from "./AdminAddTimeSlot.vue";

export default {
  name: "AdminView",
  components: {
    Configure,
    Add,
  },
  data: () => ({
    assistant: "",
    timeslots: [],
    showConfigWindow: false,
    showAddWindow: false,
    curTimePressed: "",
  }),
  created() {
    this.assistant = this.$route.params.name;
    fetch("/api/timeslots")
      .then((res) => res.json())
      .then(({ timeslots }) => {
        this.timeslots = timeslots;
      })
      .catch(console.error);

    const { socket } = this.$root;

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
    assistantTimeslots() {
      const myTimeslots = [];
      for (var timeslot in this.timeslots) {
        if (this.timeslots[timeslot].assistantID === this.assistant) {
          myTimeslots.push(this.timeslots[timeslot]);
        }
      }
      return myTimeslots;
    },
    logout() {
      //this.$router.push(`/rooms/${name}`);
      //alert("Tried to logout!");
      const { commit } = this.$store;
      const { push } = this.$router;
      this.$store.commit("setAuthenticated", false);
      this.$router
        .push({
          path: "adminlogin",
        })
        .catch(console.error);
    },
    configTimeslot(timeslot) {
      //this.$router.push(`/rooms/${name}`);
      console.log("time pressed");
      this.closeAddWindow();
      this.curTimePressed = timeslot.time;
      this.id = timeslot.id;
      this.showConfigWindow = true;
      //alert("TID VALD: "+ time);
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
    closeConfigWindow() {
      console.log("close configure window");
      this.showConfigWindow = false;
      //this.updateTimeslots();
    },
    addTimeslot() {
      //this.$router.push(`/rooms/${name}`);
      console.log("add time slot");
      this.closeConfigWindow();
      this.showAddWindow = true;
      //alert("TID VALD: "+ time);
    },
    closeAddWindow() {
      console.log("close add window");
      this.showAddWindow = false;
      //this.updateTimeslots();
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
        }) //denna är helt fel!
        .catch(console.error);
    },
  },
};
</script>
