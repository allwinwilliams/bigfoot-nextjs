// src/utils/sketchFunctions.js

export const sketchType1 = (p, canvasRef, onP5Update, color, songData) => {
  p.setup = () => {
    
    
    console.log('Setting up p5 sketch type 1');
    console.log("songData", songData);
    const canvas = p.createCanvas(1500, 2000);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);
    p.textSize(32);
    if (songData) {
        let songDetails = songData.details;
        let analysisData = songData.analysis;
        let featuresData = songData.features;
        const { name, artists } = songDetails;
        const artistNames = artists.map(artist => artist.name).join(', ');
        p.text(`Song: ${name}`, 10, 50);
        p.text(`Artist: ${artistNames}`, 10, 100);
    } else {
        p.text('Hello, p5.js!', 10, 30);
    }

    p.fill(255, 0, 0);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);
  };
};

// src/utils/sketchFunctions.js
export const sketchType2 = (p, canvasRef, onP5Update, color, songData) => {
    const drawingWidth = 1000;
    const drawingHeight = 800;
    const canvasWidth = 1500;
    const canvasHeight = 1400;
    console.log("songData", songData);
    
    p.setup = () => {
      console.log('Setting up p5 sketch type 2');
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      canvasRef.current = canvas.canvas;
      p.colorMode(p.HSL, 360, 100, 100);
      p.noLoop();
      onP5Update();
    };
  
    p.draw = () => {
      if (!songData) return;
        
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
                 const y = j * (rowHeight + 5); // Larger gap height between pitches
                 const brightness = p.map(pitch, 0.6, 1, 30, 100); // Adjusted brightness range
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
      const barChartX = drawingWidth + 50;
      const maxPitchSum = p.max(pitchSums);
  
      pitchSums.forEach((sum, j) => {
        const y = j * (rowHeight + 5); // Larger gap height between rows
        const barWidth = p.map(sum, 0, maxPitchSum, 0, 400); // Scaling bar width
        p.fill(hue, 100, p.map(sum, 0, maxPitchSum, 30, 100)); // Adjust brightness based on sum
        p.rect(barChartX, y, barWidth, rowHeight); // No gaps between bars
      });
  
      // Draw vertical lines below the pitch representation
      const lineStartY = drawingHeight + 250; // Moved lower by 100 pixels
      analysisData.segments.forEach((segment) => {
        const x = p.map(segment.start, 0, analysisData.track.duration, 0, drawingWidth);
        const lineHeight = p.map(logTransform(segment.loudness_max), logTransform(-60), logTransform(0), 50, 300); // Log transformation
        p.stroke(255); // White color for lines
        p.line(x, lineStartY - lineHeight / 2, x, lineStartY + lineHeight / 2);
      });
  
      // Write "BIGFOOT" after the vertical lines
      p.fill(255);
      p.textAlign(p.LEFT);
      p.textSize(48);
      p.textStyle(p.BOLD);
      p.text("BIGFOOT", 20, lineStartY + 320); // Moved below by 120 pixels
  
      // Display song name and artist names on the right side
      p.textSize(24);
      p.textStyle(p.BOLD);
      p.text(songDetails.name, drawingWidth + 70, lineStartY + 20);
  
      p.textSize(18);
      p.textStyle(p.NORMAL);
      const artistNames = songDetails.artists.map(artist => artist.name).join(', ');
      p.text(artistNames, drawingWidth + 70, lineStartY + 50);
  
      // Display song duration and BPM on the right side
      p.textAlign(p.RIGHT);
      p.textSize(18);
      p.textStyle(p.NORMAL);
      const duration = songDetails.duration_ms / 1000;
      p.text(`${duration.toFixed(2)} seconds`, canvasWidth - 20, lineStartY + 20);
  
      const bpm = featuresData.tempo;
      p.text(`${bpm.toFixed(2)} bpm`, canvasWidth - 20, lineStartY + 50);
    };
  
    function logTransform(value) {
      return value > 0 ? value : p.log(1 + p.abs(value));
    }
  };
  

export const sketchType3 = (p, canvasRef, onP5Update, color, songData) => {
    const drawingWidth = 1000;
    const drawingHeight = 200; // Height for the vertical lines
    const canvasWidth = 1500;
    const canvasHeight = 2000; // Total canvas height
  
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
  
      if (songData) {
        const songDetails = songData.details;
        const analysisData = songData.analysis;
        const featuresData = songData.features;
  
        const { name, artists } = songDetails;
        const artistNames = artists.map(artist => artist.name).join(', ');
  
        const totalDuration = analysisData.track.duration;
        const centerX = (canvasWidth - drawingWidth) / 2;
        const centerY = (canvasHeight - drawingHeight) / 4;
  
        let fillColor, strokeColor;
        if (color === 'black') {
          fillColor = p.color(255); // White fill color
          strokeColor = p.color(255); // White stroke color
        } else if (color === 'beige') {
          fillColor = p.color(10); // Dark grey fill color
          strokeColor = p.color(10); // Dark grey stroke color
        } else {
          fillColor = p.color(50); // Default fill color
          strokeColor = p.color(50); // Default stroke color
        }
  
        // Draw vertical lines for each segment
        analysisData.segments.forEach((segment) => {
          const x = p.map(segment.start, 0, totalDuration, centerX, centerX + drawingWidth);
          const lineWidth = p.map(segment.duration, 0, totalDuration, 0, drawingWidth);
          const loudness = segment.loudness_max;
          const lineHeight = p.map(loudness, -30, 5, 0, drawingHeight);
          p.stroke(strokeColor);
          p.strokeWeight(lineWidth);
          p.line(x, centerY + (drawingHeight / 2) - lineHeight / 2, x, centerY + (drawingHeight / 2) + lineHeight / 2);
        });
  
        // Write the song name and artist names below the vertical lines
        p.fill(fillColor);
        p.noStroke();
        p.textAlign(p.CENTER);
        p.textSize(24);
        p.textStyle(p.BOLD);
        p.text(songDetails.name, canvasWidth / 2, centerY + drawingHeight + 50);
  
        p.textSize(18);
        p.textStyle(p.NORMAL);
        p.text(artistNames, canvasWidth / 2, centerY + drawingHeight + 80);
      } else {
        p.text('Yet another sketch type', 10, 30);
      }
    };
  };