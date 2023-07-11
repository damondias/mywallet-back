import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import transactionSchema from "../schemas/transaction.schemas.js";
import { createTransaction, getTransactions } from "../controllers/transactions.controllers.js";

const transactionsRouter = Router();

transactionsRouter.use(validateAuth);

transactionsRouter.post('/nova-transacao/:tipo', validateSchema(transactionSchema), createTransaction);
transactionsRouter.get('/home', getTransactions);

export default transactionsRouter;