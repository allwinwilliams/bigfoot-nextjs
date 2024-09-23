export const oldheadSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
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
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      p.clear();
  
      if (imgLoaded && img) {
        const imgX = 450;
        const imgY = 300;
        p.image(img, imgX, imgY, 600, 600);
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

export const headSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;

    const shapes = [
        { x: 32.4297, y: 81.5469, width: 16.6903, height: 16.6903, fill: 'red' },
        { x: 49.1172, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 65.3203, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 81.5469, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 97.7656, y: 81.5469, width: 16.6903, height: 16.6903, fill: 'red' },
        { x: 114.438, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 130.664, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 146.875, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 163.094, y: 81.5469, width: 16.6903, height: 16.6903, fill: 'red' },
        { x: 179.781, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'red' },
        { x: 65.3203, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'red' },
        { x: 81.5469, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'red' },
        { x: 97.7656, y: 98.2344, width: 16.6903, height: 16.2134, fill: 'red' },
        { x: 130.664, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'red' },
        { x: 146.875, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'red' },
        { x: 163.094, y: 98.2344, width: 16.6903, height: 16.2134, fill: 'red' },
        { x: 81.5469, y: 114.438, width: 16.2134, height: 16.2134, fill: 'red' },
        { x: 97.7656, y: 114.438, width: 16.6903, height: 16.2134, fill: 'red' },
        { x: 146.875, y: 114.438, width: 16.2134, height: 16.2134, fill: 'red' },
        { x: 163.094, y: 114.438, width: 16.6903, height: 16.2134, fill: 'red' },
        { x: 97.7656, y: 0, width: 16.6903, height: 16.6903, fill: 'black' },
        { x: 114.438, y: 0, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 130.664, y: 0, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 146.875, y: 0, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 65.3203, y: 16.6875, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 81.5469, y: 16.6875, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 97.7656, y: 16.6875, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 114.438, y: 16.6875, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 130.664, y: 16.6875, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 32.8984, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 49.1172, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 65.3203, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 81.5469, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 97.7656, y: 32.8984, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 114.438, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 130.664, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 146.875, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 163.094, y: 32.8984, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 179.781, y: 32.8984, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 49.1172, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 49.1172, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 65.3203, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 81.5469, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 97.7656, y: 49.1172, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 114.438, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 130.664, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 146.875, y: 49.1172, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 163.094, y: 49.1172, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 65.3203, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 65.3203, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 49.1172, y: 65.3203, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 65.3203, y: 65.3203, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 163.094, y: 65.3203, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 179.781, y: 65.3203, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 0, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 16.2109, y: 81.5469, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 0, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 98.2344, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 179.781, y: 98.2344, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 0, y: 114.438, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 114.438, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 114.438, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 195.992, y: 114.438, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 0, y: 130.664, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 130.664, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 130.664, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 195.992, y: 130.664, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 0, y: 146.875, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 16.2109, y: 146.875, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 32.4297, y: 146.875, width: 16.6903, height: 16.6903, fill: 'black' },
        { x: 195.992, y: 146.875, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 0, y: 163.555, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 163.555, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 163.555, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 195.992, y: 163.555, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 179.781, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 179.781, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 179.781, y: 179.781, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 195.992, y: 179.781, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 16.2109, y: 195.992, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 195.992, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 49.1172, y: 195.992, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 65.3203, y: 195.992, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 163.094, y: 195.992, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 179.781, y: 195.992, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 195.992, y: 195.992, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 32.4297, y: 212.195, width: 16.6903, height: 16.6903, fill: 'black' },
        { x: 49.1172, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 65.3203, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 81.5469, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 97.7656, y: 212.195, width: 16.6903, height: 16.6903, fill: 'black' },
        { x: 114.438, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 130.664, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 146.875, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 163.094, y: 212.195, width: 16.6903, height: 16.6903, fill: 'black' },
        { x: 179.781, y: 212.195, width: 16.2134, height: 16.6903, fill: 'black' },
        { x: 81.5469, y: 228.898, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 97.7656, y: 228.898, width: 16.6903, height: 16.2134, fill: 'black' },
        { x: 114.438, y: 228.898, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 130.664, y: 228.898, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 146.875, y: 228.898, width: 16.2134, height: 16.2134, fill: 'black' },
        { x: 114.211, y: 163.664, width: 16.2134, height: 16.2134, fill: 'black' }
    ];
      
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.noLoop();
      onP5Update();
      p.colorMode(p.HSL, 360, 100, 100);
    };
  
    p.draw = () => {
      p.clear();
        const xPos = 560, yPos = 200;
        const scale = 2; // Scaling factor
      
        shapes.forEach(shape => {
          if(shape.fill === "red"){
            p.fill(p.random(360), 90, 50);
          } else{
            if (color === 'black') {
              p.fill(255);
            } else if (color === 'grey') {
              p.fill(5);
            } else if (color === 'white' || color === 'beige') {
              p.fill(5);
            } else {
              p.fill(50);
            }
          }
          p.noStroke();
          p.rect(shape.x * scale + xPos, shape.y * scale + yPos, shape.width * scale, shape.height * scale);
        });
      
        // Draw the text "BIGFOOT" at specified position
        if (color === 'black') {
          p.fill(255);
        } else if (color === 'grey') {
          p.fill(5);
        } else if (color === 'white' || color === 'beige') {
          p.fill(5);
        } else {
          p.fill(5);
        }
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(32);
        p.text('BIGFOOT', 780, 800);
    };
};

