var fs = require('fs');
/*
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];
*/
var path = '/Users/brundon/Downloads/Takeout/Keep/';

fs.readdir(path, function(err, items) {
  console.log(`Importing ${items.length} notes...`);

  items.forEach((filename) => {
    var fileContents = fs.readFileSync(path + filename).toString();

    var noteContents = '';

    var titleMatch = fileContents.match(/<div class="title">([^<]*)<\/div>/i);
    if(titleMatch) {
      noteContents += titleMatch[1] + '\n';
    }

    var bodyMatch = fileContents.match(/<div class="content">([^<]*)<\/div>/i);
    if(bodyMatch) {
      noteContents += bodyMatch[1];
    }

    fs.writeFileSync(path + filename.substr(0, filename.indexOf('.')) + '.json', JSON.stringify({
      user_id: 'stripes',
      date: new Date(fs.statSync(path + filename).mtime).valueOf(),
      content: unescape(noteContents)
    }, null, 2));
  })
});
