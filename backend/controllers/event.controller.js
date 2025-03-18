import Event from "../models/event.model.js";

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("createdBy", "firstName lastName");

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate("createdBy", "firstName lastName");

    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, audience } = req.body;

    // Check if Event exists
    const event = await Event.findOne({ title });

    if (event) {
      const error = new Error("Subject already exists");
      error.statusCode = 409;
      throw error;
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      audience,
      createdBy: req.user._id,
    });
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Created event successfully",
      data: newEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, date, location, audience } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (location) event.location = location;
    if (date) event.date = date;
    if (audience) event.audience = audience;

    await event.save();

    res.status(201).json({
      success: true,
      message: "Updated event successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted event successfully",
    });
  } catch (error) {
    next(error);
  }
};
