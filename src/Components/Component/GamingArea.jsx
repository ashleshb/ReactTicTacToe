//GamingArea.js
import React, { useRef, useState, useEffect } from "react";
import "../Styles/GamingArea.css";
import Ologo from "../Assets/Images/O.svg";
import Xlogo from "../Assets/Images/X.svg";
import reset_img from "../Assets/Images/reset.svg"; 
import '../Styles/PlayAgain.css';
import FirstPage from './FirstPage';

let GamingArr = ["", "", "", "", "", "", "", "", ""];

function GamingArea(props) {

  let U_icon, C_icon;
  const U_choice = props.Choice;
  const C_choice = props.Choice === "X" ? "O" : "X"; 
  if (U_choice === "X") {
    U_icon = Xlogo;
    C_icon = Ologo;
  } else {
    U_icon = Ologo;
    C_icon = Xlogo;
  }

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [u_Score, setu_Score] = useState(0); // Changed initial value to 0
  let [c_Score, setc_Score] = useState(0); // Changed initial value to 0
  let [tieScore, setTieScore] = useState(0); // Changed initial value to 0
  let [turn,setTurn] = useState(U_choice);
  let [Exit,showExit] = useState(false);
  let [WinnerDiv,showWinnerDiv] = useState(false);
  let [Winner,setWinner] = useState('');
  let [ShowFirstPage,setShowFirstPage] = useState(false);

  useEffect(() => {
    // Retrieve the value from localStorage when the component mounts
    const UserValue = localStorage.getItem("u_Score");
    const CompValue = localStorage.getItem("c_Score");
    const TieValue = localStorage.getItem("TieScore");

    // Set the state with the retrieved value, if any
    if (UserValue) {
      setu_Score(JSON.parse(UserValue));
    }
    if (CompValue) {
      setc_Score(JSON.parse(CompValue));
    }
    if (TieValue) {
      setTieScore(JSON.parse(TieValue));
    }
  }, []);

  const UpdateLocal = (user, comp, tie) => {
    if (user !== "") localStorage.setItem("u_Score", JSON.stringify(user));
    if (comp !== "") localStorage.setItem("c_Score", JSON.stringify(comp));
    if (tie !== "") localStorage.setItem("TieScore", JSON.stringify(tie));
  };

  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggleBtn = (e, index) => {
    if (lock) {
      return;
    }
    if (count % 2 === 0 || count === 0) {
      // User's move
      if(GamingArr[index]===""){
      e.target.innerHTML = `<img alt='user' src='${U_icon}' />`;
      GamingArr[index] = U_choice;
      setCount(++count);
      setTurn(C_choice);
      winner();
      setTimeout(() => C_Move(), 1000);
    }} 
  };

  const C_Move = () => {
    if (lock) {
      return;
    }

    const emptyBox = GamingArr.reduce((acc, value, index) => {
      if (value === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptyBox.length > 0) {
      const randomIndx = Math.floor(Math.random() * emptyBox.length);
      const C_BoxIndex = emptyBox[randomIndx];

      // Simulate a click on the corresponding box
      if (box_array[C_BoxIndex].current) {
        box_array[C_BoxIndex].current.click();
        box_array[C_BoxIndex].current.innerHTML = `<img alt='comp' src='${C_icon}' />`;
        GamingArr[C_BoxIndex] = C_choice;
        setCount(++count);
        winner();
        setTurn(U_choice);
      }
    } else {
      console.log("No empty Box left.");
    }
  };

  const winner = () => {
    if (
      GamingArr[0] === GamingArr[1] &&
      GamingArr[1] === GamingArr[2] &&
      GamingArr[2] !== ""
    ) {
      result(GamingArr[2]);
    } else if (
      GamingArr[3] === GamingArr[4] &&
      GamingArr[4] === GamingArr[5] &&
      GamingArr[5] !== ""
    ) {
      result(GamingArr[5]);
    } else if (
      GamingArr[6] === GamingArr[7] &&
      GamingArr[7] === GamingArr[8] &&
      GamingArr[8] !== ""
    ) {
      result(GamingArr[8]);
    } else if (
      GamingArr[0] === GamingArr[3] &&
      GamingArr[3] === GamingArr[6] &&
      GamingArr[6] !== ""
    ) {
      result(GamingArr[6]);
    } else if (
      GamingArr[2] === GamingArr[5] &&
      GamingArr[5] === GamingArr[8] &&
      GamingArr[8] !== ""
    ) {
      result(GamingArr[8]);
    } else if (
      GamingArr[1] === GamingArr[4] &&
      GamingArr[4] === GamingArr[7] &&
      GamingArr[7] !== ""
    ) {
      result(GamingArr[7]);
    } else if (
      GamingArr[0] === GamingArr[4] &&
      GamingArr[4] === GamingArr[8] &&
      GamingArr[8] !== ""
    ) {
      result(GamingArr[8]);
    } else if (
      GamingArr[2] === GamingArr[4] &&
      GamingArr[4] === GamingArr[6] &&
      GamingArr[6] !== ""
    ) {
      result(GamingArr[6]);
    } else if (checkArray()) {
      result("Tie");
    }
  
  };

  const checkArray = () => {
    for (let i = 0; i < GamingArr.length; i++) {
      if (GamingArr[i] === "") {
        return false; // At least one element is null
      }
    }
    return true; // All elements are not null
  };

  const result = (won) => {
    setLock(true);
    if (won === U_choice) {
      setu_Score(u_Score + 1);
      UpdateLocal(u_Score + 1, c_Score, tieScore);
      showWinnerDiv(true);
      setWinner(won);
    } else if (won === C_choice) {
      setc_Score(c_Score + 1);
      UpdateLocal(u_Score, c_Score + 1, tieScore);
      showWinnerDiv(true);
      setWinner(won);
    } else {
      setTieScore(tieScore + 1);
      UpdateLocal(u_Score, c_Score, tieScore + 1);
      showWinnerDiv(true);
      setWinner('none');
    }
  };

  const toggleExit=()=>{
    showExit(true);
  }

  const togglePlayAgain=()=>{
    showExit(false);
    reset();
    resetScore();
  }

  const toggleNextRound=()=>{
    showWinnerDiv(false);
    reset();
  }

  const reset = () => {
    setLock(false);
    GamingArr = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setTurn(U_choice);

    box_array.forEach((ele) => {
      if (ele.current) {
        ele.current.innerHTML = "";
      }
    });
  };

  const resetScore = ()  => {
    localStorage.setItem("u_Score", JSON.stringify(0));
    localStorage.setItem("c_Score", JSON.stringify(0));
    localStorage.setItem("TieScore", JSON.stringify(0));
  };

  const handleExitClick = () =>{
    reset();
    resetScore();
    setShowFirstPage(true);
  };

  return (
    <>
    {ShowFirstPage? <FirstPage />:
    <div className="GamingArea">
      <div className="areatop">
        <div className="icons">
          <img alt="XImage" src={Xlogo} />
          <img alt="OImage" src={Ologo} />
        </div>
        <div className="Turning"><span>{turn}</span> Turn</div>
        <button
          className="Reset"
          onClick={() => {
            toggleExit();
          }}>
          <img src={reset_img} alt="reset" />
        </button>
      </div>
      <div className="PlayBoard">
        <div className="rows">
          <div
            className="Box"
            ref={box1}
            onClick={(e) => {
              toggleBtn(e, 0);
            }}
          ></div>
          <div
            className="Box"
            ref={box2}
            onClick={(e) => {
              toggleBtn(e, 1);
            }}
          ></div>
          <div
            className="Box"
            ref={box3}
            onClick={(e) => {
              toggleBtn(e, 2);
            }}
          ></div>
        </div>
        <div className="rows">
          <div
            className="Box"
            ref={box4}
            onClick={(e) => {
              toggleBtn(e, 3);
            }}
          ></div>
          <div
            className="Box"
            ref={box5}
            onClick={(e) => {
              toggleBtn(e, 4);
            }}
          ></div>
          <div
            className="Box"
            ref={box6}
            onClick={(e) => {
              toggleBtn(e, 5);
            }}
          ></div>
        </div>
        <div className="rows">
          <div
            className="Box"
            ref={box7}
            onClick={(e) => {
              toggleBtn(e, 6);
            }}
          ></div>
          <div
            className="Box"
            ref={box8}
            onClick={(e) => {
              toggleBtn(e, 7);
            }}
          ></div>
          <div
            className="Box"
            ref={box9}
            onClick={(e) => {
              toggleBtn(e, 8);
            }}
          ></div>
        </div>
      </div>
      {Exit &&    <div className='playAgain'>
      <div className="alert">
        <h1>Do you want to quit?</h1>
        <div className="actions">
            <button className="yellow" onClick={handleExitClick}>QUIT</button>
            <button className="blue" onClick={togglePlayAgain}>PLAY AGAIN</button>
        </div>
        </div>
    </div>}
{WinnerDiv &&    
  <div className='playAgain'>
    <div className="alert">
      {Winner === U_choice ? (
        <div className="titles">
          <h3>YOU WON!</h3>
          <h1><img alt='comp' src={U_icon} /> TAKES THE ROUND</h1>
        </div>
      ) : Winner === C_choice ? (
        <div className="titles">
          <h3>YOU LOST!</h3>
          <h1><img alt='comp' src={C_icon} /> TAKES THE ROUND</h1>
        </div>
      ) : (
        <div className="titles">
          <h3>Tied!</h3>
          <h1>ROUND TIED</h1>
        </div>
      )}
      <div className="actions">
        <button className="blue" onClick={toggleNextRound}>NEXT ROUND</button>
        <button className="yellow" onClick={handleExitClick}>QUIT</button>
      </div>
    </div>
  </div>
}
      <div className="pointsBoard">
        <div className="pointsBtn blue">
          {U_choice}(You)<span>{u_Score}</span>
        </div>
        <div className="pointsBtn yellow">
          Tie <span>{tieScore}</span>
        </div>
        <div className="pointsBtn grey">
          {C_choice}(CPU) <span>{c_Score}</span>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default GamingArea;

