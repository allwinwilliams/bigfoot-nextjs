export const japaneseSmallSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, translation } = values;
    let translationColor, phoneticColor;
    let japaneseFont;
  
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
      // Set background and text color based on the T-shirt color
      p.clear();
      if (color === 'black') {
        translationColor = p.color('#ffffff');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'maroon') {
        translationColor = p.color('#ffad99');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'navy') {
        translationColor = p.color('#ffffff');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'grey') {
        translationColor = p.color('#000000');
        phoneticColor = p.color('#000000');
      } else if (color === 'beige' || color === 'white') {
        phoneticColor = p.color('#000000');
        translationColor = p.color('#000000');
      } else {
        translationColor = p.color('#000000');
        phoneticColor = p.color('#000000');
      }
      
  
      // Text settings
      p.textAlign(p.LEFT, p.TOP);
  
      // Extract data from translation
      const word = translation?.word || textInput || ''; // Original word
      const japaneseWord = translation?.translation?.japanese_word || ''; // Translated word in Japanese
      const phonetics = translation?.translation?.phonetics || ''; // Pronunciation
  
      // Display the Japanese word (translated word)
      p.fill(translationColor);
      let textSize = p.map(japaneseWord.length, 0, 32, 60, 18);
      p.textSize(textSize);
      
      p.textStyle(p.BOLD);
      p.text(japaneseWord, 940, 180); // Display the translated word
  
      // Display phonetics (pronunciation)
      p.fill(phoneticColor);
      p.textSize(textSize/1.5);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 940, 280); // Display the pronunciation
  
      // Display the original word (textInput)
      // p.textSize(32);
      // p.textStyle(p.NORMAL);
    //   p.text(word, 920, 300); // Display the original word
  
    };
};
  
export const japaneseBoldSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, translation } = values;
    let translationColor, phoneticColor;
    let japaneseFont;
    //
  
    p.preload = () => {
      // Load the Montserrat font during the preload phase
      japaneseFont = p.loadFont('/fonts/NotoSansJP-Black.ttf');
    };
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
      // p.textFont("Impact");
    };
  
    p.draw = () => {
      p.clear();
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        translationColor = p.color('#ffffff');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'navy') {
        translationColor = p.color('#ff5733');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'maroon') {
        translationColor = p.color('#ffad99');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'grey') {
        translationColor = p.color('#000000');
        phoneticColor = p.color('#000000');
      } else if (color === 'beige' || color === 'white') {
        phoneticColor = p.color('#77301b');
        translationColor = p.color('#77301b');
      } else {
        translationColor = p.color('#000000');
        phoneticColor = p.color('#000000');
      }
  
      p.textFont(japaneseFont);
      // Text settings
      p.textAlign(p.LEFT, p.TOP);
  
      // Extract data from translation
      const word = translation?.word || textInput || ''; // Original word
      const japaneseWord = translation?.translation?.japanese_word || ''; // Translated word in Japanese
      const phonetics = translation?.translation?.phonetics || ''; // Pronunciation
  
      // Display the Japanese word (translated word)
      p.fill(translationColor);
      let textSize = p.map(japaneseWord.length, 0, 32, 180, 24);
      p.textSize(textSize);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER);
      p.text(japaneseWord, 750, 180); // Display the translated word
  
      // Display phonetics (pronunciation)
      p.textFont("Arial")
      p.fill(phoneticColor);
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
    let translationColor, phoneticColor;
    let japaneseFont;
  
    p.preload = () => {
      // Load the Montserrat font during the preload phase
      japaneseFont = p.loadFont('/fonts/NotoSansJP-Black.ttf');
    };
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.noLoop();
      onP5Update();
      
    };
  
    p.draw = () => {
      p.clear();
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        translationColor = p.color('#ffffff');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'navy') {
        translationColor = p.color('#ff5733');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'maroon') {
        translationColor = p.color('#ffad99');
        phoneticColor = p.color('#ffffff');
      } else if (color === 'grey') {
        translationColor = p.color('#000000');
        phoneticColor = p.color('#000000');
      } else if (color === 'beige' || color === 'white') {
        phoneticColor = p.color('#000000');
        translationColor = p.color('#77301b');
      } else {
        translationColor = p.color('#000000');
        phoneticColor = p.color('#000000');
      }
  
      // Text settings

      p.textFont(japaneseFont);
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
  
      p.textFont("Impact");
      p.fill(p.color(phoneticColor));
      p.textSize(60);
      p.textStyle(p.ITALIC);
      p.text(phonetics, textX, 640); // Display the pronunciation below the Japanese word
    };
};
  