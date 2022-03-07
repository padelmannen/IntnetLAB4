/**
 * @class Timeslot
 */
 class timeslot {
    constructor(assistantID, id, time, status, bookedBy, reservedBy) {
      this.assistantID = assistantID;
      this.id = id;
      this.time = time;
      this.status = status;
      this.bookedBy = bookedBy;
      this.reservedBy = reservedBy;
      this.messages = [];
    }
  
    /**
     * Add a message.
     * @param {String} message - The message to add.
     * @returns {void}
     */
    addMessage(message) {
      this.messages.push(message);
    }
  }
  
  export default timeslot;
  