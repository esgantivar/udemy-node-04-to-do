const { argv } = require('./config/yargs')
const { colors } = require('colors');
const TODO = require('./to-do/to-do')
const command = argv._[0];
switch (command) {
    case 'create':
        TODO.create(argv.description).then((task) => {
            console.log(task)
        });
        break;
    case 'list':
        console.log('============ TODO List ============'.blue);
        for (const item of TODO.getList()) {
            console.log(`${item.description.gray}, ${item.completed ? 'Completado'.green: 'Sin Completar'.red}`);
        }
        console.log('========== End TODO List =========='.blue);
        break;
    case 'update':
        TODO.update(argv.description, argv.completed).then((task) => {
            console.log(task);
        }).catch((error) => {
            console.log(error);
        });
        break;
    case 'delete':
        TODO.deleteItem(argv.description).then((task) => {
            console.log(task);
        }).catch((error) => {
            console.log(error);
        })
        break;
    default:
        console.log(`El comando ${command.red} no es reconocido`);
}