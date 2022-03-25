// import Room from "./models/room.model.js";
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
  createTimeslot(assistantID, id, time, status, bookedBy, reservedBy) {
    // console.log("creatar timeslot")
    this.timeslots[id] = new Timeslot(
      assistantID,
      id,
      time,
      status,
      bookedBy,
      reservedBy
    );
  }

  /**
   * Return the room object with the matching name.
   * @param {String} time - The name of the room.
   * @returns {timeslot}
   */
  findTimeslotByTime(time) {
    return this.timeslots[time];
  }

  async checkLogin(username, password) {
    console.log("username: ", username);
    console.log("password:", password);

    console.log(this.users);

    const acceptedLogin = await db.get(
      `SELECT * from assistants WHERE assistantID= ? AND password = ?`,
      username,
      password
    );
    if (acceptedLogin) {
      console.log("Godkänt login");
      return true;
    }
    console.log("EJ Godkänt login");
    return false;
  }

  async bookTimeslot(username, id) {
    console.log("username: ", username);
    console.log("id:", id);
    console.log("här nu!!!");

    const statement1 = await db.prepare(
      `UPDATE timeslots SET bookedBy=?, status=? WHERE id= ?`
    );
    statement1.run(username, "booked", id);
    statement1.finalize();
    this.io.emit("book", id, username);
    console.log("här nu 2!!!");
  }

  async addTimeslot(id, assistant, time) {
    console.log("assistant: ", assistant);
    console.log("time: ", time);
    console.log("id:", id);

    const statement1 = await db.prepare(
      "INSERT INTO timeslots VALUES (?,?,?,?,?,?)"
    );

    statement1.run(assistant, id, time, "available", "", "");
    statement1.finalize();
    this.io.emit("add", assistant, id, time);
  }

  async reserveTimeslot(id) {
    console.log("id:", id);
    this.reserveTimer(id);

    const statement1 = await db.prepare(
      `UPDATE timeSlots SET status=? WHERE id= ?`
    );
    statement1.run("reserved", id);
    statement1.finalize();
    this.io.emit("reserve", id);
  }

  async reserveTimer(id) {
    setTimeout(() => {
      if (this.timeslots[id].status === "reserved") {
        this.unreserveTimeslot(id);
      }
    }, 20000);
  }

  async getStatus(id) {
    const row = await db.get(`SELECT * FROM timeslots WHERE id=?`, id);
    console.log(this.users);
    console.log(row.status);
    return row.status;
  }

  async unreserveTimeslot(id) {
    console.log("id:", id);
    const status = await this.getStatus(id);
    console.log(status);
    if (status === "reserved") {
      const statement1 = await db.prepare(
        `UPDATE timeslots SET status=? WHERE id= ?`
      );
      statement1.run("available", id);
      statement1.finalize();
      this.io.emit("unreserve", id);
    }
  }

  async removeTimeslot(id) {
    console.log("removing");

    console.log("inside deletetimelsot method in model");
    const statement = await db.prepare("DELETE FROM timeslots WHERE id = (?)");
    statement.run(id);
    statement.finalize();
    console.log("Delete times slots returns this from model.js");
    delete this.timeslots[id];
    this.io.emit("remove", id);
  }

  async getTimeslots() {
    console.log("goes into this.timeslots");
    const sql = "SELECT * FROM timeslots";
    await db.each(sql, [], (err, row) => {
      if (err) {
        console.log("error");
        throw err;
      } else {
        // console.log("skapar timeSlot: ", row, row.id)
        this.createTimeslot(
          row.assistantID,
          row.id,
          row.time,
          row.status,
          row.bookedBy,
          row.reservedBy
        );
      }
    });

    // console.log("efter skapande är timeslots: ", Object.values(this.timeslots))
    console.log(Object.values(this.timeslots));

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
