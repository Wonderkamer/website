/*
|-------------------------------------------------------------------------------
| Production config                       https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const convertImageToBase64URL = (filename, imageType = "png") => {
  try {
    const buffer = fs.readFileSync(filename);
    const base64String = Buffer.from(buffer).toString("base64");
    // console.log(`base64String`, base64String.slice(0, 100));
    return `data:image/${imageType};base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${filename} no exist ❌`);
  }
};

export default {
  afterRender({ html, config }) {
    // Define a folder where your images are stored
    const imagesFolder = path.resolve(__dirname, "src/images");
    // Use a regex to find image tags
    const imageRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;

    return html.replace(imageRegex, (match, src) => {
      const imagePath = path.join(imagesFolder, src);

      if (fs.existsSync(imagePath)) {
        // Convert the image to a data URL
        const dataUrl = convertImageToBase64URL(imagePath);
        return match.replace(src, dataUrl);
      }

      // If the image doesn't exist, return the original tag
      return match;
    });
  },
  build: {
    content: ["emails/**/*.html"],
    output: {
      path: "dist",
      extension: "hbs",
    },
  },
  css: {
    inline: true,
    purge: {},
  },
};
