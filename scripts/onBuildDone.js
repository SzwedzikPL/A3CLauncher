const {path7za} = require ('7zip-bin');
const {execFile} = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const zipArgs = ['-mx=5'];

exports.default = function(results) {
  const filesDir = path.join(results.outDir, 'packed');

  if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

  for (const filePath of results.artifactPaths) {
    const filename = path.basename(filePath);
    const type = filename.split('.').pop();

    if (type === 'exe') {
      // Pack exe to 'portable' tagged zip
      execFile(
        path7za,
        [
          'a',
          path.join(filesDir, filename.replace('.exe', '-portable.zip')),
          filePath
        ].concat(zipArgs),
        {cwd: results.outDir},
        error => {
          if (error) throw error;
        }
      );
    } else if (type === 'zip') {
      // Rename & move archive
      const newPath = path.join(filesDir, filename.replace('-win', ''));
      fs.rename(filePath, newPath, error => {
        if (error) throw error;
      });
    } else {
      console.log('Unknown file type', type);
      continue;
    }
  }

  console.log(chalk.green.bold('\n\--- Production build successful ---'));
}
