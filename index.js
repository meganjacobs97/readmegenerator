//IMPORT LIBRARIES 
//for api call
const axios = require("axios");
//for prompting 
const inquirer = require("inquirer");
//for async filewrite
const util = require("util"); 
const fs = require("fs"); 


// * The generated README includes a bio image from the user's GitHub profile.

// * The generated README includes the user's email.

// * The generated README includes the following sections: 
//   * Title
//   * Description
//   * Table of Contents
//   * Installation
//   * Usage
//   * License
//   * Contributing
//   * Tests
//   * Questions
//TODO
inquirer
.prompt([
  {
    type: "input",
    message: "Enter your GitHub username",
    name: "username"
  },
  {
    type: "input",
    message: "Enter the title of your project",
    name: "title"
  },
  {
    type: "input",
    message: "Enter a description for your project",
    name: "description"
  },
  {
    type: "input",
    message: "Enter how to install your application",
    name: "installation" 
  },
  {
    type: "input",
    message: "Enter instructions and examples of use for your application",
    name: "usage"
  },
  {
    type: "input",
    message: "Enter any credits/collaborators for your application",
    name: "credits"
  },
  {
    type: "list",
    message: "Select the license for your application",
    name: "license",
    choices: ["GNU AGPLv3","GNU GPLv3","GNU LGPLv3","ISC","Mozilla 2.0","Apache 2.0","MIT","Boost 1.0","Unlicense"]
  },
  {
    type: "input",
    message: "Enter guidelines for contributing to your to your application",
    name: "contributing"
  },
  {
    type: "input",
    message: "Enter any tests for your application",
    name: "tests"
  },
  {
    type: "input",
    message: "Enter any questions for your application",
    name: "questions"
  }
])
.then(function(response) {
  const queryUrl = `https://api.github.com/users/${response.username}`;
  axios
  .get(queryUrl)
  .then(function(githubResponse) {
    const email = githubResponse.data.email; 
    const pfpURL = githubResponse.data.avatar_url; 
    

    //build table of contents based on answers we have recieved 
    let contents = ""; 

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


    //build string for site 
    let fileData = ``; 
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
      if(license.includes(" ")) {
        license = license.replace(" ","+");
      }
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
    //add in picture and email 
    if(pfpURL) {
      fileData += `![GitHub Profile Picture](${pfpURL}%=50x50)\n\n`
    }
    if(email) {
      fileData += `${email}`
    }
    
    //TODO - CHANGE TO README
    const fileName = "README2.md"; 
    
    //write to file 
    fs.writeFile(fileName,fileData,function(error) {
      if(error) {
          return console.log(error); 
      }
    }); 
  });
});


// The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API to retrieve their email and profile image. They will then be prompted with questions about their project.
// The README will be populated with the following:

// * At least one badge
// * Project title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions
//   * User GitHub profile picture
//   * User GitHub email