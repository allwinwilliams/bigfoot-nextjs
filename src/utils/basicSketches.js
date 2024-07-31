export const oldheadSketch = (p, canvasRef, onP5Update, color, values) => {
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
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };

    const drawSVG = (x, y) => {
        // Draw the first path
        p.noStroke();
        if (color === 'black') {
            p.fill(255);
        } else if (color === 'beige') {
            p.fill(5);
        } else if (color === 'white') {
            p.fill(5);
        } 
        p.beginShape();
        p.vertex(x + 211.69, y + 122.81);
        p.vertex(x + 211.69, y + 70.56);
        p.vertex(x + 194.45, y + 70.56);
        p.vertex(x + 194.45, y + 53.86);
        p.vertex(x + 211.69, y + 53.86);
        p.vertex(x + 211.69, y + 35.55);
        p.vertex(x + 158.9, y + 35.55);
        p.vertex(x + 158.9, y + 18.85);
        p.vertex(x + 176.14, y + 18.85);
        p.vertex(x + 176.14, y + 0);
        p.vertex(x + 105.58, y + 0);
        p.vertex(x + 105.58, y + 18.85);
        p.vertex(x + 70.57, y + 18.85);
        p.vertex(x + 70.57, y + 35.55);
        p.vertex(x + 35.56, y + 35.55);
        p.vertex(x + 35.56, y + 53.86);
        p.vertex(x + 17.25, y + 53.86);
        p.vertex(x + 17.25, y + 88.33);
        p.vertex(x + 0, y + 88.33);
        p.vertex(x + 0, y + 194.44);
        p.vertex(x + 17.24, y + 194.44);
        p.vertex(x + 17.24, y + 228.91);
        p.vertex(x + 35.55, y + 228.91);
        p.vertex(x + 35.55, y + 247.22);
        p.vertex(x + 87.8, y + 247.22);
        p.vertex(x + 87.8, y + 264.46);
        p.vertex(x + 176.68, y + 264.46);
        p.vertex(x + 176.68, y + 247.22);
        p.vertex(x + 211.69, y + 247.22);
        p.vertex(x + 211.69, y + 228.91);
        p.vertex(x + 230, y + 228.91);
        p.vertex(x + 230, y + 122.8);
        p.vertex(x + 211.69, y + 122.81);
        p.endShape(p.CLOSE);

        p.beginShape();
        p.vertex(x + 211.15, y + 193.37);
        p.vertex(x + 193.91, y + 193.37);
        p.vertex(x + 193.91, y + 211.15);
        p.vertex(x + 175.6, y + 211.15);
        p.vertex(x + 175.6, y + 228.39);
        p.vertex(x + 87.8, y + 228.39);
        p.vertex(x + 87.8, y + 211.15);
        p.vertex(x + 52.79, y + 211.15);
        p.vertex(x + 52.79, y + 104.5);
        p.vertex(x + 87.8, y + 104.5);
        p.vertex(x + 87.8, y + 70.57);
        p.vertex(x + 175.6, y + 70.57);
        p.vertex(x + 175.6, y + 123.36);
        p.vertex(x + 211.69, y + 123.36);
        p.vertex(x + 211.69, y + 193.37);
        p.vertex(x + 211.15, y + 193.37);
        p.endShape(p.CLOSE);

        p.beginShape();
        p.vertex(x + 122.81, y + 193.91);
        p.vertex(x + 122.81, y + 176.67);
        p.vertex(x + 140.59, y + 176.67);
        p.vertex(x + 140.59, y + 193.91);
        p.vertex(x + 122.81, y + 193.91);
        p.endShape(p.CLOSE);

        let saturation = 90;
        let luminosity = 50;
        if (color === 'black') {
            saturation = 90;
            luminosity = 30;
        } else if (color === 'beige') {
            saturation = 90;
            luminosity = 40;
        } else if (color === 'white') {
            saturation = 90;
            luminosity = 50;
        } 
        p.fill(p.random(360), saturation, luminosity);

        p.beginShape();
        p.vertex(x + 33, y + 88.9422);
        p.vertex(x + 33, y + 70.4922);
        p.vertex(x + 210.68, y + 70.4922);
        p.vertex(x + 210.68, y + 88.9422);
        p.vertex(x + 192.57, y + 88.9422);
        p.vertex(x + 192.57, y + 123.682);
        p.vertex(x + 157.29, y + 123.682);
        p.vertex(x + 157.29, y + 104.312);
        p.vertex(x + 139.38, y + 104.312);
        p.vertex(x + 139.38, y + 88.9422);
        p.vertex(x + 122.01, y + 88.9422);
        p.vertex(x + 122.01, y + 123.682);
        p.vertex(x + 86.73, y + 123.682);
        p.vertex(x + 86.73, y + 104.312);
        p.vertex(x + 68.28, y + 104.312);
        p.vertex(x + 68.28, y + 88.9422);
        p.vertex(x + 33, y + 88.9422);
        p.endShape(p.CLOSE);
    };
  
    p.draw = () => {
      p.background(255); // Clear the background with white color
  
      if (imgLoaded && img) {
        const imgX = 600;
        const imgY = 400;
        // p.image(img, imgX, imgY, 600, 600);
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

      // Draw the SVG at the same position as the image
      const svgX = 650;
      const svgY = 300;
      drawSVG(svgX, svgY);
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
    const squaresPerRow = 16;
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