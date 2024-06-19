require('dotenv').config();
const express = require('express');
const http = require('http');  // Use http instead of https
const loginRouter = require('./routes/auth');
const rulesRouter = require('./routes/rules');
const connectDB = require('./db/connect');
const socket = require('socket.io');
const path = require('path');
const Rules = require('./models/Rules');
const { classifyData } = require('./services/classificationEngine');

const app = express();
const server = http.createServer(app);  // Create HTTP server
const io = socket(server);

// Middleware to parse JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));


app.get('/', (req, res) => {
    res.send("home !!");
});

app.use('/api/dsl_proj', loginRouter);
app.use('/api/rules', rulesRouter);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log(`Server is Running on port ${port}`);
        });
    } catch (err) {
        console.log(`error starting server ${err}`);
    }
};
start();

io.on('connection', (socket) => {
    console.log("new client connected");

    socket.on('data', async(data)=>{
        try{
            const userRule = await Rules.find({user: data.userId});
            console.log(userRule)
            const classfiedCategory = classifyData(data.payload, userRule);
            socket.emit('classified', {category: classfiedCategory});
        }catch(err){
            console.log(err);
            socket.emit('error', 'Failed to Classify Data');
        }
    });

    socket.on('disconnect',()=>{
        console.log('Client disconnected');
    });
});
