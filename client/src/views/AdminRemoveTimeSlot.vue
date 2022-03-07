<template>
  <div class="row">
    <div class="col"></div>
    <form class="col" @submit.prevent="removeTimeSlot()">
      <label for="username" class="form-label h4">Configure Time Slot</label>
      <p>Time: {{time}}</p>
      <button type="submit" class="btn btn-dark mt-4 float-end">Remove</button>
      <button
        class="btn btn-dark mt-4 float-start"
        @click="$emit('close')"
        >Cancel
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
  components: {},
  
  props: {
    time: String,
  },

  data: () => ({
    username: "",
    open: false,
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


