// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const homesController = require("../controllers/storeController");

/*
  "//" <- this sign represents that testing of this route is successfull
*/
storeRouter.get("/", homesController.getIndex);//
storeRouter.get("/homes", homesController.getHomes);//
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavouriteList);//
storeRouter.post("/favourites", homesController.postAddToFavourite);//
storeRouter.get("/homes/:homeId", homesController.getHomeDetails);//
storeRouter.delete("/favourites/delete/:homeId", homesController.postDelteFromFavourite);//

module.exports = storeRouter;