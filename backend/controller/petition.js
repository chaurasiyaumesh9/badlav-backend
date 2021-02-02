const Petition = require("../models/petition");
const shortid = require("shortid");
const slugify = require("slugify");
const mongodb = require('mongodb');

exports.createPetition = (req, res) => {
    const { title, type, recipients, problem, photo } = req.body;

    const petition = new Petition({
        title: title,
        slug: slugify(title),
        type,
        photo,
        recipients,
        problem,
        createdBy: req.user._id,
        contactNumber: req.user.contactNumber,
        email: req.user.email
    });

    petition.save((error, petition) => {
        if (error) return res.status(400).json({ error });
        if (petition) {
            res.status(201).json({ petition});
        }
    });
}

exports.deletePetition = (req, res) => {
    const { petitionId } = req.body.payload;
    if (petitionId) {
        Petition.deleteOne({_id: new mongodb.ObjectID(petitionId)}).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
            res.status(202).json({ result });
        }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
}

exports.getAllPetitions = (req, res) => {
    Petition.find({}).exec((error, petitions) => {
        if (error) return res.status(400).json({ error });
        if (petitions) {
          res.status(200).json({ petitions });
        }
    });
}