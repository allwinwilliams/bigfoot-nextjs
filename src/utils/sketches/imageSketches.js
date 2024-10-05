export const woxsenSketch = (p, canvasRef, onP5Update, color, values, style) => {
    const canvasWidth = 4000;
    const canvasHeight = 2060;
    let img;
    let imgLoaded = false;
    
    let chaseFront, chaseBack, starFront, skullFront, skullBack, gf1, gf2;
  
    p.preload = () => {
      starFront = p.loadImage('/product-page/woxsen/star-front.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
      chaseFront = p.loadImage('/product-page/woxsen/chase-front.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });
      chaseBack = p.loadImage('/product-page/woxsen/chase-back.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image');
      });

      skullFront = p.loadImage('/product-page/woxsen/skull-front.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image: skullFront');
      });
  
      skullBack = p.loadImage('/product-page/woxsen/skull-back.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image: skullBack');
      });
  
      gf1 = p.loadImage('/product-page/woxsen/gf1-design.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image: gf1');
      });
  
      gf2 = p.loadImage('/product-page/woxsen/gf2-design.png', () => {
        imgLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load image: gf2');
      });
    };
  
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.id('p5-canvas');
      p.pixelDensity(1); 
      canvasRef.current = canvas.canvas;
      p.colorMode(p.RGB, 255, 255, 255);
      p.noLoop();
      p.clear();
      onP5Update();
    };
  
    p.draw = () => {
      p.clear(); // Clear the background with white color
      let imgX = 0;
      let imgY = 100;
      if(style === 'stars'){
        if (imgLoaded && starFront) {
            imgX = 0;
            imgY = 100;
            p.image(starFront, imgX, imgY, 1500, 1500);
          }
      } else if(style === 'chase'){
          if (imgLoaded && chaseFront) {
              imgX = 0;
              imgY = 0;
              p.image(chaseFront, imgX, imgY, 1500, 1500);
          } 
          if (imgLoaded && chaseBack) {
              imgX = 1400;
              imgY = 50;
              p.image(chaseBack, imgX, imgY, 1800, 1800);
          } 
      }
      else if(style === 'skull'){
        if (imgLoaded && skullFront) {
            imgX = 210;
            imgY = -300;
            p.image(skullFront, imgX, imgY, 1200, 1200);
        } 
        if (imgLoaded && skullBack) {
            imgX = 1400;
            imgY = 250;
            p.image(skullBack, imgX, imgY, 1600, 1600);
        } 
      } else if(style === 'gf1'){
        if (imgLoaded && gf1) {
            imgX = 0;
            imgY = 0;
            p.image(gf1, imgX, imgY, 1500, 1500);
        } 
      }  else if(style === 'gf2'){
        if (imgLoaded && gf2) {
            imgX = 0;
            imgY = 0;
            p.image(gf2, imgX, imgY, 1500, 1500);
        } 
      }  
      else {
        if (color === 'black') {
          p.fill(255);
        } else if (color === 'grey') {
          p.fill(5);
        } else if (color === 'white') {
          p.fill(75);
        } else {
          p.fill(50);
        }
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(40);
        p.text('Loading...', 800, 600);
      }
    };
};

