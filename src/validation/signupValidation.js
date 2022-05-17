const Joi = require('joi');
const { celebrate, Segments } = require('celebrate');

const scheme =  Joi.object({
    email:Joi.string().email().required(),
    userName:Joi.string().min(2).max(25).required(),
    birthday:Joi.date(),
    password:Joi.string().pattern(new RegExp('[a-zA-Z0-9]$')),
    confirmPassword:Joi.ref('password')
}); 
const apiValidator = celebrate({
    [Segments.BODY]: scheme
});
const appValidator = (req, res, next) => {
    const { body } = req;
    req.validation = scheme.validate(body);
    next();  
};

module.exports = {
    scheme,
    apiValidator, 
    appValidator
}