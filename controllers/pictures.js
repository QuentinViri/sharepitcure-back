const Picture = require('../models/picture');

exports.getPictures = async (req, res) => {
    const pictures = await Picture.find();
    res.status(200).json({ pictures })
};

exports.getPicture = async (req, res) => {
    const id = req.params.id;
    const picture = await Picture.findById(id);
    res.status(200).json({ picture })
};

exports.postPicture = async (req, res) => {
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
    const id = req.params.id;
    Picture.remove({_id: id})
        .exec()
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

exports.updatePicture = async (req, res) => {
    const { name } = req.body;
    const id = req.params.id;
    const picture = Picture.findByIdAndUpdate({_id: id},
        {name : name}).exec()
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Picture with id=${_id}. Maybe Picture was not found!`
                });
            } else {
                res.send({
                    message: "Picture was updated successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not update Picture with id=" + _id
            });
        });
}