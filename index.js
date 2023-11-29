const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require("./lib/shapes");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
}

//Come up with questions to create logo.

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to (3) characters for your logo:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter a color for your text:"
    },
    {
        type: "list",
        name: "logo-shape",
        message: "Please select a shape for your logo:",
        choices: ["Circle", "Square", "Triangle"],
    },
    {
        type: "input",
        name: "shape-color",
        message: "Enter a background color for your logo:",
    },
];

//Create write data function

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congrats! You have a new SVG logo!");
    });
}

async function init() {
    console.log("Starting init");
        var svgString = "";
        var svg_file = "logo.svg";
    const answers = await inquirer.prompt(questions);

        var userText = "";
        if(answers.text.length > 0 && answers.text.length < 4) {
            userText = answers.text;
        } else {
            console.log("Invalid! Please enter 1-3 characters for your logo.");
        return;
        }
        console.log("User text: [" + userText + "]");
        
        userFontColor = answers["text-color"];
        console.log("User font color: [" + userFontColor + "]");
        
        userShapeColor = answers["shape-color"];
        console.log("User shape color: [" + userShapeColor + "]");

        ShapeType = answers["logo-shape"];
        console.log("User entered shape = [" + ShapeType + "]");

        let userShape;
        if(ShapeType === "Square" || ShapeType === "square") {
            userShape = new Square();
            console.log("User selected Square shape");
        }
        else if(ShapeType === "Circle" || ShapeType === "circle") {
            userShape = new Circle();
            console.log("User selected Circle shape");
        }
        else if(ShapeType === "Triangle" || ShapeType === "triangle") {
            userShape = new Triangle();
            console.log("User selected Triangle shape");
        }
        else {
            console.log("Invalid Shape :(");
        }

        userShape.setColor(userShapeColor);

        var svg = new Svg();
        svg.setTextElement(userText, userFontColor);
        svg.setShapeElement(userShape);
        svgString = svg.render();


        console.log("Shape generating complete!");
        console.log("Writing to file...");
        writeToFile(svg_file, svgString);
}
init();