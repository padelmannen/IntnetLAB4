<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <button
        v-for="timeSlot in timeSlots"
        :key="timeSlot.id"
        type="button"
        class="list-group-item list-group-item-action my-2 py-2"
        @click="changeTimeSlots(timeSlot.id)"
      >
        {{ room.name }}
      </button>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  components: {},
  data: () => ({
    timeSlots: [],
  }),
  created() {
    fetch("/api/admin")
      .then((res) => res.json())
      .then(({ rooms }) => {
        this.rooms = rooms;
      })
      .catch(console.error);
  },
  methods: {
    redirect(name) {
      this.$router.push(`/admin/${name}`);
    },
    changeTimeSlots(){
        console.log("admin timeslot")
    }
  },
};
</script>