let SCREEN_WIDTH = 256;
let SCREEN_HEIGHT = 240;
let FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;

let canvas_ctx, image;
let framebuffer_u8, framebuffer_u32;

let AUDIO_BUFFERING = 512;
let SAMPLE_COUNT = 4 * 1024;
let SAMPLE_MASK = SAMPLE_COUNT - 1;
let audio_samples_L = new Float32Array(SAMPLE_COUNT);
let audio_samples_R = new Float32Array(SAMPLE_COUNT);
let audio_write_cursor = 0,
  audio_read_cursor = 0;
let selfinterval;
let current_audio;
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

class xbenDB {
  constructor() {
    this.DBName = "xbenDB";
    this.storeName = "xbenStore";
    this.zxbDB = {};
  }
  initDB() {
    let request = window.indexedDB.open(this.DBName);
    let that = this;
    return new Promise(function (resovle, reject) {
      request.onerror = function (e) {
        console.log("open Error!");
        resovle();
      };
      request.onsuccess = function (e) {
        that.zxbDB = e.target.result;
        resovle();
      };
      request.onupgradeneeded = function (e) {
        let db = e.target.result;
        if (!db.objectStoreNames.contains(that.storeName)) {
          try {
            console.log("进入");
            let store = db.createObjectStore(that.storeName, {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("xbenIndexCode", "code", { unique: false });
          } catch (e) {
            console.log(e);
          }
        }
      };
    }).catch((error) => {
      console.log("女盘友哭了！");
    });
  }

  setData(data) {
    let that = this;
    return new Promise(function (resovle, reject) {
      let request = that.zxbDB
        .transaction(that.storeName, "readwrite")
        .objectStore(that.storeName)
        .put(data);
      request.onsuccess = function (event) {
        resovle(event.target.result);
      };
      request.onerror = function (event) {
        console.log("女盘友哭了！");
      };
    });
  }
  getDataListByCode(code) {
    let that = this;
    return new Promise(function (resovle, reject) {
      let request = that.zxbDB
        .transaction(that.storeName)
        .objectStore(that.storeName)
        .index("xbenIndexCode")
        .openCursor(IDBKeyRange.only(code));
      let dataList = [];
      request.onsuccess = function (event) {
        let cursor = event.target.result;
        let isEnd = true;
        if (cursor) {
          let cursorVal = cursor.value;
          let info = new Object();
          info.id = cursorVal.id;
          info.code = cursorVal.code;
          info.pic = cursorVal.pic;
          info.time = cursorVal.time;
          dataList.push(info);
          isEnd = false;
          cursor.continue();
        }
        if (isEnd) {
          resovle(dataList);
        }
      };

      request.onerror = function (event) {
        console.log("女盘友哭了！");
      };
    });
  }
  getData(id) {
    let that = this;
    return new Promise(function (resovle, reject) {
      let request = that.zxbDB
        .transaction(that.storeName, "readwrite")
        .objectStore(that.storeName)
        .get(id);
      request.onsuccess = function (event) {
        resovle(event.target.result.data);
      };
      request.onerror = function (event) {
        console.log("女盘友哭了！");
      };
    });
  }
}
let xDB = new xbenDB();
var nes = new jsnes.NES({
  onFrame: function (framebuffer_24) {
    for (var i = 0; i < FRAMEBUFFER_SIZE; i++)
      framebuffer_u32[i] = 0xff000000 | framebuffer_24[i];
  },
  onAudioSample: function (l, r) {
    audio_samples_L[audio_write_cursor] = l;
    audio_samples_R[audio_write_cursor] = r;
    audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK;
  },
});

var fps = 51; //帧数限制，如：17、34、51、68类推
var fpsInterval = 1000 / fps;
var last = new Date().getTime(); //上回执行时间

function onAnimationFrame() {
  window.requestAnimationFrame(onAnimationFrame);
  //执行时的时间
  var now = new Date().getTime();
  var elapsed = now - last;
  //经过了足够的时间
  if (elapsed > fpsInterval) {
    last = now - (elapsed % fpsInterval); //校正当前时间
    image.data.set(framebuffer_u8);
    canvas_ctx.putImageData(image, 0, 0);
    nes.frame();
  }
}

function audio_remain() {
  return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK;
}

function audio_callback(event) {
  var dst = event.outputBuffer;
  var len = dst.length;

  if (audio_remain() < AUDIO_BUFFERING) nes.frame();

  var dst_l = dst.getChannelData(0);
  var dst_r = dst.getChannelData(1);
  for (var i = 0; i < len; i++) {
    var src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
    dst_l[i] = audio_samples_L[src_idx];
    dst_r[i] = audio_samples_R[src_idx];
  }

  audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK;
}

function nes_init(canvas_id) {
  var canvas = document.getElementById(canvas_id);
  canvas_ctx = canvas.getContext("2d");
  image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  canvas_ctx.fillStyle = "black";
  canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  var buffer = new ArrayBuffer(image.data.length);
  framebuffer_u8 = new Uint8ClampedArray(buffer);
  framebuffer_u32 = new Uint32Array(buffer);

  var audio_ctx = new window.AudioContext();
  var script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
  script_processor.onaudioprocess = audio_callback;
  script_processor.connect(audio_ctx.destination);
  current_audio = audio_ctx;
}

function nes_boot(rom_data) {
  nes.loadROM(rom_data);
  window.requestAnimationFrame(onAnimationFrame);
}

function nes_load_data(canvas_id, rom_data) {
  nes_init(canvas_id);
  nes_boot(rom_data);
}

function nes_load_url(canvas_id, path) {
  nes_init(canvas_id);

  var req = new XMLHttpRequest();
  req.open("GET", path);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.onerror = () => console.log(`Error loading ${path}: ${req.statusText}`);

  req.onload = function () {
    if (this.status === 200) {
      nes_boot(this.responseText);
    } else if (this.status === 0) {
    } else {
      req.onerror();
    }
  };

  req.send();
}

$("#xbenKeyboardTable tr td:not(:nth-child(1))").click(function () {
  initxbenTableKey();
  $("#xbenKeyboardTable").unbind("keydown");
  let h = $(this).parent("tr").prevAll().length + 1;
  let l = $(this).prevAll().length + 1;
  $(this).html("按下按键设置");
  $("#xbenKeyboardTable").attr("tabindex", 0);
  $("#xbenKeyboardTable").focus();
  $("#xbenKeyboardTable").keydown((e) => {
    changeGameKey(e.key.toUpperCase(), e.code, h, l);
  });
});
let originControllerKey = [
  [4, 5, 6, 7, 0, 1, 8, 9, 3, 2],
  [4, 5, 6, 7, 0, 1, 8, 9, 3, 2],
];
let xbenControllerKey = {};
initxbenKey();
function initxbenKey() {
  xbenControllerKey = localStorage["\x67\x65\x74\x49\x74\x65\x6d"](
    "\x78\x62\x65\x6e\x43\x6f\x6e\x74\x72\x6f\x6c\x6c\x65\x72"
  );
  if (xbenControllerKey != null) {
    xbenControllerKey = JSON["\x70\x61\x72\x73\x65"](xbenControllerKey);
    return;
  }
  xbenControllerKey = {
    "\x4b\x65\x79\x57": [1, 2, "\x57"],
    "\x4b\x65\x79\x53": [2, 2, "\x53"],
    "\x4b\x65\x79\x41": [3, 2, "\x41"],
    "\x4b\x65\x79\x44": [4, 2, "\x44"],
    "\x4b\x65\x79\x4b": [5, 2, "\x4b"],
    "\x4b\x65\x79\x4c": [6, 2, "\x4c"],
    "\x4b\x65\x79\x49": [7, 2, "\x49"],
    "\x4b\x65\x79\x55": [8, 2, "\x55"],
    "\x45\x6e\x74\x65\x72": [9, 2, "\x45\x4e\x54\x45\x52"],
    "\x4b\x65\x79\x42": [10, 2, "\x42"],
    "\x41\x72\x72\x6f\x77\x55\x70": [1, 3, "\u2191"],
    "\x41\x72\x72\x6f\x77\x44\x6f\x77\x6e": [2, 3, "\u2193"],
    "\x41\x72\x72\x6f\x77\x4c\x65\x66\x74": [3, 3, "\u2190"],
    "\x41\x72\x72\x6f\x77\x52\x69\x67\x68\x74": [4, 3, "\u2192"],
    "\x4e\x75\x6d\x70\x61\x64\x31": [5, 3, "\u6570\u5b57\u952e\u76d8\x31"],
    "\x4e\x75\x6d\x70\x61\x64\x32": [6, 3, "\u6570\u5b57\u952e\u76d8\x32"],
    "\x4e\x75\x6d\x70\x61\x64\x34": [7, 3, "\u6570\u5b57\u952e\u76d8\x34"],
    "\x4e\x75\x6d\x70\x61\x64\x35": [8, 3, "\u6570\u5b57\u952e\u76d8\x35"],
    "\x4e\x75\x6d\x70\x61\x64\x37": [9, 3, "\u6570\u5b57\u952e\u76d8\x37"],
    "\x4e\x75\x6d\x70\x61\x64\x38": [10, 3, "\u6570\u5b57\u952e\u76d8\x38"],
  };
  localStorage["\x73\x65\x74\x49\x74\x65\x6d"](
    "\x78\x62\x65\x6e\x43\x6f\x6e\x74\x72\x6f\x6c\x6c\x65\x72",
    JSON["\x73\x74\x72\x69\x6e\x67\x69\x66\x79"](xbenControllerKey)
  );
}

function initxbenTableKey() {
  initxbenKey();

  for (let val in xbenControllerKey) {
    $(
      "#xbenKeyboardTable tr:eq(" +
        xbenControllerKey[val][0] +
        ") td:nth-child(" +
        xbenControllerKey[val][1] +
        ")"
    ).html(xbenControllerKey[val][2]);
  }
  let db = new xbenDB();
}
$(".keyboardBtn").click(() => {
  initxbenTableKey();
  $("#xbenKeyboardModal").modal("show");
});

function changeGameKey(name, code, h, l) {
  for (let val in xbenControllerKey) {
    if (xbenControllerKey[val][0] == h && xbenControllerKey[val][1] == l) {
      delete xbenControllerKey[val];
      break;
    }
  }
  xbenControllerKey[code] = [h, l, name];
  $("#xbenKeyboardTable tr:eq(" + h + ") td:nth-child(" + l + ")").html(name);
  localStorage.setItem("xbenController", JSON.stringify(xbenControllerKey));
}
function keyboard(callback, e, stat) {
  let xbenkeys = xbenControllerKey;
  if (xbenkeys[e.code]) {
    let h = xbenkeys[e.code][0] - 1;
    let l = xbenkeys[e.code][1] - 2;
    let player = l + 1;

    let btn = originControllerKey[l][h];
    if (btn != 8 && btn != 9) {
      callback(player, btn);
    } else if (btn == 8) {
      clearInterval(selfinterval);
      if (stat == 1) {
        nesButtonValue(
          {
            keyCode: jsnes.Controller.BUTTON_A,
            keyValue:
              0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A],
          },
          player
        );
        nesButtonUp({ keyCode: jsnes.Controller.BUTTON_B }, player);
        selfinterval = setInterval(() => {
          nesButtonValue(
            {
              keyCode: jsnes.Controller.BUTTON_A,
              keyValue:
                0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A],
            },
            player
          );
        }, 50);
      } else {
        nesButtonValue(
          { keyCode: jsnes.Controller.BUTTON_A, keyValue: 0x40 },
          player
        );
      }
    } else if (btn == 9) {
      clearInterval(selfinterval);
      if (stat == 1) {
        nesButtonValue(
          {
            keyCode: jsnes.Controller.BUTTON_B,
            keyValue:
              0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B],
          },
          player
        );
        nesButtonUp({ keyCode: jsnes.Controller.BUTTON_A }, player);
        selfinterval = setInterval(() => {
          nesButtonValue(
            {
              keyCode: jsnes.Controller.BUTTON_B,
              keyValue:
                0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B],
            },
            player
          );
        }, 50);
      } else {
        nesButtonValue(
          { keyCode: jsnes.Controller.BUTTON_B, keyValue: 0x40 },
          player
        );
      }
    }
  }
}
document.addEventListener("keydown", (event) => {
  keyboard(nes.buttonDown, event, 1);
});
document.addEventListener("keyup", (event) => {
  keyboard(nes.buttonUp, event, 0);
});
function nesButtonDown(key, playnum) {
  nes.buttonDown(playnum, key.keyCode);
}
function nesButtonUp(key, playnum) {
  nes.buttonUp(playnum, key.keyCode);
}
function nesButtonValue(key, playnum) {
  nes.buttonValue(playnum, key.keyCode, key.keyValue);
}
let selfinterval1;
$("#xbenBtnB").bind("touchstart gesturestart touchmove", function (e) {
  touchAB(e, false, "B");
  e.preventDefault();
});
$("#xbenBtnB").bind("touchend", function (e) {
  clearInterval(selfinterval1);
  nesButtonUp({ keyCode: jsnes.Controller.BUTTON_A }, 1);
  nesButtonUp({ keyCode: jsnes.Controller.BUTTON_B }, 1);
  e.preventDefault();
});
$("#xbenBtnA").bind("touchstart gesturestart touchmove", function (e) {
  touchAB(e, false, "A");
  e.preventDefault();
});
$("#xbenBtnA").bind("touchend", function (e) {
  clearInterval(selfinterval1);
  nesButtonUp({ keyCode: jsnes.Controller.BUTTON_A }, 1);
  nesButtonUp({ keyCode: jsnes.Controller.BUTTON_B }, 1);
  e.preventDefault();
});

