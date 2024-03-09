class DotDrawer {
  static instances = [];
  constructor(containerId, dotId, dotColor, dotSize, wind, x, y, right, width) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container element with id '${containerId}' not found.`);
      return;
    }

    this.dot = document.createElement('div');
    this.dot.id = `${dotId}`;
    this.dot.style.width = `${dotSize}px`;
    this.dot.style.height = `${dotSize}px`;
    this.dot.style.borderRadius = '50%';
    this.dot.style.backgroundColor = dotColor;
    this.dot.style.position = 'absolute';
    this.container.appendChild(this.dot);

    this.dotColor = dotColor;
    this.dotSize = dotSize;
    this.wind = wind
    this.x = x;
    this.y = y;
    this.right = right
    this.dotId = dotId
    this.width = width
    this.endX = this.x + this.width * (this.right ? 1 : -1)
    this.forward = 1
  }

  drawDot = () => {
    this.dot.style.left = `${this.x}px`;
    this.dot.style.top = `${this.y}px`;
    DotDrawer.instances.forEach((e) =>
      this.drawLine(e[0], e[1], e[2]))
    DotDrawer.instances.push([this.x, this.y, this.dotId]);
  }

  drawLine = (x2, y2, id) => {
    const line = document.createElement('div');
    line.className = `line ${this.dotId} ${id}`;
    line.style.left = `${this.x}px`;
    line.style.top = `${this.y}px`;
    const length = Math.sqrt((x2 - this.x) ** 2 + (y2 - this.y) ** 2);
    let opacity
    if (length >= 700) { opacity = 0 } else if
      (length > 600) { opacity = 0.01 } else if
      (length > 500) { opacity = 0.02 } else if
      (length > 400) { opacity = 0.05 } else if
      (length > 300) { opacity = 0.1 } else if
      (length > 200) { opacity = 0.2 } else if
      (length > 100) { opacity = 0.3 } else if
      (length > 0) { opacity = 0.4 }
    line.style.width = `${length}px`;
    line.style.transformOrigin = 'left';
    const angle = Math.atan2(y2 - this.y, x2 - this.x) * (180 / Math.PI);
    line.style.transform = `rotate(${angle}deg)`;
    line.style.opacity = opacity
    this.container.appendChild(line);
  }

  deleteLinesByClassName = (className) => {
    const lineList = document.getElementsByClassName(className)
    for (let i = lineList.length - 1; i >= 0; i--) { lineList[i].remove() }
  }

  flow = () => {
    const dir = this.right ? 1 : -1
    const changePos = () => {
      for (let i = DotDrawer.instances.length - 1; i >= 0; i--) {
        if (DotDrawer.instances[i][2] === this.dotId) { DotDrawer.instances.splice(i, 1) }
      }
      this.deleteLinesByClassName(this.dotId)
      this.x = this.x + this.wind * dir * this.forward;
      this.y = this.y + this.wind * 1 * this.forward;
      this.drawDot()
      if ((this.x > this.endX && this.right) || (this.x < this.endX && !this.right) || (this.forward === -1 && this.right && this.x < this.endX - this.width) || (this.forward === -1 && !this.right && this.x > this.endX + this.width)) {
        (this.forward === 1) ? this.forward = -1 : this.forward = 1
      }
    }
    setInterval(changePos, 100)
  }
}

const emitDots = () => {
  for (let j = 40; j <= 300; j += 50) {
    for (let i = 40; i <= 300; i += 50) {
      const variableName = 'dot' + id;
      // props:  1: html element, 2: uniq ID, 3: color, 4: size, 5: speed, 6: initial x coord, 7: initial y coord, 8: initial direction, 9: swing size  
      dots[variableName] = new DotDrawer('container', id, 'blue', 5, Math.floor(Math.random() * 7) + 3, i * 6 + Math.floor(Math.random() * 201) + 200, j * 7 + Math.floor(Math.random() * 201) - 100, direction, 200 + Math.floor(Math.random() * 801));
      dots[variableName].flow()
      id++;
      direction ? direction = false : direction = true;
    }
  }
}
const dots = {};
let id = 1;
let direction = true;
emitDots()

