import { Router } from "express";
import model from "../newModel.js";
// import store from "../../../client/src/store/index.js";

const router = Router();

/**
 * API (see the route handlers below) should combine uniquely identifiable resources (paths)
 * with the appropriate HTTP request methods (GET, POST, PUT, DELETE and more) to manipulate them.
 *
 * GET     /rooms                       =>  get all rooms
 * GET     /rooms/{name}/messages       =>  get all messages in a room with the given name
 * POST    /rooms/{name}/messages       =>  create a new message in a room with the given name
 * PUT     /rooms/{name}/messages/{id}  =>  update a message with the given id in a room with the given name
 * DELETE  /rooms/{name}/messages/{id}  =>  delete a message with the given id in a room with the given name
 * etc.
 */

router.post("/addTimeslot", async (req, res) => {
  const { assistant } = req.body;
  console.log(assistant);

  const authAssistant = req.session.assistant;

  if (assistant !== authAssistant) {
    res.status(403).json({ authenticated: false });
  } else {
    const id = `${req.body.assistant} ${req.body.date} ${req.body.time}`;
    const time = `${req.body.date} ${req.body.time}`;

    await model.addTimeslot(id, assistant, time);

    res.status(200).json({ authenticated: true });
  }
});

router.post("/removeTimeslot", async (req, res) => {
  const { assistant } = req.body;
  console.log("assistant to remove", assistant);

  const authAssistant = req.session.assistant;

  if (assistant !== authAssistant) {
    res.status(403).json({ authenticated: true });
  } else {
    const { id } = req.body;
    await model.removeTimeslot(id);
    res.status(200).json({ authenticated: true });
  }
});
router.get("/timeslots/:name/messages", (req, res) => {
  // Check how to access data being sent as a path, query, header and cookie parameter or in the HTTP request body.
  const { time } = req.params;
  const timeslot = model.findTimeslotByTime(time);

  // Use an unique session identifier to access information about the user making the request.
  const { id, socketID } = req.session;
  const user = model.findUserById(id);

  // Check if a room with the given name exists.
  if (timeslot === undefined) {
    res.status(404).end();
    return;
  }

  // FIXME Check if the user making the request is authorized to request data.

  // Join the specified room.
  user.joinRoom(timeslot);
  model.join(socketID, timeslot);

  // Send a join message to all connected clients in the room.
  timeslot.addMessage(`${user.name} joined the room!`);
  model.broadcast(timeslot, `${user.name} joined the room!`);

  res.status(200).json({ messages: timeslot.messages });
});

router.post("/timeslots/:name/messages", (req, res) => {
  const { time } = req.params;
  const { message } = req.body;
  const timeslot = model.findTimeslotByTime(time);

  const { id } = req.session;
  const user = model.findUserById(id);

  // FIXME Check if a room with the given name exists, if the user making the request is authorized to send a message in the room etc.

  // Send a custom message to all connected clients in the room.
  timeslot.addMessage(`${user.name}: ${message}`);
  model.broadcast(timeslot, `${user.name}: ${message}`);

  res.status(200).end();
});

export default { router };
