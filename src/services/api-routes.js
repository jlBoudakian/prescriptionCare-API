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
// USERS ROUTES
router.route('/medicines')
    .get(medicineServices.read)
    .post(medicineServices.create);
router.route('/medicines/:id')
    .get(medicineServices.readById)
    .put(medicineServices.update)
    .delete(medicineServices.remove);


    module.exports = router;