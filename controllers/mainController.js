const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const operationsDBPath = path.resolve(__dirname, '../data/operationsDB.json');
const operationsInDB = () => JSON.parse(fs.readFileSync(operationsDBPath, 'utf-8'));

const fetch = require("node-fetch");

const mainController = {

    index: function(req, res) {

        // var hostname = req.headers.host; 
        // let apiUrl = 'http://' + hostname + '/api'

        // let message = 'Tus últimas 10 operaciones:'
        
        // fetch(apiUrl)
        //     .then(function(response){
        //         return response.json()
        //     })
        //     .then(function(apiInfo){
        //         let last10 = apiInfo.data
        //         let view = {
        //             message: message,
        //             operations: last10
        //         }
        //         return res.render('index', view);
        //     })
        //     .catch(function(error){
        //         console.log('Catch Activado! Hubo un error');
        //         return res.send('Hubo un error')
        //     })

        return res.redirect('http://localhost:3000/')
    },


    // Formulario de registro de operaciones
    registerOperation: function(req, res) {

        let dateNow = new Date().toISOString().split('T')[0];
        let message = 'Ingresa los datos de la operación:'

        view = {
            message: message,
            dateNow : dateNow
        }

        return res.render('register-operation', view);
    },


    // Proceso de registro de operaciones
    createOperation: function(req, res) {

        // Errores - express-validator
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            
            let dateNow = new Date().toISOString().split('T')[0];
            
            let message = 'Vuelve a ingresar los datos de la operación:'
            view = {
                message: message,
                dateNow : dateNow,
                errores: errores.mapped(),
				originalData: req.body
            }

            return res.render('register-operation', view);
        }

        // Si no hay errores
        let dataInDB = operationsInDB()
        let lastElement = dataInDB[dataInDB.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;

        let nuevoProducto = {
            id: parseInt(nextID),
            ...req.body,
            amount: parseFloat(req.body.amount)
        }

        dataInDB.push(nuevoProducto);

        let uploadOperations = JSON.stringify(dataInDB, null , 2);
		fs.writeFileSync(operationsDBPath, uploadOperations)

        return res.redirect('/');
    },

    // Borrar una operación
    delete: (req, res) => {
        let newList = operationsInDB().filter(operation => operation.id != req.body.delete);
        let uploadOperations = JSON.stringify(newList, null , 2);
		fs.writeFileSync(operationsDBPath, uploadOperations)
		return res.redirect('/');
    },

    // Edit es la vista de la operación a editar
    editOperation: function(req, res) {
        let editOperation = operationsInDB().find(operation => operation.id == req.params.id);
        let message = 'Ingresa los nuevos datos de la operación:'
        
        let view = {
            message: message,
            operation: editOperation
        }

        // return res.send(view);
        return res.render('edit-operation', view);
    },

    // Cambios en la operación
    updateOperation: (req, res) => {
        
        let editOperation = operationsInDB().find(operation => operation.id == req.body.id);
        
        // Errores - express-validator
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            
            let message = 'Ingresa datos válidos para editar la operación:'
            
            view = {
                message: message,
                errores: errores.mapped(),
                operation: editOperation,
				originalData: req.body
            }

            return res.render('edit-operation', view);
        }

        let newOperation = {
            ...req.body,
            id: editOperation.id,
            amount: parseFloat(req.body.amount)
        }

        newDB = operationsInDB().map(function(operation){
            if (operation.id == newOperation.id){
                operation = newOperation
            }
            return operation
        })

        let uploadOperations = JSON.stringify(newDB, null , 2);
		fs.writeFileSync(operationsDBPath, uploadOperations)

        return res.redirect('/');
    },


    // Listado de ingresos
    incomesList: function(req, res) {

        // var hostname = req.headers.host; 
        // let apiUrl = 'http://' + hostname + '/api/incomesList'
        // let message = 'Tus ingresos:'
        
        // fetch(apiUrl)
        //     .then(function(response){
        //         return response.json()
        //     })
        //     .then(function(apiInfo){
        //         let incomes = apiInfo.data
        //         let view = {
        //             message: message,
        //             operations: incomes
        //         }
        //         return res.render('index', view);
        //     })
        //     .catch(function(error){
        //         console.log('Catch Activado! Hubo un error');
        //         return res.send('Hubo un error')
        //     })

        return res.redirect('http://localhost:3000/incomesList')
    },

    expensesList: function(req, res) {

        // var hostname = req.headers.host; 
        // let apiUrl = 'http://' + hostname + '/api/expensesList'
        // let message = 'Tus gastos:'

        // fetch(apiUrl)
        //     .then(function(response){
        //         return response.json()
        //     })
        //     .then(function(apiInfo){
        //         let expenses = apiInfo.data
        //         let view = {
        //             message: message,
        //             operations: expenses
        //         }
        //         return res.render('index', view);
        //     })
        //     .catch(function(error){
        //         console.log('Catch Activado! Hubo un error');
        //         return res.send('Hubo un error')
        //     })
        return res.redirect('http://localhost:3000/expensesList')
    },

    allOperations: function(req, res) {

    //     var hostname = req.headers.host; 
    //     let apiUrl = 'http://' + hostname + '/api/allOperations'
    //     let message = 'Todas las operaciones:'

    //     fetch(apiUrl)
    //         .then(function(response){
    //             return response.json()
    //         })
    //         .then(function(apiInfo){
    //             let operations = apiInfo.data
    //             let view = {
    //                 message: message,
    //                 operations: operations
    //             }
    //             return res.render('index', view);
    //         })
    //         .catch(function(error){
    //             console.log('Catch Activado! Hubo un error');
    //             return res.send('Hubo un error')
    //         })

    return res.redirect('http://localhost:3000/allOperations')

    },

    

}

module.exports = mainController