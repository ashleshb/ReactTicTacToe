// FirstPage.js
import React, {useState} from 'react';
import '../Styles/FirstPage.css';
import O_img from '../Assets/Images/O.svg';
import X_img from '../Assets/Images/X.svg';
import GamingArea from './GamingArea';
import Toast from './Toasting';

function FirstPage({onInvite }) {
  const [NewGame, setNewGame] = useState(false);
  const [Choice, setUserChoice] = useState(null);
  const [ShowToast, setShowToast] = useState(false);

  const handlingInvite = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };


  const handlingNewGame = () => {
    setNewGame(true);
    localStorage.setItem("u_Score", JSON.stringify(0));
    localStorage.setItem("c_Score", JSON.stringify(0));
    localStorage.setItem("TieScore", JSON.stringify(0));
  };

  const handlingUserSelection = (e, selected) => {
    setUserChoice(selected);
    e.target.style.backgroundColor = '#D9D9D9';
  };
  return (
    <>
       {NewGame ? (
          <GamingArea Choice={Choice} />
        ) : (
          <div className="PlayingArea">
          <div className="Icons">
            <img alt="XImage" src={X_img} />
            <img alt="OImage" src={O_img} />
          </div>
          <div className="pick_Player">
            PICK PLAYER
            <div className="choices">
              <div className="xchoice btn" onClick={(e) => handlingUserSelection(e, 'X')}>
               
              </div>
              <div className="ochoice btn" onClick={(e) => handlingUserSelection(e, 'O')}>
              </div>
            </div>
          </div>
  
          <button name="New" className="newGame txt" onClick={handlingNewGame}>
            NEW GAME ( VS CPU )
          </button>
          <button className="simple txt">NEW GAME ( VS HUMAN ) Coming soon</button>
          <button className="newGame txt" onClick={handlingInvite}>
            Invite your friend
          </button>
      </div>
        )}

        {ShowToast && <Toast />} 
    </>
  );
}

export default FirstPage;