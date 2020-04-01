//IMPORT LIBRARIES 
//for api call
const axios = require("axios");
//for prompting 
const inquirer = require("inquirer");
//for async filewrite
const util = require("util"); 
const fs = require("fs"); 



//TODO
inquirer
.prompt({
  message: "Enter your GitHub username",
  name: "username"
})
.then(function({ username }) {
  const queryUrl = `https://api.github.com/users/${username}`;
  axios
  .get(queryUrl)
  .then(function(response) {
    const email = response.data.email; 
    const pfpURL = response.data.avatar_url; 
    console.log(response); 
    console.log(email); 
    console.log(pfpURL); 
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