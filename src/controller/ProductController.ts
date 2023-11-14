import { Request, Response } from "express";
import Product from "../models/Product";
import bycript from "bcrypt"

export class ProductController{

    async createProduct(req: Request, res: Response){
        try{
            const {name, price, image, description, qtd} = req.body
    
            const productExists = await Product.findOne({name})
            if(productExists){
                throw new Error('Produto ja cadastrado')
            }
            const newProduct =  await Product.create({
                name,
                price,
                image,
                description,
                qtd
            });
            
            return res.status(201).json(newProduct)

        }catch{
            return res.status(404)
        }
    }
    async listProduct(req:Request, res: Response){
        try{
            const products = await Product.find();
            return res.json(products)
        }catch{
            return res.status(404)  
        }
    }

}