import { generateQRCodeForGoogleSearch } from '../qrUtils';

export const maximal = (p, canvasRef, onP5Update, color, songData) => {
    const drawingWidth = 1200;
    const drawingHeight = 1200; // Height for the vertical lines
    const canvasWidth = 2600;
    const canvasHeight = 2000; // Total canvas height
    let explicitImage, qrCodeImage;

    p.preload = async () => {
        explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');

        if (songData) {
            const { name, artists } = songData.details;
            const artistNames = artists.map(artist => artist.name).join(', ');
            const searchPhrase = `${name} ${artistNames}`;

            let qrColor;
            if (color === 'black') {
                qrColor = '#ffffff';
            } else if (color === 'beige') {
                qrColor = '#050505';
            } else {
                qrColor = '#323232';
            }

            const qrCodeUrl = await generateQRCodeForGoogleSearch(searchPhrase, qrColor, 480); // Generate at larger size
            qrCodeImage = p.loadImage(qrCodeUrl);
        }
    };

    p.setup = () => {
        // console.log('Setting up p5 sketch type 1');
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
            const centerX = 160;
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
                p.text(line, centerX + drawingWidth / 2, centerY + drawingHeight + 100 + index * 40);
            });

            p.textSize(24);
            p.textStyle(p.NORMAL);
            artistLines.forEach((line, index) => {
                p.text(line, centerX + drawingWidth / 2, centerY + drawingHeight + 160 + nameYOffset + index * 30);
            });

            if (explicit && explicitImage) {
                p.image(explicitImage, centerX + drawingWidth / 2 - 50, centerY + drawingHeight + 230 + nameYOffset, 100, 100); // Adjust the size and position as needed
            }

            p.textSize(24);
            p.textStyle(p.BOLD);
            p.text(`0:00`, centerX - 50, centerY + drawingHeight / 2 + 6);
            p.text(`${durationFormatted}`, centerX + drawingWidth + 40, centerY + drawingHeight / 2 + 6);

            

            let textColor;
            if (color === 'black') {
                textColor = p.color(255);
            } else if (color === 'beige') {
                textColor = p.color(5);
            } else {
                textColor = p.color(50);
            }

            // Draw QR Code section
            if (qrCodeImage) {
              const imgX = 2100 + (400 - 240) / 2; // Center the scaled down image
              const imgY = 250 + (500 - 240) / 2;
              p.image(qrCodeImage, imgX, imgY, 240, 240); // Scale down to 240
              p.fill(textColor);
              p.textSize(28);
              p.textStyle(p.BOLD);
              p.textAlign(p.CENTER);
              p.text(`vibe to my jam`, 2100 + 400 / 2, 250 + 500 - 80);
            }

            
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
    // console.log('Setting up p5 sketch type 1');
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
    // console.log('Setting up p5 sketch type 1');
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
        const lineWidth = p.map(loudness, -20, 10, 0, drawingWidth);

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

