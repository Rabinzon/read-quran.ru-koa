require('./models/db');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const json = require('../data/ayats2');

const models = require('../models/');

const stream = fs.createWriteStream(path.resolve(__dirname, '../', 'data', 'ayats3.json'));


stream.once('open', async () => {
  console.log(models);
  const surahs = await models.find();
  const data = json;
  console.log(surahs);
  /*console.log(ayts[0]);
  stream.write(JSON.stringify(ayts, null, 2));
  stream.end();
  stream.close()*/
});


