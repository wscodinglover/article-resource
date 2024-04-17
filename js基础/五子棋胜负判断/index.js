// 五子棋胜负判断

function isValid(board, point, color) {
  const rows = board.length;
  const cols = board[0].length;
  const [x, y] = point;
  return x >= 0 && x < cols && y >= 0 && y < rows && board[x][y] === color;
}

const isWinHorizontal = createIsWin(
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x - 1, y]
);
const isWinVertical = createIsWin(
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x, y - 1]
);
const isWinSlash = createIsWin(
  ([x, y]) => [x + 1, y + 1],
  ([x, y]) => [x - 1, y - 1]
);
const isWinBackSlash = createIsWin(
  ([x, y]) => [x + 1, y - 1],
  ([x, y]) => [x - 1, y + 1]
);

function createIsWin(p1Move, p2Move) {
  return function (board, point, color) {
    let count = 1;
    let p1 = p1Move(point);
    let p2 = p2Move(point);

    while (1) {
      let p1IsValid = false;
      let p2IsValid = false;

      if (isValid(board, p1, color)) {
        count++;
        p1IsValid = true;
        p1 = p1Move(p1);
      }

      if (isValid(board, p2, color)) {
        count++;
        p2IsValid = true;
        p2 = p2Move(p2);
      }

      if (count >= 5) {
        return true;
      }

      if (!p1IsValid && !p2IsValid) {
        return false;
      }
    }
  };
}

function isWin(board, point, color) {
  return (
    isWinHorizontal(board, point, color) ||
    isWinVertical(board, point, color) ||
    isWinSlash(board, point, color) ||
    isWinBackSlash(board, point, color)
  );
}

function createClassMap(rows, cols, type = 0) {
  const result = [];
  const classMap = [
    {
      0: ["chess-top", "chess-left"],
      [(rows - 1) * cols]: ["chess-bottom", "chess-left"],
      [cols - 1]: ["chess-top", "chess-right"],
      [rows * cols - 1]: ["chess-bottom", "chess-right"],
    },
    {
      0: ["hover-up-left"],
      [(rows - 1) * cols]: ["hover-down-left"],
      [cols - 1]: ["hover-up-right"],
      [rows * cols - 1]: ["hover-down-right"],
    },
  ];
  for (let i = 0; i < rows * cols; i++) {
    if (classMap[type][i]) {
      result.push(classMap[type][i]);
      break;
    }
    if (i < cols) {
      const map = [["chess-top"], ["hover-up"]];
      result.push(map[type]);
      break;
    }
    if (i % cols === 0) {
      const map = [["chess-left"], ["hover-left"]];
      result.push(map[type]);
      break;
    }
    if (i % cols === rows - 1) {
      const map = [["chess-right"], ["hover-right"]];
      result.push(map[type]);
      break;
    }
    if (i >= (rows - 1) * cols) {
      const map = [["chess-bottom"], ["hover-down"]];
      result.push(map[type]);
      break;
    }
    const map = [["chess-middle"], ["hover"]];
    result.push(map[type]);
  }

  console.log(result);
  return result;
}

let board = [];
let currentPoint = null;
let currentColor = 1;

let isWinFlag = false;
function createBoard(rows, cols) {
  const isChessboard = document.querySelector(".chessboard");
  if (isChessboard) {
    isChessboard.remove();
  }
  const chessboard = document.createElement("div");
  chessboard.classList.add("chessboard");
  const classListMap = createClassMap(rows, cols);
  for (let i = 0; i < rows * cols; i++) {
    const div = document.createElement("div");
    chessboard.appendChild(div);
    const classList = classListMap[i];
    div.classList.add(...classList);
    div.dataset.index = i;
  }

  board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i].push(0);
    }
  }

  document.querySelector(".fiveChess").appendChild(chessboard);

  const classListHoverMap = createClassMap(15, 15, 1);
  chessboard.onmousemove = (e) => {
    const classList = e.target.classList;
    if (
      classList.contains("black") ||
      classList.contains("white") ||
      classList.contains("black-last") ||
      classList.contains("white-last") ||
      !e.target.dataset.index
    )
      return;
    classList.add(...classListHoverMap[e.target.dataset.index]);

    e.target.onmouseleave = () => {
      e.target.classList.remove(
        "hover",
        "hover-up",
        "hover-down",
        "hover-left",
        "hover-right",
        "hover-up-left",
        "hover-up-right",
        "hover-down-left",
        "hover-down-right"
      );
    };
  };

  let flag = 0;
  let lastPoint = null;
  chessboard.onclick = (e) => {
    if (isWinFlag) return;
    const classList = e.target.classList;
    if (
      classList.contains("black") ||
      classList.contains("white") ||
      classList.contains("black-last") ||
      classList.contains("white-last")
    )
      return;
    // 1 黑色 2 白色
    const winStr = ["黑棋胜", "白棋胜"];
    const pointColorMap = [1, 2];
    const pointColorCurrentMap = ["black-last", "white-last"];
    console.log(e.target.dataset.index);
    const index = e.target.dataset.index;
    const row = Math.floor(index / rows);
    const col = index % cols;
    currentPoint = [row, col];
    currentColor = pointColorMap[flag];

    console.log("row", row, "col", col);
    if (lastPoint) {
      if (lastPoint.classList.contains("black-last")) {
        lastPoint.classList.add("black");
      }
      if (lastPoint.classList.contains("white-last")) {
        lastPoint.classList.add("white");
      }
      lastPoint.classList.remove(...pointColorCurrentMap);
    }

    board[row][col] = pointColorMap[flag];
    const result = isWin(board, [row, col], pointColorMap[flag]);

    if (result) {
      console.log("result: win", winStr[flag]);
      isWinFlag = true;
    }

    classList.add(pointColorCurrentMap[flag]);
    classList.remove(
      "hover",
      "hover-up",
      "hover-down",
      "hover-left",
      "hover-right",
      "hover-up-left",
      "hover-up-right",
      "hover-down-left",
      "hover-down-right"
    );

    lastPoint = e.target;
    flag = flag === 0 ? 1 : 0;
  };
}

createBoard(15, 15);
console.log("board", board);

function replay() {
  createBoard(15, 15);
  isWinFlag = false;
  console.log("board", board);
  console.log("---");
}
