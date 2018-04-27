
module.exports = function Space(pos) {
  this.pos = pos;
  this.value = null;
  this.setX = () => {
    if(this.value) {
      return false;
    } else {
      this.value = "X";
      return true;
    }
  }
  this.setO = () => {
    if(this.value) {
      return false;
    } else {
      this.value = "O";
      return true;
    }
  }
  this.toString = () => this.value ? "[" + this.value + "]" : "[" + this.pos + "]";
}










