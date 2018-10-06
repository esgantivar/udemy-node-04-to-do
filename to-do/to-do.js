const fs = require('fs')
let listTODO = [];

const create = async(description) => {
    loadDB();
    let todo = {
        description,
        completed: false
    }
    listTODO.push(todo);
    await saveDB();
    return todo;
}

const saveDB = () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listTODO);
        fs.writeFile('db/data.json', data, err => {
            if (err) {
                reject('No se pudo guardar la informacion')
                return;
            }
            resolve('Informacion guardada con exito');
        });
    });
}

const loadDB = () => {
    try {
        listTODO = require('../db/data.json')
    } catch (e) {
        listTODO = []
    }
}

const update = async(description, completed) => {
    let status
    if (typeof completed === 'boolean') {
        status = completed;
    } else {
        status = completed === 'true';
    }
    loadDB();
    let index = listTODO.findIndex((task) => {
        return task.description === description;
    });
    if (index >= 0) {
        const task = listTODO[index]
        task.completed = status;
        await saveDB()
        return task;
    } else {
        throw new Error('No existe una tarea asociada');
    }
}

const deleteItem = async(description) => {
    loadDB();
    let index = listTODO.findIndex((task) => {
        return task.description === description;
    });
    if (index >= 0) {
        listTODO.splice(index, 1)
        await saveDB()
        return 'Elemento borrado';
    } else {
        throw new Error('No existe una tarea asociada');
    }
}

const getList = () => {
    loadDB();
    return listTODO;
}



module.exports = {
    create,
    getList,
    update,
    deleteItem
}