// Create PixiJS Application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000, // Set background color to black
    resolution: window.devicePixelRatio || 1,
    autoResize: true // Resize the canvas automatically with the window
  });
  
  // Append the canvas to the offers-container div
  const container = document.getElementById('offers-container');
  container.appendChild(app.view);
  
  // Generate star shapes
  const starContainer = new PIXI.Container();
  const starRadius = 2;
  const starColor = 0xffffff;
  const numStars = 100;
  
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * app.screen.width;
    const y = Math.random() * app.screen.height;
  
    const star = new PIXI.Graphics();
    drawStar(star, x, y, 5, starRadius, starRadius * 2, starColor);
    starContainer.addChild(star);
  }
  
  // Add star shapes to the stage
  app.stage.addChild(starContainer);
  
  // Animation loop
  app.ticker.add(() => {
    // Move the stars vertically
    starContainer.y += 1;
  
    // Reset stars position if they move off the screen
    if (starContainer.y > app.screen.height) {
      starContainer.y = -starContainer.height;
    }
  });
  
  // Resize the canvas when the window size changes
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
  
  // Custom drawStar function
  function drawStar(graphics, cx, cy, spikes, outerRadius, innerRadius, color) {
    graphics.beginFill(color);
  
    const angle = Math.PI / spikes;
  
    let rot = -Math.PI / 2;
    let x, y;
  
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      graphics.lineTo(x, y);
      rot += angle;
  
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      graphics.lineTo(x, y);
      rot += angle;
    }
  
    graphics.lineTo(cx, cy - outerRadius);
    graphics.endFill();
  }
  