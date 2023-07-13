const jwt = require("jsonwebtoken");



const auth = (req, res, next) => {
  const token = req.headers.authorization;


  if (token) {
    const decoded = jwt.verify(token, "chandan");
    if (decoded) {
      const userID = decoded.userID;
      console.log(decoded);
      req.body.userID = userID;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
};


module.exports = {
  auth,
};