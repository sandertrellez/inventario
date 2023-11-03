import db from "../config/database"

const { DataTypes, Model } = require('sequelize');

class ProductModel extends Model{}

ProductModel.init(
    {
        lotNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        QuantityAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DateOfEntry: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },{
        sequelize: db,
        modelName: "Product"
    }
)

export default ProductModel;