function touchAB(e, db, btn) {
  if (selfinterval1) clearInterval(selfinterval1);
  if (btn == "A") {
    if (db) {
      nesButtonValue(
        {
          keyCode: jsnes.Controller.BUTTON_A,
          keyValue: 0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_A],
        },
        1
      );
      nesButtonUp({ keyCode: jsnes.Controller.BUTTON_B }, 1);
      selfinterval1 = setInterval(function () {
        nesButtonValue(
          {
            keyCode: jsnes.Controller.BUTTON_A,
            keyValue:
              0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_A],
          },
          1
        );
      }, 50);
    } else {
      nesButtonDown({ keyCode: jsnes.Controller.BUTTON_A }, 1);
      nesButtonUp({ keyCode: jsnes.Controller.BUTTON_B }, 1);
    }
  } else if (btn == "B") {
    if (db) {
      nesButtonUp({ keyCode: jsnes.Controller.BUTTON_A }, 1);
      nesButtonValue(
        {
          keyCode: jsnes.Controller.BUTTON_B,
          keyValue: 0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_B],
        },
        1
      );
      selfinterval1 = setInterval(function () {
        nesButtonValue(
          {
            keyCode: jsnes.Controller.BUTTON_B,
            keyValue:
              0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_B],
          },
          1
        );
      }, 50);
    } else {
      nesButtonUp({ keyCode: jsnes.Controller.BUTTON_A }, 1);
      nesButtonDown({ keyCode: jsnes.Controller.BUTTON_B }, 1);
    }
  }
}

