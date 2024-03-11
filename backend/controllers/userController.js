const UserModel = require("../models/User");

const toggleVisited = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(404).json([]);
        }
        if (user.visited.includes(req.body.id)) {
            user.removeVisited(req.body.id);
            const result = await user.save();
        } else {
            user.addVisited(req.body.id);
            const result = await user.save();
        }
        return res.json({ message: "success" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { toggleVisited };