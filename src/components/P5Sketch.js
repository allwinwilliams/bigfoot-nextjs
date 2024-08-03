// src/components/P5Sketch.js
"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { maximal, analysisSketch, minimalSketch, standoutSketch } from '../utils/sketches/songSketches';
import { aiBasicSketch } from '../utils/sketches/aiSketches';
import { headSketch, loadingSketch, tipSketch, pixelSketch } from '../utils/sketches/basicSketches';
import { emojiSketch } from '@/utils/sketches/emojiSketches';

const P5Sketch = ({ canvasRef, onP5Update, color, type, values, style = 'minimal' }) => {
  const sketchRef = useRef();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sketch;
      if(type == "song"){
        switch (style) {
          case 'drilldown':
            sketch = (p) => standoutSketch(p, canvasRef, onP5Update, color, values);
            break;
          case 'concert':
            sketch = (p) => maximal(p, canvasRef, onP5Update, color, values);
            break;
          case 'analysis':
            sketch = (p) => analysisSketch(p, canvasRef, onP5Update, color, values);
            break;
          case 'minimal':
          default:
            sketch = (p) => minimalSketch(p, canvasRef, onP5Update, color, values);
            break;
        }
      }
      if(type == "ai" || type == "prompt"){
        sketch = (p) => aiBasicSketch(p, canvasRef, onP5Update, color, values);
      }
      if(type == "basic"){
        switch (style) {
          case 'pixel':
            sketch = (p) => pixelSketch(p, canvasRef, onP5Update, color, values);
            break;
          case 'tip':
            sketch = (p) => tipSketch(p, canvasRef, onP5Update, color, values);
            break;
            case 'loading':
            sketch = (p) => loadingSketch(p, canvasRef, onP5Update, color, values);
            break;
          case 'head':
          default:
            sketch = (p) => headSketch(p, canvasRef, onP5Update, color, values);
            break;
        }
      }
      if(type == "emoji"){
        switch (style) {
          case 'out':
            sketch = (p) => emojiSketch(p, canvasRef, onP5Update, color, values, "large");
            break;
          case 'badge':
            sketch = (p) => emojiSketch(p, canvasRef, onP5Update, color, values, "badge");
            break;
          case 'small':
          default:
            sketch = (p) => emojiSketch(p, canvasRef, onP5Update, color, values, "tiny");
            break;
        }
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
  }, [canvasRef, onP5Update, type, values, color, style]);

  useEffect(() => {
    if (sketchRef.current && values) {
      console.log('Redrawing p5 sketch with data');
      if (type === 'ai' && sketchRef.current.myCustomRedrawAccordingToNewPropsHandler) {
        sketchRef.current.myCustomRedrawAccordingToNewPropsHandler(values);
      } else {
        sketchRef.current.redraw();
      }
      onP5Update();
    }
  }, [values, color, onP5Update]);

  return (
    <div
      ref={canvasRef} 
    >
    </div>
    
  );
};

export default P5Sketch;
