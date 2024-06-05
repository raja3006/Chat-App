const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Connect DB
require('./db/connection');

// Importing Models
const Users = require('./models/Users'); 
const Conversations = require('./models/Conversations');
const Messages = require('./models/Messages');

// app use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port = 8000; 

// Routes 
app.get('/' , (req , res) => {
    res.send('Welcome');
})


// Purpose: Registers a new user.
app.post('/api/register' , async (req , res , next ) => { //getting data from db can take time that's why we use promises here async/await
    try {
        const { fullName , email , password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).send('Please fill the required fields');
        }
        else{
            const isAlreadyExist = await Users.findOne({ email });
            if(isAlreadyExist){
                return res.status(400).send('User already exist')
            }else{
                const newUser = new Users({ fullName , email });
                bcryptjs.hash( password , 10 , (err , hashedPassword) => { // hashed upto only 10 character because below this password will not be secure and above this it the process of hashing and salting can be slow
                    newUser.set('password' , hashedPassword);
                    newUser.save();
                    next();
                });
                return res.status(200).send('User registered successfully');
            }
        }

    } catch (error) {
        console.log(error , 'Error');
    }
})

// Purpose: Logs in a user.
app.post('/api/login' , async(req , res) => {
    try {
        const { email , password } = req.body;

        if(!email || !password){
            res.status(400).send('Please fill the required fields');
        }else{
            const user = await Users.findOne({ email });
            if(!user){
                return res.status(400).send('User email or password is incorrect');
            }else{
                const validateUser = await bcryptjs.compare(password , user.password);
                if(!validateUser){
                    res.status(400).send('User password is incorrect');
                }else{
                    const payload = {
                        userId: user.id,
                        email: user.email
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_SECRET_KEY';
                    jwt.sign(payload , JWT_SECRET_KEY , { expiresIn: 84600 }, async(err , token) => {
                        await Users.updateOne({ _id: user._id}, {
                            $set: { token }
                        })
                        user.save();
                        next()
                    })
                    return res.status(200).json({ user: {email: user.email , fullName: user.fullName } , token: user.token })
                }
            }

        }
        
    } catch (error) {
        console.log(error , 'Error');
    }
})

// Purpose: Creates a new conversation between two users.
app.post('/api/conversation' , async(req , res , next) => {
    try {
        const { senderId , receiverId } = req.body; 
        const newConversation = new Conversations({ member: [senderId , receiverId ] });
        await newConversation.save();
        res.status(200).send('Conversation created successfully');
    } catch (error) {
        console.log(error , 'Error');
    }
})

//  Purpose: Retrieves conversations for a specific user.
app.get('/api/conversation/:userId' , async (req , res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ member: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.member.find((member) => member != userId);
            const user = await Users.findById(receiverId);
            return { user: { email: user.email, fullName: user.fullName }, conversationId: conversation._id }
        }))
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log(error , 'Error');
    }
})

// Purpose: Sends a message in a conversation.
app.post('/api/message' , async ( req , res ) => {
    try {
        const { conversationId , senderId , message , receiverId='' } = req.body;
        if( !senderId || !message ) return res.status(400).send('Please fill all the required fields');
        if( !conversationId && receiverId ) {
            const newConversation = new Conversations({ members: [senderId, receiverId] });
            await newConversation.save();
            const newMessage = new Messages({ conversationId: newConversation._id, senderId, message});
            await newMessage.save();
            return res.status(200).send('Message sent succcessfully');
        }else if(!conversationId && !receiverId){
            return res.status(400).send('Please fill all the required fields');
        }
        const newMessage = new Messages({ conversationId , senderId , message });
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.log(error , 'Error');
    }
})

// Purpose: Retrieves messages for a specific conversation.
app.get('/api/message/:conversationId' , async ( req , res ) => {
    try {
        const conversationId = req.params.conversationId;
        if( !conversationId ) return res.status(200).json([]);
        const messages = await Messages.find({ conversationId });
        const messageUserData = Promise.all(messages.map( async ( message ) => {
            const user = await Users.findById(messages.senderId);
            return { user: { email: user.email, fullName: user.fullName }, message: message.message};
        }));
        res.status(200).json(await messageUserData);
    } catch (error) {
        console.log('Error' , error);
    }
})

// Purpose: Retrieves all users.
app.get('/api/users', async( req , res ) => {
    try {
        const users = await Users.find();
        const usersData = Promise.all(users.map( async (user) => {
            return { user: { email: user.email, fullName: user.fullName }, userId: user._id}
        }))
        res.status(200).json(await usersData);
    } catch (error) {
        console.log(error , 'Error');
    }
})

app.listen(port , () => {
    console.log('listening on port ' +  port);
})