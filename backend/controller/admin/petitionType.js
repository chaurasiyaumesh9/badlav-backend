const PetitionType = require("../../models/petitionType");
const shortid = require("shortid");
const slugify = require("slugify");
const mongodb = require('mongodb');

exports.createPetitionType = (req, res) => {
    const { title, icon } = req.body;

    const petitionType = new PetitionType({
        title: title,
        slug: slugify(title),
        icon,
        createdBy: req.user._id,
    });

    petitionType.save((error, petitionType) => {
        if (error) return res.status(400).json({ error });
        if (petitionType) {
            res.status(201).json({ petitionType});
        }
    });
}

exports.deletePetitionType = (req, res) => {
    const { petitionTypeId } = req.body.payload;
    if (petitionTypeId) {
        PetitionType.deleteOne({_id: new mongodb.ObjectID(petitionTypeId)}).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
            res.status(202).json({ result });
        }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
}

exports.getAllPetitionTypes = (req, res) => {
    PetitionType.find({}).exec((error, petitionTypes) => {
        if (error) return res.status(400).json({ error });
        if (petitionTypes) {
          res.status(200).json({ petitionTypes });
        }
    });
}