export const analysisSketch = (p, canvasRef, onP5Update, color, songData) => {
  const drawingWidth = 1000;
  const drawingHeight = 900; // Height for the vertical lines
  const canvasWidth = 2600;
  const canvasHeight = 2000; // Total canvas height
  const drawingX = 250; // X position for the drawing
  const topSectionHeight = 600;
  const gapBetweenSections = 30; // Reduced gap between sections
  const textGap = 30; // Reduced text gap

  let explicitImage;
  let qrCodeImage;

  const hueValues = [270, 248, 212, 202, 191, 119, 61, 47, 30, 5];

  p.preload = async () => {
    explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
    if(songData){
      const { name, artists } = songData.details;
      const artistNames = artists.map(artist => artist.name).join(', ');
      const searchPhrase = `${name} ${artistNames}`;

      let qrColor;
      if (color === 'black') {
          qrColor = '#ffffff';
      } else if (color === 'beige') {
          qrColor = '#050505';
      } else {
          qrColor = '#323232';
      }

      const qrCodeUrl = await generateQRCodeForGoogleSearch(searchPhrase, qrColor, 240); // Generate at larger size
      qrCodeImage = p.loadImage(qrCodeUrl);
    }
    
  };

  p.setup = () => {
  //  console.log('Setting up p5 sketch type 1');
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

    if (songData) {
      const songDetails = songData.details;
      const analysisData = songData.analysis;
      const featuresData = songData.features;

      const { name, artists, explicit } = songDetails;
      const artistNames = artists.map(artist => artist.name).join(', ');

      const totalDuration = analysisData.track.duration;
      const centerX = drawingX;
      const centerY = topSectionHeight + (canvasHeight - drawingHeight) / 4;
      const loudnessSectionY = topSectionHeight + gapBetweenSections;

      // Determine the base hue from valence
      const valence = featuresData.valence;
      const hueIndex = Math.round(valence * (hueValues.length - 1));
      const baseHue = hueValues[hueIndex];

      // Determine range based on danceability x energy
      const danceability = featuresData.danceability;
      const energy = featuresData.energy;
      const rangeFactor = Math.round(danceability * energy * 7) + 1;

      // Get hue range
      const hueRange = hueValues.slice(
        Math.max(0, hueIndex - rangeFactor),
        Math.min(hueValues.length, hueIndex + rangeFactor + 1)
      );

      if (color === 'black') {
        fillColor = p.color(200);
        strokeColor = p.color(baseHue, 90, 40);
      } else if (color === 'beige') {
        fillColor = p.color(5);
        strokeColor = p.color(baseHue, 80, 30);
      } else {
        fillColor = p.color(5);
        strokeColor = p.color(5);
      }

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

      // Draw pitch values in the top 600px section
      const rowHeight = 80;

      analysisData.segments.forEach((segment) => {
        const x = p.map(segment.start, 0, totalDuration, centerX, centerX + drawingWidth);

        // Get top 3 pitches
        const pitchIndices = segment.pitches
          .map((pitch, index) => ({ pitch, index }))
          .sort((a, b) => b.pitch - a.pitch)
          .slice(0, 2)
          .map(p => p.index);

        pitchIndices.forEach((index) => {
          const pitch = segment.pitches[index];
          const loudness = segment.loudness_max;
          const y = index * rowHeight;
          const lineHeight = p.map(loudness, -30, 5, 30, 80); // Pitch height from 20px to 70px

          let hueIndex = Math.round(p.map(pitch, 0, 1, 0, hueRange.length - 1));
          let hue = hueRange[hueIndex];
          hue = hue % 360;
          let brightness = p.map(pitch, 0, 1, 5, 30); // Brightness based on pitch
          let saturation = p.map(pitch, 0, 1, 50, 100); // Saturation based on pitch

          p.strokeCap(p.SQUARE);
          p.stroke(hue, saturation, brightness);

          p.strokeWeight(12);
          p.line(x, y + rowHeight / 2 - lineHeight / 2 + 50, x, y + rowHeight / 2 + lineHeight / 2 + 50);
        });
      });

      // Convert duration to MM:SS format
      const durationMinutes = Math.floor(songDetails.duration_ms / 60000);
      const durationSeconds = Math.floor((songDetails.duration_ms % 60000) / 1000).toString().padStart(2, '0');
      const durationFormatted = `${durationMinutes}:${durationSeconds}`;

      // Write the song name, artist names, and duration below the vertical lines
      p.fill(fillColor);
      p.noStroke();
      p.textAlign(p.CENTER);

      p.textSize(36);
      p.textStyle(p.BOLD);
      nameLines.forEach((line, index) => {
        p.text(line, drawingX + drawingWidth / 2, loudnessSectionY + drawingHeight / 1.8 + textGap + index * 40 - 60);
      });

      p.textSize(24);
      p.textStyle(p.NORMAL);
      artistLines.forEach((line, index) => {
        p.text(line, drawingX + drawingWidth / 2, loudnessSectionY + drawingHeight / 1.8 + textGap + 8 + nameLines.length * 40 + index * 62 - 60);
      });

      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`0:00`, drawingX - 40, loudnessSectionY + drawingHeight / 2 - 80);
      p.text(`${durationFormatted}`, drawingX + 55 + drawingWidth - 20, loudnessSectionY + drawingHeight / 2 - 80);

      // Draw the explicit image if the song is explicit
      if (explicit && explicitImage) {
        p.image(explicitImage, drawingX + drawingWidth / 2 - 50, loudnessSectionY + drawingHeight / 2 + textGap + 10 + nameLines.length * 82 + artistLines.length * 30, 100, 100);
      }
    } else {
      p.textSize(32);
      p.textAlign(p.CENTER);
      p.text('Loading...', 650, canvasHeight / 4); // Centered within a 1300px width starting from left
    }

    // Draw QRCode section
    drawQRCodeSection(2150, 200, 800, 500);
  };

  const drawQRCodeSection = (x, y, width, height) => {
    p.textSize(32);
    if (qrCodeImage) {
      const imgX = x + 50;
      const imgY = y + 50;
      p.image(qrCodeImage, imgX, imgY);
      p.text("scan & listen with me", imgX+115, imgY + 300)
    }
  };
};

