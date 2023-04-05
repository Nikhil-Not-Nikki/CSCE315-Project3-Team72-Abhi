//SQL MODULE: This module contains the functionality of what SQL commands used for the POS system, converted from Java over to JS
//This is so we can just use a function to handle all of our queries from one user-defined module.
//
//author: Cameron Mendoza

class Color {
    constructor(name, code) {
      this.name = name;
      this.code = code;
    }
  }
  
  const allColors = [
    new Color('brightred', '#E74C3C'),
    new Color('soothingpurple', '#9B59B6'),
    new Color('skyblue', '#5DADE2'),
    new Color('leafygreen', '#48C9B0'),
    new Color('sunkissedyellow', '#F4D03F'),
    new Color('groovygray', '#D7DBDD'),
  ];
  
  exports.getRandomColor = () => {
    return allColors[Math.floor(Math.random() * allColors.length)];
  }
  
  exports.allColors = allColors;