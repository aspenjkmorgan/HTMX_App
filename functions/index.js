const {onRequest} = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const pug = require('pug');

// hide firebase api key
const key = process.env.FB_KEY;

const firebaseConfig = {
    apiKey: key,
    authDomain: "example-project4.firebaseapp.com",
    projectId: "example-project4",
    storageBucket: "example-project4.appspot.com",
    messagingSenderId: "199449270796",
    appId: "1:199449270796:web:9bfeb311a4e0241678ac29",
    measurementId: "G-2SVV193YVQ"
}; 
  
admin.initializeApp(firebaseConfig);
const db = admin.firestore();

exports.search = onRequest(async (request, response) => {
  // what the user searched
  const searchTerm = request.body;

  // deposite city names from database
  let namesList = []
  const snapshot = await db.collection('Cities').get();
  snapshot.forEach(doc => {
    // get the name field from each document
    const name = doc.data().name;
    // add the name to the list
    namesList.push(name);
  });

  // empty array to store matches
  let matches = [];

  // Loop through the list
  for (let item of namesList) {
      // Check if the item contains the searchTerm
      if (item.includes(searchTerm)) {
          // If it does, push it to the matches array
          matches.push(item);
      }
  }

  // use pug to generate html table of matches
  const template = pug.compileFile("views/format_table.pug");
  const html = template({ matches });

  // return the html table
  response.send(html);
});

