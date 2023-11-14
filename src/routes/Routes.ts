import { Router } from "express";
import { UserController } from "../controller/UserController";
import { ProductController } from "../controller/ProductController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router()

routes.post('/user',new UserController().createUser)
routes.get('/getprofile',new UserController().getProfile)
routes.get('/users',new UserController().listUsers)
routes.post('/login',new UserController().login)
routes.post('/product', new ProductController().createProduct)
routes.get('/products', new ProductController().listProduct)
export default routes