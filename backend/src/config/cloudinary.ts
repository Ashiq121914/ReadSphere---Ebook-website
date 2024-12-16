import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

// Configuration
cloudinary.config({
  cloud_name: config.coudinaryCloud,
  api_key: config.coudinaryApiKey,
  api_secret: config.coudinarySecret,
});

export default cloudinary;
