import UserModel from "../models/user";

const getAllUsers = async () => {
    const response = UserModel.findAll();
    return response;
    
}

const deleteOneUser = async (id: string) => {
    const response = UserModel.deleteOne({_id: id})
    return response;
}

export { getAllUsers, deleteOneUser }