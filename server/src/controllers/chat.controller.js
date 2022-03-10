import { Router } from "express";
import model from "../newModel.js";

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

router.get("/timeslots", async (req, res) => {
  const timeslots = await model.getTimeSlots();

  // Choose the appropriate HTTP response status code and send an HTTP response if any back to the client.
  res.status(200).json({ timeslots }); // same as { rooms: rooms }
});

router.post("/booking", async (req, res) => {
  /* console.log('bookername: ', req.body.bookerName);
    console.log('id: ', bookedSlot); */

  // const { socketID } = req.session;
  // model.join(socketID, "/start");

  await model.bookTimeSlot(req.body.timeslotID, req.body.username);

  // måste typ lägga in status ok här

  res.status(200).json({ authenticated: true });
});

router.get("/timeslots/:name/messages", (req, res) => {
  // Check how to access data being sent as a path, query, header and cookie parameter or in the HTTP request body.
  const { time } = req.params;
  const timeslot = model.findTimeSlotByTime(time);

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
  const timeslot = model.findTimeSlotByTime(time);

  const { id } = req.session;
  const user = model.findUserById(id);

  // FIXME Check if a room with the given name exists, if the user making the request is authorized to send a message in the room etc.

  // Send a custom message to all connected clients in the room.
  timeslot.addMessage(`${user.name}: ${message}`);
  model.broadcast(timeslot, `${user.name}: ${message}`);

  res.status(200).end();
});

export default { router };
