import express from 'express'
import logger from './middlewares/logger.js';
import checkAdmin from './middlewares/checkAdmin.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

let users = [
    { name: 'Alice', email: 'alice@gmail.com', role: 'user' },
    { name: 'Bob', email: 'bob@gmail.com', role: 'admin' }
];

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
    users = users.filter(user => user.email !== email);
    res.json({ message: `Deleted user: ${email}`})
})

app.get('/me', (req, res) => {
    const role = req.headers['x-user-role'] || 'guest';
    res.json({ role });
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})