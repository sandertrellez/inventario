import db from "../config/database"
import PurchaseOrderDetailModel from "./PurchaseOrderDetail";

const { DataTypes, Model } = require('sequelize');

class PurchaseOrderModel extends Model{}

PurchaseOrderModel.init(
    {
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize: db,
        modelName: "PurchaseOrder"
    }
)

PurchaseOrderModel.hasMany(PurchaseOrderDetailModel, { foreignKey: 'purchaseOrder' });

export default PurchaseOrderModel;