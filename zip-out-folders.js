// zip-out-folders.js
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const outDir = path.join(__dirname, "out");

// Get all subfolders inside the "out" directory
const folders = fs.readdirSync(outDir).filter((file) => {
  const fullPath = path.join(outDir, file);
  return fs.statSync(fullPath).isDirectory();
});

// Function to zip a folder
function zipFolder(folderName) {
  return new Promise((resolve, reject) => {
    const folderPath = path.join(outDir, folderName);
    const zipPath = path.join(outDir, `${folderName}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`Zipped ${folderName} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

// Run it
(async () => {
  console.log(`Zipping ${folders.length} folders in /out...`);
  for (const folder of folders) {
    await zipFolder(folder);
  }
  console.log("All subfolders zipped inside the /out directory!");
})();
