export const dictionaryBratSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, definition } = values;

    p.preload = () => {
        // If you have a custom font, load it here.
        // p.font = p.loadFont('path/to/font.ttf');
    };

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
        p.textFont("Georgia");
        p.textAlign(p.LEFT, p.TOP);
        const word = (definition?.word || textInput || '').toLowerCase();
        const phonetics = (definition?.details?.phonetics || '').toLowerCase();
        const typeArray = definition?.details?.type || [];
        const type = Array.isArray(typeArray) ? typeArray.join(', ').toLowerCase() : typeArray.toLowerCase();
        const definitionText = (definition?.details?.definition || '').toLowerCase();
        const example = (definition?.details?.example || '').toLowerCase();

        const splitText = (text, maxLength) => {
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';

            words.forEach(word => {
                if ((currentLine + word).length <= maxLength) {
                    currentLine += `${word} `;
                } else {
                    lines.push(currentLine.trim());
                    currentLine = `${word} `;
                }
            });

            if (currentLine.length > 0) {
                lines.push(currentLine.trim());
            }

            return lines;
        };

        const definitionMaxCharsPerLine = 48;
        const exampleMaxCharsPerLine = 48;

        const definitionLines = splitText(definitionText, definitionMaxCharsPerLine);
        const exampleLines = splitText(`"${example}"`, exampleMaxCharsPerLine);

        let textSize = p.map(word.length, 0, 32, 80, 32)

        p.textSize(textSize);
        p.textStyle(p.BOLD);

        let totalTextHeight = 0;
        const lineHeight = 60;
        totalTextHeight += 100 + (definitionLines.length + exampleLines.length) * lineHeight;

        const backgroundHeight = Math.max(900, totalTextHeight + 200);

        // Draw background rectangle (adjust height dynamically)
        p.fill('#92cc33');
        p.noStroke();
        p.rect(300, 30, 900, backgroundHeight);

        p.fill(0); // Set text color to black

        // Display the word
        p.text(word, 400, 150);

        // Display phonetics
        p.textSize(textSize/2);
        p.textStyle(p.ITALIC);
        p.text(phonetics, 400, 240);

        // Display type
        p.textSize(textSize/2);
        p.textStyle(p.NORMAL);
        p.text(type, 400, 320);

        // Text settings for definition
        p.textSize(textSize/2);
        p.textStyle(p.NORMAL);
        p.textLeading(60); // Adjust line spacing if needed

        let yPosition = 400;

        // Display each line of the definition
        definitionLines.forEach(line => {
            p.text(line, 400, yPosition);
            yPosition += p.textLeading();
        });

        yPosition += 40; // Add spacing before the example

        // Text settings for example
        p.textSize(textSize/2);
        p.textLeading(50);

        exampleLines.forEach(line => {
            p.text(line, 400, yPosition);
            yPosition += p.textLeading();
        });
    };
};

