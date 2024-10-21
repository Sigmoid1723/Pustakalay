const path = require('path');
const fs = require('fs');

// Middleware to filter files (only PDFs and directories)
function filterFiles(directoryToServe) {
  return function (req, res, next) {
    const dirPath = path.join(directoryToServe, req.path);

    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
      if (err) return next(err);

      // Filter only directories and PDFs (case-insensitive)
      const filteredFiles = files.filter(file => {
        return file.isDirectory() || file.name.toLowerCase().endsWith('.pdf');
      });

      // Save the filtered file list in req._files for later use
      req._files = filteredFiles;
      next();
    });
  };
}

module.exports = filterFiles;
