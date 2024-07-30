export const aiBasicSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
  
    let img = null;
    let prompt = values?.prompt;
    let imgUrl = values?.imageData;
  
    const proxyUrl = imgUrl ? `/api/proxy?url=${encodeURIComponent(imgUrl)}` : null;
  
    p.preload = () => {
  
      if (proxyUrl) {
        p.loadImage(proxyUrl, (loadedImg) => {
          img = loadedImg;
          console.log('AI image loaded successfully');
          p.redraw();
        }, () => {
          console.error('Failed to load AI image');
        });
      } else {
        console.error('Image URL is not provided');
      }
    };
  
    p.setup = () => {
      console.log('Setting up p5 sketch');
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop(); // No continuous drawing, will draw manually when needed
      onP5Update();
      p.redraw();
    };
  
    const drawImageSection = (x, y, drawingWidth, drawingHeight) => {
      console.log('Drawing image section');
      if (!values) {
        console.log('No values found');
        p.fill(50);
        p.textSize(32);
        p.textAlign(p.CENTER);
        p.text('Loading...', x + drawingWidth / 2, y + drawingHeight / 2);
        return;
      }
  
      console.log('Values in P5.js', values);
  
      if (img) {
        console.log('Drawing image:', img);
        const imgX = x + (drawingWidth - 500) / 2;
        const imgY = y + (drawingHeight - 500) / 2;
        p.image(img, imgX, imgY, 500, 500);
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
      p.textSize(32);
      p.textStyle(p.BOLD);
      console.log('Drawing text');
  
      if(prompt) {
        console.log('Prompt:', prompt);
        p.fill(255);
        p.text(prompt, x + drawingWidth / 2, y + drawingHeight / 2 + 340);
      }
    };
  
    p.draw = () => {
      console.log('Drawing p5 canvas');
      p.background(200);
  
      // Draw the image section
      drawImageSection(250, 100, 1000, 1000); // Adjusted drawing height to fit the canvas height
    };
  
    p.myCustomRedrawAccordingToNewPropsHandler = async (newValues) => {
      console.log('New data received', newValues);
      if (newValues.imageData && newValues.imageData !== imgUrl) {
        imgUrl = newValues.imageData;
        try {
          const newProxyUrl = `/api/proxy?url=${encodeURIComponent(imgUrl)}`;
          img = await p.loadImage(newProxyUrl, (loadedImg) => {
            img = loadedImg;
            p.redraw()
          }, () => {
            console.error('Failed to load new image');
          });
        } catch (error) {
          console.error('Failed to load new image', error);
        }
      }
    };
  
    // Call the custom handler initially to handle the first load
    p.myCustomRedrawAcc
  };
  