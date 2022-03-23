<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="row">
        <form class="col" @submit.prevent="addTimeslot()">
          <label for="username" class="form-label h4">Add Time Slot</label>
          <input
            id="datepicked"
            v-model="datepicked"
            type="date"
            class="form-control"
            placeholder="Date"
            required
            autofocus
          />
          <input
            id="timepicked"
            v-model="timepicked"
            type="time"
            class="form-control"
            placeholder="Time"
            required
            autofocus
          />
          <button type="submit" class="btn btn-dark mt-4 float-end">Add</button>
          <button class="btn btn-dark mt-4 float-start" @click="$emit('close')">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//för timer
//https://vuejs.org/examples/#timer

export default {
  name: "configTimeslotView",
  components: {},

  props: {
    assistant: String,
  },

  data: () => ({
    username: "",
    open: false,
    datepicked: "",
    timepicked: "",
  }),
  methods: {
    addTimeslot() {
      console.log(this.assistant + datepicked.value + " " + timepicked.value);
      fetch("/api/addTimeslot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistant: this.assistant,
          date: datepicked.value,
          time: timepicked.value,
        }),
      });

      this.$emit("close");
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
          push(authenticated === true ? "/admin" : "/booking");
        })
        .catch(console.error);
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
}
</style>
