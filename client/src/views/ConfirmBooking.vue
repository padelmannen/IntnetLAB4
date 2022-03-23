<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="row">
        <form class="col" @submit.prevent="book(timeslotID)">
          <label for="username" class="form-label h4"
            >Fill in name and confirm:</label
          >
          <p>Time: {{ timeslotID }}</p>
          <div>
            Time left to confirm:
            {{ ((duration - elapsed) / 1000).toFixed(0) }} seconds
          </div>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Name"
            required
            autofocus
          />
          <button type="submit" class="btn btn-dark mt-4 float-end">
            Confirm
          </button>
          <button class="btn btn-dark mt-4 float-start" @click="closeWindow()">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// för timer
// https://vuejs.org/examples/#timer

export default {
  name: "ConfirmBookingView",
  components: {},

  props: {
    timeslotID: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],

  data: () => ({
    username: "",
    // timeslotID: "",
    open: false,
    duration: 20 * 1000,
    elapsed: 0,
    windowOpen: true,
  }),
  created() {
    this.elapsed = 0;
    console.log("created and elapsed reset!");

    let lastTime = performance.now();
    const update = () => {
      const curTime = performance.now();
      this.elapsed += Math.min(
        curTime - lastTime,
        this.duration - this.elapsed
      );
      // console.log(this.elapsed)
      lastTime = curTime;
      if (this.duration !== this.elapsed && this.windowOpen) {
        this.handle = requestAnimationFrame(update);
      } else {
        this.closeWindow();
      }
    };
    update();
  },
  methods: {
    closeWindow() {
      this.windowOpen = false;
      this.$emit("close");
    },
    // authenticate() {
    //   const { commit } = this.$store;
    //   const { push } = this.$router;
    // },
    book(timeslotID) {
      console.log("tsID: ", timeslotID);
      // funktion som ska göra en tid bokad

      fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          timeslotID,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.$emit("close");
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
