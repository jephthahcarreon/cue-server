const UserRepository = require("../repositories/userRepository");

class UserController {
    async getUsers(req, res) {
        try {
            const users = await UserRepository.getUsers()
            res.json(users);
        } catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}

module.exports = new UserController();