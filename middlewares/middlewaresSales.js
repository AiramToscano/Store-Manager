 const validUndefinedSales = (req, _res, next) => {
     const data = req.body;
     data.forEach((e) => {
         if (e.productId === undefined) {
            return next({ statusCode: 400, 
                message: '"productId" is required' });
         }
         if (e.quantity === undefined) {
             return next({ statusCode: 400, message: '"quantity" is required' });
         }
     });
     next();
  };
  
  const validQuantityLengthSales = (req, res, next) => {
    const data = req.body;
    data.forEach((e) => {
        if (e.quantity <= 0) {
            return next({ statusCode: 422, 
                message: '"quantity" must be greater than or equal to 1' });
        }
    });
    return res.status(201).json({ message: 'produto criado' });
  };

  function isNum(val) {
    return Number.isNaN(val);
  }
 
const erro = (err, _req, res, _next) => res.status(err.statusCode).json({ message: err.message });
 
 module.exports = {
    validUndefinedSales,
    validQuantityLengthSales,
    erro,
    isNum,
 };