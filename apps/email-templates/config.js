/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

const fs = require("fs");
const path = require("path");

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

module.exports = {
  events: {
    afterRender(html, config) {
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
  },
  build: {
    fail: "verbose", // silent | verbose
    templates: {
      source: "src/templates",
      destination: {
        path: "dist-development",
      },
      assets: {
        source: "src/images",
        destination: "images",
      },
    },
  },
};
