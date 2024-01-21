import Joi from 'joi';


export const loginUserSchema = Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().min(6).max(20).required()
})

export const registerUserSchema = loginUserSchema.keys({

    name: Joi.string().required(),

    isAdmin: Joi.bool().required()
})