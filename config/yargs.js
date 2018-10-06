const description = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completed = {
    default: true,
    alias: 'c',
    desc: 'Marcar como terminada una tarea'
}

const { argv } = require('yargs')
    .command('create', 'Crear un elemento por hacer', {
        description,
    })
    .command('list', 'Listar elementos por hacer')
    .command('delete', 'Eliminar elemento por hacer', {
        description
    })
    .command('update', 'Actualiza el estado de un elemento', {
        description,
        completed
    })
    .help()

module.exports = {
    argv
}