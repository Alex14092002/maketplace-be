import { Router } from "express";
import foodController from "../controllers/foodController.mjs";


const router = Router();

router.get('/' , foodController.getAll)
router.patch('/update/:id' , foodController.edit)
router.post('/create' , foodController.create)
router.delete('/delete/:id' , foodController.delete)


export default router