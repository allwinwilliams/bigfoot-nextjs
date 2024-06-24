"use client";

import React, { useEffect, useRef, useContext } from 'react';
import p5 from 'p5';
import { CustomiseAppContext } from '../context/CustomiseProvider';

const P5Sketch = ({ canvasRef, onP5Update }) => {
  const sketchRef = useRef();
  const { songData } = useContext(CustomiseAppContext);

  useEffect(() => {
    let p5Instance;

    const sketch = (p) => {
      let circles = [];

      p.setup = () => {
        const canvas = p.createCanvas(800, 600);
        canvas.id('p5-canvas');
        canvasRef.current = canvas.canvas;

        // Initialize circles with random positions and velocities
        for (let i = 0; i < 10; i++) {
          circles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-2, 2),
            vy: p.random(-2, 2),
            radius: p.random(10, 30)
          });
        }

        onP5Update(); // Trigger update when p5 setup is done
      };

      p.draw = () => {
        p.background(255); // Set a solid white background

        // Draw song name and artist in the center
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.fill(0); // Black text color

        if (songData) {
          p.text(songData.name, p.width / 2, p.height / 2 - 20);
          p.text(songData.artists.map(artist => artist.name).join(', '), p.width / 2, p.height / 2 + 20);
        } else {
          p.text('No Song Data', p.width / 2, p.height / 2);
        }

        // Draw and update circles
        p.noStroke();
        p.fill(0, 0, 255); // Solid blue color for circles
        for (let circle of circles) {
          p.ellipse(circle.x, circle.y, circle.radius * 2);
          circle.x += circle.vx;
          circle.y += circle.vy;

          // Bounce circles off the edges
          if (circle.x - circle.radius < 0 || circle.x + circle.radius > p.width) {
            circle.vx *= -1;
          }
          if (circle.y - circle.radius < 0 || circle.y + circle.radius > p.height) {
            circle.vy *= -1;
          }
        }

        onP5Update(); // Trigger update on each draw call
      };
    };

    p5Instance = new p5(sketch, sketchRef.current);

    // Clean up the p5 instance on component unmount
    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [songData, canvasRef, onP5Update]);

  return <div ref={sketchRef} />;
};

export default P5Sketch;
