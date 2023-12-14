import { Router} from 'express'
import UserController from './controller/UserController';
import { authMiddleware } from './middlewares/authMiddleware';
import ProductController from './controller/ProductController';
const routes = Router();

routes.get("/products", ProductController.findAll);
routes.post("/product", ProductController.createProduct);
routes.delete("/product/:id", ProductController.DeleteById); 
routes.get("/product/:id", ProductController.SearchById); 
//ou use routes.use(authMiddleware) e terá autenticação em todas rotas abaixo.

routes.post("/user", UserController.createUser);
routes.get("/users", UserController.findAllUser);
routes.put("/user/:id", UserController.UpdateById);
routes.get("/user/:id", UserController.UpdateById);
routes.get("/profile", authMiddleware,  UserController.getProfile);
routes.post("/login", UserController.loginUser);
// routes.put('/user/:id', UserController.UpdateById);    
// routes.get('/user/:id', UserController.SearchById); 

export default routes;