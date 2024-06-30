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
          const canvas = p.createCanvas(512, 512);
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

      sketchRef.current = new p5(sketch);

      return () => {
        if (sketchRef.current) {
          sketchRef.current.remove();
        }
      };
    }
  }, [canvasRef, onP5Update]);

  return null;
};

export default P5Sketch;
