const path = require('path');
const fs = require('fs');

function filterFiles(directoryToServe) {
  return function (req, res, next) {
    const dirPath = path.join(directoryToServe, req.path);

    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
      if (err) return next(err);

      const filteredFiles = files.filter(file => {
        return file.isDirectory() || file.name.toLowerCase().endsWith('.pdf');
      });

      req._files = filteredFiles;
      next();
    });
  };
}

module.exports = filterFiles;
