import topheadingModel from "../models/topHeadingModel.js";
// function for add product
const addHeading = async (req, res) => {
  try {
    const { heading } = req.body;

    // Find if a heading already exists
    const existing = await topheadingModel.findOne({});
    if (existing) {
      existing.heading = heading;
      await existing.save();
    } else {
      const newheading = new topheadingModel({ heading });
      await newheading.save();
    }

    res.json({ success: true, message: "Heading updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listHeading = async (req, res) => {
  try {
    const heading = await topheadingModel.find({});
    res.json({ success: true, heading });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeHeading = async (req, res) => {
  try {
    await topheadingModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Heading Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addHeading, listHeading, removeHeading };
