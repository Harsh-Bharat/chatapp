import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_CLOUDKEY,
  api_secret: process.env.CLOUDINARY_CLOUDAPISECRET,
});

export default cloudinary;
