import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
// v Trae la tabla/entidad 'Producto' de la base de datos v //
const productRepository = AppDataSource.getRepository(Product);
// ^ ___________________________________________________ ^ //

// GET Significa | Listar | Traer | Leer |
// POST Significa | Enviar | Crear |
// PUT Significa | Actualizar |  
// DELETE Significa | Remover | Eliminar | 
//Códigos 200 | Procedimientos exitosos
//Códigos 400 | No se ha encontrado lo que se busca
//Códigos 500 | Error de servidor

// v Obtener todos los productos (GET) v //
export const getAllProducts = async (req: Request, res: Response) => {
  try { 
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
        message: "Error al obtener los productos."
    });
  }
 };

// v Obtener un producto (GET) v //
export const getProductByID = async (req: Request, res: Response) => {
    try {
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id)
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
                message: "Producto no encontrado."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el producto."
        });
    }
 };

// v Crear un producto (POST) v //
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {name, description, price} = req.body;
        const product = new Product();
        product.name = name;
        product.description = description;
        product.price = price;
        await productRepository.save(product);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto."
        });
    }
 };

  // v Actualizar un producto existente (PUT) v //
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const{name,description,price} = req.body;
        // v Buscar producto para actualizar v //
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id)
        });
        // v Validar si el producto existe y tenga información v //
        if (product) {
            product.name = name ?? product.name;
            product.description = description ?? product.description;
            product.price = price ?? product.price;
            // v Guardamos los cambios del producto v //
            await productRepository.save(product);
            res.json(product);
        } else {
            res.status(404).json({
                message: "No se encontró el producto."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto."
        });
    }
 };

  // v Eliminar un producto existente (DELETE) v //
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        // v Buscar producto para eliminar v //
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id)
        });
        // v Validar si el producto existe y tenga información v //
        if (product) {
            await productRepository.remove(product);
            res.json({
                message: "El producto ha sido eliminado."
            });
        } else {
            res.status(404).json({
                message: "No se encontró el producto."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto."
        });
    }
 };