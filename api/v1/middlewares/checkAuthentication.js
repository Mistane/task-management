const jwt = require("jsonwebtoken");
const privateKey = "Shinonome Ena";

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Vui long dang nhap de truy cap" });
  }

  jwt.verify(token, privateKey, (err, user) => {
    if (err) {
      return res.json({ msg: "LOI ROI" });
    } else {
      req.user = user;
      next();
    }
  });
};
