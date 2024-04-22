import express from 'express';
// import './db/mongoose.js';
import { Card } from "./modeloCarta.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/cards', (req, res) => {
  const note = new Card(req.body);
  Card.findById(req.body.id).then((note) => {
    if (note) {
      res.status(400).send();
    }
  })
  note.save().then((note) => {
    res.send(note);
  }).catch((error) => {
    res.send(error);
  });
});

app.get('/cards', (req, res) => {
  const filter = req.query.id?{id: req.query.id.toString()}:{};

  Card.find(filter).then((notes) => {
    console.log("ID: ", req.query.id);
    if (notes.length !== 0) {
      res.send(notes);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

app.get('/cards/:id', (req, res) => {
  Card.findById(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(500).send();
  });
});

app.patch('/cards', (req, res) => {
  if (!req.query.id) {
    res.status(400).send({
      error: 'A id must be provided',
    });
  } else {
    const allowedUpdates = ['color'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Card.findOneAndUpdate({id: req.query.id.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((note) => {
        if (!note) {
          res.status(404).send();
        } else {
          res.send(note);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

app.delete('/cards', (req, res) => {
  if (!req.query.id) {
    res.status(400).send({
      error: 'A id must be provided',
    });
  } else {
    Card.findOneAndDelete({id: req.query.id.toString()}).then((note) => {
      console.log("ID: ", req.query.id);
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


app.all('*', (_, res) => {
  res.status(501).send();
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
