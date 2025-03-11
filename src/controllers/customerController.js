const CustomerRepository = require("../repositories/customerRepository");

class CustomerController {
    async getCustomers(req, res) {
        try {
            const customers = await CustomerRepository.getCustomers()
            res.json(customers);
        } catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}

module.exports = new CustomerController();