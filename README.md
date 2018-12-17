# manifest-filerev
Generate manifest data for file revisioning.
  
This package is intended to be a drop-in replacement for the `rev-manifest.json` generation feature of [`gulp-rev`](https://www.npmjs.com/package/gulp-rev). This is useful for migrating an asset generation workflow away from Gulp. 

Source files are passed using a [`glob`](https://www.npmjs.com/package/glob) expression instead of a Gulp pipe. Hash length is configurable.
  
Uses `rev-path` and `hasha` packages under the hood (usage similar to `rev-file` package but adapted to allow custom hash length). 

## Installation
```
npm install manifest-filerev
```

## Usage
```
const manifestFilerev = require('manifest-filerev');
manifestFilerev('css/*', {baseDir: 'build/'});
// Promise that writes rev-manifest.json
```

## API
### manifestFilerev(glob, [options])
Returns a `Promise` that writes to manifest JSON file.  
#### glob
Type: `String`  
`glob` expression capturing source files
  
#### options  
Type: `Object` 
* `outfile` (default: `./revManifest.json`): Path to write manifest JSON file
* `hashLen` (default: `8`): Character length of rev hash
* `baseDir` (default: `''`): Base directory to exclude from manifest JSON paths
