# README Generator

## A command-line application that dynamically generates a markdown README file from user input

As any good project includes a descriptive README, this application aims to help the user construct one with all the necessary components. Upon running the application, the user is faced with a series of prompts for information to be entered in the README. Once complete, a formatted .md file is written with the provided information. 

Additionally, this application retrieves the user's GitHub profile image and email to be displayed in the README. A badge with the user's specified license is also displayed.  

## Installation

To run and develop the code for yourself, you can use an IDE such as [VS Code](https://code.visualstudio.com/). 

In order to use this application as intended, you must have Node.js installed. You can download it [here](https://nodejs.org/en/download/). Step-by-step installation instructions can be found [here](https://phoenixnap.com/kb/install-node-js-npm-on-windows). 

You must also download Inquirer and Axios, which you can do by calling `npm init` and `npm install` from the command line. For more detailed information, check out the documentation for [Inquirer](https://www.npmjs.com/package/inquirer) and [Axios](https://github.com/axios/axios). 

## Usage 

From the command line, run `node index.js`. Then, answer the questions as you a prompted. Once finished, a markdown file called "generatedREADME" will appear in the same directory as index.js. 

![Use](use.gif)

## License

MIT License

Copyright © 2020 Megan Jacobs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.