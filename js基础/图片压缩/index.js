var file = document.querySelector("input");
function hslToRgb(h, s, l) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l;
    }
    else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [Math.floor(h * 100), Math.round(s * 100), Math.round(l * 100)];
}
var CompressImage = (function () {
    function CompressImage(options) {
        this.fileReader = new FileReader();
        this.options = options;
        this.createBase64();
    }
    CompressImage.prototype.createBase64 = function () {
        var _this = this;
        this.fileReader.readAsDataURL(this.options.file);
        this.fileReader.onload = function (e) {
            var _a;
            var base64Str = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            _this.compress(base64Str);
        };
    };
    CompressImage.prototype.compress = function (file) {
        var _this = this;
        var img = new Image();
        img.src = file;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var width = img.width, height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
            console.log("ctx", width, height);
            console.log(ctx);
            ctx.save();
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(x, y);
            ctx.rotate((-90 * Math.PI) / 180);
            ctx.scale(1.2, 1.2);
            ctx.translate(-x, -y);
            ctx.drawImage(img, 0, 0, width, height);
            ctx.restore();
            console.log("ctx");
            var base64 = canvas.toDataURL(_this.options.file.type, _this.options.quality);
            document.body.innerHTML = "<img src=\"".concat(base64, "\" />");
        };
    };
    return CompressImage;
}());
file.onchange = function (e) {
    var fileData = e.target.files[0];
    if (fileData) {
        var compressImage = new CompressImage({
            file: fileData,
            success: function (base64) {
                console.log(base64);
            },
        });
    }
};
//# sourceMappingURL=index.js.map