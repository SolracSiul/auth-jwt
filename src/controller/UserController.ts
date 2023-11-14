import { Request, Response } from "express";
import User from "../models/User";
import bycript from "bcrypt"
import jwt, { verify } from 'jsonwebtoken'
require('dotenv').config()


export class UserController{
    async createUser(req: Request, res: Response){
        try{
            const {name, email, password} = req.body
    
            const userExists = await User.findOne({email})
            if(userExists){
                throw new Error('e-mail ja utilizado')
            }

            const hashPassword =  await bycript.hash(password, 10)

            const newUser =  await User.create({
                name,
                email,
                password: hashPassword
            });
            const responseUser ={
                name: newUser.name,
                email: newUser.email
            }
            return res.status(201).json(responseUser)

        }catch{
            return res.status(404)
        }
    }
    async login(req:Request, res: Response){
        try{
            const {email, password} = req.body
            
            const user = await User.findOne({email});
    
            if(!user){
                throw new Error('E-mail ou senha invalidos')
            }
            const verifyPass = await bycript.compare(password, user.password);
            if(!verifyPass){
                throw new Error('E-mail ou senha invalidos')
            }
            const responseUser ={
                id: user.id,
                name: user.name,
                email: user.email,
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '3H' });
            return res.json({
                user: responseUser,
                token: token
            });
        }catch(error: any){
            return res.status(404).json({
                error: "E-mail ou senha invalidos catch catch",
                message: error.message, 
            });
        }
    }
    async listUsers(req: Request, res: Response){
        try{
            const users = await User.find();
            return res.json(users)
        }
        catch{
            return res.status(404)
        }
    }
    async getProfile(req: Request, res:Response){
        try{
            return res.json(req.user)
        }catch(error) {
            console.error("Erro ao buscar perfil do usuário:", error);
            return res.status(500).json({
                success: false,
                message: "Erro interno do servidor.",
            });
        }
    }

}