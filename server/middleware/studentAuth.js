import jwt from "jsonwebtoken";

const studentAuth = (req, res, next) => {
  try {
    console.log("student auth middleware called");
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, msg: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded;
    
    console.log("heders", req.headers);
    console.log("auth header token", req.headers.authorization);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

export default studentAuth;