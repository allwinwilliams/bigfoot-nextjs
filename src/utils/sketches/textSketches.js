export const textSketch = (p, canvasRef, onP5Update, color, values, style = "tiny") => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  const { textInput } = values;
  let montserratFont, handWrittenFont;  // Declare a variable to store the loaded font

  p.preload = () => {
    // Load the Montserrat font during the preload phase
    montserratFont = p.loadFont('/fonts/Montserrat-Bold.ttf');
    handWrittenFont = p.loadFont('/fonts/Damion-Regular.ttf');
    
  };

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    if (color === 'black') {
      p.fill(255);
    } else if (color === 'grey') {
      p.fill(5);
    } else if (color === 'beige' || color === 'white') {
      p.fill(p.color('#77301b'));
    } else {
      p.fill(50);
    }
    p.textAlign(p.CENTER, p.CENTER);

    // Apply different styles based on the `style` argument
    if (style == "small") {
      p.textSize(48);
      p.textStyle(p.BOLD);
      p.text(textInput || '', 750, 355);
    } else if (style == "bold") {
      p.textFont(montserratFont);
      p.textStyle(p.BOLD);
      let textSize = p.map(textInput.length, 0, 16, 160, 90)
      p.textSize(textSize);
      p.push();
      p.translate(750, 400);
      p.scale(1, 0.7);
      p.text(textInput.toUpperCase() || '', 0, 0);  // Draw the text
      p.pop();  // Restore the original transformation matrix
    } else if (style == "cursive") {
      p.textFont(handWrittenFont);
      let textSize = p.map(textInput.length, 0, 16, 160, 100)
      p.textSize(textSize);
      p.text(textInput || '', 750, 400);
    } else if (style == "brat") {
      p.fill('#92cc33');
      p.noStroke();
      p.rect(500, 200, 500, 500);
      p.textStyle(p.BOLD);
      p.textSize(48);
      p.fill('#000000');
      p.text(textInput || '', 750, 450);
    }
  };
};
