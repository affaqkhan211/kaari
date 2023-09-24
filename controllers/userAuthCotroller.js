import { UserAuth, Address, Pin } from "../models/userAuthModel.js";
// import twilio from "twilio"
import jwt from "jsonwebtoken"

export const userSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await UserAuth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new UserAuth({ firstName, lastName, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
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
        if (!email || !password) {
            return res.status(400).json({ message: 'Both email and password are required' });
        }

        const user = await UserAuth.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the plain text password with the one in the database
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, "Affaqkhan211", { expiresIn: '3h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



export const addAddress = async (req, res) => {
    const { address } = req.body;

    try {
        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }

        const newAddress = new Address({ address });
        await newAddress.save();

        // Associate the address with the logged-in user
        const user = await UserAuth.findById(req.userId);
        user.address = newAddress._id;
        await user.save();

        res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const setPin = async (req, res) => {
    const { pin } = req.body;
    const userId = req.userId; // Get userId from req object

    try {
        if (!pin) {
            return res.status(400).json({ message: 'Pin is required' });
        }

        const parsedPin = parseInt(pin, 10);
        if (isNaN(parsedPin) || parsedPin < 1000 || parsedPin > 9999) {
            return res.status(400).json({ message: 'Pin must be a 4-digit number' });
        }

        const newPin = new Pin({ pin: parsedPin });
        await newPin.save();

        const user = await UserAuth.findById(userId);
        console.log(user);
        console.log(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.pin = newPin._id;
        await user.save();

        res.status(201).json({ message: 'Pin added successfully', pin: newPin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const verifyPin = async (req, res) => {
    const { pin } = req.body;
    const userId = req.userId;
  
    try {
      if (!pin) {
        return res.status(400).json({ message: 'Pin is required' });
      }
  
      const parsedPin = parseInt(pin, 10);
      if (isNaN(parsedPin) || parsedPin < 1000 || parsedPin > 9999) {
        return res.status(400).json({ message: 'Pin must be a 4-digit number' });
      }
  
      const user = await UserAuth.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userPin = await Pin.findById(user.pin);
  
      if (!userPin) {
        return res.status(404).json({ message: 'Pin not found for the user' });
      }
  
      if (userPin.pin !== parsedPin) {
        return res.status(401).json({ message: 'Incorrect pin' });
      }
  
      res.status(200).json({ message: 'Pin verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
