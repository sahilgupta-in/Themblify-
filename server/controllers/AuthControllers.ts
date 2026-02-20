import {Request, Response} from 'express' 
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;

        const user = await User.findOne({email});
        if (user){
           return res.status(400).json({message:'User already exits'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({name, email, password: hashedPassword})
        await newUser.save()

        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;


        return res.json({
            message:'Account created Successfully',
            user: {
                _id:newUser._id,
                name: newUser.name,
                email:newUser.email 
            }
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }
}


export const loginUser = async (req: Request, res: Response) =>{
    try {
         const { email, password} = req.body;

        const user = await User.findOne({email});
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
        req.session.userId = user._id;


        return res.json({
            message:'Login Successfully',
            user: {
                _id:user._id,
                name: user.name,
                email:user.email 
            }
        })
        
    } catch (error: any) {
         console.log(error);
        res.status(500).json({message: error.message})
    }
}


export const logoutUser = async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({message: 'Could not log out'})
            }
            return res.json({message: 'Logged out successfully'})
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message})
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
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}
