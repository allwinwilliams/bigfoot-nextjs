export const textSketch = (p, canvasRef, onP5Update, color, values, style = "tiny") => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  const { textInput } = values;
  let montserratFont, handWrittenFont, serifFont;  // Declare a variable to store the loaded font
  let textColor;

  p.preload = () => {
    // Load the Montserrat font during the preload phase
    montserratFont = p.loadFont('/fonts/Montserrat-Bold.ttf');
    handWrittenFont = p.loadFont('/fonts/Damion-Regular.ttf');
    serifFont = p.loadFont('/fonts/Cormorant-Medium.ttf');
    
  };

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1); 
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    if (color === 'black') {
      textColor = p.color('#ffffff');
    } else if (color === 'navy') {
      textColor = p.color('#ff5733');
    } else if (color === 'maroon') {
      textColor = p.color('#ffad99');
    } else if (color === 'grey') {
      textColor = p.color('#000000');
    } else if (color === 'beige' || color === 'white') {
      textColor = p.color('#77301b');
    } else {
      textColor = p.color('#000000');
    }
    p.fill(textColor);

    p.textAlign(p.CENTER, p.CENTER);

    // Apply different styles based on the `style` argument
    if (style == "small") {
      let textSize = p.map(textInput.length, 0, 24, 48, 36)
      p.textSize(textSize);
      p.textStyle(p.BOLD);
      p.text(textInput || '', 750, 355);
    } else if (style == "bold") {
      p.textFont(montserratFont);
      p.textStyle(p.BOLD);
      let textSize = p.map(textInput.length, 0, 24, 160, 80)
      p.textSize(textSize);
      p.push();
      p.translate(750, 400);
      p.scale(1, 0.7);
      p.text(textInput.toUpperCase() || '', 0, 0); 
      p.pop(); 
    } else if (style == "serif") {
      
      p.textFont(serifFont);
      p.textStyle(p.BOLD);
      // p.fill('#222222');
      p.noStroke();
      let textSize = p.map(textInput.length, 0, 24, 160, 80)
      p.textSize(textSize);
      p.push();
      p.translate(750, 400);
      p.text(textInput.toUpperCase() || '', 0, 0); 
      p.pop(); 
    }
     else if (style == "cursive") {
      p.textFont(handWrittenFont);
      let textSize = p.map(textInput.length, 0, 24, 160, 90)
      p.textSize(textSize);
      p.text(textInput || '', 750, 400);
    } else if (style == "brat") {
      p.fill('#92cc33');
      p.noStroke();
      p.rect(500, 200, 500, 500);
      p.textStyle(p.BOLD);
      let textSize = p.map(textInput.length, 0, 24, 72, 32)
      p.textSize(textSize);
      p.fill('#000000');
      p.text(textInput || '', 750, 450);
    }
  };
};
