var fs = require('fs');

fs.readFile('readFileTest.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});