export const dictionarySmallSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput, definition } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        p.background(0);
        p.fill(255);
      } else if (color === 'grey') {
        p.background(200);
        p.fill(0);
      } else if (color === 'beige' || color === 'white') {
        p.background(255);
        p.fill(0);
      } else {
        p.background(255);
        p.fill(0);
      }
  
      // Text settings
      p.textAlign(p.LEFT, p.TOP);
  
      // Extract data from definition
      const word = definition?.word || textInput || '';
      const phonetics = definition?.details?.phonetics || '';
      const typeArray = definition?.details?.type || [];
      const type = Array.isArray(typeArray) ? typeArray.join(', ') : typeArray;
      const definitionText = definition?.details?.definition || '';
      const example = definition?.details?.example || '';
  
      // Display the word
      p.textSize(100);
      p.textStyle(p.BOLD);
      p.text(word, 100, 100);
  
      // Display phonetics
      p.textSize(60);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 100, 220);
  
      // Display type
      p.textSize(50);
      p.textStyle(p.NORMAL);
      p.text(type, 100, 300);
  
      // Display definition
      p.textSize(48);
      p.text(definitionText, 100, 380, canvasWidth - 200);
  
      // Display example
      p.textSize(40);
      p.text(`"${example}"`, 100, 600, canvasWidth - 200);
    };
  };

  export const dictionaryCodeSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput, definition } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      // Set background and text color
      if (color === 'black') {
        p.background(0);
        p.fill(255);
      } else {
        p.background(255);
        p.fill(0);
      }
  
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(150);
      p.textStyle(p.BOLD);
  
      // Use a monospaced font for code style
      p.textFont('Courier New');
  
      // Extract data from definition
      const word = definition?.word || textInput || '';
      const definitionText = definition?.details?.definition || '';
  
      // Display the word in uppercase
      p.text(word.toUpperCase(), canvasWidth / 2, canvasHeight / 2 - 100);
  
      // Display the definition below the word
      p.textSize(48);
      p.textStyle(p.NORMAL);
      p.text(definitionText, canvasWidth / 2, canvasHeight / 2 + 50, canvasWidth - 200);
    };
  };

  export const dictionaryBratSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput, definition } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      // Background settings
      p.background('#F5F5DC'); // Beige background
  
      // Draw a rectangle
      p.fill('#92cc33');
      p.noStroke();
      p.rect(500, 500, 1600, 1000);
  
      // Text settings
      p.fill('#000000');
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(120);
  
      // Extract data from definition
      const word = definition?.word || textInput || '';
      const definitionText = definition?.details?.definition || '';
  
      // Display the word
      p.text(word, canvasWidth / 2, canvasHeight / 2 - 200);
  
      // Display the definition
      p.textSize(60);
      p.textStyle(p.NORMAL);
      p.text(definitionText, canvasWidth / 2, canvasHeight / 2 + 50, canvasWidth - 600);
    };
  };
  