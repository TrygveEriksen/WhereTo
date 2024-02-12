const checkPermission = async (req, res) => {
	try {
		const permission = req.user.permission;
		res.json({permission});
	}catch(error){
		res.json({permission: 0});
	}
}
module.exports = {checkPermission}