export const imageSketch = (p, canvasRef, onP5Update, color, values, style) => {
  const canvasWidth = 4000;
  const canvasHeight = 2060;
  let imgFront, imgBack;
  let imgFrontLoaded = false;
  let imgBackLoaded = false;
  let chaseFront, chaseBack, starFront, skullFront, skullBack, gf1, gf2;

  p.preload = () => {
    // Load predefined images
    starFront = p.loadImage('/product-page/woxsen/star-front.png', () => {
      imgFrontLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: starFront');
    });

    chaseFront = p.loadImage('/product-page/woxsen/chase-front.png', () => {
      imgFrontLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: chaseFront');
    });

    chaseBack = p.loadImage('/product-page/woxsen/chase-back.png', () => {
      imgBackLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: chaseBack');
    });

    skullFront = p.loadImage('/product-page/woxsen/skull-front.png', () => {
      imgFrontLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: skullFront');
    });

    skullBack = p.loadImage('/product-page/woxsen/skull-back.png', () => {
      imgBackLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: skullBack');
    });

    gf1 = p.loadImage('/product-page/woxsen/gf1.png', () => {
      imgBackLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: gf1');
    });

    gf2 = p.loadImage('/product-page/woxsen/gf2.png', () => {
      imgBackLoaded = true;
      p.redraw();
    }, () => {
      console.error('Failed to load image: gf2');
    });

    // Load user-uploaded images
    if (values.front && values.front.url) {
      imgFront = p.loadImage(values.front.url, () => {
        imgFrontLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load front image');
      });
    }

    if (values.back && values.back.url) {
      imgBack = p.loadImage(values.back.url, () => {
        imgBackLoaded = true;
        p.redraw();
      }, () => {
        console.error('Failed to load back image');
      });
    }
  };

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id('p5-canvas');
    p.pixelDensity(1);
    canvasRef.current = canvas.canvas;
    p.colorMode(p.RGB, 255, 255, 255);
    p.noLoop();
    p.clear();
    p.rectMode(p.CENTER);
    onP5Update();
  };

  p.draw = () => {
    p.clear(); // Clear the background with white color

    // Draw front image
    if (values.front && values.front.style && imgFrontLoaded && imgFront) {
      let boundingBoxX, boundingBoxY, boundingBoxWidth, boundingBoxHeight;

      // Define bounding box based on the selected style
      switch (values.front.style) {
        case 'small':
          boundingBoxX = 600;
          boundingBoxY = 200;
          boundingBoxWidth = 400;
          boundingBoxHeight = 600;
          break;
        case 'large':
          boundingBoxX = 250;
          boundingBoxY = 150;
          boundingBoxWidth = 1000;
          boundingBoxHeight = 1400;
          break;
        case 'badge':
          boundingBoxX = 940;
          boundingBoxY = 200;
          boundingBoxWidth = 300;
          boundingBoxHeight = 300;
          break;
        default:
          boundingBoxX = 1000;
          boundingBoxY = 1000;
          boundingBoxWidth = 800;
          boundingBoxHeight = 800;
      }

      // Maintain aspect ratio within the bounding box
      const aspectRatio = imgFront.width / imgFront.height;
      let finalWidth = boundingBoxWidth;
      let finalHeight = boundingBoxWidth / aspectRatio;

      if (finalHeight > boundingBoxHeight) {
        finalHeight = boundingBoxHeight;
        finalWidth = boundingBoxHeight * aspectRatio;
      }

      // Calculate centered position within the bounding box
      const imgX = boundingBoxX + (boundingBoxWidth - finalWidth) / 2;
      const imgY = boundingBoxY + (boundingBoxHeight - finalHeight) / 2;

      p.image(imgFront, imgX, imgY, finalWidth, finalHeight);
    }

    // Draw back image
    if (values.back && values.back.style && imgBackLoaded && imgBack) {
      let boundingBoxX, boundingBoxY, boundingBoxWidth, boundingBoxHeight;

      // Define bounding box based on the selected style
      switch (values.back.style) {
        case 'small':
          boundingBoxX = 2100;
          boundingBoxY = 250;
          boundingBoxWidth = 400;
          boundingBoxHeight = 400;
          break;
        case 'large':
          boundingBoxX = 1800;
          boundingBoxY = 250;
          boundingBoxWidth = 1000;
          boundingBoxHeight = 1000;
          break;
        default:
          boundingBoxX = 2400;
          boundingBoxY = 1000;
          boundingBoxWidth = 800;
          boundingBoxHeight = 800;
      }

      // Maintain aspect ratio within the bounding box
      const aspectRatio = imgBack.width / imgBack.height;
      let finalWidth = boundingBoxWidth;
      let finalHeight = boundingBoxWidth / aspectRatio;

      if (finalHeight > boundingBoxHeight) {
        finalHeight = boundingBoxHeight;
        finalWidth = boundingBoxHeight * aspectRatio;
      }

      // Calculate centered position within the bounding box
      const imgX = boundingBoxX + (boundingBoxWidth - finalWidth) / 2;
      const imgY = boundingBoxY + (boundingBoxHeight - finalHeight) / 2;

      p.image(imgBack, imgX, imgY, finalWidth, finalHeight);
    }

    // If no images are loaded, display a "Loading..." message
    if (!imgFrontLoaded && !imgBackLoaded) {
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(40);
      p.text('Loading...', canvasWidth / 2, canvasHeight / 2);
    }
  };
};
