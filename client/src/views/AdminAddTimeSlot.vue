<template>
  <div class="row">
    <div class="col"></div>
    <form class="col" @submit.prevent="removeTimeSlot()">
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
      <button
        class="btn btn-dark mt-4 float-start"
        @click="$emit('close')"
        >
          Cancel
      </button>
    </form>
    <div class="col"></div>
  </div>
</template>

<script>
//för timer
//https://vuejs.org/examples/#timer

export default {
  name: "configTimeSlotView",
  components: {
  },

  data: () => ({
    username: "",
    open: false,
    datepicked:"",
    timepicked:"",
  }),
  methods: {
    removeTimeSlot(){
        //funktion som ska ta bort en tid
        this.$emit("close")
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


