import { Router } from "express";
import model from "../newModel.js";

const router = Router();

/**
 * requireAuth is a middleware function that limit access to an endpoint to authenticated users.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {void}
 */

const requireAuth = (req, res, next) => {
  // Use an unique session identifier to access information about the user making the request.
  // const { id } = req.session;
  // const user = model.findUserById(id);

  const {assistant} = req.session;
  console.log("assistant", assistant);

  if (assistant === undefined) {
    // Choose the appropriate HTTP response status code and send an HTTP response if any back to the client.
    res.status(401).end();
    return;
  }
  next();
};

router.get("/users/me", (req, res) => {
  const { id } = req.session;
  const user = model.findUserById(id);

  res.status(200).json({ authenticated: user !== undefined });
});

router.get("/timeslots", async (req, res) => {
  const timeslots = await model.getTimeslots();

  // Choose the appropriate HTTP response status code and send an HTTP response if any back to the client.
  res.status(200).json({ timeslots }); // same as { rooms: rooms }
});

router.post("/reserve", async (req, res) => {
  /* console.log('bookername: ', req.body.bookerName);
    console.log('id: ', bookedSlot); */

  // const { socketID } = req.session;
  // model.join(socketID, "/start");

  await model.reserveTimeslot(req.body.timeslotID);

  // måste typ lägga in status ok här

  res.status(200).json({ authenticated: true });
});

router.post("/unreserve", async (req, res) => {
  /* console.log('bookername: ', req.body.bookerName);
    console.log('id: ', bookedSlot); */

  // const { socketID } = req.session;
  // model.join(socketID, "/start");

  await model.unreserveTimeslot(req.body.timeslotID);

  // måste typ lägga in status ok här

  res.status(200).json({ authenticated: true });
});

router.post("/booking", async (req, res) => {
  /* console.log('bookername: ', req.body.bookerName);
    console.log('id: ', bookedSlot); */

  // const { socketID } = req.session;
  // model.join(socketID, "/start");

  await model.bookTimeslot(req.body.username, req.body.timeslotID);

  // måste typ lägga in status ok här

  res.status(200).json({ authenticated: true });
});

router.post("/checkLogin", async (req, res) => {
  const succesLogin = await model.checkLogin(
    req.body.username,
    req.body.password
  );
  if (succesLogin) {
    req.session.assistant = req.body.username;
    console.log("godkänt i router");
    res.sendStatus(200);
  } else {
    console.log("inte godkänt i router");
    res.sendStatus(403);
  }

  // (loginStatus, assistantId) => {
  //     // definera enkklare i modelen - hämtar användarnamn - hjälpfunktioner!

  //     if (loginStatus) {
  //         // Saves the assistant
  //         req.session.assistantId = assistantId.username;
  //         /* if (!req.session.assistantId) {

  //             } */
  //         console.log("req.sessionId", req.sessionID);

  //         res.cookie("adminCookie", toString(req.sessionID));
  //         console.log("här kommer res.cookie:  ", res.cookie);

  //         console.log("i checklogin", req.session.assistantId);
  //         // Görs automatiskt - session, men varje har samma

  //         // Sparar session
  //         req.session.save((err) => {
  //             if (err) {
  //                 res.sendStatus(403);
  //                 console.log(err);
  //             } else {
  //                 console.debug(`Admin ${assistantId} logged in.`);
  //                 res.sendStatus(200);
  //             }
  //         });
  //     } else {
  //         // error that transports you back to login
  //         res.sendStatus(403);
  //     }
  // }
  // );
});

router.post("/logout", async (req, res) => {

  req.session.assistant = undefined;
  res.status(200).json({ authenticated: false });
});

router.post("/booking", (req, res) => {
  // Check how to access data being sent as a path, query, header and cookie parameter or in the HTTP request body.
  // const { username } = req.body;
  console.log("inne i auth booking");
  console.log("user: ", req.body.username, "id:", req.body.timeslotID);
  model.bookTimeslot(req.body.username, req.body.timeslotID);

  // måste typ lägga in status ok här

  res.status(200).json({ authenticated: true });
});

export default { router, requireAuth};
