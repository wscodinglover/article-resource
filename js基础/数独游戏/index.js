/*! 1 2014-06-24 */
$(function () {
  var a = {
      room: $("#room"),
      chessboard: $("#grids"),
      grid: null,
      dialog: $("#dialog"),
      menu: $("#menu"),
      restart: $("#restart"),
      time: $("#time"),
      restartTrigger: $("#restartTrigger"),
      confirm: $(".confirm"),
      lvList: $("#lvList"),
      con_restart: $("#con_restart"),
      win: $("#win"),
    },
    b = "ontouchstart" in window ? "touchstart" : "click",
    c = {
      data: {},
      time: 0,
      curGrid: null,
      init: function (b) {
        (this.data = b),
          (this.data.tm = b.grid.split("")),
          this.draw(),
          !this.e_inited && this.initEvent(),
          (this.inited = !0),
          (this.time = 0),
          a.time.html("0:00"),
          this.stopTimer(),
          this.statTimer();
      },
      statTimer: function () {
        var b, d, e;
        c.timer = setInterval(function () {
          c.time++,
            (b = Math.floor(c.time / 3600)),
            (d = Math.floor((c.time % 3600) / 60)),
            (e = (c.time % 3600) % 60),
            (b = b > 0 && 10 > b ? "0" + b : b),
            (d = b && 10 > d ? "0" + d : d),
            (e = e > 0 && 10 > e ? "0" + e : e),
            (b = b ? b + ":" : ""),
            (d += ":"),
            a.time.html(b + d + e);
        }, 1e3);
      },
      stopTimer: function () {
        clearInterval(c.timer);
      },
      restart: function () {
        this.init(this.data);
      },
      initEvent: function () {
        (this.e_inited = !0),
          a.chessboard.on(b, "span", function (a) {
            var b = $(this).data("val");
            $(this).hasClass("f")
              ? ((c.curGrid = $(this)), c.showDiaolog(), a.stopPropagation())
              : c.findFrd(b);
          }),
          a.dialog.on(b, ".num", function (b) {
            var d = a.dialog.hasClass("mark"),
              e = $(this).data("val");
            if (d) {
              var f = $(this).hasClass("on") ? "del" : "add";
              $(this).toggleClass("on"), c.mark(f, e), b.stopPropagation();
            } else c.fillNum(e);
          }),
          a.dialog.on(b, "#d-clear", function () {
            c.curGrid.data("val", "").data("mark", "").html(""),
              c.checkErr("empty");
          }),
          a.dialog.on(b, "#d-mark", function (b) {
            a.dialog.toggleClass("mark"), b.stopPropagation();
          }),
          $("body").on(b, this.closeAll);
      },
      closeAll: function () {
        a.dialog.hide();
      },
      closeConfirm: function () {
        $(".confirm").hide();
      },
      fillNum: function (a) {
        c.curGrid.data("val", a).html(a).data("mark", ""),
          (c.data.tm[c.curGrid.data("idx")] = a),
          c.findFrd(a),
          c.check();
      },
      mark: function (a, b) {
        c.curGrid.data("val") && c.curGrid.data("val", "").empty();
        var d = c.curGrid.data("mark") || "";
        "del" === a
          ? ((d = d.replace(b, "")),
            c.curGrid.data("mark", d),
            c.curGrid.find(".m" + b).remove())
          : ((d += "" + b),
            c.curGrid
              .append('<i class="m' + b + '">' + b + "</i>")
              .data("mark", d));
      },
      findFrd: function (b) {
        a.grid.each(function (a, c) {
          $(c).data("val") == b
            ? $(c).addClass("active")
            : $(c).removeClass("active");
        });
      },
      showDiaolog: function () {
        var b,
          d,
          e = c.curGrid.position(),
          f = (c.curGrid.data("val"), c.curGrid.data("mark"));
        if (
          (this.closeAll(),
          a.grid.removeClass("active"),
          c.curGrid.addClass("active"),
          (c.data.gridW && c.data.gridH) ||
            ((c.data.gridW = c.curGrid.width()),
            (c.data.gridH = c.curGrid.height()),
            (c.data.chessboardW = $("#chessboard").width()),
            (c.data.chessboardH = $("#chessboard").height())),
          (b = Math.min(
            e.left - (150 - c.data.gridW) / 2,
            c.data.chessboardW - 150
          )),
          (b = Math.max(0, b)),
          (d = Math.min(
            e.top - (200 - c.data.gridH) / 2,
            c.data.chessboardH - 200
          )),
          (d = Math.max(0, d)),
          a.dialog.find(".num").removeClass("on"),
          f)
        ) {
          a.dialog.addClass("mark");
          for (var g = 0, h = f.length; h > g; g++)
            a.dialog.find(".num[data-val=" + f[g] + "]").addClass("on");
        } else a.dialog.removeClass("mark");
        a.dialog
          .css({
            left: b,
            top: d,
          })
          .fadeIn(300);
      },
      draw: function () {
        for (var b = "", c = 0; 81 > c; c++) {
          var d = parseInt(this.data.grid[c]) || "",
            e = d ? "" : "f ";
          c % 3 == 2 && (e += " mr"),
            Math.floor(c / 9) % 3 === 0 && (e += " mt");
          var f =
            '<span data-idx="' +
            c +
            '" data-val="' +
            d +
            '" class="' +
            e +
            '">' +
            d +
            "</span>";
          b += f;
        }
        a.chessboard.empty().html(b), (a.grid = $("#grids span"));
      },
      check: function () {
        c.checkErr(),
          c.data.tm.join("") == c.data.answer &&
            (c.stopTimer(),
            localStorage.setItem("sudoku_lv" + c.data.lv, c.data.p),
            a.win.find(".lv").html(c.data.lv + 1),
            a.win.find(".time").html(a.time.html()),
            a.win.show());
      },
      checkErr: function () {
        for (
          var b,
            d,
            e = parseInt(c.curGrid.data("idx")),
            f = Math.floor(e / 9),
            g = e % 9,
            h = 0,
            i = Math.floor(f / 3),
            j = Math.floor(g / 3),
            k = !1;
          9 > h;
          h++
        )
          (b = 9 * h + g),
            (d = a.grid.eq(b)),
            d.data("idx") != c.curGrid.data("idx") &&
              (d.data("val") && d.data("val") == c.curGrid.data("val")
                ? (d.addClass("err"), (k = !0))
                : d.removeClass("err")),
            (b = h + 9 * f),
            (d = a.grid.eq(b)),
            d.data("idx") != c.curGrid.data("idx") &&
              (d.data("val") && d.data("val") == c.curGrid.data("val")
                ? (d.addClass("err"), (k = !0))
                : d.removeClass("err")),
            (b = (h % 3) + 9 * Math.floor(h / 3) + 27 * i + 3 * j),
            (d = a.grid.eq(b)),
            d.data("idx") != c.curGrid.data("idx") &&
              (d.data("val") && d.data("val") == c.curGrid.data("val")
                ? (d.addClass("err"), (k = !0))
                : d.removeClass("err"));
        c.curGrid.toggleClass("err", k);
      },
    },
    d = {
      data: {},
      init: function () {
        for (var a, b, c, d = $("#difficulty span"), e = 0; 5 > e; e++)
          (a = parseInt(localStorage.getItem("sudoku_lv" + e) || 0)),
            (b = sudokuData[e].length),
            (c = a + "/" + b),
            d.eq(e).html(c);
        this.initEvent();
      },
      initEvent: function () {
        a.lvList.on(b, function () {
          c.inited && $(this).hide();
        }),
          a.lvList.on(b, ".btn", function () {
            var a = parseInt($(this).data("lv")),
              b = parseInt(localStorage.getItem("sudoku_lv" + a) || 0),
              d = sudokuData[a],
              e = d[b];
            (b = b == d.length - 1 ? b : b + 1),
              c.init({
                answer: e.substring(81, 162),
                grid: e.substring(0, 81),
                lv: a,
                p: b,
              });
          }),
          a.menu.on(b, function () {
            a.lvList.show();
          }),
          a.win.on(b, ".js-nextLv", function () {
            var a = c.data.lv,
              b = c.data.p;
            if (sudokuData[a][b]) {
              var d = sudokuData[a][b];
              c.init({
                answer: d.substring(81, 162),
                grid: d.substring(0, 81),
                lv: a,
                p: b + 1,
              });
            } else c.restart();
            c.closeConfirm();
          }),
          a.restartTrigger.on(b, function () {
            a.con_restart.show();
          }),
          a.confirm.on(b, function () {
            c.closeConfirm();
          }),
          a.confirm.on(b, ".js-close", function () {
            c.closeConfirm();
          }),
          a.confirm.on(b, ".inner", function (a) {
            a.stopPropagation();
          }),
          a.restart.on(b, function () {
            c.closeConfirm(), c.inited && c.restart();
          });
      },
    };
  d.init();
});
