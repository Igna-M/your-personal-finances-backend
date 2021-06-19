const { body } = require('express-validator');

module.exports = [
	body('concept').notEmpty().withMessage('La operación debe tener un nombre'),
	body('amount')
		.notEmpty().withMessage('¿Cuál es el monto?').bail()
		.isNumeric().withMessage('Dime un numero'),
    body('date')
		.notEmpty().withMessage('¿Cuándo sucedió?').bail()
		.isDate().withMessage('Ingresa una gecha'),
    body('kind')
        .notEmpty().withMessage('Debes ingresar el tipo de operación').bail()
        .isIn(['egreso', 'ingreso']).withMessage('Selecciona una de las opciones existentes')
]