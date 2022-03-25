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
  const { assistant } = req.session;
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
  await model.reserveTimeslot(req.body.timeslotID);

  res.status(200).json({ authenticated: true });
});

router.post("/unreserve", async (req, res) => {
  await model.unreserveTimeslot(req.body.timeslotID);

  res.status(200).json({ authenticated: true });
});

router.post("/booking", async (req, res) => {
  const status = await model.getStatus(req.body.timeslotID);
  if (status === "booked") {
    res.sendStatus(403);
  } else {
    await model.bookTimeslot(req.body.username, req.body.timeslotID);
    res.status(200).json({ authenticated: true });
  }
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
});

router.post("/logout", async (req, res) => {
  req.session.assistant = undefined;
  res.status(200).json({ authenticated: false });
});

export default { router, requireAuth };
