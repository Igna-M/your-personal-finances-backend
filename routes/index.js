var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');
const registerOperationValidation = require('../middlewares/registerOperationValidation');

const apiMainController = require('../controllers/apiControllers/mainApiController');

router.get('/', mainController.index);
router.get('/registerOperation', mainController.registerOperation);
router.post('/registerOperation', registerOperationValidation, mainController.createOperation);
router.post('/delete', mainController.delete);
router.get('/editOperation/:id', mainController.editOperation);
router.post('/updateOperation', registerOperationValidation, mainController.updateOperation);
router.get('/incomesList', mainController.incomesList);
router.get('/expensesList', mainController.expensesList);
router.get('/allOperations', mainController.allOperations);


// APIS
router.get('/api', apiMainController.lastTen);
router.get('/api/incomesList', apiMainController.incomesList);
router.get('/api/expensesList', apiMainController.expensesList);
router.get('/api/allOperations', apiMainController.allOperations);

module.exports = router;
