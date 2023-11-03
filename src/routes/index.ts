import { Router} from "express";

//libreria de fileSystem
import {readdirSync} from "fs";

//Devuelve el path actual (src/controller/routes)
const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 * Se quita la extensión a los archivos leidos .ts, .js etc
 * @param filename: string
 * @returns string
 */
const cleanFileName = (filename:string) => {
    const file = filename.split('.').shift();
    return file;
}

//Se lee el path actual y se recorren los archivos
readdirSync(PATH_ROUTER).filter((filename) => {

    const cleanName = cleanFileName(filename);
    if (cleanName !== "index"){
        //Se importan los archivos leidos y posteriormente se agregan al router
        import(`./${cleanName}`).then((moduleRoute) =>{
            router.use(`/${cleanName}`, moduleRoute.router)
        })
    }
})

export {router};