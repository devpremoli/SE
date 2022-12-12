/* eslint-disable */
import "./Application.css"
import React, { useState, useEffect } from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import {GAME_STATE} from './game_state_enum.js';
import {RandomGrid} from './randomGen.js';
import {auth,db} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav"
function Application() {

  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [size, setSize] = useState(3);
  const logo="https://dynamic.brandcrowd.com/preview/logodraft/1b127039-fb88-4860-9258-9f9957ffe600/image/large.png"
  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      if(size !== -11111)  // if Grid is not loaded from firestore
          setGrid(RandomGrid(size));
      setFoundSolutions([]);
    }
  }, [gameState, size]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  const [user, loading] = useAuthState(auth);
  const [name,setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
  if (loading) return;
  if (!user) return navigate("/");

  fetchUserName();
  }, [user, loading]);

  return (
    <div>
      <Nav/>
      <div className="App">
        <img src={logo}  width="18%" height="15%"  alt="Bison Boggle Logo" />
        <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)}
                       setSize={(state) => setSize(state)}
                       setTotalTime={(state) => setTotalTime(state)}
                       numFound={foundSolutions.length}
                       theGrid={JSON.stringify(grid)}
                       setGrid={(state) => setGrid(state)}/>

        { gameState === GAME_STATE.IN_PROGRESS &&
          <div>
            <Board board={grid} />

            <GuessInput allSolutions={allSolutions}
                        foundSolutions={foundSolutions}
                        correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
            <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
          </div>
        }
        { gameState === GAME_STATE.ENDED &&
          <div>
            <Board board={grid} />
            <SummaryResults words={foundSolutions} totalTime={totalTime} />
            <FoundSolutions headerText="Missed Words [wordsize > 3]: " words={allSolutions}  />


          </div>
        }
      </div>
    </div>
  );
}

export default Application;