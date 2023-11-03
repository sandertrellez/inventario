import db from "../config/database"

const { DataTypes, Model } = require('sequelize');

class UserModel extends Model{

}

UserModel.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        sequelize: db,
        modelName: "User"
    }
)

export default UserModel;