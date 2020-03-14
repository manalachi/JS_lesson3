class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv() {
        let items = document.createElement('div');
        document.body.appendChild(items);
        let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}; text-align:${this.textAlign}`;
        items.style.cssText = param;
    }
}
const elem = new Options(300,350,'green',14,'center');
elem.createDiv();