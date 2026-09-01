import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
// find by email
     
export const signup = async (req, res) => {
  try {
    console.log("🔥 FULL BODY:", req.body);

    const { username, email, password, role } = req.body;

    console.log("🔥 SIGNUP CONTROLLER HIT");
    console.log("🔥 ROLE:", role);
    
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
//  hashed password

const hashedPassword = await bcrypt.hash(password,10);


// new User
const newUser = await User.create({
  username,
  email,
  password: hashedPassword,
  role: role,
});

console.log("ROLE RECEIVED:", role);
console.log("ROLE SAVED:", newUser.role);


    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });

 } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {  
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
},
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};