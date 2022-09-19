import { CreateIndex } from "./creatingIndex.js";
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';

let dir;
let pathChoice;
let ignoreFolders

const sleep = (ms = 2000) => new Promise( (resolve) => setTimeout(resolve, ms))

// --------- routine ------------

await Questions();
let index = new CreateIndex(dir, pathChoice)
const spinner = createSpinner('generating our index\n').start();
sleep();


try { 
    spinner.success({text : 'Content created'});
    if(ignoreFolders) index.createIndex(ignoreFolders);
    else index.createIndex()
}catch(error){
    spinner.error({ text : chalkAnimation.glitch('THAT IS A ERROR').start() });
    console.error(error);
}

// ------- Functions ---------

async function Questions(){

 // ------- directory -------

    const directory = await inquirer.prompt({
        name: 'directory',
        type: 'input',
        message: 'Please digit or past our directory path\n',
    });
    dir = directory.directory;

 // ------- path choice -------

    const pathChoices = await inquirer.prompt({
        name: 'pathChoice',
        type: 'input',
        message: 'Now digit how many | will have in the table index .md after the first column (Our answerer have be with |)\n',
    });

    if(pathChoices.pathChoice.includes('|')) pathChoice = pathChoices.pathChoice
    else {console.log("Our answerer have has to be with ||. Exemple: ||| (three columns after the first \n) "); invalidAnswer()}

    if(pathChoice === 0){ invalidAnswer() }

 // ------- There is folders that you want to ignore? ------

    const ignoreFolder = await inquirer.prompt({
        name: 'folder',
        type: 'input',
        message: 'Please digit those folders you want to ignore, if there is any, and separate those with ", " (with space) \n',
        default(){ return false }
    });

    ignoreFolders = ignoreFolder.folder
    if(ignoreFolders){
        try {  ignoreFolders = ignoreFolders.split(", "); }
        catch (error) { invalidAnswer(error) }
    }
}

function invalidAnswer(error = null){
    console.log(`
        ---------------------------------- \n
        digit a valid answer (╯°□°）╯︵ ┻━┻ \n
        ---------------------------------- \n
        `);
    if(error) console.error(error)
}
