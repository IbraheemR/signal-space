let n = 0;

class Node {
  constructor(e) {
    this.id = n++;

    this.x = Math.random();
    this.y = Math.random();

    this.lastEmit = 0;

    this.emit = (event, data) => {
      e(this, event, data);
      this.lastEmit = Date.now();
    };

    this.data = {
      king: null,
      copy: 0
    };
  }

  on(event, data) {
    if (event === "init") {
      if (this.id < 2) {
        this.data.king = this.id;

        this.emit("recruit", {king: this.id, copy: 0});
      }
    };

    if (this.data.king === this.id) {
      
    } else {
      if(event === "recruit" && this.data.king === null) {
        this.data.king = data.king;
        this.data.copy = data.copy + 1;
        this.emit("recruit", {king: this.data.king, copy: this.data.copy})
      }
    }
  }

  get color() {
    if (this.data.king === this.id) return "magenta";
    const power = Math.floor(1/this.data.copy * 156) + 100
    if (this.data.king === 0) return [0, power,  power];
    if (this.data.king === 1) return [0,  power, 0];


    return "white";
  }
}