export const dictionarySmallSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    const { textInput, definition } = values;
    let textColor;
  
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
      // Set background and text color based on the T-shirt color
      if (color === 'black') {
        textColor = p.color('#ffffff');
      } else if (color === 'navy') {
        textColor = p.color('#ffffff');
      } else if (color === 'maroon') {
        textColor = p.color('#ffffff');
      } else if (color === 'white') {
        textColor = p.color('#000000');
      } else if (color === 'beige') {
        textColor = p.color('#000000');
      } else {
        textColor = p.color('#000000');
      }
      p.fill(textColor);
      
  
      // Text settings
      p.textAlign(p.LEFT, p.TOP);
  
      // Extract data from definition
      const word = definition?.word || textInput || '';
      const phonetics = definition?.details?.phonetics || '';
      const typeArray = definition?.details?.type || [];
      const type = Array.isArray(typeArray) ? typeArray.join(', ') : typeArray;
      const definitionText = definition?.details?.definition || '';
      const example = definition?.details?.example || '';
  
      // Display the word
      let textSize = p.map(word.length, 0, 32, 60, 24)
      p.textSize(textSize);
      p.textStyle(p.BOLD);
      p.text(word, 980, 160 - textSize);
  
      // Display phonetics
      p.textSize(textSize/2);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 980, 180);
  
      // Display type
      p.textSize(textSize/2);
      p.textStyle(p.NORMAL);
      p.text(type, 980, 220);
  
      // Function to split text into lines based on character count
      const splitText = (text, maxLength) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
  
        words.forEach(word => {
          if ((currentLine + word).length <= maxLength) {
            currentLine += `${word} `;
          } else {
            lines.push(currentLine.trim());
            currentLine = `${word} `;
          }
        });
  
        if (currentLine.length > 0) {
          lines.push(currentLine.trim());
        }
  
        return lines;
      };
  
      const definitionMaxCharsPerLine = 36;
      const exampleMaxCharsPerLine = 40;
  
      // Split the definition and example texts
      const definitionLines = splitText(definitionText, definitionMaxCharsPerLine);
      const exampleLines = splitText(`"${example}"`, exampleMaxCharsPerLine);
  
      p.textSize(24);
      p.textStyle(p.NORMAL);
      p.textLeading(30);
  
      let yPosition = 300;
  
      definitionLines.forEach(line => {
        p.text(line, 980, yPosition);
        yPosition += p.textLeading();
      });
  
      yPosition += 32; 
  
      p.textSize(24);
      p.textLeading(30);
  
      exampleLines.forEach(line => {
        p.text(line, 980, yPosition);
        yPosition += p.textLeading();
      });
    };
};

