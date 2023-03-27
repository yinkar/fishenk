export default class Firework {
  constructor(x, y, dx, dy, color, size, canExplode = true, opacity = 1) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.size = size;
    this.canExplode = canExplode;
    this.opacity = opacity;
    this.destroyDelay = Math.random() * 1000 + 1000;
    this.remainLifeTime = this.destroyDelay;

    this.el = document.createElement('div');

    Object.assign(this.el.style, {
      backgroundColor: color,
      position: 'fixed',
      left: this.x + 'px',
      top: this.y + 'px',
      width: this.size + 'px',
      height: this.size + 'px',
      borderRadius: '50%',
      opacity: this.opacity,
    });

    document.body.appendChild(this.el);

    const interval = setInterval(() => {
      this.x += this.dx;
      this.y += this.dy;

      Object.assign(this.el.style, {
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.size + 'px',
        height: this.size + 'px',
        boxShadow: !this.canExplode ? `0 0 2px ${color}` : 'none',
      });
      
      if (!this.canExplode) {
        if ((this.x < 0 || this.x > window.innerWidth ||
          this.y < 0 || this.y > window.innerHeight) && document.body.contains(this.el)) {
          document.body.removeChild(this.el);
          clearInterval(interval);
        }
        this.dy += 0.02;
        this.size = Math.max(0, this.size - 0.01);
      }

      this.remainLifeTime -= 10;
    }, 10);

    this.fireworks = [];    

    setTimeout(() => {
      if (this.canExplode) {
        for (let i = 0; i < 25; i++) {
  
          this.fireworks.push(
            new Firework(
              this.x, 
              this.y, 
              2.5 - Math.random() * 5, 
              2.5 - Math.random() * 5, 
              this.color, 
              Math.random() * 2.5, 
              false, 
              Math.random()
            )
          );

        }
      }
      if (document.body.contains(this.el)) {
        document.body.removeChild(this.el);
      }
    }, this.destroyDelay);
  }
}
