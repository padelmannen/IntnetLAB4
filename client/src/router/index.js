import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Rooms from "../views/Rooms.vue";
import Room from "../views/Room.vue";
import Login from "../views/Login.vue";
import Booking from "../views/Booking.vue";
import AdminLogin from "../views/AdminLogin.vue";
import Admin from "../views/Admin.vue";
import ConfirmBooking from "../views/ConfirmBooking.vue";

const routes = [
  {
    path: "/",
    redirect: "/rooms",
  },
  {
    path: "/rooms",
    component: Rooms,
  },
  {
    path: "/rooms/:name",
    component: Room,
  },
  {
    path: "/booking",
    component: Booking,
  },
  {
    path: "/adminlogin",
    component: AdminLogin,
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/confirm",
    component: ConfirmBooking,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Setup authentication guard.
router.beforeEach((to, from, next) => {
  if (store.state.authenticated || to.path === "/booking" || to.path === "/adminlogin" || to.path === "/confirm") {
    next();
  } else {
    if (to.path === "/admin"){
      next("/adminlogin")
    }
    else{
      console.info("Unauthenticated user. Redirecting to booking page.");
      next("/booking");
    }

  }
});

export default router;