export const tipSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;

  const shapes = [
      { x: 0, y: 0, width: 220, height: 250, fill: '#0094FF' },
      { x: 32.4297, y: 81.5469, width: 16.6903, height: 16.6903, fill: '#FC006A' },
      { x: 49.1172, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 65.3203, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 81.5469, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 97.7656, y: 81.5469, width: 16.6903, height: 16.6903, fill: '#FC006A' },
      { x: 114.438, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 130.664, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 146.875, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 163.094, y: 81.5469, width: 16.6903, height: 16.6903, fill: '#FC006A' },
      { x: 179.781, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#FC006A' },
      { x: 65.3203, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#FC006A' },
      { x: 81.5469, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#FC006A' },
      { x: 97.7656, y: 98.2344, width: 16.6903, height: 16.2134, fill: '#FC006A' },
      { x: 130.664, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#FC006A' },
      { x: 146.875, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#FC006A' },
      { x: 163.094, y: 98.2344, width: 16.6903, height: 16.2134, fill: '#FC006A' },
      { x: 81.5469, y: 114.438, width: 16.2134, height: 16.2134, fill: '#FC006A' },
      { x: 97.7656, y: 114.438, width: 16.6903, height: 16.2134, fill: '#FC006A' },
      { x: 146.875, y: 114.438, width: 16.2134, height: 16.2134, fill: '#FC006A' },
      { x: 163.094, y: 114.438, width: 16.6903, height: 16.2134, fill: '#FC006A' },
      { x: 97.7656, y: 0, width: 16.6903, height: 16.6903, fill: '#02328F' },
      { x: 114.438, y: 0, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 130.664, y: 0, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 146.875, y: 0, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 65.3203, y: 16.6875, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 81.5469, y: 16.6875, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 97.7656, y: 16.6875, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 114.438, y: 16.6875, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 130.664, y: 16.6875, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 32.8984, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 49.1172, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 65.3203, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 81.5469, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 97.7656, y: 32.8984, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 114.438, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 130.664, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 146.875, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 163.094, y: 32.8984, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 179.781, y: 32.8984, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 49.1172, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 49.1172, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 65.3203, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 81.5469, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 97.7656, y: 49.1172, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 114.438, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 130.664, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 146.875, y: 49.1172, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 163.094, y: 49.1172, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 65.3203, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 65.3203, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 49.1172, y: 65.3203, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 65.3203, y: 65.3203, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 163.094, y: 65.3203, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 179.781, y: 65.3203, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 0, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 16.2109, y: 81.5469, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 0, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 98.2344, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 179.781, y: 98.2344, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 0, y: 114.438, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 114.438, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 114.438, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 195.992, y: 114.438, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 0, y: 130.664, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 130.664, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 130.664, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 195.992, y: 130.664, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 0, y: 146.875, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 16.2109, y: 146.875, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 32.4297, y: 146.875, width: 16.6903, height: 16.6903, fill: '#02328F' },
      { x: 195.992, y: 146.875, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 0, y: 163.555, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 163.555, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 163.555, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 195.992, y: 163.555, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 179.781, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 179.781, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 179.781, y: 179.781, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 195.992, y: 179.781, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 16.2109, y: 195.992, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 195.992, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 49.1172, y: 195.992, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 65.3203, y: 195.992, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 163.094, y: 195.992, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 179.781, y: 195.992, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 195.992, y: 195.992, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 32.4297, y: 212.195, width: 16.6903, height: 16.6903, fill: '#02328F' },
      { x: 49.1172, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 65.3203, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 81.5469, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 97.7656, y: 212.195, width: 16.6903, height: 16.6903, fill: '#02328F' },
      { x: 114.438, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 130.664, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 146.875, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 163.094, y: 212.195, width: 16.6903, height: 16.6903, fill: '#02328F' },
      { x: 179.781, y: 212.195, width: 16.2134, height: 16.6903, fill: '#02328F' },
      { x: 81.5469, y: 228.898, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 97.7656, y: 228.898, width: 16.6903, height: 16.2134, fill: '#02328F' },
      { x: 114.438, y: 228.898, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 130.664, y: 228.898, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 146.875, y: 228.898, width: 16.2134, height: 16.2134, fill: '#02328F' },
      { x: 114.211, y: 163.664, width: 16.2134, height: 16.2134, fill: '#02328F' }
  ];
    
  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1); 
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
    p.colorMode(p.HSL, 360, 100, 100);
  };

  p.draw = () => {
    p.clear();
      const xPos = 570, yPos = 200;
      const scale = 2; // Scaling factor
      let hue = p.random(360);
      p.fill(hue, 90, 50);
      p.rect(0 * scale + xPos - 15, 0 * scale + yPos - 15, 220 * scale, 250 * scale);
      shapes.forEach(shape => {
        if(shape.fill === "#0094FF"){
          p.fill(hue, 90, 50);
        }
        else if(shape.fill === "#FC006A"){
          p.fill((hue + 120) % 360, 90, 50);
        }
        else if(shape.fill === "#001739"){
          p.fill(hue, 60, 40);
        }
         else{
          if (color === 'black') {
            p.fill(255);
          } else if (color === 'grey') {
            p.fill(5);
          } else if (color === 'white' || color === 'beige') {
            p.fill(5);
          } else {
            p.fill(50);
          }
        }
        p.noStroke();
        p.rect(shape.x * scale + xPos, shape.y * scale + yPos, shape.width * scale, shape.height * scale);
      });
    
      // Draw the text "BIGFOOT" at specified position
      if (color === 'black') {
        p.fill(255);
      } else if (color === 'grey') {
        p.fill(5);
      } else if (color === 'white' || color === 'beige') {
        p.fill(5);
      } else {
        p.fill(5);
      }
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(32);
      p.text('BIGFOOT', 780, 800);
  };
};

export const mottoSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1); 
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
    p.colorMode(p.HSL, 360, 100, 100);
  };

  p.draw = () => {
    p.clear();
    const xPos = 560, yPos = 200;
    const scale = 2;
    let hue = p.random(360);
    
    // Draw rectangle
    p.fill(hue, 90, 50);
    p.rect(xPos - 15, yPos - 15, 440, 590);
    
    // Draw the text "BIGFOOT" at specified position
    hue = p.random(360);
    p.fill(hue, 90, 50);
    p.textFont("Georgia");
    p.textStyle(p.BOLD);
    p.textSize(33);
    
    // The text we want to display
    const mottoText = "Humans are artisans of their existence, shaping reality from sparks of thought and emotion. Our creativity flows freely, reflecting the unique worlds within. Each expression is personal, shaped by our untamed spirit. We are born to create — so go, be creative.";

    // Set up font properties
    p.textAlign(p.LEFT, p.TOP); // No native JUSTIFIED, but we can simulate by handling lines ourselves
    
    // Custom function to handle line wrapping and text justification
    const drawJustifiedText = (text, x, y, maxWidth) => {
      const words = text.split(' ');
      let currentLine = '';
      let currentY = y;

      for (let i = 0; i < words.length; i++) {
        let testLine = currentLine + words[i] + ' ';
        let testWidth = p.textWidth(testLine);

        if (testWidth > maxWidth && currentLine.length > 0) {
          // Justify this line
          drawJustifiedLine(currentLine.trim(), x, currentY, maxWidth);
          currentLine = words[i] + ' ';
          currentY += p.textSize() * 1.2;
        } else {
          currentLine = testLine;
        }
      }

      drawJustifiedLine(currentLine.trim(), x, currentY, maxWidth);
    };

    const drawJustifiedLine = (line, x, y, maxWidth) => {
      const words = line.split(' ');
      const totalWords = words.length;
      
      if (totalWords === 1) {
        p.text(line, x, y);
        return;
      }
      
      const spaceWidth = p.textWidth(' ');
      const lineWidth = p.textWidth(line);
      const extraSpace = (maxWidth - lineWidth) / (totalWords - 1);

      let currentX = x;
      for (let i = 0; i < totalWords; i++) {
        p.text(words[i], currentX, y);
        currentX += p.textWidth(words[i]) + spaceWidth + extraSpace;
      }
    };

    drawJustifiedText(mottoText, 575, 200, 380);
  };
};