export const frequencychroma = (p, canvasRef, onP5Update, color, songData) => {
  const drawingWidth = 1000;
  const drawingHeight = 900; // Height for the vertical lines
  const canvasWidth = 1500;
  const canvasHeight = 2000; // Total canvas height
  const topSectionHeight = 600;
  const gapBetweenSections = 30; // Reduced gap between sections
  const textGap = 30; // Reduced text gap

  let explicitImage;

  p.preload = () => {
    explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
  };

  p.setup = () => {
  //  console.log('Setting up p5 sketch type 1');
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

    if (songData) {
      const songDetails = songData.details;
      const analysisData = songData.analysis;
      const featuresData = songData.features;

      const { name, artists, explicit } = songDetails;
      const artistNames = artists.map(artist => artist.name).join(', ');

      const totalDuration = analysisData.track.duration;
      const centerX = (canvasWidth - drawingWidth) / 2;
      const centerY = topSectionHeight + (canvasHeight - drawingHeight) / 4;
      const loudnessSectionY = topSectionHeight + gapBetweenSections;

      // Determine the base hue from valence
      const baseHue = p.map(featuresData.valence, 0, 1, 270, 0); // Blue (240) to Yellow (20)
      const hueRange = p.map(featuresData.energy, 0, 1, 100, 300); // Determine hue range based on energy

      if (color === 'black') {
        fillColor = p.color(200); // White fill color
        strokeColor = p.color(baseHue + hueRange / 1.8, 90, 40); // White stroke color
      } else if (color === 'beige') {
        fillColor = p.color(20); // Dark grey fill color
        strokeColor = p.color(baseHue + hueRange / 3, 80, 30); // Dark grey stroke color
      } else {
        fillColor = p.color(5); // Default fill color
        strokeColor = p.color(5); // Default stroke color
      }

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

      // Draw pitch values in the top 600px section
      const rowHeight = 80;

      analysisData.segments.forEach((segment) => {
        const x = p.map(segment.start, 0, totalDuration, centerX, centerX + drawingWidth);

        // Get top 3 pitches
        const pitchIndices = segment.pitches
          .map((pitch, index) => ({ pitch, index }))
          .sort((a, b) => b.pitch - a.pitch)
          .slice(0, 2)
          .map(p => p.index);

        pitchIndices.forEach((index) => {
          const pitch = segment.pitches[index];
          const loudness = segment.loudness_max;
          const y = index * rowHeight;
          const lineHeight = p.map(loudness, -30, 5, 30, 80); // Pitch height from 20px to 70px

          let hue = baseHue + p.map(loudness, -30, 5, -hueRange, hueRange);
          hue = hue % 360;
          let brightness = p.map(pitch, 0, 1, 5, 30); // Brightness based on pitch
          let saturation = p.map(pitch, 0, 1, 50, 100); // Saturation based on pitch

          p.stroke(hue, saturation, brightness);

          p.strokeWeight(12);
          p.line(x, y + rowHeight / 2 - lineHeight / 2 + 50, x, y + rowHeight / 2 + lineHeight / 2 + 50);
        });
      });

      // Convert duration to MM:SS format
      const durationMinutes = Math.floor(songDetails.duration_ms / 60000);
      const durationSeconds = Math.floor((songDetails.duration_ms % 60000) / 1000).toString().padStart(2, '0');
      const durationFormatted = `${durationMinutes}:${durationSeconds}`;

      // Write the song name, artist names, and duration below the vertical lines
      p.fill(fillColor);
      p.noStroke();
      p.textAlign(p.CENTER);

      p.textSize(36);
      p.textStyle(p.BOLD);
      nameLines.forEach((line, index) => {
        p.text(line, canvasWidth / 2, loudnessSectionY + drawingHeight/1.8 + textGap + index * 40 - 60);
      });

      p.textSize(24);
      p.textStyle(p.NORMAL);
      artistLines.forEach((line, index) => {
        p.text(line, canvasWidth / 2, loudnessSectionY + drawingHeight/1.8 + textGap + 8 + nameLines.length * 40 + index * 62 - 60);
      });

      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(`0:00`, centerX - 40, loudnessSectionY + drawingHeight/2 - 80);
      p.text(`${durationFormatted}`, centerX + 55 + drawingWidth - 20, loudnessSectionY + drawingHeight/2 - 80);

      // Draw the explicit image if the song is explicit
      if (explicit && explicitImage) {
        p.image(explicitImage, canvasWidth / 2 - 50, loudnessSectionY + drawingHeight/2 + textGap + 10 + nameLines.length * 82 + artistLines.length * 30, 100, 100);
      }
    } else {
      p.textSize(32);
      p.text('Loading...', canvasWidth / 2, canvasHeight / 4);
    }
  };
};

