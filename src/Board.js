import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  }
  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    const board = [];

    //win checker array of arrays
    // const board = [
    //   [false,false,false,false,false],
    //   [false,false,false,false,false],
    //   [false,false,false,false,true],
    //   [false,false,false,true,true],
    //   [false,false,false,false,true],
    // ];

    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    const hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board: board, hasWon: hasWon });
  }


  /** Render game board or winning message. */
  maketable() {
    const tblBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[i][j]}
            flipCellsAroundMe={() => { this.flipCellsAround(coord) }}
          />
        )
      }
      tblBoard.push(<tr key={i}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    )
  }

  render() {

    return (
      <div>
        {this.state.hasWon ?
          (
            <div className="winner">
              <span className="neon" id="winner-neon">You</span>
              <span className="flux" id="winner-flux">Win!</span>
            </div>
          )
          :
          (
            <div className="Board-body">
                <h2 className="Board-title rules-head neon">Rules : </h2>
                <ul>
                  <li className="neon rules-rule" id="rules-rule">Turn all the cells off to win!!</li>
                </ul>
              <span className="neon">Lights</span>
              <span className="flux">Out</span>
              {this.maketable()}
            </div>
          )
        }
      </div>
    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
