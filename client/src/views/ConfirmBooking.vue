<template>
  <div class="row">
    <div class="col"></div>
    <form class="col" @submit.prevent="book(timeSlotID)">
      <label for="username" class="form-label h4">Fill in name and confirm:</label>
      <p>Time: {{timeSlotID}}</p>
      <input
        id="username"
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Name"
        required
        autofocus
      />
      <button type="submit" class="btn btn-dark mt-4 float-end">Confirm</button>
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
  name: "confirmBookingView",
  components: {},
  
  props: {
    timeSlotID: String,
  },

  data: () => ({
    username: "",
    // timeslotID: "",
    open: false,
  }),
  
  methods: {

    book(timeSlotID){
      console.log("tsID: ", timeSlotID)
        //funktion som ska göra en tid bokad
       
    // },
    // authenticate() {
    //   const { commit } = this.$store;
    //   const { push } = this.$router;

      fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.username, timeSlotID: timeSlotID}),
      })
        .then((res) => res.json())
        .then(() => {
          this.$emit("close")
        // .then(({ authenticated }) => {
        //   commit("setAuthenticated", authenticated);
        //   push(authenticated === true ? "/admin" : "/booking");
        // })
        })
        .catch(console.error);
         
    },
  },
};
</script>


