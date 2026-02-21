import {Request, Response} from 'express' 
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
        });
        await newUser.save();

        req.session.isLoggedIn = true;
        req.session.userId = String(newUser._id);

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Could not complete registration' });
            }
            return res.json({
                message: 'Account created successfully',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            });
        });
    } catch (error: any) {
        console.error('Registration error:', error);

        // MongoDB duplicate key (e.g. email unique index)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        // Mongoose validation error
        if (error.name === 'ValidationError') {
            const firstError = Object.values(error.errors)[0] as any;
            const message = firstError?.message || 'Invalid input';
            return res.status(400).json({ message });
        }

        const message = error.message || 'Registration failed';
        return res.status(500).json({ message });
    }
}


export const loginUser = async (req: Request, res: Response) =>{
    try {
         const { email, password } = req.body;
        const normalizedEmail = email?.trim?.()?.toLowerCase?.();

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user){
           return res.status(400).json({message:'Invalid email or password'})
        }
        
        if (!user.password) {
            return res.status(400).json({message:'Invalid email or password'})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
          
           return res.status(400).json({message:'Invalid email or password'})
          
        }



        req.session.isLoggedIn = true;
        req.session.userId = String(user._id);

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Could not complete login' });
            }
            return res.json({
                message: 'Login successful',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return res.status(500).json({ message: error.message || 'Login failed' });
    }
}


export const logoutUser = async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out' });
            }
            return res.json({ message: 'Logged out successfully' });
        });
    } catch (error: any) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: error.message || 'Logout failed' });
    }
}


export const verifyUser = async (req: Request, res: Response) => {
    try {
        if (!req.session.isLoggedIn || !req.session.userId) {
            return res.status(401).json({message: 'Not authenticated'})
        }

        const user = await User.findById(req.session.userId).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        return res.json({
            message: 'User verified',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: any) {
        console.error('Verify error:', error);
        return res.status(500).json({ message: error.message || 'Verification failed' });
    }
}
