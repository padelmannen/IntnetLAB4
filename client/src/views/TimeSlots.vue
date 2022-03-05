<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <button
        v-for="timeSlot in timeSlots"
        :key="timeSlot.id"
        type="button"
        class="list-group-item list-group-item-action my-2 py-2"
        @click="bookTime(timeSlot.id)"
      >
        {{ timeSlot.time }}
      </button>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "TimeSlots",
  components: {},
  data: () => ({
    timeSlots: [],
  }),
  created() {
    fetch("/api/timeSlots")
      .then((res) => res.json())
      .then(({ rooms }) => {
        this.timeSlots = timeSlots;
      })
      .catch(console.error);
  },
  methods: {
    redirect(name) {
      this.$router.push(`/timeSlots/${name}`);
    },
    bookTime(){
        console.log("bokar tid")
    }
  },
};
</script>