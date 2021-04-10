const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

const setIdInParam = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const flagSensitiveData = (req,res,next) => {
    req.params.sensitiveData = true;
    next();
};

router
    .route('/register')
    .post(userController.sendEmailVerificationOTP)
    .put(userController.createUser);

router
    .route('/login')
    .post(userController.login, setIdInParam, authController.authToken);

// users routes => protected by login
router
    .route('/me')
    .get(authController.protect, setIdInParam, userController.getUserById)
    .put(authController.protect, setIdInParam, userController.updatedUserDetails);

router.route('/me/listUsers').get(authController.protect, flagSensitiveData, userController.getAllUsers);
router.route('/me/:id').get(authController.protect, flagSensitiveData, userController.getUserById);


/**
 * unprotected => will be protected by role => will be used by admin
 * */
// router
//     .route('/:id')
//     .get(userController.getUserById)
//     .put(userController.updatedUserDetails)
//     .delete(userController.deleteUser);

module.exports = router;
