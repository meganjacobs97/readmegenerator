//IMPORT LIBRARIES 
// for hiding the keys 
require('dotenv').config; 
//for api call
const axios = require("axios");
//for prompting 
const inquirer = require("inquirer");
//for async filewrite
const util = require("util"); 
const fs = require("fs"); 

//TODO
inquirer
.prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name"
    },
    {
      type: "checkbox",
      message: "What languages do you know?",
      name: "languages",
      choices: ["HTML","JavaScript","CSS"]
    },
    {
      type: "list",
      message: "What is your preferred method of communciation?",
      name: "communication",
      choices: ["email","text","phone"]
    }
  ])
  .then(function(response) {
    
    var fileName = response.name + ".json"; 
    var data = JSON.stringify(response,null,"\t"); //params: data, replacer, formatting  

    fs.writeFile(fileName,data,function(error) {
        if(error) {
            return console.log(error); 
        }
    }); 
  });

  const config = { headers: { accept: "application/json" } };

//TODO
axios
  .get("https://icanhazdadjoke.com/", config)
  .then(function(res) {
    const { joke } = res.data;

    return appendFileAsync("jokes.txt", joke + "\n");
  })
  .then(function() {
    return readFileAsync("jokes.txt", "utf8");
  })
  .then(function(data) {
    console.log("Saved dad jokes:");
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

  //TODO
  inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios
    .get(queryUrl)
    .then(function(res) {
      const names = []; 
      
      for(let i = 0; i < res.data.length; i++) {
        names.push(res.data[i].name); 
      }

      const namesStr = names.join("\n"); 

      fs.writeFile("repos.txt",namesStr,function(error) {
        if(error) {
          return console.log("error"); 
        }
        console.log(names.length + " repos"); 
      });
    });
  });


