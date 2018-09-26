var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://192.168.1.8:27017/';
const dbName = 'rankvari';
const collectionName = 'wordjavavari';

/* GET home page. */
router.get('/', function(req, res, next) {

  MongoClient.connect(URL, function(err, client) {
    if(err) {
      console.error(err);
      return ;
    }

    console.log("Connected successfully to server");


    const x = [];
    const pv = [];

    const db = client.db(dbName);
    db.collection(collectionName).find().sort({count: -1}).limit(20).toArray(function(err, docs) {
      if(err) {
        console.error(err);
      }

      docs.map(function(doc) {
        x.push({value: doc.vari});
        pv.push({value: doc.count});
      });

      console.log(docs);
    });

    client.close();
    res.render('index', { title: 'Express', x: x, pv: pv });
  });
});

module.exports = router;