export const analysisBackup = (p, canvasRef, onP5Update, color, songData) => {
  const drawingWidth = 800; // Reduced by 20%
  const drawingHeight = 640; // Reduced by 20%
  const canvasWidth = 1500;
  const canvasHeight = 1400;

  p.setup = () => {
  //  console.log('Setting up p5 sketch type 1');
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
        p.stroke(5);
      } else {
        p.stroke(255);
      }

      p.line(x, lineStartY - lineHeight / 2, x, lineStartY + lineHeight / 2);
    });

    p.noStroke();
    // Write "BIGFOOT" after the vertical lines
    p.fill(color === 'beige' ? p.color(5) : p.color(255)); // Very dark grey for beige
    p.textAlign(p.LEFT);
    p.textSize(38); // Reduced by 20%
    p.textStyle(p.BOLD);
    p.text("BIGFOOT", 20, lineStartY + 200); // Reduced by 20%

    // Display song name and artist names on the right side
    p.fill(color === 'beige' ? p.color(5) : p.color(255)); // Darker text for beige
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
export const minimalSketch = (p, canvasRef, onP5Update, color, songData) => {
  const canvasWidth = 2600;
  const canvasHeight = 2000;

  let explicitImage, qrCodeImage;

  p.preload = async () => {
    explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');

    if (songData) {
      const { name, artists } = songData.details;
      const artistNames = artists.map(artist => artist.name).join(', ');
      const searchPhrase = `${name} ${artistNames}`;

      let qrColor;
      if (color === 'black') {
        qrColor = '#ffffff'; // White
      } else if (color === 'beige') {
        qrColor = '#77301b'; // Dark grey
      } else {
        qrColor = '#323232'; // Default color
      }

      const qrCodeUrl = await generateQRCodeForGoogleSearch(searchPhrase, qrColor, 480); // Generate at larger size
      qrCodeImage = p.loadImage(qrCodeUrl);
    }
  };

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };

  const drawSongDataSection = (x, y, drawingWidth, drawingHeight) => {
    if (!songData) {
      p.fill(50);
      p.textSize(32);
      p.textAlign(p.CENTER);
      p.text('Loading...', x + drawingWidth / 2, y + drawingHeight / 2);
      return;
    }

    const songDetails = songData.details;
    const analysisData = songData.analysis;
    const featuresData = songData.features;

    const { name, artists, explicit } = songDetails;
    const artistNames = artists.map(artist => artist.name).join(', ');

    const totalDuration = analysisData.track.duration;

    let fillColor, strokeColor;

    if (color === 'black') {
      fillColor = p.color(255); // White fill color
      strokeColor = p.color(255); // White stroke color
    } else if (color === 'beige') {
      fillColor = p.color('#77301b'); // Dark grey fill color
      strokeColor = p.color('#77301b'); // Dark grey stroke color
    } else {
      fillColor = p.color(50); // Default fill color
      strokeColor = p.color(50); // Default stroke color
    }

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
      const xPos = p.map(segment.start, 0, totalDuration, x, x + drawingWidth);
      const loudness = segment.loudness_max;
      if(loudness > -50){
        const lineHeight = p.map(loudness, -30, 5, 0, drawingHeight);
        p.stroke(strokeColor);
        p.strokeWeight(0.4);
        p.line(xPos, y + (drawingHeight / 2) - lineHeight / 2, xPos, y + (drawingHeight / 2) + lineHeight / 2);
      }
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
      p.text(line, x + drawingWidth / 2, y + drawingHeight + 65 + index * 40);
    });

    p.textSize(24);
    p.textStyle(p.NORMAL);
    artistLines.forEach((line, index) => {
      p.text(line, x + drawingWidth / 2, y + drawingHeight + 75 + nameLines.length * 40 + index * 30);
    });

    p.textSize(20);
    p.textStyle(p.BOLD);
    p.text(`0:00`, x - 40, y + drawingHeight / 2 + 7);
    p.text(`${durationFormatted}`, x + 55 + drawingWidth - 20, y + drawingHeight / 2 + 7);

    if (explicit && explicitImage) {
      p.image(explicitImage, x + drawingWidth / 2 - 50, y + drawingHeight + 150 + nameLines.length * 40 + artistLines.length * 30, 100, 63);
    }
  };

  const drawQRCodeSection = (x, y, width, height) => {
    if (qrCodeImage) {
      const imgX = x + (width - 240) / 2; // Center the scaled down image
      const imgY = y + (height - 240) / 2;
      p.image(qrCodeImage, imgX, imgY, 240, 240); // Scale down to 240
    }

    let textColor;
    if (color === 'black') {
      textColor = p.color(255);
    } else if (color === 'beige') {
      textColor = p.color('#77301b');
    } else {
      textColor = p.color(50);
    }

    p.fill(textColor);
    p.textSize(28);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER);
    p.text(`vibe to my jam`, x + width / 2, y + height - 80);
  };

  p.draw = () => {
    p.background(200);

    // Draw the song data section
    drawSongDataSection(250, 200, 1000, 160);

    // Draw the QR Code section
    drawQRCodeSection(2060, 250, 500, 500);
  };
};
// standout
export const standoutSketch = (p, canvasRef, onP5Update, color, songData) => {
  const canvasWidth = 2600;
  const canvasHeight = 2000;

  const sections = {
    VisualAnalysis: { x: 90, y: 200, w: 1300, h: 700 },
    SongDetails: { x: 90, y: 900, w: 1300, h: 300 },
    Ranges: { x: 90, y: 1250, w: 800, h: 500 },
    Legend: { x: 890, y: 1250, w: 500, h: 500 },
    ScanCode: { x: 2130, y: 100, w: 800, h: 500 },
  };

  let baseHue;
  let explicitImage, qrCodeImage;

  p.preload = async () => {
    explicitImage = p.loadImage('/song-tshirt/parental_Advisory_label.svg');
    if(songData){
      const { name, artists } = songData.details;
      const artistNames = artists.map(artist => artist.name).join(', ');
      const searchPhrase = `${name} ${artistNames}`;

      let qrColor;
      if (color === 'black') {
          qrColor = '#ffffff';
      } else if (color === 'beige') {
          qrColor = '#050505';
      } else {
          qrColor = '#323232';
      }

      const qrCodeUrl = await generateQRCodeForGoogleSearch(searchPhrase, qrColor, 240); // Generate at larger size
      qrCodeImage = p.loadImage(qrCodeUrl);
    }
    
  };

  p.setup = () => {
  //  console.log('Setting up standoutSketch');
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.colorMode(p.HSL, 360, 100, 100);
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    p.background(255);

    if (!songData) {
      p.fill(50);
      p.textSize(32);
      p.textAlign(p.CENTER);
      p.text('Loading...', 500, 500);
      return;
    }
    
    baseHue = p.map(songData.features.valence, 0, 1, 200, 30);
    drawVisualAnalysis(p);
    drawSongDetails(p);
    drawRanges(p);
    // drawLegend(p);
    drawScanCode(p);
    
  };

  const drawVisualAnalysis = (p) => {
    const { x, y, w, h } = sections.VisualAnalysis;

    const { explicit } = songData.details;
  
    const analysisData = songData.analysis;
    const totalDuration = analysisData.track.duration;
  
    const avgEnergyDanceability = (songData.features.energy + songData.features.danceability) / 2;
  
    const hueRange = p.map(avgEnergyDanceability, 0, 1, 40, 80);
  
    const minSectionDuration = Math.min(...analysisData.sections.map(section => section.duration));
    const maxSectionDuration = Math.max(...analysisData.sections.map(section => section.duration));
  
    const gap = 10;
    const adjustedWidth = w - (gap * (analysisData.sections.length - 1));
  
    const lineY = y + h - 50;
    p.stroke(150, 0, 20);
    p.strokeWeight(10);
    p.line(x, lineY, x + w, lineY);

    if (explicit && explicitImage) {
      p.image(explicitImage, w / 2 + 50, 50, 100, 63);
    }
  
    analysisData.sections.forEach((section, index) => {
      const sectionWidth = p.map(section.duration, 0, totalDuration, 0, adjustedWidth);
      const sectionX = x + p.map(section.start, 0, totalDuration, 0, adjustedWidth) + (index * gap);
      const sectionHeight = p.map(section.loudness, -50, 0, 50, 500);
  
      const keyOffset = section.key !== -1 ? p.map(section.key, 0, 11, 100, 200) : 150;
      const sectionY = keyOffset + (h - sectionHeight) / 2;
  
      const hue = (baseHue + p.map(section.duration, minSectionDuration, maxSectionDuration, -hueRange, hueRange)) % 360; // Adjust hue and keep it within the range of 0-360
  
      p.noStroke();
      
      if(color == "black"){
        p.fill(hue, 90, 50);
      } else if(color == "beige"){
        p.fill(hue, 70, 30);
      }
      p.rect(sectionX, sectionY, sectionWidth, sectionHeight);
  
      p.stroke(150, 0, 20);
      p.strokeWeight(10);
      p.line(sectionX, lineY, sectionX, lineY - 30);
    });
  
    p.line(x + w, lineY, x + w, lineY - 30);
    p.noStroke();
  
    const durationMinutes = Math.floor(totalDuration / 60);
    const durationSeconds = Math.floor((totalDuration % 60)).toString().padStart(2, '0');
    const durationFormatted = `${durationMinutes}:${durationSeconds}`;
  
    if(color == "black"){
      p.fill(255, 0, 100);
    } else if(color == "beige"){
      p.fill(0, 0, 0);
    }
    p.textSize(24);
    p.textStyle(p.BOLD);
    p.text(`0:00`, x - 20, lineY + 40);
    p.text(`${durationFormatted}`, x + w - 20, lineY + 40);
  };

  const drawSongDetails = (p) => {
    const { x, y, w, h } = sections.SongDetails;
  
    const songDetails = songData.details;
    const { name, artists, album } = songDetails;
    const artistNames = artists.map(artist => artist.name).join(', ');
  
    const releaseDate = album && album.release_date ? album.release_date.substring(0, 4) : 'Unknown';
  
    // p.fill(20, 10, 10);
    // p.rect(x, y, w, h);
  
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
  
    const nameLines = splitText(name, 30);
    const artistLines = splitText(artistNames, 30);
  
    if(color == "black"){
      p.fill(255, 0, 100);
    } else if(color == "beige"){
      p.fill(0, 0, 10);
    }
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT);
    nameLines.forEach((line, index) => {
      p.text(line, x + 10, y + 100 + index * 60);
    });
  
    p.textSize(24);
    p.textStyle(p.BOLD);
    p.textAlign(p.RIGHT);
    artistLines.forEach((line, index) => {
      p.text(line, x + w - 10, y + 100 + index * 30);
    });
  
    if(color == "black"){
      p.fill(baseHue, 90, 50);
    } else if(color == "beige"){
      p.fill(baseHue, 70, 30);
    }
    p.text(releaseDate, x + w - 10, y + 100 + artistLines.length * 30 + 30);
  };

  const drawRanges = (p) => {
    const { x, y, w, h } = sections.Ranges;
    const features = songData.features;
    const parameters = [
      { name: 'Danceability', value: features.danceability, lowLabel: 'Sit down', highLabel: 'Dance' },
      { name: 'Energy', value: features.energy, lowLabel: 'Low energy', highLabel: 'High energy' },
      // { name: 'Loudness', value: p.map(features.loudness, -60, 0, 0, 1), lowLabel: 'Quite', highLabel: 'Loud' },
      { name: 'Valence', value: features.valence, lowLabel: 'Sad', highLabel: 'Happy' },
      // { name: 'Acousticness', value: 1 - features.acousticness, lowLabel: 'Acoustic', highLabel: 'Electronic' },
    ];
  
    const lineHeight = 8;
    const gapBetweenLines = 60;
    const lineStartX = x + 250;
    const lineEndX = x + w - 200;
    
    // p.fill(6, 10, 8);
    // p.rect(x, y, w, h);
  
    p.textSize(20);
    p.textAlign(p.LEFT);
    p.fill(0);
  
    parameters.forEach((param, index) => {
      const lineY = y + 20 + index * gapBetweenLines;
  
      p.stroke(150, 0, 20);
      p.strokeWeight(lineHeight);
      p.line(lineStartX, lineY, lineEndX, lineY);
  
      p.noStroke();
      if(color == "black"){
        p.fill(150, 0, 60);
      } else if(color == "beige"){
        p.fill(0, 0, 10);
      }
      p.textAlign(p.RIGHT);
      p.text(param.lowLabel, lineStartX - 40, lineY + 5);
      p.textAlign(p.LEFT);
      p.text(param.highLabel, lineEndX + 40, lineY + 5);
  
      if(color == "black"){
        p.fill(baseHue, 90, 50);
      } else if(color == "beige"){
        p.fill(baseHue, 70, 30);
      }
      const valueX = p.map(param.value, 0, 1, lineStartX, lineEndX);
      p.circle(valueX, lineY, 30);
    });
  };

  const drawLegend = (p) => {
    const { x, y, w, h } = sections.Legend;
  
    const labels = ['Section', 'Duration', 'Loudness', 'Pitch', 'Emotions'];
    const rowHeight = 60;
    const gapBetweenRows = 10;
    const visualWidth = 200; // Width of the visuals
  
    // p.fill(30, 100, 80);
    // p.rect(x, y, w, h);
  
    p.textAlign(p.LEFT);
    p.textSize(20);
    
  
    labels.forEach((label, index) => {
      const rowY = y + index * (rowHeight + gapBetweenRows) + rowHeight / 2;
  
      if(color == "black"){
        p.fill(150, 0, 60);
      } else if(color == "beige"){
        p.fill(0, 0, 10);
      }
      p.text(label, x + visualWidth + 130, rowY + 10);
  
      // Draw visual
      const visualX = x + 100;
      const visualY = rowY - rowHeight / 4;
  
      switch (label) {
        case 'Section':
          
          p.rect(visualX + 150, visualY, 50, rowHeight / 2);
          break;
        case 'Duration':
          
          const durations = [10, 30, 50, 70]; // Adjust these lengths to fit within 200px
          let offsetX = visualX;
          durations.forEach((duration, i) => {
            p.rect(offsetX, visualY, duration, rowHeight / 2);
            offsetX += duration + 10; // Adjust the gap between rectangles
          });
          break;
        case 'Loudness':
          
          for (let i = 0; i < 5; i++) {
            p.rect(visualX + i * 40, visualY - i * 6 + 20, visualWidth / 6, 10 + i * 6);
          }
          break;
        case 'Pitch':
          
          for (let i = 0; i < 5; i++) {
            p.rect(visualX + i * 40, visualY - i * 4, visualWidth / 6, visualWidth / 8);
          }
          break;
        case 'Emotions':
          const hueRange = 40; // Fixed range for legend
          for (let i = 0; i < 5; i++) {
            const hue = (baseHue + p.map(i, 0, 4, -hueRange, hueRange)) % 360;
            if(color == "black"){
              p.fill(hue, 90, 50);
            } else if(color == "beige"){
              p.fill(hue, 70, 30);
            }
            p.rect(visualX + i * 40, visualY, visualWidth / 6, rowHeight / 2);
          }
          break;
      }
    });
  };
  
  const drawScanCode = (p) => {
    const { x, y, w, h } = sections.ScanCode;
    if (qrCodeImage) {
      const imgX = x + (400 - 200) / 2;
      const imgY = y + (500 - 200) / 2;
      p.image(qrCodeImage, imgX, imgY, 200, 200);
      p.textSize(32);
      p.text("scan to listen with me", imgX - 70, imgY + 270);
  }
  };
};