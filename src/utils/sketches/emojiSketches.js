export const emojiSketch = (p, canvasRef, onP5Update, color, values, style = "tiny") => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const {selectedEmoji, textInput} = values;
  
    let img;
    let imgLoaded = false;
    let textColor;
  
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
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        if(style == "tiny"){    
            p.textSize(190);
            selectedEmoji && p.text(selectedEmoji, 800, 400);
        } if(style == "large"){
            p.textSize(650);
            selectedEmoji && p.text(selectedEmoji, 850, 500);
        }
        if(style == "badge"){
            p.textSize(190);
            selectedEmoji && p.text(selectedEmoji, 1150, 300);
        }
  
      if (color === 'black') {
        textColor = p.color('#ffffff');
      } else if (color === 'navy') {
        textColor = p.color('#ffffff');
      } else if (color === 'maroon') {
        textColor = p.color('#ffffff');
      } else if (color === 'white') {
        textColor = p.color('#000000');
      } else if (color === 'beige') {
        textColor = p.color('#000000');
      } else {
        textColor = p.color('#000000');
      }
      p.fill(textColor);
      p.textAlign(p.CENTER, p.CENTER);
      
      if(style == "tiny"){    
        p.textSize(40);
        p.textStyle(p.MEDIUM);
        p.text(textInput || '', 800, 555);
      } else if(style == "large"){
        p.textStyle(p.BOLD);
        p.textSize(56);
        p.text(textInput || '', 850, 900);
      } else if(style == "badge"){
        p.textStyle(p.MEDIUM);
        p.textSize(40);
        p.text(textInput || '', 1150, 440);
      }

    };
  };