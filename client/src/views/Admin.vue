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
          @click="configTimeSlot(timeslot.time)"
        >
          {{ timeslot.time }}
        </button>
        <button
          type="button"
          class="btn btn-dark mt-4 float-end"
          @click="addTimeSlot()"
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
        
      </div>
    <div class="col"></div>
    <div class="row">
      <div class="col"></div>
      <Configure
        v-if="showConfigWindow"
        :time="curTimePressed"
        @close="() => closeConfigWindow()"
      />
      <Add
        v-if="showAddWindow"
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
    username: "",
    timeslots: [],
    showConfigWindow: false,
    showAddWindow: false,
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
    logout() {
      //this.$router.push(`/rooms/${name}`);
      //alert("Tried to logout!");
      const { commit } = this.$store;
      const { push } = this.$router;
      this.$store.commit("setAuthenticated", false);
      this.$router.push({
            path: "adminlogin",
      })
     .catch(console.error)
      

    },
    configTimeSlot(time) {
      //this.$router.push(`/rooms/${name}`);
      console.log("time pressed")
      this.closeAddWindow();
      this.curTimePressed = time;
      this.showConfigWindow = true;
      //alert("TID VALD: "+ time);
    },
    closeConfigWindow(){
        console.log("close configure window")
        this.showConfigWindow = false;
    },
    addTimeSlot() {
      //this.$router.push(`/rooms/${name}`);
      console.log("add time slot")
      this.closeConfigWindow();
      this.showAddWindow = true;
      //alert("TID VALD: "+ time);
    },
    closeAddWindow(){
        console.log("close add window")
        this.showAddWindow = false;
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
