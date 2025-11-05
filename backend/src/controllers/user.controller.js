import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing went wrong while generating access token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string" || username.length < 3) {
    throw new ApiError(
      400,
      "User name is required and must be at least 3 character."
    );
  }
  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new ApiError(400, " A valid email is required.");
  }

  if (!password || password.length < 6) {
    throw new ApiError(
      400,
      "Password is required and must be at least 6 characters."
    );
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    if (existingUser.username === username) {
      throw new ApiError(400, "Username already exists.");
    }
    if (existingUser.email === email) {
      throw new ApiError(400, "Email already exists.");
    }
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering the user.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Register Successfuly."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide both Email and Password.");
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(400, "Email does not exist, Please register !!");
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentals !!");
  }

  const accessToken = await generateAccessTokens(existingUser._id);

  const loggedInUser = await User.findById(existingUser._id).select(
    "-password"
  );

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged In Successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ status: 200, data: {}, message: "User logged out successfully" });
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfull."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user Fetched"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username || username.trim().length < 3) {
    throw new ApiError(
      400,
      "Username is required and must be at least 3 characters long."
    );
  }
  // Check if the new username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(400, "Username already taken.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { username: username.trim() },
    { new: true, runValidators: true, select: "-password" }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Username updated successfully."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateUser,
};
