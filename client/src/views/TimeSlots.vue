<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <button
        v-for="timeSlot in timeSlots"
        :key="timeSlot.adminID"
        type="button"
        class="list-group-item list-group-item-action my-2 py-2"
        @click="bookTime()"
      >
        <!-- text: bookad av"{{ timeSlot.adminID }}, {"Bokad av"{timeSlot.bookedBy}} -->
        Tid: {{ timeSlot.time }}, Bookad av: {{timeSlot.bookedBy}} 
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
      .then(({ timeSlots }) => {
        this.timeSlots = timeSlots;
      })
      .catch(console.error);
  },
  methods: {
    bookTime(){
        console.log(`bokar tid med id ${id}`)
    },
  },
};
</script> 