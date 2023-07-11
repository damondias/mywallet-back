import joi from 'joi';

const transactionSchema = joi.object({
  amount: joi.number().positive().required(),
  description: joi.string().required(),
  type: joi.string().valid("entrada", "saida")
});

export default transactionSchema;