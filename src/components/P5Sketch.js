// src/components/P5Sketch.js
"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { maximal, analysisSketch, minimalSketch, standoutSketch } from '../utils/sketchFunctions';

const P5Sketch = ({ canvasRef, onP5Update, color, songData, sketchType = 'minimal' }) => {
  const sketchRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sketch;

      switch (sketchType) {
        case 'standout':
          sketch = (p) => maximal(p, canvasRef, onP5Update, color, songData);
          break;
        case 'analysis':
          sketch = (p) => analysisSketch(p, canvasRef, onP5Update, color, songData);
          break;
        case 'minimal':
        default:
          sketch = (p) => minimalSketch(p, canvasRef, onP5Update, color, songData);
          break;
      }

      // console.log('Creating p5 instance');
      sketchRef.current = new p5(sketch);

      return () => {
        if (sketchRef.current) {
          // console.log('Removing p5 sketch');
          sketchRef.current.remove();
        }
      };
    }
  }, [canvasRef, onP5Update, songData, sketchType]);

  useEffect(() => {
    if (sketchRef.current && songData) {
      // console.log('Redrawing p5 sketch with new song data');
      sketchRef.current.redraw();
      onP5Update();
    }
  }, [songData, onP5Update]);

  return (
    <div
      ref={canvasRef} 
    >
    </div>
    
  );
};

export default P5Sketch;