export const aiBasicSketch = (p, canvasRef, onP5Update, color, values, style) => {
  const canvasWidth = 2600;
  const canvasHeight = 2000;

  let img = null;
  let prompt = values?.prompt;
  let imgUrl = values?.imageData;
  let isLoading = true; // Flag to check if the image is loading

  const proxyUrl = imgUrl ? `/api/proxy?url=${encodeURIComponent(imgUrl)}` : null;
  let intervalId;
  p.preload = () => {
    if (proxyUrl) {
      p.loadImage(proxyUrl, (loadedImg) => {
        img = loadedImg;
        isLoading = false; // Image is loaded
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

  // intervalId = setInterval(() => {
  //   if (!values || values.imageData == '') {
  //     console.log("Loading image..");
  //     p.redraw();
  //     // onP5Update();
  //   } else {
  //     clearInterval(intervalId);
  //     p.myCustomRedrawAccordingToNewPropsHandler(values);
  //   }
  // }, 1200);
  
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
      if(style == "small"){
        const imgX = x + (drawingWidth + 360) / 2;
        const imgY = y + (drawingHeight - 560) / 2;
        p.noStroke();
        p.rect(imgX-25, imgY-25, 310, 340);
        p.image(img, imgX, imgY, 260, 260);
        p.fill(p.color(255));
        
      } else if(style == "large"){
        const imgX = x + (drawingWidth - 720) / 2;
        const imgY = y + (drawingHeight - 720) / 2;
        
        p.image(img, imgX, imgY, 720, 720);

        if (prompt) {
          if (color === 'black') {
            p.fill(p.color(200));
          } else if (color === 'beige' || color === 'white') {
            p.fill(p.color(10));
          } else {
            p.fill(p.color(50));
          }

          p.noStroke();
          p.textAlign(p.CENTER);
          p.textSize(28);
          p.textStyle(p.NORMAL);
          console.log('Drawing text');
          console.log('Prompt:', prompt);
          // p.text(prompt, 740, 1060);
        }
      }
      
    } else {
      console.error('Image is not loaded or img variable is null');
    }
  };

  p.draw = () => {
    console.log('Drawing p5 canvas');
    p.background(200);

    if (isLoading) {
      const startX = 500;
      const startY = 350;
      const endX = 1000;
      const endY = 950;
      const squaresPerRow = 16;
      const squareSize = (endX - startX) / squaresPerRow;

      const currentTime = p.millis();
      let hueCounter = 0;
      if (currentTime % 100 < 50) { // Check if the remainder of currentTime divided by 100 is less than 50
        hueCounter = (hueCounter + 1) % 360; // Increment hueCounter and wrap around at 360
      }
      // p.fill(p.random(360), 100, 50);
      // p.noStroke();
      // p.rect(500, 350, 500, 500);
      for (let i = 0; i < squaresPerRow; i++) {
        for (let j = 0; j < squaresPerRow; j++) {
          if(p.random(10)<2){
            const x = startX + i * squareSize;
            const y = startY + j * squareSize;
            const hue = p.random(hueCounter % 360, 360);
            const saturation = p.random(80, 100);
            const luminosity = p.random(30, 70);
            p.fill(hue, saturation, luminosity);
            p.noStroke();
            p.rect(x, y, squareSize, squareSize);
          }
        }
      }
      
    }

    // if (prompt) {
    //   if (color === 'black') {
    //     p.fill(p.color(255));
    //   } else if (color === 'beige' || color === 'white') {
    //     p.fill(p.color(5));
    //   } else {
    //     p.fill(p.color(50));
    //   }

    //   p.noStroke();
    //   p.textAlign(p.CENTER);
    //   p.textSize(28);
    //   p.textStyle(p.NORMAL);
    //   console.log('Drawing text');
    //   console.log('Prompt:', prompt);
    //   p.text(prompt, 740, 950);
    // }

    if (!isLoading) {
      drawImageSection(250, 100, 1000, 1000);
      console.log("Clearning Interval..", intervalId);
      clearInterval(intervalId);
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = async (newValues) => {
    console.log('New data received', newValues);
    if (newValues.imageData && newValues.imageData !== imgUrl) {
      imgUrl = newValues.imageData;
      isLoading = true;
      try {
        const newProxyUrl = `/api/proxy?url=${encodeURIComponent(imgUrl)}`;
        img = await p.loadImage(newProxyUrl, (loadedImg) => {
          img = loadedImg;
          isLoading = false;
          p.redraw();
        }, () => {
          console.error('Failed to load new image');
        });
      } catch (error) {
        console.error('Failed to load new image', error);
      }
    }
  };

  

  // Call the custom handler initially to handle the first load
  p.myCustomRedrawAccordingToNewPropsHandler(values);
};
