import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

// traemos la tabla o entidad de la base de datos 
const productRepository = AppDataSource.getRepository(Product)

//obtener todos los productos
export const getALLProducts = async(req: Request, res: Response) => {
    try {
        const products = await productRepository.find();
        res.json(products);
    } catch(error) {
      res.status(500).json({
        message: "Error  al obtener  los productos."
      });
    }
};

//obtner un producto 

export const getALLProductBYID = async(req: Request, res: Response) => {
    try {
      const product = await productRepository.findOneBy({
        id: parseInt(req.params.id)
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
            message: "Producto  no encontrado."
        })
      }
    } catch(error) {
        res.status(500).json({
            message: "Error al obtener el producto."
        });
    }
};

// CREAR PRODUCTO
export const createProduct = async(req: Request, res: Response) => {
    try {

    } catch(error) {

    }
};
// actualizar un producto existente 
export const updateProduct = async(req: Request, res: Response) => {
    try {

    } catch(error) {

    }
};
// eliminar un producto 
export const deleteProduct = async(req: Request, res: Response) => {
    try {

    } catch(error) {

    }
};