$("#xbenBtnStart").click(function () {
  nesButtonValue(
    {
      keyCode: jsnes.Controller.BUTTON_START,
      keyValue: 0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_START],
    },
    1
  );
  setTimeout(() => {
    nesButtonValue(
      {
        keyCode: jsnes.Controller.BUTTON_START,
        keyValue:
          0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_START],
      },
      1
    );
  }, 200);
});
$("#xbenBtnSelect").click(function () {
  nesButtonValue(
    {
      keyCode: jsnes.Controller.BUTTON_SELECT,
      keyValue: 0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_SELECT],
    },
    1
  );
  setTimeout(() => {
    nesButtonValue(
      {
        keyCode: jsnes.Controller.BUTTON_SELECT,
        keyValue:
          0x81 - nes.controllers[1].state[jsnes.Controller.BUTTON_SELECT],
      },
      1
    );
  }, 200);
});

function joyOperate(type, player) {
  let keyType = "";
  let time = 90;
  switch (type) {
    case "left":
      keyType = jsnes.Controller.BUTTON_LEFT;
      break;
    case "right":
      keyType = jsnes.Controller.BUTTON_RIGHT;
      break;
    case "up":
      keyType = jsnes.Controller.BUTTON_UP;
      break;
    case "down":
      keyType = jsnes.Controller.BUTTON_DOWN;
      break;
  }
  nesButtonValue(
    {
      keyCode: keyType,
      keyValue: 0x81 - nes.controllers[1].state[keyType],
    },
    player
  );
  setTimeout(() => {
    nesButtonValue(
      {
        keyCode: keyType,
        keyValue: 0x81 - nes.controllers[1].state[keyType],
      },
      player
    );
  }, time);
}
new Joystick({
  zone: select("#left"),
}).init().onStart = function (distance, angle) {
  joyOperate(angle, 1);
};

