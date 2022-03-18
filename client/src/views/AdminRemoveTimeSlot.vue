<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="row">
        <form class="col" @submit.prevent="removeTimeslot()">
          <label for="username" class="form-label h4">Configure Time Slot</label>
          <p>Time: {{time}}</p>
          <button type="submit" class="btn btn-dark mt-4 float-end">Remove</button>
          <button
            class="btn btn-dark mt-4 float-start"
            @click="$emit('close')"
            >Cancel
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
    time: String,
    id: String,
  },

  data: () => ({
    username: "",
    open: false,
  }),
  
  methods: {

    removeTimeslot(){
        //funktion som ska ta bort en tid
      fetch("/api/removeTimeslot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: this.id}),
      })

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


<style scoped>
.popup{
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

.popup-inner{
  background: #fff;
  padding: 32px;
  border-radius: 12px;
}
</style>