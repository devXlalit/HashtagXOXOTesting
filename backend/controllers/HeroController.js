import { v2 as cloudinary } from "cloudinary";
const getImagesFromFolder = async (req, res) => {
  try {
    const folder = req.query.folder || "banner";
    const result = await cloudinary.search
      .expression(`folder:${folder} AND resource_type:image`)
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const seen = new Set(); // 🔁 filter out duplicates
    const images = [];

    for (const file of result.resources) {
      if (!seen.has(file.public_id)) {
        seen.add(file.public_id);
        images.push({
          id: file.asset_id,
          url: file.secure_url,
          public_id: file.public_id,
        });
      }
    }

    res.json(images);
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

export { getImagesFromFolder };
