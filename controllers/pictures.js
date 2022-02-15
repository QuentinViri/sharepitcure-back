const Picture = require('../models/picture');

exports.getPictures = async (req, res) => {
    const pictures = await Picture.find();
    res.status(200).json({ pictures })
}

exports.postProfile = async (req, res) => {
    const { name } = req.body;
    const imagePath = 'http://localhost:8080/images/' + req.file.filename;
    const picture = new Picture( {
        name,
        imagePath,
    });
    const createdPicture = await picture.save();
    res.status(201).json({
        picture: {
            ...createdPicture._doc,
        },
    });
};

exports.deletePicture = async (req,res) => {
    const _id = req.params._id;
    Picture.findByIdAndRemove(_id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${_id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + _id
            });
        });
}