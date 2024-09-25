export const imageSketch = (p, canvasRef, onP5Update, color, values, style) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    let img;
    let imgLoaded = false;
    let chaseFront;
    let chaseBack;
    let starFront;
  
    p.preload = () => {
      starFront = p.loadImage('/product-page/woxsen/star-front.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
      chaseFront = p.loadImage('/product-page/woxsen/chase-front.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
      chaseBack = p.loadImage('/product-page/woxsen/chase-back.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
      
    };
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      p.clear();
      onP5Update();
    };
  
    p.draw = () => {
      p.clear(); // Clear the background with white color
      let imgX = 0;
      let imgY = 100;
      if(style === 'stars'){
        if (imgLoaded && starFront) {
            imgX = 0;
            imgY = 100;
            p.image(starFront, imgX, imgY, 1500, 1500);
          }
      } else if(style === 'chase'){
        if (imgLoaded && chaseFront) {
            imgX = 0;
            imgY = 0;
            p.image(chaseFront, imgX, imgY, 1500, 1500);
        } 
        if (imgLoaded && chaseBack) {
            imgX = 1400;
            imgY = 50;
            p.image(chaseBack, imgX, imgY, 1800, 1800);
        } 
      } else {
        if (color === 'black') {
          p.fill(255);
        } else if (color === 'grey') {
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