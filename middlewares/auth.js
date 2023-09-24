import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }



  const [bearer, token] = authorizationHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log(token);

  jwt.verify(token, "Affaqkhan211", (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};


export default isAuthenticated