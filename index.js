import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'; // Assuming body-parser is still needed
import { run } from './AI.js';
const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

app.post('/submit', async (req, res) => {
  console.log('Received data:', req.body); // Access data from req.body
  const { prompt } = req.body; // Destructure prompt property

  // Perform any logic or database operations using the prompt data
  const AIfrom = await run(prompt);
  res.send({
    message: 'Data received successfully!',
    AIfrom,});
});
  

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
