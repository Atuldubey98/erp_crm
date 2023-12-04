import joi from 'joi';
const registerUserValidation = joi.object({
    firstName: joi.string().min(3).max(30).required().label('First Name'),
    lastName: joi.string().max(30).label('Last Name'),
    maidenName: joi.string().max(30).label('Maiden Name'),
    email: joi.string().email().required().max(30).label('Email'),
    password: joi.string().min(8).max(20).required().label('Password'),
    role: joi.string().valid('user', 'admin').default('user').label('Role'),
    phoneNumber: joi.string().label('Phone Number'),
});
const loginUserValidation = joi.object({
    email: joi.string().email().required().max(30).label('Email'),
    password: joi.string().min(8).max(20).required().label('Password'),
})
export { registerUserValidation, loginUserValidation };