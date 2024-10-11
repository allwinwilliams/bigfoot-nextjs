export const languageSmallSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  const { textInput, translation } = values;
  let translationColor, phoneticColor;
  let fontFile;
  p.preload = () => {
    fontFile = p.loadFont('/fonts/NotoSans-variable.ttf');
  }

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
    // p.textFont(fontFile);

    // Set text color based on the T-shirt color
    if (color === 'black') {
      translationColor = p.color('#ffffff');
      phoneticColor = p.color('#ffffff');
    } else if (color === 'maroon') {
      translationColor = p.color('#ffad99');
      phoneticColor = p.color('#ffffff');
    } else if (color === 'navy') {
      translationColor = p.color('#ff5733');
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
    p.fill(translationColor);

    // Text settings
    p.textAlign(p.LEFT, p.TOP);

    // Extract data from translation
    const word = translation?.word || textInput || ''; // Original word
    const translatedWord = translation?.translation?.translated_word || ''; // Translated word
    const phonetics = translation?.translation?.phonetics || ''; // Pronunciation

    // Display the translated word
    let textSize = p.map(translatedWord.length, 0, 32, 60, 18);
    p.textSize(textSize);
    p.textStyle(p.BOLD);
    p.text(translatedWord, 940, 180);

    // Display phonetics (pronunciation)
    p.textSize(textSize / 1.5);
    p.textStyle(p.ITALIC);
    // p.text(phonetics, 940, 280);

    // Optionally display the original word
    // p.textSize(32);
    // p.textStyle(p.NORMAL);
    // p.text(word, 920, 300);
  };
};

export const languageBoldSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  const { textInput, translation } = values;
  let translationColor, phoneticColor;
  let fontFile;
  p.preload = () => {
    fontFile = p.loadFont('/fonts/NotoSans-variable.ttf');
  }

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1);
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
    // p.textFont("Impact"); // Optional: Set a bold font
  };

  p.draw = () => {
    p.clear();
    // p.textFont(fontFile);
    // Set text color based on the T-shirt color
    if (color === 'black') {
      translationColor = p.color('#ffffff');
      phoneticColor = p.color('#ffffff');
    } else if (color === 'maroon') {
      translationColor = p.color('#ffad99');
      phoneticColor = p.color('#ffffff');
    } else if (color === 'navy') {
      translationColor = p.color('#ff5733');
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
    p.fill(translationColor);

    // Text settings
    p.textAlign(p.CENTER, p.TOP);

    // Extract data from translation
    const word = translation?.word || textInput || ''; // Original word
    const translatedWord = translation?.translation?.translated_word || ''; // Translated word
    const phonetics = translation?.translation?.phonetics || ''; // Pronunciation

    // Display the translated word
    let textSize = p.map(translatedWord.length, 0, 32, 180, 24);
    p.textSize(textSize);
    p.textStyle(p.BOLD);
    p.text(translatedWord, 750, 180);

    // Display phonetics (pronunciation)
    p.textSize(textSize / 2.5);
    p.textStyle(p.ITALIC);
    // p.text(phonetics, 750, 480);

    // Optionally display the original word
    // p.textSize(32);
    // p.textStyle(p.NORMAL);
    // p.text(word, 920, 300);
  };
};

export const languageNeonSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  const { textInput, translation } = values;
  let translationColor, phoneticColor;
  let fontFile;
  p.preload = () => {
    fontFile = p.loadFont('/fonts/NotoSans-variable.ttf');
  }

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1);
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
    p.textFont('Impact'); // Optional: Set a font suitable for neon effect
  };

  p.draw = () => {
    p.clear();
    // p.textFont(fontFile);
    
    // Set text color based on the T-shirt color
    if (color === 'black') {
      translationColor = p.color('#ffffff');
      phoneticColor = p.color('#ffffff');
    } else if (color === 'maroon') {
      translationColor = p.color('#ffad99');
      phoneticColor = p.color('#ffffff');
    } else if (color === 'navy') {
      translationColor = p.color('#ff5733');
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
    p.textAlign(p.CENTER, p.TOP);

    // Extract data from translation
    const translatedWord = translation?.translation?.translated_word || ''; // Translated word
    const phonetics = translation?.translation?.phonetics || ''; // Pronunciation

    // Neon colors for the glow effect
    const neonColors = [
      p.color(255, 0, 255),
      p.color(0, 255, 255),
      p.color(255, 255, 0),
      p.color(255, 69, 0),
      p.color(4, 238, 50),
    ];

    // Apply multiple strokes to create neon glow effect
    let textX = 750; // X position for the text
    let textY = 380; // Y position for the translated word

    let textSize = p.map(translatedWord.length, 0, 32, 180, 24);
    p.textSize(textSize);
    p.textStyle(p.BOLD);
    p.stroke(0);

    // Create the neon glow effect
    for (let i = neonColors.length - 1; i >= 0; i--) {
      p.textSize(textSize - i * 5);
      p.fill(neonColors[i]);
      p.text(translatedWord, textX, textY);
      textY -= textSize / 10;
    }
    p.strokeWeight(0);

    // Reset fill color for phonetics
    p.fill(phoneticColor);
    p.textSize(60);
    p.textStyle(p.ITALIC);
    p.text(phonetics, textX, 640); // Display the pronunciation below the translated word
  };
};
