import { Request, Response, NextFunction } from "express";
import jwt, { verify } from 'jsonwebtoken'
import User from "../models/User";

type JwtPayload= {
    id: Number
}
export const authMiddleware = async(req: Request, res: Response, next: NextFunction) =>{
    const {authorization} = req.headers
            
            if(!authorization){
                throw new Error("nao autorizado")
            }
            //pegando a posicao do token que eh retornado no authorization
            const token = authorization.split(' ')[1]
            console.log(token)
            const { id } = verify(token, process.env.JWT_PASS ?? '') as JwtPayload
    
            const user = await User.findById(id);
            
            if(!user){
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                });
            }
            const responseUser ={
                id: user.id,
                name: user.name,
                email: user.email,
            }
            req.user = responseUser
            next()
}