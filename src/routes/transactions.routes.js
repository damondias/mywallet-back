import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import transactionSchema from "../schemas/transaction.schemas.js";
import { createTransaction } from "../controllers/transactions.controllers.js";

const transactionsRouter = Router();

transactionsRouter.use(validateAuth);

transactionsRouter.post('/users/transactions', validateSchema(transactionSchema), createTransaction);

export default transactionsRouter;