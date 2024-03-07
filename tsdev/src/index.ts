import express, {Express, Request, Response, NextFunction} from 'express' ;
import { Queue } from "./queue";

const bodyParser = require('body-parser');

const app = express()
const path = require('path');
const port = 3000


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let emptyQueue: Queue<string> = new Queue<string>();
emptyQueue.setCapacity(3);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    let count = emptyQueue.length();
    let lastElement = emptyQueue.peek();
    if (lastElement == null ){
        lastElement = "Die Queue ist leer"
    }
    res.render('index.html', {count: count, totalCount: 3, lastElement: lastElement});

})

app.post('/queue/enqueue', (req, res) => {
    //res.render('index.html', {name: "daniel"});
    console.log(req.params)
    emptyQueue.enqueue("a");
    res.send("added")

})

app.get('/queue/dequeue', (req, res) => {
    emptyQueue.dequeue();
    res.send("removed ");
})

app.get('/queue/peek', (req, res) => {
    res.send(emptyQueue.peek())

})