export const dictionaryCodeSketch = (p, canvasRef, onP5Update, color, values) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  const { textInput, definition } = values;

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1); 
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    
    const colorSchemes = {
      black: {
        background: '#1e1e1e',
        punctuation: '#d4d4d4',
        key: '#2c2cfe',
        string: '#2ef178',
        number: '#b5cea8',
        boolean: '#569cd6',
        null: '#808080',
      },
      white: {
        background: '#ffffff',
        punctuation: '#000000',
        key: '#0000ff',
        string: '#a31515',
        number: '#098658',
        boolean: '#0000ff',
        null: '#098658',
      },
      grey: {
        background: '#f0f0f0',
        punctuation: '#000000',
        key: '#0451a5',     // Color for keys
        string: '#a31515',   // Color for strings
        number: '#098658',
        boolean: '#0451a5',
        null: '#098658',
      },
      beige: {
        background: '#f5f5dc',
        punctuation: '#000000',
        key: '#000080',     // Color for keys
        string: '#0e5108',   // Color for strings
        number: '#008000',
        boolean: '#000080',
        null: '#008000',
      },
    };

    // Get the appropriate color scheme
    const scheme = colorSchemes[color] || colorSchemes.white;

    // Set background color
    // p.background(scheme.background);
    p.clear();

    // Set default text settings
    p.textAlign(p.LEFT, p.TOP);
    p.textFont('Courier New');
    p.textSize(32);

    // Extract data from definition
    const jsonData = definition || {};
    if (!jsonData.word) {
      jsonData.word = textInput || '';
    }

    // Convert JSON data to formatted string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Tokenize and render the JSON string with syntax highlighting and proper indentation
    const lines = jsonString.split('\n');
    let x = 220;
    let y = 100;
    const lineHeight = 60;
    const maxCharsPerLine = 50;
    const indentWidth = 40;

    lines.forEach(line => {
      // Handle indentation based on leading spaces (each space is 2 characters of indent in JSON)
      const leadingSpaces = line.match(/^(\s*)/)[1].length;
      const indentLevel = leadingSpaces / 2;
      const indent = ' '.repeat(leadingSpaces);

      // Split the line into tokens
      const tokens = tokenizeJSONLine(line.trim());

      let currentLine = indent;
      let lineTokens = [];
      tokens.forEach(token => {
        const { type, value } = token;
        const tokenColor = getTokenColor(type, scheme);

        // Split long string values if necessary
        if (type === 'string' && !isKeyToken(token)) {
          const splitStringLines = splitText(value, maxCharsPerLine - currentLine.length);
          splitStringLines.forEach((strLine, index) => {
            if (currentLine.length + strLine.length > maxCharsPerLine) {
              // Render the current line with indentation
              renderLine(lineTokens, x + indentLevel * indentWidth, y);
              y += lineHeight;
              currentLine = indent + '  ';
              lineTokens = [];
            }
            currentLine += strLine;
            lineTokens.push({ text: strLine, color: tokenColor });
            if (index < splitStringLines.length - 1) {
              // Render the current line with indentation
              renderLine(lineTokens, x + indentLevel * indentWidth, y);
              y += lineHeight;
              currentLine = indent + '  ';
              lineTokens = [];
            }
          });
        } else {
          if (currentLine.length + value.length > maxCharsPerLine) {
            // Render the current line with indentation
            renderLine(lineTokens, x + indentLevel * indentWidth, y);
            y += lineHeight;
            currentLine = indent;
            lineTokens = [];
          }
          currentLine += value;
          lineTokens.push({ text: value, color: tokenColor });
        }
      });

      if (lineTokens.length > 0) {
        renderLine(lineTokens, x + indentLevel * indentWidth, y);
        y += lineHeight;
      }
    });
  };

  function renderLine(lineTokens, x, y) {
    let xOffset = x;
    lineTokens.forEach(token => {
      p.fill(token.color);
      p.text(token.text, xOffset, y);
      xOffset += p.textWidth(token.text);
    });
  }

  function isKeyToken(token) {
    return token.type === 'key';
  }

  function tokenizeJSONLine(line) {
    const tokens = [];
    let currentToken = '';
    let isString = false;
    let isEscaped = false;
    let isKey = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (isString) {
        currentToken += char;
        if (isEscaped) {
          isEscaped = false;
        } else if (char === '\\') {
          isEscaped = true;
        } else if (char === '"') {
          isString = false;
          tokens.push({ type: isKey ? 'key' : 'string', value: currentToken });
          currentToken = '';
          isKey = false;
        }
      } else {
        if (char === '"') {
          if (currentToken.trim() !== '') {
            tokens.push({ type: 'punctuation', value: currentToken });
            currentToken = '';
          }
          currentToken += char;
          isString = true;

          const restOfLine = line.slice(i + 1);
          const colonIndex = restOfLine.indexOf(':');
          const nextQuoteIndex = restOfLine.indexOf('"');
          if (colonIndex !== -1 && (nextQuoteIndex === -1 || colonIndex < nextQuoteIndex)) {
            isKey = true;
          }
        } else if (char.match(/[{}\[\],:]/)) {
          if (currentToken.trim() !== '') {
            tokens.push(classifyToken(currentToken));
            currentToken = '';
          }
          tokens.push({ type: 'punctuation', value: char });
        } else {
          currentToken += char;
        }
      }
    }

    if (currentToken.trim() !== '') {
      tokens.push(classifyToken(currentToken));
    }

    return tokens;
  }

  function splitText(text, maxLength) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }

    return lines;
  }

  function classifyToken(token) {
    const trimmed = token.trim();
    if (trimmed === 'true' || trimmed === 'false') {
      return { type: 'boolean', value: trimmed };
    } else if (trimmed === 'null') {
      return { type: 'null', value: trimmed };
    } else if (!isNaN(trimmed)) {
      return { type: 'number', value: trimmed };
    } else {
      return { type: 'punctuation', value: token };
    }
  }

  function getTokenColor(type, scheme) {
    switch (type) {
      case 'key':
        return scheme.key;
      case 'string':
        return scheme.string;
      case 'number':
        return scheme.number;
      case 'boolean':
        return scheme.boolean;
      case 'null':
        return scheme.null;
      default:
        return scheme.punctuation;
    }
  }
};
