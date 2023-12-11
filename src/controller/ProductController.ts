import { Request, Response } from "express";
import Product from "../database/schemas/Product";

class ProductController{
    async DeleteById(request: Request, response: Response) {
        try {
            const postId = request.params.id;

            const post = await Product.findById(postId);

            if (!post) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }

            await Product.findByIdAndRemove(postId);

            return response.json({
                message: 'Usuário removido com sucesso',
            });
        } catch (error) {
            return response.status(500).json({
                error: 'Alguma coisa deu errado',
                message: error,
            });
        }
    }

    // async UpdateById(request: Request, response: Response) {
    //     try {
    //         const userId = request.params.id;
    //         const updatedUserData = request.body;

           
    //         const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    //             new: true, 
    //         });

    //         if (!updatedUser) {
    //             return response.status(404).json({
    //                 error: 'Usuário não encontrado',
    //             });
    //         }

    //         return response.json(updatedUser);
    //     } catch (error) {
    //         return response.status(500).json({
    //             error: 'Alguma coisa deu errado',
    //             message: error,
    //         });
    //     }
    // }

    async SearchById(request: Request, response: Response) {
        try {
            const productId = request.params.id;

            const product = await Product.findById(productId);

            if (!product) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }

            return response.json(product);
        } catch (error) {
            return response.status(500).json({
                error: 'Alguma coisa deu errado',
                message: error,
            });
        }
    }
    
    async findAll(request: Request, response: Response){
        try{
            const products = await Product.find();
            return response.json(products);

        }catch(error){
            return response.status(500).json({
                error: "Alguma coisa deu errado",
                message: error,
            })
        }
    }

    async createPost(request: Request, response:Response){
        try{
            const {name, price, image, description} = request.body;
    
            const productExist = await Product.findOne({name});
            if(productExist){
               throw new Error('Product já existe')
            }
            const product = await Product.create({
                name,
                price,
                image,
                description,
               
            });
            return response.json(product);

        }catch(e){
            return response.status(500).json({
                error: "something wrong",
                message: e,
            })

        }
    }
}

export default new ProductController;