import express from 'express'
import logger from './middlewares/logger.js';
import checkAdmin from './middlewares/checkAdmin.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

const users = [
    { name: 'Alice', email: 'alice@gmail.com', role: 'user' },
    { name: 'Bob', email: 'bob@gmail.com', role: 'admin' }
];

app.get('/' , (req, res) => {
    res.send('Welcome Api v0.1.0')
})

app.get('/users' , (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {
    const { name, email, role } = req.body;
    users.push({ name, email, role });
    res.status(201).json({ message: 'User added' });
})

app.delete('/users/:email', checkAdmin, (req, res) => {
    const {email} = req.params;

    const index = users.findIndex(u => u.email === email)
    
    if(index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User Deleted!'})
    } else {
        res.status(404).json({ message: 'User Not Found'})
    }
})

app.get('/me', (req, res) => {
    const role = req.headers['x-user-role'] || 'guest';
    res.json({ role });
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})