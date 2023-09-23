import UserAuth from "../models/userAuthModel.js";
// import twilio from "twilio"
import jwt from "jsonwebtoken"

export const userSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await UserAuth.create({ firstName, lastName, email, password });
        res.status(201).json({ success : true, user, message: 'User created successfully!' });
    } catch (error) {
        res.status(400).json({ success : false,  message: 'Error creating user', error: error.message });
    }
};

// const accountSid = 'ACfcdab6d47d9128ed23d720ad93e5db36';
// const authToken = 'e65861c2a99a80ecccc309722b076736'; 
// const twilioPhoneNumber = '+923135977454';

// const client = twilio(accountSid, authToken);

// function generateVerificationCode() {
//   return Math.floor(1000 + Math.random() * 9000);
// }

// export const sendVerificationCode = async (req, res) => {
//   const { userId } = req.params;
//   const { phone } = req.body;

//   try {
//     const verificationCode = generateVerificationCode();
//     const message = await client.messages.create({
//       body: `Your verification code is: ${verificationCode}`,
//       from: twilioPhoneNumber,
//       to: phone
//     });

//     const user = await UserAuth.findByIdAndUpdate(userId, { $set: { verificationCode } }, { new: true });

//     res.json({ user, message: 'Verification code sent successfully!' });
//   } catch (error) {
//     res.status(400).json({ message: 'Error sending verification code', error: error.message });
//   }
// };


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserAuth.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.LOGIN_SECRET_KEY, { expiresIn: '3d' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


export const addAddress = async (req, res) => {
    const { userId } = req.params;
    const { address } = req.body;
  
    try {
      const user = await UserAuth.findByIdAndUpdate(
        userId,
        { $set: { address } },
        { new: true }
      );
  
      res.json({ user, message: 'Address added successfully!' });
    } catch (error) {
      res.status(400).json({ message: 'Error adding address', error: error.message });
    }
};

export const setPin = async (req, res) => {
    const { userId } = req.params;
    const { pin } = req.body;

    try {
        const user = await UserAuth.findByIdAndUpdate(
            userId,
            { $set: { pin } },
            { new: true }
        );

        res.json({ user, message: 'PIN set successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error setting PIN', error: error.message });
    }
};

export const verifyPin = async (req, res) => {
    const { userId } = req.params;
    const { pin } = req.body;

    try {
        const user = await UserAuth.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.pin === pin) {
            return res.json({ message: 'PIN verified successfully. Access granted!' });
        } else {
            return res.status(401).json({ message: 'Incorrect PIN. Access denied' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error verifying PIN', error: error.message });
    }
};




