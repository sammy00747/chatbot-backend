const express = require("express");
const cors = require("cors");
const db = require("./services/db");
const user = require("./controllers/user");
const messages = require("./controllers/messages");
const auth = require("./middleware/auth");
const chatgpt = require("./services/chatgpt");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("Hello world!!");
});

app.post('/login',user.login);

app.post('/register',user.signup);

app.get('/get-messages',auth,messages.getMessages);

app.post('/post-message',auth,messages.postMessage);

app.listen(process.env.PORT || 8080, () => {
    console.log("chatapp server started!")
    db.main();
    chatgpt.main();
})