const User = require("../model/user.model");

const getAllUsers = async (req, res) => {
  try {
    const user = await user.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Fetched all users",
      data: user,
    });
  } catch (error) {
    console.log("Error fetching users");
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

// ge single user
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetch user successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error fetching user");
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

//delete user

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User delete successfully",
    });
  } catch (error) {
    console.log("Error delete user");
    res.status(500).json({ success: false, message: "Error delete user" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        email
      },
      { new: true }
    ).select('-password')

    res.status(200).json({
      success: true,
      message: "User update successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error fetching user");
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

module.exports = { getAllUsers, getUserById, deleteUser, updateUser };
