function buildHexGrid(opts) {
    if (!(this instanceof buildHexGrid)) {
        return new buildHexGrid(opts);
    }

    for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
            this.opts[key] = opts[key];
        }
    }

    this.instance = Math.round(Math.random() * 2000);

    return this.createSVG();
}

buildHexGrid.prototype = {
    opts: {
        cols: 6,
        rows: 6,
        spacing: 0,
        size: 300,
        offsetX: 0,
        offsetY: 0
    },

    createPolygonPoints: function (size, sides) {

        sides = sides || 6;
        size = size || 150;

        size = size * 0.59;

        var i = sides,
            points = [];

        while (i--) {
            points.push(
                Math.round(size + size * Math.sin(i * (Math.PI * 2) / sides)) +
                ',' +
                Math.round(size + size * Math.cos(i * (Math.PI * 2) / sides))
            );
        }

        return points.join(' ');

        //return '<polygon class="hex" points="'+points.join(' ')+'" transform="translate({{x}},{{y}})" fill="{{fill}}"></polygon>';

    },

    createPolygon: function (size, sides, x, y, fill) {
        x = (x !== undefined ? x : '{{x}}');
        y = (y !== undefined ? y : '{{y}}');
        fill = (fill !== undefined ? fill : '{{fill}}');
        
        // return '<polygon class="hex-item" points="' + this.createPolygonPoints(size, sides) + '" transform="translate(' + x + ',' + y + ')" index="{{idx}}"></polygon>'; //fill="'+fill+'"
        return '<defs><pattern id="{{imgID}}" x="0" y="0" width="1" height="1"><image xlink:href="{{imgPath}}" width="120" height="120"></image></pattern></defs><polygon class="hex-item" points="' + this.createPolygonPoints(size, sides) + '" transform="translate(' + x + ',' + y + ')" index="{{idx}}" fill="{{fill}}" filter="url(#blurMe)"></polygon>'; 
    },

    createGrid: function (hex) {
        var //hex = '<use x="{{x}}" y="{{y}}" fill="{{fill}}" class="hex" xlink:href="#hex'+this.instance+'" />',
            odd = false,
            size = this.opts.size + this.opts.spacing,
            grid = '',
            total = this.opts.rows * this.opts.cols,
            count = 0,
            x, y, i, j, fill;

        for (i = 0; i < this.opts.rows; i++) {
            odd = i % 2;
            y = i * (size * 0.87) + this.opts.offsetY;
            for (j = 0; j < this.opts.cols + (odd ? 1 : 0); j++) {
                x = j * size + (odd ? -size / 2 : 0) + this.opts.offsetX;
                count++;

                // fill = 'hsla('+Math.round((count / total) * 50)+', 80%, ' + Math.round((Math.random()*15) + 40) +'%, 1)';
                img_num = (parseInt(count) < 10) ? `0${count}` : count;
                img_path = `http://35.190.70.140/productions/products/Product_icon${img_num}.jpg`;
                fill = `url(#img_${count})`;
                grid += hex.replace('{{x}}', x).replace('{{y}}', y).replace('{{fill}}', fill).replace('{{idx}}', count).replace('{{imgID}}', `img_${count}`).replace('{{imgPath}}', img_path);
            }
        }

        return grid;
    },

    createSVG: function () {
        var div = document.createElement('div'),
            size = this.opts.size + this.opts.spacing,
            hex = this.createPolygon(this.opts.size);
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' +
            (size * this.opts.cols) + ' ' +
            (size * this.opts.rows * 0.91) + '">'
            /*+ '<defs>'
            + this.createPolygon(this.opts.size)
            + '</defs>'*/
            +
            this.createGrid(hex) +
            '</svg>';

        return div.children[0];
    }
};