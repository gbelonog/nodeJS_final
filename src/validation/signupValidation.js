const Joi = require('joi');
const { celebrate, Segments } = require('celebrate');

const scheme =  Joi.object({
    //email:joi.string().email().required(),
    userName:Joi.string().min(2).max(25).required(),
    //birthday:joi.date(),
    password:Joi.string().pattern(new RegExp('[a-zA-Z0-9]$')),
    //confirmPassword:joi.ref('password')
}); 
const apiValidator = celebrate({
    [Segments.BODY]: scheme
});
const appValidator = (req, res, next) => {
    //console.log('req in validator', req);
    const { body } = req;
    //console.log('body in validator', body);
    req.validation = scheme.validate(body);
    console.log('req.validation in validator', req.validation);
    next();  
};

module.exports = {
    scheme,
    apiValidator, 
    appValidator
}