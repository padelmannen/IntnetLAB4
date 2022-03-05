/**
 * @class TimeSlot
 */
 class TimeSlot {
    constructor(adminID, id, time, bookedBy) {
      this.adminID = adminID;  //foreign key
      this.id=id;
      this.time = time;
      this.bookedBy = bookedBy
    }
  
  }
  
  export default TimeSlot;