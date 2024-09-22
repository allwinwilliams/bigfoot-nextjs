export const japaneseSmallSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, translation } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        p.background(0);
        p.fill(255);
      } else if (color === 'grey') {
        p.background(200);
        p.fill(0);
      } else if (color === 'beige' || color === 'white') {
        p.background(255);
        p.fill(0);
      } else {
        p.background(255);
        p.fill(0);
      }
  
      // Text settings
      p.textAlign(p.LEFT, p.TOP);
  
      // Extract data from translation
      const word = translation?.word || textInput || ''; // Original word
      const japaneseWord = translation?.translation?.japanese_word || ''; // Translated word in Japanese
      const phonetics = translation?.translation?.phonetics || ''; // Pronunciation
  
      // Display the Japanese word (translated word)
      let textSize = p.map(japaneseWord.length, 0, 32, 60, 18);
      p.textSize(textSize);
      
      p.textStyle(p.BOLD);
      p.text(japaneseWord, 940, 180); // Display the translated word
  
      // Display phonetics (pronunciation)
      p.textSize(textSize/1.5);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 940, 280); // Display the pronunciation
  
      // Display the original word (textInput)
      p.textSize(32);
      p.textStyle(p.NORMAL);
    //   p.text(word, 920, 300); // Display the original word
  
    };
};
  
export const japaneseBoldSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, translation } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
      // p.textFont("Impact");
    };
  
    p.draw = () => {
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        p.background(0);
        p.fill(255);
      } else if (color === 'grey') {
        p.background(200);
        p.fill(0);
      } else if (color === 'beige' || color === 'white') {
        p.background(255);
        p.fill(0);
      } else {
        p.background(255);
        p.fill(0);
      }
  
      // Text settings
      p.textAlign(p.LEFT, p.TOP);
  
      // Extract data from translation
      const word = translation?.word || textInput || ''; // Original word
      const japaneseWord = translation?.translation?.japanese_word || ''; // Translated word in Japanese
      const phonetics = translation?.translation?.phonetics || ''; // Pronunciation
  
      // Display the Japanese word (translated word)
      let textSize = p.map(japaneseWord.length, 0, 32, 180, 24);
      p.textSize(textSize);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER);
      p.text(japaneseWord, 750, 180); // Display the translated word
  
      // Display phonetics (pronunciation)
      p.textSize(textSize/2.5);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 750, 480); // Display the pronunciation
  
      // Display the original word (textInput)
      p.textSize(32);
      p.textStyle(p.NORMAL);
    //   p.text(word, 920, 300); // Display the original word
  
    };
};

export const japaneseNeonSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, translation } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.noLoop();
      onP5Update();
      p.textFont("Impact");
    };
  
    p.draw = () => {
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        p.background(0);
        p.fill(255);
      } else if (color === 'grey') {
        p.background(200);
        p.fill(0);
      } else if (color === 'beige' || color === 'white') {
        p.background(255);
        p.fill(0);
      } else {
        p.background(255);
        p.fill(0);
      }
  
      // Text settings
      p.textAlign(p.CENTER, p.TOP);
  
      // Extract data from translation
      const japaneseWord = translation?.translation?.japanese_word || ''; // Translated word in Japanese
      const phonetics = translation?.translation?.phonetics || ''; // Pronunciation
  
      const neonColors = [
        p.color(255, 0, 255),
        p.color(0, 255, 255),
        p.color(255, 255, 0),
        p.color(255, 69, 0),
        p.color(4, 238, 50),
      ];
  
      // Apply multiple strokes to the Japanese word (neon glow effect)
      let textX = 750; // X position for the text
      let textY = 380; // Y position for the Japanese word
  
      // Loop to create multiple strokes with different colors
      let textSize = p.map(japaneseWord.length, 0, 32, 180, 24);
      p.textSize(textSize);
      // p.textStyle(p.BLACK);
      p.textStyle(p.BOLD);
      p.stroke(0);
      // p.strokeWeight(8);
      for (let i = neonColors.length - 1; i >= 0; i--) {
        p.textSize(textSize - i * 5);
        p.fill(neonColors[i]);
        p.text(japaneseWord, textX, textY);
        textY -= textSize/10;
      }
      p.strokeWeight(0);
  
      if (color === 'black') {
        p.fill(255);
      } else if (color === 'grey') {
        p.fill(0);
      } else if (color === 'beige' || color === 'white') {
        p.fill(0);
      } else {
        p.fill(0);
      }
      p.textSize(60);
      p.textStyle(p.ITALIC);
      p.text(phonetics, textX, 640); // Display the pronunciation below the Japanese word
    };
};
  