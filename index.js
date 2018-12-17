const fs = require('fs');
const glob = require('glob');
const hasha = require('hasha');
const revPath = require('rev-path');

function getManifest (filepaths, baseDir, hashLen) {
    const revManifest = {};
    return Promise.all(filepaths.map((filepath) => {
        return hasha.fromFile(filepath, {algorithm: 'md5'})
            .then(hash => revPath(filepath, hash.slice(0, hashLen)))
            .then((revfilePath) => {
                revManifest[filepath.replace(baseDir, '')] = revfilePath.replace(baseDir, '');
            });
    })).then(() => revManifest);
}

module.exports = (globPath, opts={}) => {
    const revDestPath = opts.outfile || './rev-manifest.json';
    const hashLen = opts.hashLen || 8;
    const baseDir = opts.baseDir ? `${opts.baseDir}${opts.baseDir.substr(-1) === '/' ? '' : '/'}` : '';
    const globPathWithBase = `${baseDir}${globPath}`
    const filepaths = glob.sync(globPathWithBase, {nodir:true});
    if (filepaths.length === 0) {
        throw new Error(`No files matched for glob "${globPath}"`);
    }
    return getManifest(filepaths, baseDir, hashLen)
        .then((rev) => {
            fs.writeFile(revDestPath, JSON.stringify(rev, null, 2), (err) => {
                if (err) {
                    throw err;
                }
                console.log(`${revDestPath} written.`);
            })
        });
}
