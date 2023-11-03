import db from "../config/database"
import ProductModel from "./Product";

const { DataTypes, Model } = require('sequelize');

class PurchaseOrderDetailModel extends Model{}

PurchaseOrderDetailModel.init(
    {
        product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        purchaseOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize: db,
        modelName: "PurchaseOrderDetail"
    }
)
PurchaseOrderDetailModel.belongsTo(ProductModel, { foreignKey: 'product' });

export default PurchaseOrderDetailModel;