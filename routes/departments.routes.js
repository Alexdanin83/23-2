const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;


router.get('/departments', (req, res) => {
  req.db.collection('departaments').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.get('/departments/random', (req, res) => {
  req.db.collection('departaments').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});


router.get('/departments/:id', (req, res) => {
  req.db.collection('departaments').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departaments').insertOne({ name: name }, err => {
      if(err) res.status(500).json({ message: err });
      else res.json({ message: 'OK' });
    })
  });
router.put('/departments/:id', (req, res) => {
      const { name } = req.body;
      req.db.collection('departaments').updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }}, err => {
        if(err) res.status(500).json({ message: err });
        else res.json({ message: 'OK' });
      });
    });


    router.delete('/departments/:id', (req, res) => {
      req.db.collection('departaments').deleteOne({ _id: ObjectId(req.params.id) }, err => {
        if(err) res.status(500).json({ message: err });
        else res.json({ message: 'OK' });
      });
    });

module.exports = router;