$("#fullBtn").click(function () {
  fullScreen();
});
function fullScreen() {
  var element = document.getElementById("xben-canvas"),
    method = "RequestFullScreen";
  var prefixMethod;
  ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {
    if (prefixMethod) return;
    if (prefix === "") {
      method = method.slice(0, 1).toLowerCase() + method.slice(1);
    }
    var fsMethod = typeof element[prefix + method];
    if (fsMethod + "" !== "undefined") {
      if (fsMethod === "function") {
        prefixMethod = element[prefix + method]();
      } else {
        prefixMethod = element[prefix + method];
      }
    }
  });
  return prefixMethod;
}
function saveXbenNes(type, code, dom, id) {
  let canvas = document.getElementById("xben-canvas");

  let nesInfo = new Object();
  nesInfo.code = code.toString();
  nesInfo.pic = canvas.toDataURL("image/jpeg", 0.2);
  nesInfo.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
  nesInfo.data = nes.toJSON();
  if (typeof id != "undefined") {
    nesInfo.id = id;
  }
  xDB.initDB().then(() => {
    if (type) {
      xDB.setData(nesInfo).then((id) => {
        $(dom)
          .parent()
          .parent()
          .siblings(".save-img")
          .html(`<img src='${nesInfo.pic}' />`);
        $(dom).parent().siblings("p").children(".save-time").html(nesInfo.time);
        $(dom).attr("onclick", `saveXbenNes(true,'${code}',this,${id})`);
        $(dom).siblings("button").show();
        $(dom)
          .siblings("button")
          .attr("onclick", `saveXbenNes(false,'${code}',this,${id})`);
      });
    } else {
      xDB.getData(id).then((d) => {
        nes.fromJSON(d);
        $("#xbenSaveModal").modal("hide");
      });
    }
  });
}

