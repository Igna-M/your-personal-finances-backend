const fs = require('fs');
const path = require('path');
const operationsDBPath = path.resolve(__dirname, '../data/operationsDB.json');
const operationsInDB = () => JSON.parse(fs.readFileSync(operationsDBPath, 'utf-8'));


const mainModel = {
    findAll: function(){
        return operationsInDB()
    },

    findOne: function(){

    },

    findByPk: function(){

    }
}

module.exports = mainModel;