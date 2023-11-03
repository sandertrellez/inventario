import { Product } from "../interfaces/IProduct";
import ProductModel from "../models/Product";

const insertOneProduct = async (product: Product) => {

    const { name ,lotNumber } = product;

    //Se valida si ya existe un producto con el mismo numero de lote
    const userExist = await ProductModel.findOne({where:{ name, lotNumber }});
    if (userExist) return "PRODUCT_WITH_LOT_ALREADY_EXIST";

    const responInsert = await ProductModel.create(product);
    return responInsert;
}

const  getAllProducts = async () => {
    const resposnseproduct = await ProductModel.findAll({});
    return resposnseproduct;
}

const  getProductById = async (id: string) => {
    const resposnseproduct = await ProductModel.findOne({where:{id}});
    return resposnseproduct;
}

const updateOneProduct =async (id: String, data: Product) => {
    const resposnseproduct = await ProductModel.update(data,{
        where: {id}
    });
    return resposnseproduct;
}

const  deleteOneProduct = async (id: string) => {
    const resposnseproduct = await ProductModel.destroy({where:{id}});
    return resposnseproduct;
}
export { insertOneProduct , getAllProducts, getProductById, updateOneProduct, deleteOneProduct};