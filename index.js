var inquirer = require('inquirer'),
twit = require('./socials/twit'),
git = require('./socials/git'),
Spinner = require('cli-spinner').Spinner;

let gitdata = null,
ops = [],
spinner = new Spinner('Loading... %s');
spinner.setSpinnerString('|/-\\');

spinner.start();

//Starting here 
git.getGitcontent(function(data) {
    gitdata = data;
    for(let i in data){
        ops.push(data[i].full_name)
    }
    spinner.stop(true);
    ask();
});


let questions = [
    {
        type: "list",
        name: "repo",
        message: "Which repo would you like to show the summary?",
        choices: ops
    },
    {
        type: 'confirm',
        name: 'comeback',
        message: 'Would you like to leave after the result show up?'
    }
];


function ask(){
    inquirer.prompt(questions).then(function(answers){
        gettingTwits(answers.repo, function(){
            if(!answers.comeback){
                ask();
            }else{
                console.log('See you!');
            }    
        });
    });
}

function gettingTwits(answer, callback){
    
    let mgit = gitdata.filter(function(o){
        if(o.full_name == answer) return o;
    });
    
    mgit = mgit[0];
    
    spinner.start();
    
    twit.getTwits(mgit.name,function(data){
        
        spinner.stop(true);
        
        console.log(`\n\n***Starts Here***\n==================================================================\nname: ${mgit.name}\nfullname: ${mgit.full_name}\ndescription: ${mgit.description}\n\nOn Twitter\n------------`);

        for(let t in data){
            console.log(`${data[t].name} says:\n${data[t].text}\n********************************************************************************\n`);
        }

        if(callback)callback();
    });
}
