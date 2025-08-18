const home = require("../models/home");
const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  console.log("session value: ", req.session);

  Home.find().then((registeredHomes) =>
    res
      // .render("store/index", {
      //   registeredHomes: registeredHomes,
      //   pageTitle: "airbnb Home",
      //   currentPage: "index",
      //   isLoggedIn: req.isLoggedIn,
      //   user: req.session.user,
      // })
      .json({
        registeredHomes: registeredHomes,
      })
  );
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    // .render("store/home-list", {
    //     registeredHomes: registeredHomes,
    //     pageTitle: "Homes List",
    //     currentPage: "Home",
    //     isLoggedIn: req.isLoggedIn,
    //     user: req.session.user,
    //   })
    return res.json({
      registeredHomes: registeredHomes,
    });
  });
};

exports.getBookings = async (req, res) => {
  try {
    const userId =
      req.session?.user?._id || req.query.userId || req.body.userId;
    const user = await User.findOne(userId).populate("bookings");
    return res.json({
      booking: user.bookings,
    });
  } catch (error) {
    console.log("Error while geting booking:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get Booking" });
  }
  // res.status(200).json({ success: true, message: "booking page" });
};

exports.postBooking = async (req, res) => {
  try {
    const homeId = req.params.homeId;
    const userId =
      req.session?.user?._id || req.query.userId || req.body.userId;
    console.log("Incoming userId:", userId);
    console.log("Incoming homeId:", homeId);

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.bookings.includes(homeId)) {
      user.bookings.push(homeId);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Booking added successfully" });
    }

    return res.status(400).json({ success: false, message: "Already booked" });
  } catch (error) {
    console.log("Error while adding booking:", error);
    res.status(500).json({ success: false, message: "Failed to add Booking" });
  }
};

exports.getFavouriteList = async (req, res, next) => {
  // const userId =  req.session.user._id;
  const userId = req.session?.user?._id || req.query.userId || req.body.userId;
  const user = await User.findOne(userId).populate("favourites");
  return res.json({
    favouriteHomes: user.favourites,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.homeId;

    const userId =
      req.session?.user?._id || req.query.userId || req.body.userId;
    //here i make changes to get userId from session or query or body

    console.log("homeId", homeId);
    console.log("userId", userId);

    const user = await User.findById(userId);

    if (!user.favourites.includes(homeId)) {
      user.favourites.push(homeId);
      await user.save();
      console.log("favourite added", user.favourites);
    }
    res
      // .redirect("/favourites");
      .status(200)
      .json({ success: true, message: "Favourite added" });
  } catch (error) {
    console.log("Error while adding favourite:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add favourite" });
  }
};

exports.postDelteFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  // const userId = req.session.user._id;
  const userId = req.session?.user?._id || req.body.userId || req.query.userId;

  const user = await User.findById(userId);

  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  // res.redirect("/favourites");
  return res.status(200).json({
    success: true,
    message: "Favourite deleted",
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("at home details page", homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found");
      // res.redirect("/homes");
      return res.status(404).json({
        success: false,
        message: "Home not found",
      });
    } else {
      console.log("home Found  by Id details", home);
      // res.render("store/home-detail", {
      //   home: home,
      //   pageTitle: "Home Detail",
      //   currentPage: "Home",
      //   isLoggedIn: req.isLoggedIn,
      //   user: req.session.user,
      // });
      return res.json({
        home: home,
      });
    }
  });
};
