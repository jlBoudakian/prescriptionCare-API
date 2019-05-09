const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// IMPORT USER-SERVICES
const userServices = require('./user-services');
// USERS ROUTES
router.route('/users')
    .get(userServices.read)
    .post(userServices.create);
router.route('/users/:id')
    .get(userServices.readById)
    .put(userServices.update)
    .delete(userServices.remove);


// IMPORT MEDICINE-SERVICES
const medicineServices = require('./medicine-services');
// MEDICINE ROUTES
router.route('/medicines')
    .get(medicineServices.read)
    .post(medicineServices.create);
router.route('/medicines/:id')
    .get(medicineServices.readById)
    .put(medicineServices.update)
    .delete(medicineServices.remove);

// IMPORT SCHEDULING-SERVICES
const scheduleServices = require('./scheduling-services');
// SCHEDULE ROUTES
router.route('/scheduling')
    .get(scheduleServices.read)
    .post(scheduleServices.create);
router.route('/scheduling/:id')
    .get(scheduleServices.readById)
    .put(scheduleServices.update)
    .delete(scheduleServices.remove);

// IMPORT AUTHENTICATION-SERVICES
const authenticationServices = require('./authentication-services');
// AUTHENTICATION ROUTES
router.route('/authentication')
    // .get(scheduleServices.read)
    .post(authenticationServices.read);
// router.route('/scheduling/:id')
//     .get(scheduleServices.readById)
//     .put(scheduleServices.update)
//     .delete(scheduleServices.remove);

module.exports = router;