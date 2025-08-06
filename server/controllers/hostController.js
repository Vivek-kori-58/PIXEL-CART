const home = require("../models/home");
const Home = require("../models/home");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  // res.render("host/edit-Home", {
  //   pageTitle: "Add Home to airbnb",
  //   currentPage: "addHome",
  //   editing: false,
  //   home: Home,
  //   isLoggedIn: req.isLoggedIn,
  //   user: req.session.user,
  // });
  return res.json({ home: Home });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  if (!editing) {
    return res
      .status(400)
      .json({ success: false, message: "Editing not allowed" });
  }

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("not found for editing");
        return (
          res
            // .redirect("/host/host-home-list");
            .json({ success: false, message: "Home not found" })
        );
      }
      console.log(editing, homeId, home);
      // res.render("host/edit-Home", {
      //   home: home,
      //   pageTitle: "Edit Home to airbnb",
      //   currentPage: "host-homes",
      //   editing: editing,
      //   isLoggedIn: req.isLoggedIn,
      //   user: req.session.user,
      // });
      return res.json({ home: home });
    })
    .catch((err) => {
      console.log("error while finding home for editing", err);
      return res
        .status(500)
        .json({ success: false, message: "Error finding home for editing" });
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then(
    (registeredHomes) => {
      return res.json({ registeredHomes: registeredHomes });
    }
    // res.render("host/host-home-list", {
    //   registeredHomes: registeredHomes,
    //   pageTitle: "Host Homes List",
    //   currentPage: "host-homes",
    //   isLoggedIn: req.isLoggedIn,
    //   user: req.session.user,
    // })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  console.log(houseName, price, location, rating, description);

  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const photo = req.file.path;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  home.save().then(() => {
    console.log("record inserted succesfully");
    res.status(201).json({ success: true, message: "Home added successfully" });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;
  if (!home) {
    return res.status(404).json({ success: false, message: "Home not found" });
  }
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("error while deleting old photo", err);
          }
        });
        home.photo = req.file.path; // Update photo if a new file is uploaded
      }

      home
        .save()
        .then((result) => {
          console.log("updated", result);
          return res.json({
            success: true,
            message: "home updated successfully",
          });
        })
        .catch((err) => {
          console.log("error while editing home", err);
          return res
            .status(500)
            .json({ success: false, message: "Error updating home" });
        });
      // res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("error while finding home", err);
      return res
        .status(500)
        .json({ success: false, message: "Error finding home" });
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("delete", homeId);
  Home.findByIdAndDelete(homeId)
    .then((err) => {
      // res
      // .redirect("/host/host-home-list");
      return res
        .status(200)
        .json({ success: true, message: "Home deleted successfully" });
    })
    .catch((err) => {
      console.log("error while deleting", err);
      return res
        .status(500)
        .json({ success: false, message: "Error deleting home" });
    });
};