$("#saveBtn").click(() => {
  let code = $("#gameCode").text();
  xDB.initDB().then(() => {
    xDB.getDataListByCode(code).then((data) => {
      $(".xben-save-modal .modal-body ul ").html("");
      let result = "";
      for (let i = 0; i < data.length; i++) {
        result += ` <li class="list-group-item list-group-item-success">
                <div class="save-img"><img src="${data[i].pic}"></div>
                <div class="save-info">
                <p>【${i + 1}】<span class="save-time">${
          data[i].time
        }</span></p>
            <p>
            <button type="button" class="btn btn-primary btn-sm xben-save-btn" onclick="saveXbenNes(true,'${
              data[i].code
            }',this,${data[i].id})">存档
                </button>
                <button type="button" class="btn btn-primary btn-sm xben-read-btn" onclick="saveXbenNes(false,'${
                  data[i].code
                }',this,${data[i].id})" style="display: inline-block;">读档
                </button>
                </p>
                </div>
                </li>`;
      }

      for (let i = 0; i < 4 - data.length; i++) {
        result += ` <li class="list-group-item list-group-item-info"><div class="save-img">
                        </div>
                        <div class="save-info">
                            <p>【${
                              data.length + i + 1
                            }】<span class="save-time"></span></p>
                            <p>
                                <button type="button" class="btn btn-primary btn-sm xben-save-btn"
                                        onclick="saveXbenNes(true,'${code}',this)">存档
                                </button>
                                <button type="button" class="btn btn-primary btn-sm xben-read-btn"
                                       >读档
                                </button>
                            </p>
                        </div></li>`;
      }
      $(".xben-save-modal .modal-body ul ").append(result);

      $("#xbenSaveModal").modal("show");
    });
  });
});
function stopGameWhenControl() {
  for (let val of arguments) {
    $(`#${val}`)
      .on("show.bs.modal", function (e) {
        $("#xbenBtnStart").click();
      })
      .on("hidden.bs.modal", function (e) {
        $("#xbenBtnStart").click();
      });
  }
}

