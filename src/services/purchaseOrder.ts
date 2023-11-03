import { Buy } from "../interfaces/IPurchaseOrderDetail";
import BuyModel from "../models/PurchaseOrderDetail";
import ProductModel from "../models/Product";
import PurchaseOrderModel from "../models/PurchaseOrder";
import { getToken, verifyToken } from "./jwt.handle";
import PurchaseOrderDetailModel from "../models/PurchaseOrderDetail";

import fs from 'fs';
const PDFDocument = require('pdfkit');


const insertPurchaseOrder = async ( id: number) => {

    const response = await PurchaseOrderModel.create({user:id});
    return response.id;
}

const insertOneBuy = async (buy: Buy, idPurchaseOrder:number) => {

    const { product } = buy;

    //Se valida si ya existe un buyo con el mismo numero de lote
    const userExist = await ProductModel.findOne({where:{ id:product }});
    if (!userExist) return "PRODUCT_DONT_EXIST";

    //SE valida que haya cantidades disponibles para vender
    if (userExist.QuantityAvailable < 1) return "SOLD_OUT";

    //SE asigna el usuario que hizo la peticion, recuperado desde el token
    buy.purchaseOrder = idPurchaseOrder;

    const responInsert = await BuyModel.create(buy);
    return responInsert;
}

const insertAllBuys = async (buys: Buy, headers: any) => {
    const jwt = getToken(headers);
    
    //Se obtiene el peyload del token
    const data = verifyToken(jwt);
    let idUser: number = 0;

    if (typeof data === 'object' && 'id' in data) {
        idUser = data.id;
    }

    //Se agrega el encabezado de la orden de compra
    const idPurchaseOrder = await insertPurchaseOrder(idUser);
    console.log(idPurchaseOrder);

    if (Array.isArray(buys)) {
        //Se recorre e insertan todas las compras
        buys.map((buy: Buy) => {
            insertOneBuy(buy, idPurchaseOrder);
        })
    } else {
        insertOneBuy(buys, idPurchaseOrder);
    }    
}

const  getAllPurchaseOrders = async () => {
    const resposnsebuy = await PurchaseOrderModel.findAll({
        include:{
            model: PurchaseOrderDetailModel,
            attributes:['product', 'quantity'],
            include:{
                model:ProductModel,
                attributes:['name', 'price'],
            }
        }
    });
    return resposnsebuy;
}

const  getPurchaseOrderService = async (id: number) => {
    const resposnsebuy = await PurchaseOrderModel.findOne({
        where: { id },
        include:{
            model: PurchaseOrderDetailModel,
            attributes:['product', 'quantity'],
            include:{
                model:ProductModel,
                attributes:['name', 'price'],
            }
        }
    });

    return resposnsebuy;
}

const  getInvoiceService = async (res: any, id: number) => {
   
    const purchaseOrder = await getPurchaseOrderService(id);

    const doc = new PDFDocument();

    const outputFileName = 'invoice.pdf';

    //se crea un flujo de escritura para el PDF
    const pdfStream = fs.createWriteStream(outputFileName);

    //Se conecta el flujo de escritura al PDF
    doc.pipe(pdfStream);

    doc.fontSize(18).text(`Factura de venta # ${purchaseOrder.id}`, { align: 'center' });

    doc.moveDown(1);
    doc.fontSize(12).text('Factura generada por la venta de los siguientes productos.');

    //Se configura las cabeceras para descargar el PDF
    res.setHeader('Content-Disposition', 'attachment; filename="mi_documento.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.moveDown(1);

    //Se agregar los detalles de la orden de compra al PDF
    purchaseOrder.PurchaseOrderDetails.forEach((detail: any, index: number) => {
        const productInfo = `Detalle ${index + 1}:
            Producto: ${detail.Product.name}
            Cantidad: ${detail.quantity}
            Precio: ${detail.Product.price}
            ------------------------`;
        doc.text(productInfo);
    });

    doc.pipe(res);
    doc.end();

    pdfStream.on('finish', () => {
        console.log(`PDF generado con éxito en ${outputFileName}`);
    });

    pdfStream.on('error', (err) => {
        console.error(`Error al generar el PDF: ${err}`);
    });
}

const  getBuyById = async (id: string) => {
    const resposnsebuy = await BuyModel.findOne({where:{id}});
    return resposnsebuy;
}

export {getInvoiceService, insertAllBuys , getAllPurchaseOrders, getBuyById};