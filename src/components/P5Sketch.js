// src/components/P5Sketch.js
"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Sketch = ({ canvasRef, onP5Update }) => {
  const sketchRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sketch = (p) => {
        p.setup = () => {
          console.log('Setting up p5 sketch');
          const canvas = p.createCanvas(1500, 2000);
          canvas.id('p5-canvas');
          canvasRef.current = canvas.canvas;
          onP5Update();
        };

        p.draw = () => {
          p.background(255);
          p.fill(0);
          p.textSize(32);
          p.text('Hello, p5.js!', 10, 30);

          p.fill(255, 0, 0);
          p.ellipse(p.width / 2, p.height / 2, 50, 50);
        };
      };

      console.log('Creating p5 instance');
      sketchRef.current = new p5(sketch);

      return () => {
        if (sketchRef.current) {
          console.log('Removing p5 sketch');
          sketchRef.current.remove();
        }
      };
    }
  }, [canvasRef, onP5Update]);

  return null;
};

export default P5Sketch;
