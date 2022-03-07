import Room from "./models/room.model.js";
import User from "./models/user.model.js";
import Timeslot from "./models/timeslot.model.js";
import db from "./database.js";

class Model {
  constructor() {
    this.timeslots = {};
    this.users = {};

    this.io = undefined;
  }

  /**
   * Initialize the model after its creation.
   * @param {SocketIO.Server} io - The socket.io server instance.
   * @returns {void}
   */
  init(io) {
    this.io = io;
  }

  /**
   * Create a room with the given name.
   * @param {String} time - The name of the room.
   * @returns {void}
   */
  createTimeSlot(assistantID, id, time, status, bookedBy, reservedBy) {
    console.log("creatar timeslot")
    this.timeslots[id] = new Timeslot(assistantID, id, time, status, bookedBy, reservedBy);
  }

  /**
   * Return the room object with the matching name.
   * @param {String} time - The name of the room.
   * @returns {timeslot}
   */
  findTimeSlotByTime(time) {
    return this.timeslots[time];
  }

  /**
   * Return all the rooms.
   * @returns {timeslot[]}
   */
  // getTimeSlots() {
  //   return Object.values(this.timeslots);
  // }
  async getTimeSlots() {
    console.log("goes into this.timeslots");
    let sql = "SELECT * FROM timeSlots"
    await db.each(sql, [], (err, row) => {
      if (err) {
        console.log("error")
        throw err;
      }
      else{
        console.log("skapar timeSlot: ", row, row.id)
        this.createTimeSlot(row.assistantID, row.id, row.time, row.status, row.bookedBy, row.reservedBy)
      }
    });

    console.log("efter skapande är timeslots: ", this.timeslots)
    
    return Object.values(this.timeslots);
}

  /**
   * Create a user with the given name.
   * @param {String} id - An unique identifier for the user session.
   * @param {String} name - The name of the user.
   * @returns {void}
   */
  createUser(id, name) {
    this.users[id] = new User(name);
  }

  /**
   * Return the user object with the matching id.
   * @param {String} id - An unique identifier for the user session.
   * @returns {User}
   */
  findUserById(id) {
    return this.users[id];
  }

  /**
   * Push out a message to all connected clients in the given room.
   * @param {timeslot} timeslot - The room to add the message to.
   * @param {String} message - The message to add.
   * @returns {void}
   */
  broadcast(timeslot, message) {
    this.io.in(timeslot.time).emit("msg", message);
  }

  /**
   * Join a specified room.
   * @param {String} socketID - An unique identifier for the user socket.io session.
   * @param {timeslot} timeslot - The room to join.
   * @returns {void}
   */
  join(socketId, timeslot) {
    this.io.in(socketId).socketsJoin(timeslot.time);
  }
}

export default new Model();
