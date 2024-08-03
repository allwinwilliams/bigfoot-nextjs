export const emojiSketch = (p, canvasRef, onP5Update, color, values, style = "tiny") => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const {selectedEmoji, textInput} = values;
  
    let img;
    let imgLoaded = false;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
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
            selectedEmoji && p.text(selectedEmoji, 750, 500);
        } if(style == "large"){
            p.textSize(650);
            selectedEmoji && p.text(selectedEmoji, 750, 500);
        }
        if(style == "badge"){
            p.textSize(160);
            selectedEmoji && p.text(selectedEmoji, 1150, 300);
        }
  
      // Draw the text "BIGFOOT" at specified position
      if (color === 'black') {
        p.fill(70);
      } else if (color === 'grey') {
        p.fill(5);
      } else if (color === 'white') {
        p.fill(5);
      } else {
        p.fill(50);
      }
      p.textAlign(p.CENTER, p.CENTER);
      
      
      
      if(style == "tiny"){    
        p.textSize(38);
        p.textStyle(p.NORMAL);
        p.text(textInput || '', 750, 660);
      } else if(style == "large"){
        p.textStyle(p.BOLD);
        p.textSize(56);
        p.text(textInput || '', 750, 920);
      } else if(style == "badge"){
        p.textStyle(p.BOLD);
        p.textSize(28);
        p.text(textInput || '', 1150, 400);
      }

    };
  };