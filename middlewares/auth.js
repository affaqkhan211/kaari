import jwt from "jsonwebtoken"
import UserAuth from "../models/userAuthModel.js";


const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log(token);
  
    jwt.verify(token, process.env.LOGIN_SECRET_KEY, async (err, decoded) => {
        
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.log('Decoded:', decoded);
      try {
        const user = await UserAuth.findById(decoded.userId);
        
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
  
        req.user = user;
        next(); 
      } catch (error) {
        res.status(500).json({ message: 'Error authenticating', error: error.message });
      }
    });
  };
  

export default isAuthenticated