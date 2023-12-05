const Business = require("../dao/classes/business.dao.js");

const businessService = new Business();

const getBusiness = async (req, res) => {
    let result = await businessService.getBusiness();
    if (!result) return res.status(500).send({ status: 'Error', error: 'Error en getBusiness' });
    res.send({ status: 'success', result });
};

const getBusinessById = async (req, res) => {
    const { bid } = req.params;
    let result = await businessService.getBusinessById(bid);
    if (!result) return res.status(500).send({ status: 'Error', error: 'Error en getBusinessById' });
    res.send({ status: 'success', result });
};

const createBusiness = async (req, res) => {
    const business = req.body;
    let result = await businessService.saveBusiness(business);
    if (!result) return res.status(500).send({ status: 'Error', error: 'Error en createBusiness' });
    res.send({ status: 'success', result });
};

const addProduct = async (req, res) => {
    const product = req.body;
    let business = await businessService.getBusinessById(req.paras.bid);
    business.products.push(product);
    await businessService.updateBusiness(business._id, business);
    res.send({ status: 'success', result: 'Business actualizado' });
};

module.exports = {
    getBusiness,
    getBusinessById,
    createBusiness,
    addProduct
}