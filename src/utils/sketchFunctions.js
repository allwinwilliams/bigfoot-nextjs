
export const Maximal = (p, canvasRef, onP5Update, color, songData) => {
    const drawingWidth = 1200;
    const drawingHeight = 1200; // Height for the vertical lines
    const canvasWidth = 1500;
    const canvasHeight = 2000; // Total canvas height
    let explicitImage;
  
    p.preload = () => {
      explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
    };
  
    p.setup = () => {
      console.log('Setting up p5 sketch type 1');
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      p.background(200);
      p.fill(50);
      p.textSize(32);
  
      if (songData) {
        const songDetails = songData.details;
        const analysisData = songData.analysis;
        const featuresData = songData.features;
  
        const { name, artists, explicit } = songDetails;
        const artistNames = artists.map(artist => artist.name).join(', ');
  
        const totalDuration = analysisData.track.duration;
        const centerX = (canvasWidth - drawingWidth) / 2;
        const centerY = (canvasHeight - drawingHeight) / 5;
  
        // Determine the base hue from valence
        // const baseHue = p.map(featuresData.valence, 0, 1, 260, 10);
        // const baseHue = p.lerp(265, 41, featuresData.valence);
        const hueStart = 265;
        const hueEnd = 20;
        let baseHue;

        // Ensure the shortest path on the color wheel
        if (hueStart > hueEnd) {
            if (hueStart - hueEnd > 180) {
                baseHue = p.lerp(hueStart, hueEnd + 360, featuresData.valence) % 360;
            } else {
                baseHue = p.lerp(hueStart, hueEnd, featuresData.valence);
            }
            } else {
            if (hueEnd - hueStart > 180) {
                baseHue = p.lerp(hueStart + 360, hueEnd, featuresData.valence) % 360;
            } else {
                baseHue = p.lerp(hueStart, hueEnd, featuresData.valence);
            }
        }
        let fillColor, strokeColor;
        if (color === 'black') {
          fillColor = p.color(255); // White fill color
          strokeColor = p.color(255); // White stroke color
        } else if (color === 'beige') {
          fillColor = p.color(10); // Light grey fill color
          strokeColor = p.color(10, 0, 0); // Light grey stroke color
        } else {
          fillColor = p.color(50); // Default fill color
          strokeColor = p.color(50); // Default stroke color
        }
  
        // Draw vertical lines for each segment
        analysisData.segments.forEach((segment) => {
          const x = p.map(segment.start, 0, totalDuration, centerX, centerX + drawingWidth);
          const loudness = segment.loudness_max;
          const lineHeight = p.map(loudness, -30, 5, 0, drawingHeight);
  
          // Map loudness to hue within the range of -50 to +50 around the base hue
          const hue = p.map(loudness, -30, 5, baseHue - 50, baseHue + 50);
  
          // Adjust color visibility for the beige variant
          if (color === 'beige') {
            strokeColor = p.color(hue, 65, 25); // Adjusted color with higher brightness and saturation
          } else {
            strokeColor = p.color(hue, 100, 30); // Default color
          }
  
          p.stroke(strokeColor);
          p.strokeWeight(2);
          p.line(x, centerY + (drawingHeight / 2) - lineHeight / 2, x, centerY + (drawingHeight / 2) + lineHeight / 2);
        });
  
        // Convert duration to MM:SS format
        const durationMinutes = Math.floor(songDetails.duration_ms / 60000);
        const durationSeconds = Math.floor((songDetails.duration_ms % 60000) / 1000).toString().padStart(2, '0');
        const durationFormatted = `${durationMinutes}:${durationSeconds}`;
  
        // Prepare the song name and artist names for display
        const splitText = (text, maxLength) => {
          if (text.length <= maxLength) {
            return [text];
          }
          const regex = new RegExp(`.{1,${maxLength}}`, 'g');
          return text.match(regex);
        };
  
        const nameLines = splitText(name, 70);
        const artistLines = splitText(artistNames, 70);
        const nameYOffset = nameLines.length > 1 ? 40 : 0; // Additional offset if name is on two lines
  
        // Write the song name, artist names, and duration below the vertical lines
        p.fill(fillColor);
        p.noStroke();
        p.textAlign(p.CENTER);
        p.textSize(40);
        p.textStyle(p.BOLD);
        nameLines.forEach((line, index) => {
          p.text(line, canvasWidth / 2, centerY + drawingHeight + 100 + index * 40);
        });
  
        p.textSize(24);
        p.textStyle(p.NORMAL);
        artistLines.forEach((line, index) => {
          p.text(line, canvasWidth / 2, centerY + drawingHeight + 150 + nameYOffset + index * 30);
        });
  
        if (explicit && explicitImage) {
          p.image(explicitImage, canvasWidth / 2 - 50, centerY + drawingHeight + 200 + nameYOffset, 100, 100); // Adjust the size and position as needed
        }
  
        p.textSize(24);
        p.textStyle(p.BOLD);
        p.text(`0:00`, centerX - 50, centerY + drawingHeight/2);
        p.text(`${durationFormatted}`, centerX + drawingWidth + 40, centerY + drawingHeight/2);
      } else {
        p.textSize(32);
        p.text('Loading...', canvasWidth / 2, canvasHeight / 4);
      }
    };
  };

  export const maxGlitch = (p, canvasRef, onP5Update, color, songData) => {
    const drawingWidth = 1200;
    const drawingHeight = 1200; // Height for the vertical lines
    const canvasWidth = 1500;
    const canvasHeight = 2000; // Total canvas height
    let explicitImage;
  
    p.preload = () => {
      explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
    };
  
    p.setup = () => {
      console.log('Setting up p5 sketch type 1');
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      p.background(200);
      p.fill(50);
      p.textSize(32);
  
      if (songData) {
        const songDetails = songData.details;
        const analysisData = songData.analysis;
        const featuresData = songData.features;
  
        const { name, artists, explicit } = songDetails;
        const artistNames = artists.map(artist => artist.name).join(', ');
  
        const totalDuration = analysisData.track.duration;
        const centerX = (canvasWidth - drawingWidth) / 2;
        const centerY = (canvasHeight - drawingHeight) / 5;
  
        // Determine the base hue from valence
        const hueStart = 265;
        const hueEnd = 20;
        let baseHue;
  
        // Ensure the shortest path on the color wheel
        if (hueStart > hueEnd) {
          if (hueStart - hueEnd > 180) {
            baseHue = p.lerp(hueStart, hueEnd + 360, featuresData.valence) % 360;
          } else {
            baseHue = p.lerp(hueStart, hueEnd, featuresData.valence);
          }
        } else {
          if (hueEnd - hueStart > 180) {
            baseHue = p.lerp(hueStart + 360, hueEnd, featuresData.valence) % 360;
          } else {
            baseHue = p.lerp(hueStart, hueEnd, featuresData.valence);
          }
        }
        let fillColor, strokeColor;
        if (color === 'black') {
          fillColor = p.color(255); // White fill color
          strokeColor = p.color(255); // White stroke color
        } else if (color === 'beige') {
          fillColor = p.color(10); // Light grey fill color
          strokeColor = p.color(10, 0, 0); // Light grey stroke color
        } else {
          fillColor = p.color(50); // Default fill color
          strokeColor = p.color(50); // Default stroke color
        }
  
        // Draw vertical lines for each segment
        analysisData.segments.forEach((segment) => {
          const x = p.map(segment.start, 0, totalDuration, centerX, centerX + drawingWidth);
          const loudness = segment.loudness_max;
          const lineHeight = p.map(loudness, -30, 5, 0, drawingHeight);
  
          // Map loudness to hue within the range of -50 to +50 around the base hue
          const hue = p.map(loudness, -30, 5, baseHue - 50, baseHue + 50);
  
          // Adjust color visibility for the beige variant
          if (color === 'beige') {
            strokeColor = p.color(hue, 65, 25); // Adjusted color with higher brightness and saturation
          } else {
            strokeColor = p.color(hue, 100, 30); // Default color
          }
  
          // Create gradient effect for the line
          for (let i = 0; i < lineHeight; i++) {
            const inter = p.map(i, 0, lineHeight, 0, 1);
            const color = p.lerpColor(p.color(hue, 100, 10), strokeColor, inter);
            p.stroke(color);
            p.line(x, centerY + (drawingHeight / 2) - i, x, centerY + (drawingHeight / 2) - i - 1);
          }
        });
  
        // Convert duration to MM:SS format
        const durationMinutes = Math.floor(songDetails.duration_ms / 60000);
        const durationSeconds = Math.floor((songDetails.duration_ms % 60000) / 1000).toString().padStart(2, '0');
        const durationFormatted = `${durationMinutes}:${durationSeconds}`;
  
        // Prepare the song name and artist names for display
        const splitText = (text, maxLength) => {
          if (text.length <= maxLength) {
            return [text];
          }
          const regex = new RegExp(`.{1,${maxLength}}`, 'g');
          return text.match(regex);
        };
  
        const nameLines = splitText(name, 70);
        const artistLines = splitText(artistNames, 70);
        const nameYOffset = nameLines.length > 1 ? 40 : 0; // Additional offset if name is on two lines
  
        // Write the song name, artist names, and duration below the vertical lines
        p.fill(fillColor);
        p.noStroke();
        p.textAlign(p.CENTER);
        p.textSize(36);
        p.textStyle(p.BOLD);
        nameLines.forEach((line, index) => {
          p.text(line, canvasWidth / 2, centerY + drawingHeight + 80 + index * 40);
        });
  
        p.textSize(20);
        p.textStyle(p.NORMAL);
        artistLines.forEach((line, index) => {
          p.text(line, canvasWidth / 2, centerY + drawingHeight + 130 + nameYOffset + index * 30);
        });
  
        if (explicit && explicitImage) {
          p.image(explicitImage, canvasWidth / 2 - 50, centerY + drawingHeight + 180 + nameYOffset, 100, 100); // Adjust the size and position as needed
        }
  
        p.textSize(24);
        p.textStyle(p.BOLD);
        p.text(`0:00`, centerX, centerY + drawingHeight + 5);
        p.text(`${durationFormatted}`, centerX + drawingWidth - 20, centerY + drawingHeight + 5);
      } else {
        p.textSize(32);
        p.text('Loading...', canvasWidth / 2, canvasHeight / 4);
      }
    };
  };

  export const sketchType2 = (p, canvasRef, onP5Update, color, songData) => {
  const drawingWidth = 1000; // Width for the lines
  const drawingHeight = 1500; // Height for the lines
  const canvasWidth = 1500;
  const canvasHeight = 2000; // Total canvas height
  let explicitImage;

  p.preload = () => {
    explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
  };

  p.setup = () => {
    console.log('Setting up p5 sketch type 1');
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    p.background(200);
    p.fill(50);
    p.textSize(32);

    if (songData) {
      const songDetails = songData.details;
      const analysisData = songData.analysis;
      const featuresData = songData.features;

      const { name, artists, explicit } = songDetails;
      const artistNames = artists.map(artist => artist.name).join(', ');

      const totalDuration = analysisData.track.duration;
      const centerX = (canvasWidth - drawingWidth) / 2;
      const centerY = (canvasHeight - drawingHeight) / 5;

      // Determine the base hue from valence
      const baseHue = p.lerp(265, 41, featuresData.valence);

      let fillColor, strokeColor;
      if (color === 'black') {
        fillColor = p.color(255); // White fill color
        strokeColor = p.color(255); // White stroke color
      } else if (color === 'beige') {
        fillColor = p.color(5); // Light grey fill color
        strokeColor = p.color(5, 0, 0); // Light grey stroke color
      } else {
        fillColor = p.color(50); // Default fill color
        strokeColor = p.color(50); // Default stroke color
      }

      // Draw vertical lines for each segment
      analysisData.segments.forEach((segment) => {
        const y = p.map(segment.start, 0, totalDuration, centerY + drawingHeight, centerY);
        const loudness = segment.loudness_max;
        const lineWidth = p.map(loudness, -30, 5, 0, drawingWidth);

        // Map loudness to hue within the range of -50 to +50 around the base hue

        // Adjust color visibility for the beige variant
        if (color === 'beige') {
          strokeColor = p.color(5); // Adjusted color with higher brightness and saturation
        } else {
          strokeColor = p.color(255); // Default color
        }

        p.stroke(strokeColor);
        p.strokeWeight(2);
        p.line(centerX + (drawingWidth / 2) - lineWidth / 2, y, centerX + (drawingWidth / 2) + lineWidth / 2, y);
      });

      // Convert duration to MM:SS format
      const durationMinutes = Math.floor(songDetails.duration_ms / 60000);
      const durationSeconds = Math.floor((songDetails.duration_ms % 60000) / 1000).toString().padStart(2, '0');
      const durationFormatted = `${durationMinutes}:${durationSeconds}`;

      // Prepare the song name and artist names for display
      const splitText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return [text];
        }
        const regex = new RegExp(`.{1,${maxLength}}`, 'g');
        return text.match(regex);
      };

      const nameLines = splitText(name, 50);
      const artistLines = splitText(artistNames, 60);
      const nameYOffset = nameLines.length > 1 ? 60 : 0; // Additional offset if name is on two lines

      p.fill(fillColor);
      p.noStroke();
      p.textAlign(p.CENTER);

      // Write 0:00 at the top
      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`0:00`, canvasWidth / 2, centerY - 20);

      // Write the duration at the bottom
      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`${durationFormatted}`, canvasWidth / 2, centerY + drawingHeight + 40);

      // Write the song name below the duration
      p.textSize(40);
      p.textStyle(p.BOLD);
      nameLines.forEach((line, index) => {
        p.text(line, canvasWidth / 2, centerY + drawingHeight + 100 + index * 40);
      });

      // Write the artist names below the song name
      p.textSize(30);
      p.textStyle(p.NORMAL);
      artistLines.forEach((line, index) => {
        p.text(line, canvasWidth / 2, centerY + drawingHeight + 150 + nameYOffset + index * 30);
      });

      // Draw the explicit image if the song is explicit
      if (explicit && explicitImage) {
        p.image(explicitImage, canvasWidth / 2 - 50, centerY + drawingHeight + 200 + nameYOffset, 100, 100); // Adjust the size and position as needed
      }
    } else {
      p.textSize(32);
      p.text('Loading...', canvasWidth / 2, canvasHeight / 4);
    }
  };
};

  
export const sketchType1 = (p, canvasRef, onP5Update, color, songData) => {
  const drawingWidth = 800; // Reduced by 20%
  const drawingHeight = 640; // Reduced by 20%
  const canvasWidth = 1500;
  const canvasHeight = 1400;
  console.log("songData", songData);

  p.setup = () => {
    console.log('Setting up p5 sketch type 1');
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    if (!songData) return;
    p.translate(200,200);
    const songDetails = songData.details;
    const analysisData = songData.analysis;
    const featuresData = songData.features;

    const sectionWidth = drawingWidth / analysisData.sections.length;
    const rowHeight = drawingHeight / 12;
    const hue = p.map(featuresData.valence, 0, 1, 0, 360); // Hue based on valence

    const pitchSums = Array(12).fill(0);

    analysisData.sections.forEach((section, i) => {
      const x = i * sectionWidth;
      analysisData.segments.forEach((segment) => {
        if (segment.start >= section.start && segment.start < section.start + section.duration) {
          segment.pitches.forEach((pitch, j) => {
            if (pitch > 0.6) {
              const y = j * (rowHeight + 4); // Reduced by 20%
              const brightness = p.map(pitch, 0.6, 1, 70, 0); // Darker brightness range for beige
              p.fill(hue, 100, brightness);
              const segmentHeight = segment.duration * (drawingHeight / 10); // Scaling segment duration for height
              p.noStroke();
              p.rect(x, y, sectionWidth, segmentHeight);
            }
            // Accumulate pitch values
            pitchSums[j] += pitch;
          });
        }
      });
    });

    // Draw the horizontal bar chart on the rightmost side
    const barChartX = drawingWidth + 40; // Reduced by 20%
    const maxPitchSum = p.max(pitchSums);

    pitchSums.forEach((sum, j) => {
      const y = j * (rowHeight + 4); // Reduced by 20%
      const barWidth = p.map(sum, 0, maxPitchSum, 0, 320); // Reduced by 20%
      p.fill(hue, 100, p.map(sum, 0, maxPitchSum, 30, 90)); // Darker brightness based on sum for beige
      p.rect(barChartX, y, barWidth, rowHeight); // No gaps between bars
    });

    // Draw vertical lines below the pitch representation
    const lineStartY = drawingHeight + 200; // Reduced by 20%
    analysisData.segments.forEach((segment) => {
      const x = p.map(segment.start, 0, analysisData.track.duration, 0, drawingWidth);
      const lineHeight = p.map(logTransform(segment.loudness_max), logTransform(-60), logTransform(0), 40, 240); // Reduced by 20%

      if (color === 'black') {
        p.stroke(255);
      } else if (color === 'beige') {
        p.stroke(10);
      } else {
        p.stroke(255);
      }

      p.line(x, lineStartY - lineHeight / 2, x, lineStartY + lineHeight / 2);
    });

    p.noStroke();
    // Write "BIGFOOT" after the vertical lines
    p.fill(color === 'beige' ? p.color(20) : p.color(255)); // Very dark grey for beige
    p.textAlign(p.LEFT);
    p.textSize(38); // Reduced by 20%
    p.textStyle(p.BOLD);
    p.text("BIGFOOT", 20, lineStartY + 200); // Reduced by 20%

    // Display song name and artist names on the right side
    p.fill(color === 'beige' ? p.color(10) : p.color(255)); // Darker text for beige
    p.textSize(19); // Reduced by 20%
    p.textStyle(p.BOLD);
    p.text(songDetails.name, drawingWidth + 56, lineStartY - 20); // Reduced by 20%

    p.textSize(14); // Reduced by 20%
    p.textStyle(p.NORMAL);
    const artistNames = songDetails.artists.map(artist => artist.name).join(', ');
    p.text(artistNames, drawingWidth + 56, lineStartY - 0); // Reduced by 20%

    // Display song duration and BPM on the right side
    p.textSize(14); // Reduced by 20%
    p.textStyle(p.NORMAL);
    const duration = songDetails.duration_ms / 1000;
    p.text(`${duration.toFixed(2)} seconds`, drawingWidth + 56, lineStartY + 20); // Reduced by 20%

    const bpm = featuresData.tempo;
    p.text(`${bpm.toFixed(2)} bpm`, drawingWidth + 56, lineStartY + 40); // Reduced by 20%
  };

  function logTransform(value) {
    return value > 0 ? value : p.log(1 + p.abs(value));
  }
};

  
  //minimal
