const { executeQuery, sql } = require("../database/database");

class UserRepository {
    async getUsers(){
        const query = `
            SELECT
                U.USER_ID userId,
                U.FIRSTNAME firstname,
                U.LASTNAME lastname,
                U.EMAIL email,
                C.CUSTOMER_ID customerId,
                C.NAME customerName,
                R.ROLE_ID roleId,
                R.NAME roleName
            FROM dbo.[USER] U
            LEFT JOIN dbo.[CUSTOMER_USER_MAP] CU ON U.USER_ID = CU.USER_ID
            LEFT JOIN dbo.[CUSTOMER] C ON C.CUSTOMER_ID = CU.CUSTOMER_ID
            LEFT JOIN dbo.[ROLE] R ON R.ROLE_ID = CU.ROLE_ID
        `

        const raw = await executeQuery(query);
        const mapped = new Map();

        raw.forEach(row => {
            if (!mapped.has(row.userId)){
                mapped.set(row.userId, {
                    userId: row.userId,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    customers: []
                });
            }
            if (row.customerId){
                mapped.get(row.userId).customers.push({
                    customerId: row.customerId,
                    customerName: row.customerName,
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

module.exports = new UserRepository();