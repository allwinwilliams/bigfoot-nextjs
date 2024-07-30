export const headSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    let img;
    let imgLoaded = false;
  
    p.preload = () => {
      img = p.loadImage('/basic-tshirt/head.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
    };
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      p.background(255); // Clear the background with white color
  
      if (imgLoaded && img) {
        const imgX = 450;
        const imgY = 300;
        p.image(img, imgX, imgY, 600, 600);
      } else {
        if (color === 'black') {
          p.fill(255);
        } else if (color === 'beige') {
          p.fill(5);
        } else if (color === 'white') {
          p.fill(75);
        } else {
          p.fill(50);
        }
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(40);
        p.text('Loading...', 800, 600);
      }
    };
};

export const tipSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    let img;
    let imgLoaded = false;
  
    p.preload = () => {
      img = p.loadImage('/basic-tshirt/tip.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
    };
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      p.background(255); // Clear the background with white color
  
      if (imgLoaded && img) {
        const imgX = 450;
        const imgY = 300;
        p.image(img, imgX, imgY, 600, 600);
      } else {
        if (color === 'black') {
          p.fill(255);
        } else if (color === 'beige') {
          p.fill(5);
        } else if (color === 'white') {
          p.fill(75);
        } else {
          p.fill(50);
        }
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(40);
        p.text('Loading...', 800, 600);
      }
    };
};

export const pixelSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const startX = 500;
    const startY = 200;
    const endX = 1000;
    const endY = 600;
    const squaresPerRow = 8;
    const squareSize = (endX - startX) / squaresPerRow;
  
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
      p.background(255);
  
      for (let i = 0; i < squaresPerRow; i++) {
        for (let j = 0; j < squaresPerRow; j++) {
          const x = startX + i * squareSize;
          const y = startY + j * squareSize;
          const hue = p.random(0, 360);
          const saturation = p.random(80, 100);
          const luminosity = p.random(30, 70);
          p.fill(hue, saturation, luminosity);
          p.noStroke();
          p.rect(x, y, squareSize, squareSize);
        }
      }
  
      // Draw the text "BIGFOOT" at specified position
      if (color === 'black') {
        p.fill(255);
      } else if (color === 'beige') {
        p.fill(5);
      } else if (color === 'white') {
        p.fill(30);
      } else {
        p.fill(50);
      }
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(32);
      p.text('BIGFOOT', 750, 800);
    };
  };


export const loadingSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      onP5Update();
      p.redraw();
    };
  
    p.draw = () => {
      
        if (color === 'black') {
            p.fill(255);
        } else if (color === 'beige') {
            p.fill(5);
        } else if (color === 'white') {
            p.fill(75);
        } else {
            p.fill(50);
        }
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(40);
      p.text('Loading...', 800, 600);
    };
};