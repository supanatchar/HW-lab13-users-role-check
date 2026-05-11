export default function checkAdmin(req, res, next) {
    const role = req.headers['x-user-role'];
    
    if(role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Permission denied: Admin only' });
    }
}