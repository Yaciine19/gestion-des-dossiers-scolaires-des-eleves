import User from "../../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-classId -subject");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    const { query, role } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Please enter a word for seaching." });
    }

    if (!role) {
      return res.status(400).json({ message: "Please enter a role." });
    }

    const results = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: query, $options: "i" } },
            { lastName: { $regex: query, $options: "i" } },
            { status: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
        {
          role: role,
        },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
