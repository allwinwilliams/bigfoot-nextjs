// src/utils/sketchFunctions.js
import p5 from 'p5';

export const sketchType1 = (p, canvasRef, onP5Update, songData) => {
  p.setup = () => {
    console.log('Setting up p5 sketch type 1');
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
      const { name, artists } = songData;
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

export const sketchType2 = (p, canvasRef, onP5Update, songData) => {
  p.setup = () => {
    console.log('Setting up p5 sketch type 2');
    const canvas = p.createCanvas(1500, 2000);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.textSize(32);
    if (songData) {
      const { name, artists } = songData;
      const artistNames = artists.map(artist => artist.name).join(', ');
      p.text(`Song: ${name}`, 10, 50);
      p.text(`Artist: ${artistNames}`, 10, 100);
    } else {
      p.text('Another sketch type', 10, 30);
    }

    p.fill(0, 0, 255);
    p.rect(p.width / 2 - 25, p.height / 2 - 25, 50, 50);
  };
};

export const sketchType3 = (p, canvasRef, onP5Update, songData) => {
  p.setup = () => {
    console.log('Setting up p5 sketch type 3');
    const canvas = p.createCanvas(1500, 2000);
    canvas.id('p5-canvas');
    canvasRef.current = canvas.canvas;
    p.noLoop();
    onP5Update();
  };

  p.draw = () => {
    p.background(200);
    p.fill(50);
    p.textSize(32);
    if (songData) {
      const { name, artists } = songData;
      const artistNames = artists.map(artist => artist.name).join(', ');
      p.text(`Song: ${name}`, 10, 50);
      p.text(`Artist: ${artistNames}`, 10, 100);
    } else {
      p.text('Yet another sketch type', 10, 30);
    }

    p.fill(0, 255, 0);
    p.triangle(p.width / 2, p.height / 2 - 25, p.width / 2 - 25, p.height / 2 + 25, p.width / 2 + 25, p.height / 2 + 25);
  };
};
