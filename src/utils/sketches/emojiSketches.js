export const emojiSketch = (p, canvasRef, onP5Update, color, values, size = "tiny") => {
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
        if(size == "tiny"){    
            p.textSize(200);
            selectedEmoji && p.text(selectedEmoji, 750, 500);
        } if(size == "large"){
            p.textSize(650);
            selectedEmoji && p.text(selectedEmoji, 750, 500);
        }
  
      // Draw the text "BIGFOOT" at specified position
      if (color === 'black') {
        p.fill(70);
      } else if (color === 'grey') {
        p.fill(5);
      } else if (color === 'white') {
        p.fill(20);
      } else {
        p.fill(50);
      }
      p.textAlign(p.CENTER, p.CENTER);
      
      
      
      if(size == "tiny"){    
        p.textSize(32);
        p.textStyle(p.NORMAL);
        p.text(textInput || '', 750, 650);
      } if(size == "large"){
        p.textStyle(p.BOLD);
        p.textSize(48);
        p.text(textInput || '', 750, 900);
      }
    };
  };