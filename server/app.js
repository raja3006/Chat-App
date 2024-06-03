const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Connect DB
require('./db/connection');

// Import Models
const Users = require('./models/Users'); 
const Conversations = require('./models/Conversations');

// app use
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port = process.env.port || 8000; 

// Routes 
app.get('/' , (req , res) => {
    res.send('Welcome');
})

app.post('/api/register' , async (req , res , next) => { //getting data from db can take time that's why we use promises here async/await
    try {
        const { fullName , email , password } = req.body;

        if(!fullName || !email || !password){
            res.status(400).send('Please fill the required fields');
        }
        else{
            const isAlreadyExist = await Users.findOne({ email });
            if(isAlreadyExist){
                res.status(400).send('User already exist')
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

app.post('/api/login' , async(req , res , next) => {
    try {
        const { email , password } = req.body;

        if(!email || !password){
            res.status(400).send('Please fill the required fields');
        }else{
            const user = await Users.findOne({ email });
            if(!user){
                res.status(400).send('User email or password is incorrect');
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
                    res.status(200).json({ user: {email: user.email , fullName: user.fullName } , token: user.token })
                }
            }

        }
        
    } catch (error) {
        console.log(error , 'Error');
    }
})

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

app.get('/api/conversation/:userId' , async (req , res) => {
    try {
        const userId = req.params.userId;
        const conversation = await Conversations.find({ member: { $in: [userId] } });
        res.status(200).json(conversations);
    } catch (error) {
        console.log(error , 'Error');
        
    }
})

app.listen(port , () => {
    console.log('listening on port ' +  port);
})