export const sketchType3 = (p, canvasRef, onP5Update, color, songData) => {
  const drawingWidth = 1000;
  const drawingHeight = 200; // Height for the vertical lines
  const canvasWidth = 1500;
  const canvasHeight = 2000; // Total canvas height
  
  let explicitImage;
  
  p.preload = () => {
    explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
  };

  p.setup = () => {
    console.log('Setting up p5 sketch type 3');
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };
  
  p.draw = () => {
    p.background(200);
    p.fill(50);
    p.textSize(32);

    let fillColor, strokeColor;

    if (color === 'black') {
      fillColor = p.color(255); // White fill color
      strokeColor = p.color(255); // White stroke color
    } else if (color === 'beige') {
      fillColor = p.color(5); // Dark grey fill color
      strokeColor = p.color(5); // Dark grey stroke color
    } else {
      fillColor = p.color(50); // Default fill color
      strokeColor = p.color(50); // Default stroke color
    }

    if (songData) {
      const songDetails = songData.details;
      const analysisData = songData.analysis;
      const featuresData = songData.features;

      const { name, artists, explicit } = songDetails;
      const artistNames = artists.map(artist => artist.name).join(', ');

      const totalDuration = analysisData.track.duration;
      const centerX = (canvasWidth - drawingWidth) / 2;
      const centerY = (canvasHeight - drawingHeight) / 4;

      // Helper function to split text into lines of a given max length without breaking words
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

      const nameLines = splitText(name, 60);
      const artistLines = splitText(artistNames, 60);

      // Draw vertical lines for each segment
      analysisData.segments.forEach((segment) => {
        const x = p.map(segment.start, 0, totalDuration, centerX, centerX + drawingWidth);
        const loudness = segment.loudness_max;
        const lineHeight = p.map(loudness, -30, 5, 0, drawingHeight);
        p.stroke(strokeColor);
        p.strokeWeight(1);
        p.line(x, centerY + (drawingHeight / 2) - lineHeight / 2, x, centerY + (drawingHeight / 2) + lineHeight / 2);
      });

      // Convert duration to MM:SS format
      const durationMinutes = Math.floor(songDetails.duration_ms / 60000);
      const durationSeconds = Math.floor((songDetails.duration_ms % 60000) / 1000).toString().padStart(2, '0');
      const durationFormatted = `${durationMinutes}:${durationSeconds}`;

      // Write the song name, artist names, and duration below the vertical lines
      p.fill(fillColor);
      p.noStroke();
      p.textAlign(p.CENTER);

      p.textSize(32);
      p.textStyle(p.BOLD);
      nameLines.forEach((line, index) => {
        p.text(line, canvasWidth / 2, centerY + drawingHeight + 70 + index * 38);
      });

      p.textSize(24);
      p.textStyle(p.NORMAL);
      artistLines.forEach((line, index) => {
        p.text(line, canvasWidth / 2, centerY + drawingHeight + 90 + nameLines.length * 38 + index * 30);
      });

      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`0:00`, centerX - 40, centerY + drawingHeight / 2 + 10);
      p.text(`${durationFormatted}`, centerX + 55 + drawingWidth - 20, centerY + drawingHeight / 2 + 10);

      // Draw the explicit image if the song is explicit
      if (explicit && explicitImage) {
        p.image(explicitImage, canvasWidth / 2 - 50, centerY + drawingHeight + 120 + nameLines.length * 38 + artistLines.length * 30, 100, 100);
      }
    } else {
      p.textSize(32);
      p.text('Loading...', canvasWidth / 2, canvasHeight / 4);
    }
  };
};
    
 