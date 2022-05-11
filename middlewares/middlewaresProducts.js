const validNameUndefined = (req, _res, next) => {
   const { name } = req.body;
   if (name === undefined) return next({ statusCode: 400, message: '"name" is required' });
   next();
};

const validNameLength = (req, _res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return next({ statusCode: 422, 
    message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validQuantityUndefined = (req, _res, next) => {
    const { quantity } = req.body;
    if (quantity === undefined) return next({ statusCode: 400, message: '"quantity" is required' });
    next();
 };
 
 const validQuantityLength = (req, _res, next) => {
   const { quantity } = req.body;
   if (quantity <= 0) {
     return next({ statusCode: 422, 
     message: '"quantity" must be greater than or equal to 1' });
   }
   return next();
 };

module.exports = {
    validNameUndefined,
    validNameLength,
    validQuantityUndefined,
    validQuantityLength,

};
