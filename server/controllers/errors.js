exports.pageNotFound = (req, res, next) => {
  res.status(404).json({ success: true, message: "Page Not Found" });
};
