const fs = require('fs')
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Type out the description of your project',
      name: 'description',
    },
    {
      type: 'input',
      message: 'What are the installation instructions for your project?',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'What is the usage information for your project?',
      name: 'usageInfo',
    },
    {
      type: 'input',
      message: 'Who contributed to this project?',
      name: 'contributions',
    },
    {
      type: 'input',
      message: 'What are the test instructions for this project?',
      name: 'testInfo',
    },
  ])
  .then((answers) => { 
    const data = `Name: ${answers.name}\nLanguages: ${answers.languages}\nCommunication: ${answers.communication}`;

    fs.writeFile('responses.txt', data, (err) => {
      if (err) throw err;
      console.log('Success!')
    });
  });
