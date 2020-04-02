//IMPORT LIBRARIES 
//for api call
const axios = require("axios");
//for prompting 
const inquirer = require("inquirer");
//for async filewrite
const util = require("util"); 
const fs = require("fs"); 

//array for user input choices 
const inputArr = [
  //prompt for github username
  {
    type: "input",
    message: "Enter your GitHub username",
    name: "username"
  },
  //prompt for title 
  {
    type: "input",
    message: "Enter the title of your project",
    name: "title"
  },
  //prompt for description 
  {
    type: "input",
    message: "Enter a description for your project",
    name: "description"
  },
  //prompt for installation 
  {
    type: "input",
    message: "Enter how to install your application",
    name: "installation" 
  },
  //prompt for usage 
  {
    type: "input",
    message: "Enter instructions and examples of use for your application",
    name: "usage"
  },
  //prompt for credits 
  {
    type: "input",
    message: "Enter any credits/collaborators for your application",
    name: "credits"
  },
  //prompt for license 
  {
    type: "list",
    message: "Select the license for your application",
    name: "license",
    choices: ["GNU AGPLv3","GNU GPLv3","GNU LGPLv3","ISC","Mozilla 2.0","Apache 2.0","MIT","Boost 1.0","Unlicense"]
  },
  //prompt for contributing 
  {
    type: "input",
    message: "Enter guidelines for contributing to your to your application",
    name: "contributing"
  },
  //prompt for tests 
  {
    type: "input",
    message: "Enter any tests for your application",
    name: "tests"
  },
  //prompt for questions 
  {
    type: "input",
    message: "Enter any questions for your application",
    name: "questions"
  }
]

//function that builds and returns the table of contents for the readme
function getTableOfContents(response) {
  //return string 
  let contents = ""; 

  //check to see if user entered value - if they did, add it to the table by adding to the string 
  if(response.description !== "") {
    contents += "\n* [Description](#description)"; 
  }
  if(response.installation !== "") {
    contents += "\n* [Installation](#installation)"; 
  }
  if(response.usage !== "") {
    contents += "\n* [Usage](#usage)"; 
  }
  if(response.credits !== "") {
    contents += "\n* [Credits](#credits)"; 
  }
  if(response.license !== "") {
    contents += "\n* [License](#license)"; 
  }
  if(response.contributing !== "") {
    contents += "\n* [Contributing](#contributing)"; 
  }
  if(response.tests !== "") {
    contents += "\n* [Tests](#tests)"; 
  }
  if(response.questions !== "") {
    contents += "\n* [Questions](#questions)"; 
  }
  //return the entire string 
  return contents; 
}

//function that builds and returns the string for the file 
function getFileData(response,contents,pfpURL,email) {
  //return string 
  let fileData = ``; 
  //check to see if user entered value - if they did, add it to the string 
  if(response.title !== "") {
    fileData += `# ${response.title}\n\n`
  }
  if(response.description !== "") {
    fileData += `${response.description}\n\n`
  }
  fileData += `## Table of Contents\n\n${contents}\n\n`
  if(response.installation !== "") {
    fileData += `## Installation\n\n${response.installation}\n\n`
  }
  if(response.usage !== "") {
    fileData += `## Usage\n\n${response.usage}\n\n`
  }
  if(response.credits !== "") {
    fileData += `## Credits\n\n${response.credits}\n\n`
  }
  if(response.license !== "") {
    let license = response.license; 
    //need to replace any spaces with + 
    if(license.includes(" ")) {
      license = license.replace(" ","+");
    }
    //add badge
    fileData += `## License\n\n![license](https://img.shields.io/static/v1?label=license&message=${license}&color=green)\n\n`
  }
  if(response.contributing !== "") {
    fileData += `## Contributing\n\n${response.contributing}\n\n`
  }
  if(response.tests !== "") {
    fileData += `## Tests\n\n${response.tests}\n\n`
  }
  if(response.questions !== "") {
    fileData += `## Questions\n\n${response.questions}\n\n\n\n`
  }
  //return entire string
  return fileData; 
}

//prompt user and call github api
inquirer
//use prompt array 
.prompt(inputArr)
.then(function(response) {
  const queryUrl = `https://api.github.com/users/${response.username}`;
  //github call
  axios
  .get(queryUrl)
  .then(function(githubResponse) {
    //grab email and profile picture from api 
    const email = githubResponse.data.email; 
    const pfpURL = githubResponse.data.avatar_url; 
    
    //build table of contents based on answers we have recieved 
    let contents = getTableOfContents(response); 

    //build string for site 
    let fileData = getFileData(response,contents); 

    //add in picture and email 
    if(pfpURL) {
      fileData += `![GitHub Profile Picture](${pfpURL}%=50x50)\n\n`
    }
    if(email) {
      fileData += `${email}`
    }
    
    const fileName = "generatedREADME.md"; 
    
    //write to file 
    fs.writeFile(fileName,fileData,function(error) {
      if(error) {
          return console.log(error); 
      }
    }); 
  });
});