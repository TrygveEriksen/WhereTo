
const findOneDescription = async (req, res) => {
    try {
        const destinationName = req.params.name;

        const destination = await DestinationModel.findOne({
            name: new RegExp(destinationName, 'i')
        });
        if (destination) {
            res.json({description: destination.description});
        }
        else {
            res.status(404).json({message: "Destinasjon ikke funnet!"})
        }
    }

    catch(error) {
        res.status(500).json({error: error.message});
    }
}