/*
alert('\x73\x75\x73\x70\x65\x6e\x64');
'\x73\x75\x73\x70\x65\x6e\x64'  ==>suspend
'\x61\x74\x74\x72'                ==>attr

alert("\x42\x55\x54\x54\x4f\x4e\x5f\x53\x54\x41\x52\x54");
*/

function stopAudio(D_Cnet1, $NLc2) {
  if (D_Cnet1 == 1) {
    current_audio["suspend"]();
    $($NLc2)["attr"]("onclick", "stopAudio(0,this)");
    $($NLc2)["addClass"]("active");
    return;
  }
  current_audio["resume"]();
  $($NLc2)["attr"]("onclick", "stopAudio(1,this)");
  $($NLc2)["removeClass"]("active");
  nes["buttonDown"](1, jsnes["Controller"]["BUTTON_START"]);
  nes["buttonUp"](1, jsnes["Controller"]["BUTTON_START"]);
}
/*


function stopAudio(D_Cnet1,$NLc2)
{
	if(D_Cnet1==1){
		current_audio['\x73\x75\x73\x70\x65\x6e\x64']();
		$($NLc2)['\x61\x74\x74\x72']("\x6f\x6e\x63\x6c\x69\x63\x6b","\x73\x74\x6f\x70\x41\x75\x64\x69\x6f\x28\x30\x2c\x74\x68\x69\x73\x29");
		$($NLc2)['\x61\x64\x64\x43\x6c\x61\x73\x73']("\x61\x63\x74\x69\x76\x65");
		return
	}
	current_audio['\x72\x65\x73\x75\x6d\x65']();
	$($NLc2)['\x61\x74\x74\x72']("\x6f\x6e\x63\x6c\x69\x63\x6b","\x73\x74\x6f\x70\x41\x75\x64\x69\x6f\x28\x31\x2c\x74\x68\x69\x73\x29");
	$($NLc2)['\x72\x65\x6d\x6f\x76\x65\x43\x6c\x61\x73\x73']("\x61\x63\x74\x69\x76\x65");
	nes['\x62\x75\x74\x74\x6f\x6e\x44\x6f\x77\x6e'](1,jsnes['\x43\x6f\x6e\x74\x72\x6f\x6c\x6c\x65\x72']['\x42\x55\x54\x54\x4f\x4e\x5f\x53\x54\x41\x52\x54']);
	nes['\x62\x75\x74\x74\x6f\x6e\x55\x70'](1,jsnes['\x43\x6f\x6e\x74\x72\x6f\x6c\x6c\x65\x72']['\x42\x55\x54\x54\x4f\x4e\x5f\x53\x54\x41\x52\x54'])
}*/
