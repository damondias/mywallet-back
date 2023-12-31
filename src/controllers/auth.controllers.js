import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid"
import { db } from "../database/database.connection.js"

export async function signUp(req, res) {
    const user = req.body;
    const { email} = user ;
  
    try {
      const checkuser = await db.collection("users").findOne({ email });
      if (checkuser) return res.sendStatus(409);

      const passwordHash = bcrypt.hashSync(user.password, 10);
  
      await db.collection("users").insertOne({ ...user, password: passwordHash, transactions: [] });
  
      res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(500);
      
    }
  }
  
  export async function signIn(req, res) {
    const { email, password } = req.body;
  
    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) return res.sendStatus(404);
      
        if (bcrypt.compareSync(password, user.password)) {
          const token = uuid();
          await db.collection("sessions").insertOne({ token, userId: user._id });
          return res.send(token);
        }
      
        res.sendStatus(401);
    } catch (error) {
        return res.sendStatus(500);
    }

  }