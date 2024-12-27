import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './conf';
import Claim from './model/Claim';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

try {
  console.log('Trying to connect to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  await mongoose.connection.db?.admin().command({ ping: 1 });
  console.log('Connected successfully to MongoDB!');
} catch (error) {
  console.dir('Error connecting to MongoDB', error);
  await mongoose.disconnect();
}

app.get('/api/v1/claims', async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims.map((claim) => claim.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/v1/claim/:id', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    res.json(claim?.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/v1/claim', async (req, res) => {
  try {
    const claim = await new Claim(req.body).save();
    res.json(claim?.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/v1/claim/:id/vote/:type', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      throw new Error('Claim not found');
    }

    switch (req.params.type) {
      case 'upvote':
        claim.votes = claim.votes + 1;
        break;
      case 'downvote':
        claim.votes = claim.votes - 1;
        break;
      default:
        throw new Error('Invalid vote type');
    }

    await claim.save();
    res.json(claim.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/v1/claim/:id/message', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      throw new Error('Claim not found');
    }

    if (req.body.message.length < 3) {
      throw new Error('Invalid message length');
    }

    claim.messages.push({
      content: req.body.message,
    });

    await claim.save();
    res.json(claim.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
