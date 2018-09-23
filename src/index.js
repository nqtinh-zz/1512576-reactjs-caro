
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class SquareRow extends React.Component {
  render() {
    let squareRow = this.props.row.map((square, idx) => {
      let k = "s" + idx;
      // let win = false;
      // let winner = this.props.winner;
      // let rowIdx = this.props.rowIdx;
      // if (winner) {
      //   if (winner.direction === "ToRight" &&
      //     idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && rowIdx === winner.y) {
      //       win = true;
      //   }
      //   if (winner.direction === "ToDown" &&
      //       rowIdx >= winner.y && rowIdx <= winner.y + nSquareToWin - 1 && idx === winner.x) {
      //       win = true;
      //   }
      //   if (winner.direction === "ToRightDown" &&
      //     idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && idx - winner.x === rowIdx - winner.y) {
      //       win = true;
      //   }
      //   if (winner.direction === "ToLeftDown" &&
      //     idx <= winner.x && idx >= winner.x - nSquareToWin + 1 && winner.x - idx === rowIdx - winner.y) {
      //       console.log(winner.x+' '+winner.y+' '+idx+' '+rowIdx+' '+nSquareToWin);
      //       win = true;
      //   }
      // }
      return (
        <Square  value={square} onClick={() => this.props.onClick(this.props.rowIdx, idx)} key={k} />
      )
    })
    return (
      <div className="board-row">
        {squareRow}
      </div>
    )
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let board;
    board = this.props.squares.map((row, idx) => {
      let k = "r" + idx;
      return (
        <SquareRow winner={this.props.winner} rowIdx={idx} row={row} onClick={this.props.onClick} key={k}/>
      )
    })
    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    let tmpArr = Array(8);
    for (let i = 0; i < 8; i++) {
      tmpArr[i] = Array(8).fill(null);
    }
    this.state = {
      history: [{
        squares: tmpArr,
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true,
    };
    this.sort = this.sort.bind(this);
  }

  handleClick(i,j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    })
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: {x: i, y: j}
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  sort() {
    this.setState({isDescending: !this.state.isDescending});
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    //const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' + step.location.x + ',' + step.location.y + ')' :
        'Go to game start';
      return (this.state.stepNumber === move) ? (
        <li key={move}>
          <button className="btn-bold" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      ) : (
        <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
      );
    });
    if (!this.state.isDescending) {
      moves = moves.reverse();
    }

    let status;
    // if (winner) {
    //   status = 'Winner: ' + winner.val;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    let arrow = this.state.isDescending ? '↓' : '↑'

    return (
      <div className="game">
        <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i, j) => this.handleClick(i, j)}
              //winner={winner}
          />
        </div>
        <div className="game-info">
            <div>
              <button onClick={this.sort}>Thứ tự bước {arrow}</button>
            </div>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));