export const pixelSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const startX = 650;
    const startY = 250;
    const endX = 950;
    const endY = 450;
    const squaresPerRow = 16;
    const squareSize = (endX - startX) / squaresPerRow;
  
    let img;
    let imgLoaded = false;
  
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
      p.clear();
      let gaps = p.random(4,8);
      for (let i = 0; i < squaresPerRow; i++) {
        for (let j = 0; j < squaresPerRow; j++) {
          if(gaps < p.random(10)){
            const x = startX + i * squareSize;
            const y = startY + j * squareSize;
            const hue = p.random(0, 360);
            const saturation = p.random(83, 100);
            const luminosity = p.random(20, 50);
            p.fill(hue, saturation, luminosity);
            p.noStroke();
            p.rect(x, y, squareSize, squareSize);
          }
        }
      }
  
      // Draw the text "BIGFOOT" at specified position
      if (color === 'black') {
        p.fill(70);
      } else if (color === 'grey') {
        p.fill(5);
      } else if (color === 'white' || color === 'beige') {
        p.fill(5);
      } else {
        p.fill(5);
      }
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(32);
      p.text('BIGFOOT', 790, 630);
    };
};

export const loadingSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      onP5Update();
      p.redraw();
    };
  
    p.draw = () => {
      p.clear();
      if (color === 'black') {
          p.fill(255);
      } else if (color === 'grey') {
          p.fill(5);
      } else if (color === 'white') {
          p.fill(20);
      } else {
          p.fill(50);
      }
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(40);
      p.text('Loading...', 775, 600);
    };
};

