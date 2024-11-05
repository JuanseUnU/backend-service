import { Router } from "express";
import { 
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productControlles"
const productsRoutes = Router();
productsRoutes.get("products/", getAllProducts);
productsRoutes.get("products/:id", getProductByID);
productsRoutes.post("products/", createProduct);
productsRoutes.put("products/:id", updateProduct);
productsRoutes.delete("products/:id", deleteProduct);


export default productsRoutes;