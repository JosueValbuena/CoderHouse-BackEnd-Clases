const Router = require('express').Router;
const {
    getBusiness,
    getBusinessById,
    createBusiness,
    addProduct
} = require('../controllers/business.controller.js');

const businessRouter = Router();

businessRouter.get('/', getBusiness);
businessRouter.get('/:bid', getBusinessById);
businessRouter.post('/', createBusiness);
businessRouter.post('/:bid/product', addProduct);

module.exports = businessRouter;