export const twoSquareSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1); 
    canvasRef.current = canvas.canvas;
    p.colorMode(p.RGB, 255, 255, 255);
    p.noLoop();
    
    onP5Update();
  };

  p.draw = () => {
    p.clear();

    let rectWidth = p.random(200, 600);
    let rectHeight = p.random(200, 600);
    let centerX = 775;
    let centerY = 400;
    let angle = p.random(0, p.TWO_PI);

    let color1 = p.color(p.random(255), p.random(255), p.random(255));
    let color2 = p.color(p.random(255), p.random(255), p.random(255));

    drawGradientRectangle(centerX, centerY, rectWidth, rectHeight, color1, color2, angle);

    rectWidth = p.random(200, 600);
    rectHeight = p.random(200, 600);
    centerX = 775;
    centerY = 400;
    angle = p.random(0, p.TWO_PI);

    color1 = p.color(p.random(255), p.random(255), p.random(255));
    color2 = p.color(p.random(255), p.random(255), p.random(255));

    drawGradientRectangle(centerX, centerY, rectWidth, rectHeight, color1, color2, angle);
  };

  const drawGradientRectangle = (x, y, w, h, col1, col2, angle) => {
    const steps = p.random(5, 50);

    const stepX = w / steps;
    const stepY = h / steps;

    p.push();
    p.translate(x, y);
    p.rotate(angle);
    p.strokeWeight(5);

    for (let i = 0; i < steps; i++) {
      const inter = p.map(i, 0, steps, 0, 1);
      const currentColor = p.lerpColor(col1, col2, inter);

      p.stroke(currentColor);
      p.line(-w / 2 + i * stepX, -h / 2, -w / 2 + i * stepX, h / 2);
    }
    p.pop();
  };
};

export const gradientSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1); 
    canvasRef.current = canvas.canvas;
    p.colorMode(p.RGB, 255, 255, 255);
    p.noLoop();
    
    
  };

  p.draw = () => {
    p.clear();

    const rectWidth = p.random(200, 600);
    const rectHeight = p.random(200, 600);
    const centerX = 775;
    const centerY = 400;

    const color1 = p.color(p.random(255), p.random(255), p.random(255));
    const color2 = p.color(p.random(255), p.random(255), p.random(255));

    const steps = 1000;
    const stepHeight = rectHeight / steps;
    p.strokeWeight(2);

    p.push();
      p.translate(centerX, centerY);

      for (let i = 0; i <= steps; i++) {
        const inter = p.map(i, 0, steps, 0, 1);
        const currentColor = p.lerpColor(color1, color2, inter);

        p.noStroke();
        p.fill(currentColor);
        p.rectMode(p.CORNER);
        p.rect(-rectWidth / 2, -rectHeight / 2 + i * stepHeight, rectWidth, stepHeight);
      }
    p.pop();

    onP5Update();
    
  };
};