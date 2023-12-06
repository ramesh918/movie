import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

// Secret key for JWT
const JWT_SECRET = 'your-secret-key'; // Replace with a strong secret key

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({
        email: email 
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({id:user._id, role:user.role, email:user.email}, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error logging in' });
  }
}
