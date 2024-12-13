const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'Nandu';

const users = [{id : 1, user: 'Nandini', password: 'Nan123'}];

app.post('/login', (req,res)=> {
    const { user , password} = req.body;
    const name = users.find(u=> u.user === user && u.password === password);
    if (token){
        const token = jwt.sign({ id : name.id, user: name.user}, SECRET_KEY, {expiresIn : '1h'});
        res.json({token});
    }else{
        res.status(401).send('Invalid credentials');
    }
});

app.get('/protected', (req,res)=> {
    const token = req.headers ['authorization'];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err){
                return res.status(401).send('Invalid token');
            }else{
                res.send('This is a protected route');
            }
        });
    }else {
        res.status(401).send('No token provided');
    }
});

app.listen(3000, ()=>{
    console.log('server running on port 3000');
});