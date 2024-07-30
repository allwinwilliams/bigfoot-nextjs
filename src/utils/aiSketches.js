export const aiBasicSketch = (p, canvasRef, onP5Update, color, data) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
  
    let explicitImage, img;
  
    p.preload = () => {
      explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg', () => {
        console.log('Explicit image loaded successfully');
      }, () => {
        console.error('Failed to load explicit image');
      });
    };
  
    p.setup = () => {
      console.log('Setting up p5 sketch');
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    const drawImageSection = (x, y, drawingWidth, drawingHeight) => {
      console.log('Drawing image section');
      if (!data) {
        console.log('No data found');
        p.fill(50);
        p.textSize(32);
        p.textAlign(p.CENTER);
        p.text('Loading...', x + drawingWidth / 2, y + drawingHeight / 2);
        return;
      }
  
      console.log('Data in P5.js', data);
  
      if (img) {
        console.log('Drawing image:', img);
        p.image(img, x, y, drawingWidth, drawingHeight);
      } else {
        console.error('Image is not loaded or img variable is null');
      }
  
      if (color === 'black') {
        p.fill(p.color(255));
      } else if (color === 'beige') {
        p.fill(p.color('#77301b'));
      } else {
        p.fill(p.color(50));
      }
  
      p.noStroke();
      p.textAlign(p.CENTER);
      p.textSize(100);
      p.textStyle(p.BOLD);
      console.log('Drawing text');
  
      if (data && data.values) {
        const { prompt } = data.values;
        console.log('Prompt:', prompt);
        p.fill(255);
        p.text(prompt, x + drawingWidth / 2 - 50, 200);
      }
  
      if (explicitImage) {
        console.log('Drawing explicit image');
        p.image(explicitImage, x + drawingWidth / 2 - 50, y + drawingHeight + 150, 100, 63);
      }
    };
  
    p.draw = () => {
      console.log('Drawing p5 canvas');
      p.background(200);
  
      // Draw the song data section
      drawImageSection(250, 200, 1000, 1600); // Adjusted drawing height to fit the canvas height
    };
  
    p.myCustomRedraw = async () => {
      console.log('Custom redraw function called');
  
      if (data && data.values && data.values.imageData) {
        console.log('Data values found, loading image from URL:', data.values.imageData);
        img = await new Promise((resolve, reject) => {
          p.loadImage(data.values.imageData, (loadedImage) => {
            console.log('Image loaded successfully:', loadedImage);
            resolve(loadedImage);
          }, (error) => {
            console.error('Failed to load image:', error);
            reject(error);
          });
        });
  
        p.redraw();
      } else {
        console.error('Data values are not present or invalid');
      }
    };
  
    p.myCustomRedraw(); // Call the custom redraw function when sketch is initialized
  };
  