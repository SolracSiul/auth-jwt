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

    async createProduct(request: Request, response:Response){
        try{
            const {name, price, image, description} = request.body;

            const product = await Product.create({
                name,
                price,
                image,
                description,
               
            });
            return response.json(product);

        }catch(e: any){
            return response.status(500).json({
                error: "Something went wrong",
                message: e.message,  // Adicionando a mensagem de erro específica
                stack: e.stack,      // Adicionando o stack trace para mais detalhes
            });

        }
    }
}

export default new ProductController;