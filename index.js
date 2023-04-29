const fs = require('fs')
const inquirer = require('inquirer');
const axios = require('axios');

function generateLicense(license) {
    let badge;
    let notice;

    switch (license) {
        case 'Apache License 2.0':
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            notice = 'This project is licensed under the Apache License 2.0.';
            break;
        case 'GNU General Public License v3.0':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
            notice = 'This project is licensed under the GNU General Public License v3.0.';
            break;
        case 'ISC License':
            badge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
            notice = 'This project is licensed under the ISC License.';
            break;
        case 'MIT License':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            notice = 'This project is licensed under the MIT License.';
            break;
        case 'Mozilla Public License 2.0':
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            notice = 'This project is licensed under the Mozilla Public License 2.0.';
            break;
        default:
            badge = '';
            notice = '';
    }

    return `## License\n\n${badge}\n\n${notice}`;
}

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
        {
            type: 'list',
            message: 'What type of license does your project use?',
            name: 'license',
            choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'ISC License', 'MIT License', 'Mozilla Public License 2.0'],
        },
        {
            type: 'input',
            message: 'What is your github username?',
            name: 'username',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
    ])

    .then((answers) => {
        const queryUrl = `https://api.github.com/users/${answers.username}`
        let githubData;

        axios
            .get(queryUrl)
            .then((response) => {
                if (err) throw err;
                githubData = response.data;
                console.log(githubData);
            });
           
        const data = `Name: ${answers.name}\nLanguages: ${answers.languages}\nCommunication: ${answers.communication}`;

        fs.writeFile('responses.txt', data, (err) => {
            if (err) throw err;
            console.log('Success!')
        });
    });
