const express = require("express");
const routes = express.Router();

const movies = require('./movies');
const moviesAdmin = require('./movies-admin');
const users = require('./users');
const Controller = require("../controllers/controller");

const isLogin = (req, res, next) => {
  if (req.session.user) {
    res.redirect(`/movies`);
  } else {
    next();
  }
};

routes.get("/login", isLogin, Controller.loginForm)
routes.post("/login", isLogin, Controller.handleLogin)

routes.get("/register", isLogin, Controller.registerForm)
routes.post("/register", isLogin, Controller.handleRegister)

routes.use((req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
});

routes.get("/", Controller.showAllMovies);

routes.use("/movies", movies)
routes.use("/movies-admin", moviesAdmin)
routes.use("/users", users)
routes.get("/wishlist", Controller.showWishlist)
routes.get("/wishlist-admin", Controller.showWishlistAdmin)
routes.get("/wishlist/:id", Controller.changeStatus)
routes.get("/logout", Controller.logout)

module.exports = routes