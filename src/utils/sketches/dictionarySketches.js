export const dictionaryBratSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput, definition } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
        p.fill('#92cc33');
        p.noStroke();
        p.rect(300, 50, 900, 900);

        p.fill(0);

  
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
      p.textSize(80);
      p.textStyle(p.BOLD);
      p.text(word, 400, 100);
  
      // Display phonetics
      p.textSize(48);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 400, 220);
  
      // Display type
      p.textSize(48);
      p.textStyle(p.NORMAL);
      p.text(type, 400, 300);
  
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
  
      const definitionMaxCharsPerLine = 32;
      const exampleMaxCharsPerLine = 40;
  
      // Split the definition and example texts
      const definitionLines = splitText(definitionText, definitionMaxCharsPerLine);
      const exampleLines = splitText(`"${example}"`, exampleMaxCharsPerLine);
  
      // Text settings for definition
      p.textSize(48);
      p.textStyle(p.NORMAL);
      p.textLeading(60); // Adjust line spacing if needed
  
      let yPosition = 380;
  
      // Display each line of the definition
      definitionLines.forEach(line => {
        p.text(line, 400, yPosition);
        yPosition += p.textLeading();
      });
  
      yPosition += 40; 
  
      p.textSize(40);
      p.textLeading(50);
  
      exampleLines.forEach(line => {
        p.text(line, 400, yPosition);
        yPosition += p.textLeading();
      });
    };
};

export const dictionarySmallSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput, definition } = values;
  
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
  
      // Extract data from definition
      const word = definition?.word || textInput || '';
      const phonetics = definition?.details?.phonetics || '';
      const typeArray = definition?.details?.type || [];
      const type = Array.isArray(typeArray) ? typeArray.join(', ') : typeArray;
      const definitionText = definition?.details?.definition || '';
      const example = definition?.details?.example || '';
  
      // Display the word
      p.textSize(60);
      p.textStyle(p.BOLD);
      p.text(word, 900, 100);
  
      // Display phonetics
      p.textSize(32);
      p.textStyle(p.ITALIC);
      p.text(phonetics, 900, 180);
  
      // Display type
      p.textSize(32);
      p.textStyle(p.NORMAL);
      p.text(type, 900, 220);
  
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
        p.text(line, 900, yPosition);
        yPosition += p.textLeading();
      });
  
      yPosition += 32; 
  
      p.textSize(24);
      p.textLeading(30);
  
      exampleLines.forEach(line => {
        p.text(line, 900, yPosition);
        yPosition += p.textLeading();
      });
    };
};

export const dictionaryCodeSketch = (p, canvasRef, onP5Update, color, values) => {
    const canvasWidth = 2600;
    const canvasHeight = 2000;
    const { textInput, definition } = values;
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      // Define color schemes based on T-shirt color
      const colorSchemes = {
        black: {
          background: '#1e1e1e', // Dark background
          punctuation: '#d4d4d4',
          key: '#9cdcfe',
          string: '#ce9178',
          number: '#b5cea8',
          boolean: '#569cd6',
          null: '#808080',
        },
        white: {
          background: '#ffffff', // Light background
          punctuation: '#000000',
          key: '#0000ff',
          string: '#a31515',
          number: '#098658',
          boolean: '#0000ff',
          null: '#098658',
        },
        grey: {
          background: '#f0f0f0', // Light grey background
          punctuation: '#000000',
          key: '#0451a5',
          string: '#a31515',
          number: '#098658',
          boolean: '#0451a5',
          null: '#098658',
        },
        beige: {
          background: '#f5f5dc', // Beige background
          punctuation: '#000000',
          key: '#000080',
          string: '#800000',
          number: '#008000',
          boolean: '#000080',
          null: '#008000',
        },
      };
  
      // Get the appropriate color scheme
      const scheme = colorSchemes[color] || colorSchemes.white;
  
      // Set background color
      p.background(scheme.background);
  
      // Set default text settings
      p.textAlign(p.LEFT, p.TOP);
      p.textFont('Courier New');
      p.textSize(40);
  
      // Extract data from definition
      const jsonData = definition || {};
      if (!jsonData.word) {
        jsonData.word = textInput || '';
      }
  
      // Convert JSON data to formatted string
      const jsonString = JSON.stringify(jsonData, null, 2);
  
      // Tokenize and render the JSON string with syntax highlighting and proper indentation
      const lines = jsonString.split('\n');
      let x = 200;
      let y = 100;
      const lineHeight = 60;
      const maxCharsPerLine = 50; // Adjust this value as needed
  
      lines.forEach(line => {
        // Handle indentation based on leading spaces
        const leadingSpaces = line.match(/^(\s*)/)[1].length;
        const indent = ' '.repeat(leadingSpaces);
  
        // Split the line into tokens
        const tokens = tokenizeJSONLine(line.trim());
  
        // Handle line wrapping based on character count
        let currentLine = indent;
        tokens.forEach(token => {
          const { type, value } = token;
          const tokenColor = getTokenColor(type, scheme);
  
          // If the token is a string value (not a key) and exceeds maxCharsPerLine, split it
          if (type === 'string' && !isKeyToken(token)) {
            const stringContent = value; // Includes the surrounding quotes
            const splitStringLines = splitText(stringContent, maxCharsPerLine - currentLine.length);
  
            splitStringLines.forEach((strLine, index) => {
              if (currentLine.length + strLine.length > maxCharsPerLine) {
                // Draw the current line
                p.fill(tokenColor);
                p.text(currentLine, x, y);
                y += lineHeight;
                currentLine = indent + '  ' + strLine; // Add extra indentation for wrapped lines
              } else {
                currentLine += strLine;
              }
  
              if (index < splitStringLines.length - 1) {
                // Move to next line after this part of the split string
                p.fill(tokenColor);
                p.text(currentLine, x, y);
                y += lineHeight;
                currentLine = indent + '  ';
              }
            });
          } else {
            // Measure the width of the current line and token
            if (currentLine.length + value.length > maxCharsPerLine) {
              // Draw the current line
              p.fill(tokenColor);
              p.text(currentLine, x, y);
              y += lineHeight;
              currentLine = indent + value;
            } else {
              currentLine += value;
            }
          }
        });
  
        // Draw any remaining text in the current line
        if (currentLine.trim() !== '') {
          p.fill(scheme.punctuation); // Default color
          p.text(currentLine, x, y);
          y += lineHeight;
        }
      });
    };
  
    // Function to check if a token is a key
    function isKeyToken(token) {
      // A key token is a string that is immediately followed by a colon
      return token.isKey;
    }
  
    // Helper function to tokenize a line of JSON string
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
            tokens.push({ type: 'string', value: currentToken, isKey });
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
  
            // Check if this string is a key (followed by ':')
            const restOfLine = line.slice(i);
            const colonIndex = restOfLine.indexOf(':');
            const quoteIndex = restOfLine.indexOf('"', 1);
            if (colonIndex > 0 && (quoteIndex === -1 || colonIndex < quoteIndex)) {
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
  
    // Function to split text into lines based on character count
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
  
    // Helper function to classify tokens
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
  
    // Helper function to get token color
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
  