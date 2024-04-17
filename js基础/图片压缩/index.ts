const file = document.querySelector("input") as HTMLInputElement;

// const canvasRotate = function () {
//   let rotate = $("#myCanvas").attr("rotate");
//   cxt.save(); //canvas上下文对象保存状态
//   let x = canvas.width / 2;
//   let y = canvas.height / 2;
//   cxt.clearRect(0, 0, canvas.width, canvas.height); //清空画布
//   cxt.translate(x, y); //设置画布中心点旋转
//   console.log(rotate);
//   if (rotate == 0) {
//     cxt.rotate((180 * Math.PI) / 180); //旋转180度
//     cxt.translate(-x, -y);
//     cxt.drawImage(img, 0, 0);
//     let rotate = $("#myCanvas").attr("rotate", "1");
//   } else {
//     cxt.rotate((360 * Math.PI) / 180);
//     cxt.translate(-x, -y);
//     cxt.drawImage(img, 0, 0);
//     let rotate = $("#myCanvas").attr("rotate", "0");
//   }
//   cxt.restore();
// };

/**
 *  HSL颜色值转换为RGB.
 *  换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 *  h, s, 和 l 设定在 [0, 1] 之间
 *  返回的 r, g, 和 b 在 [0, 255]之间
 *  @param   Number  h       色相
 *  @param   Number  s       饱和度
 *  @param   Number  l       亮度
 *  @return  Array           RGB色值数值
 */
function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;
  if (s == 0) {
    r = g = b = l;
    // achromatic
  } else {
    let hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
/**
 *  RGB 颜色值转换为 HSL.
 *  转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 *  r, g, 和 b 需要在 [0, 255] 范围内
 *  返回的 h, s, 和 l 在 [0, 1] 之间
 *  @param   Number  r       红色色值
 *  @param   Number  g       绿色色值
 *  @param   Number  b       蓝色色值
 *  @return  Array           HSL各值数组
 */
function rgbToHsl(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
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

interface Options {
  file: File;
  quality?: number; // 压缩质量 0-1
  success?: (base64: string) => void; // 压缩成功后的回调
}

class CompressImage {
  options: Options;
  fileReader = new FileReader();
  constructor(options: Options) {
    this.options = options;
    this.createBase64();
  }

  createBase64() {
    this.fileReader.readAsDataURL(this.options.file);
    this.fileReader.onload = (e) => {
      const base64Str = e.target?.result as string;
      this.compress(base64Str);
    };
  }

  compress(file: string) {
    // 压缩
    const img = new Image();
    img.src = file;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { width, height } = img;
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      console.log("ctx", width, height);
      console.log(ctx);

      // 图片旋转
      ctx.save(); //canvas上下文对象保存状态
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height); //清空画布
      ctx.translate(x, y); //设置画布中心点旋转
      //逆时针旋转90度
      ctx.rotate((-90 * Math.PI) / 180);
      ctx.scale(1.2, 1.2);
      ctx.translate(-x, -y);

      ctx.drawImage(img, 0, 0, width, height);
      ctx.restore();
      console.log("ctx");

      const base64 = canvas.toDataURL(
        this.options.file.type,
        this.options.quality
      );
      // this.options.success?.(base64);
      document.body.innerHTML = `<img src="${base64}" />`;

      // let pixels = ctx.getImageData(0, 0, img.width, img.height);
      // let pixeldata = pixels.data;
      // for (let i = 0, len = pixeldata.length; i < len; i += 4) {
      //   let hslarr = rgbToHsl(
      //     pixels.data[i],
      //     pixels.data[i + 1],
      //     pixels.data[i + 2]
      //   ); //将canvas图像一个像素转成hsl
      //   let h = Math.round(hslarr[0]) / 100; //色调，处理成0-1之前数据
      //   let s = Math.round(hslarr[1]) / 100; //饱和度
      //   let l = Math.round(hslarr[2]) / 100; //亮度
      //   if (s <= 0.95) {
      //     //处理饱和度，色调，亮度类似
      //     s = s + 0.05;
      //   }
      //   let rgbarr = hslToRgb(h, s, l); //把处理后的hsl转成rgb
      //   pixels.data[i] = rgbarr[0];
      //   pixels.data[i + 1] = rgbarr[1];
      //   pixels.data[i + 2] = rgbarr[2];
      // }
      // ctx.putImageData(pixels, 0, 0); //重新渲染图像
    };
  }
}

file.onchange = (e) => {
  const fileData = (e.target as HTMLInputElement).files[0];
  // console.log(fileData);
  if (fileData) {
    const compressImage = new CompressImage({
      file: fileData,
      success(base64) {
        console.log(base64);
        // document.body.innerHTML = `<img src="${base64}" />`;
      },
    });
  }
};
