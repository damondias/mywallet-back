import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { db } from '../database/database.connection.js';


export async function createTransaction(req, res) {
    const transaction = req.body;
    const { user } = res.locals;
  
    try {
      const amountInCents = transaction.amount * 100;
      const newTransaction = {
        ...transaction,
        id: uuid(),
        amount: amountInCents,
        createdAt: dayjs().format("DD/MM")
      };
  
      await db.collection("users").updateOne(
        { _id: user._id },
        {
          $push: { transactions: newTransaction }
        }
      );
  
      res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
  }

  export async function getTransactions(req, res) {
    const { user } = res.locals;
  
    try {
      let totalSum = 0;
      user.transactions.forEach(transaction => {
        if (transaction.type === 'entrada') {
          totalSum += transaction.amount;
        } else {
          totalSum -= transaction.amount;
        }
      })
  
      const formattedUser = { ...user, totalSum };
      delete formattedUser.password;
  
      res.send(formattedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }  
  