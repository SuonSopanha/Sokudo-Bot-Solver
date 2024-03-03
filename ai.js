let sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function solveSudoku() {
  solve(sudokuBoard);
  displayBoard(sudokuBoard);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function solve(board) {
  let emptySpot = findEmptySpot(board);
  if (!emptySpot) {
    return true;
  }

  let [row, col] = emptySpot;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      console.log("num: " + num + " row: " + row + " col: " + col);
      await displayBoardWithNumber(board, row, col, num);
      await delay(250);

      if (await solve(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }

  return false;
}

function findEmptySpot(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}



function displayBoard(board) {
  for (let i = 0; i < 9; i++) {
    let row = "";
    for (let j = 0; j < 9; j++) {
      row += board[i][j] + " ";
    }
    console.log(row);
  }
}

function displayBoardWithNumber(board, row, col, num) {
  let sudokuBoardDiv = document.getElementById("sudoku-board");
  sudokuBoardDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.className = "row";
    sudokuBoardDiv.appendChild(rowDiv);
    for (let j = 0; j < 9; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      if (i === row && j === col) {
        cell.textContent = num;
        cell.style.color = "red";
      } else {
        cell.textContent = board[i][j] === 0 ? "" : board[i][j];
      }
      rowDiv.appendChild(cell);
    }
  }
  sudokuBoardDiv.style.display = "block";
}
