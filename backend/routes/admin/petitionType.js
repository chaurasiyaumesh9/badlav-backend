const express = require('express');
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { validateCreateRequest, isRequestValidated } = require('../../validators/petitionType');
const { createPetitionType, getAllPetitionTypes, deletePetitionType } = require('../../controller/admin/petitionType');
const router = express.Router();

router.post(
    "/admin/petitiontype/create",
    requireSignin,
    adminMiddleware,
    validateCreateRequest,
    isRequestValidated,
    createPetitionType
);

router.delete(
    "/admin/petitiontype/delete",
    requireSignin,
    adminMiddleware,
    deletePetitionType
);

router.get('/petitiontypes', getAllPetitionTypes);


module.exports = router;