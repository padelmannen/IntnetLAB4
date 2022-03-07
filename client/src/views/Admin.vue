<template>
  <div class="row">
    <div class="col"></div>
    <div class="col list-group">
      <button
        v-for="timeSlot in timeSlots"
        :key="timeSlot.adminID"
        type="button"
        class="list-group-item list-group-item-action my-2 py-2"
        @click="changeTime()"
      >
        <!-- text: bookad av"{{ timeSlot.adminID }}, {"Bokad av"{timeSlot.bookedBy}} -->
        Tid: {{ timeSlot.time }}, Bookad av: {{timeSlot.bookedBy}} 
    
      </button>
      <button 
        type="button"
        @click="addTime()"
      >
        Lägg till tid
      </button>
      <button
        type="button"
        @click="removeTime()"
      >
        Ta bort tid
      </button
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
      .then(({ timeSlots }) => {
        this.timeSlots = timeSlots;
      })
      .catch(console.error);
  },
  methods: {
    changeTime(){
        console.log(`bokar tid med id ${id}`)
    },
    addTime(){
      console.log("lägger till tid")
    },
    removeTime(){
      console.log("tar bor tid")
    }
  },
};
</script>