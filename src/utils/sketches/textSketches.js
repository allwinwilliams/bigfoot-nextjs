export const textSketch = (p, canvasRef, onP5Update, color, values, style = "tiny") => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput } = values;
  
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
        p.fill(5);
      } else {
        p.fill(50);
      }
      p.textAlign(p.CENTER, p.CENTER);
      if (style == "small") {
        p.textSize(36);
        p.textStyle(p.MEDIUM);
        p.text(textInput || '', 750, 355);
      } else if (style == "bold") {
        p.textStyle(p.BOLD);
        p.textSize(80);
        p.text(textInput.toUpperCase() || '', 750, 400);
      } else if (style == "cursive") {
        p.textFont("cursive");
        p.textSize(80);
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
  