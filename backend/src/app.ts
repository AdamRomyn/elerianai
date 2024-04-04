import * as express from 'express';
import { mainRouter } from './routes';
import * as cors from 'cors';
import { pollsStore } from './polls/polls.store';
import * as pollSeedData from './polls/polls.seed.json';

const port = 3000;
const app = express();

// Middlware
app.use(express.json());
app.use(cors());

// Routers
app.use('/api', mainRouter)
app.use('/', (req,res)=>res.send("API Working, lets goooo!"))
app.use((req,res)=> res.status(404).send({message: "Not Found"}))

app.listen(port, () => {
  // After app starts up seed the poll store
  pollsStore.polls = pollSeedData;
  console.log(pollsStore);
  return console.log(`Express is listening at http://localhost:${port}`);
});