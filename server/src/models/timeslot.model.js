/**
 * @class timeslot
 */
 class timeslot {
    constructor(time) {
      this.time = time;
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
  