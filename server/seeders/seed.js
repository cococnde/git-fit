const fs = require('fs');
const path = require('path');
const db = require('../config/connection');
const { Exercise } = require('../models');
const cleanDB = require('./cleanDB');


const readJSONFiles = async (folderPath) => {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      await readJSONFiles(filePath); 
    } else if (path.extname(file) === '.json') {
      const jsonData = require(filePath);
      // console.log(jsonData);
      await Exercise.create(jsonData); 
    }
  }
};

db.once('open', async () => {


    
  try {
    await cleanDB('Exercise', 'exercises');
    
    const rootFolder = path.join(__dirname, 'exerciseSeeds');
    await readJSONFiles(rootFolder);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});