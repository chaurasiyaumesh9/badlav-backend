const express = require('express');
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { validateCreateRequest, isRequestValidated } = require('../validators/petition');
const { createPetition, getAllPetitions, deletePetition } = require('../controller/petition');
const router = express.Router();

router.post(
    "/petition/create",
    validateCreateRequest,
    isRequestValidated,
    requireSignin,
    adminMiddleware,
    createPetition
);

router.delete(
    "/petition/delete",
    requireSignin,
    adminMiddleware,
    deletePetition
);

router.get('/petitions', getAllPetitions);


module.exports = router;