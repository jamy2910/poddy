import multer from "multer";

const memStore = multer.memoryStorage();

export const upload = multer({storage: memStore});