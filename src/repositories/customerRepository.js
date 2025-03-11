const executeQuery = require("../database/database");

class CustomerRepository {
    async getCustomers(){
        const query = `
            SELECT
                C.CUSTOMER_ID customerId,
                C.NAME customerName,
                U.USER_ID userId,
                U.FIRSTNAME firstname,
                U.LASTNAME lastname,
                U.EMAIL email,
                R.ROLE_ID roleId,
                R.NAME roleName
            FROM CUSTOMER C
            LEFT JOIN CUSTOMER_USER_MAP CU ON C.CUSTOMER_ID = CU.CUSTOMER_ID
            LEFT JOIN USER U ON U.USER_ID = CU.USER_ID
            LEFT JOIN ROLE R ON R.ROLE_ID = CU.ROLE_ID
        `

        const raw = await executeQuery(query);
        const mapped = new Map();

        raw.forEach(row => {
            if (!mapped.has(row.customerId)){
                mapped.set(row.customerId, {
                    customerId: row.customerId,
                    customerName: row.customerName,
                    users: []
                });
            }
            if (row.userId){
                mapped.get(row.customerId).users.push({
                    userId: row.userId,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    role: {
                        roleId: row.roleId,
                        roleName: row.roleName
                    }
                })
            }
        })

        return Array.from(mapped.values());
    }
}

module.exports = new CustomerRepository();