import { Request, Response, NextFunction } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = req.session as any;
        if (!session || !session.isLoggedIn || !session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        next();
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
