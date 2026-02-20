import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


// 🔐 ADMIN LOGIN (NEW)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple demo admin credentials
    if (email === "admin@quickshow.com" && password === "admin123") {
      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        token,
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Check if user is admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};


// 📊 Get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// 🎬 Get all shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// 🎟 Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
