const businessModel = require("../models/business.models.js");

class Business {
    getBusiness = async () => {
        try {
            let result = await businessModel.find();
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };

    getBusinessById = async (id) => {
        try {
            let result = await businessModel.findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };

    saveBusiness = async (business) => {
        try {
            let result = await businessModel.create(business);
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };

    updateBusiness = async (id, business) => {
        try {
            let result = await businessModel.updateOne({ _id: id }, { $set: business });
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };
};

module.exports = Business;