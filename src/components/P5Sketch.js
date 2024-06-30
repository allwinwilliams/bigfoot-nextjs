// src/components/P5Sketch.js
"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { sketchType1, sketchType2, sketchType3 } from '../utils/sketchFunctions';

const P5Sketch = ({ canvasRef, onP5Update, songData, sketchType = 'type1' }) => {
  const sketchRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sketch;

      switch (sketchType) {
        case 'type2':
          sketch = (p) => sketchType2(p, canvasRef, onP5Update, songData);
          break;
        case 'type3':
          sketch = (p) => sketchType3(p, canvasRef, onP5Update, songData);
          break;
        case 'type1':
        default:
          sketch = (p) => sketchType1(p, canvasRef, onP5Update, songData);
          break;
      }

      console.log('Creating p5 instance');
      sketchRef.current = new p5(sketch);

      return () => {
        if (sketchRef.current) {
          console.log('Removing p5 sketch');
          sketchRef.current.remove();
        }
      };
    }
  }, [canvasRef, onP5Update, songData, sketchType]);

  useEffect(() => {
    if (sketchRef.current && songData) {
      console.log('Redrawing p5 sketch with new song data');
      sketchRef.current.redraw();
      onP5Update();
    }
  }, [songData, onP5Update]);

  return null;
};

export default P5Sketch;
