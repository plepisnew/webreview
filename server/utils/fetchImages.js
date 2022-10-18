const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
/**
 * Fetc
 */
const IMAGES_URL = `http://localhost:3000/api/v3/images`;

const IMAGES_PATH = path.join(
  __dirname,
  "..",
  "..",
  "client",
  "public",
  "images"
);

/**
 * Fetches Images with Schema `{ image: { data: { type: 'Buffer', data: number[] }, contentType: string }, name: string }` and downloads them.
 * @param {DownloadOptions} options options for downloading images from a source
 * @param {string} options.imagesPath Path in which Images should be created
 * @param {string} options.imagesUrl URL from which Images should be fetched
 */
const downloadImages = async ({ imagesUrl, imagesPath }) => {
  try {
    const res = await fetch(imagesUrl);
    const arr = await res.json();
    await Promise.all(
      arr.map(async (json, index) => {
        const imageName = json.name;
        const contentType = json.image.contentType;
        const extension = contentType.split("/")[1];
        const outName = `${imageName}.${extension}`;

        const bufferData = Buffer.from(json.image.data.data);
        fs.writeFile(path.join(imagesPath, outName), bufferData, (err) => {
          if (err) throw err;
          console.log(`Creating image ${outName}`);
        });
      })
    );
  } catch (err) {
    console.log(err);
  }
};

downloadImages({ imagesUrl: IMAGES_URL, imagesPath: IMAGES_PATH });
