// import React, {useState,useEffect} from 'react';
// import Button from "@material-ui/core/Button";
// import {GAME_STATE} from './game_state_enum.js';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import './ToggleGameState.css';

// function ToggleGameState({gameState, setGameState, setSize, setTotalTime}) {

//   const [buttonText, setButtonText] = useState("Start!");
//   const [startTime, setStartTime] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   let deltaTime;
//   var timer;

//   useEffect(()=>{
//   timer=setInterval(()=>{
//     setSeconds(seconds-1)
//     if (seconds===1){
//       setMinutes(minutes-1)
//       setSeconds(59);
//     }
//     if (minutes===0 && seconds===1){
//       setGameState(GAME_STATE.ENDED)
//       setButtonText("Start!")
//       setTotalTime(2);
//     }
//   },1000)
//   return ()=> clearInterval(timer);
//   },)


//   function updateGameState(endTime) {
    
//     if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
//       setStartTime(Date.now());
//       setGameState(GAME_STATE.IN_PROGRESS);
//       setButtonText("Stop");
//       setMinutes(1)
//       setSeconds(59)

//     } else if (gameState === GAME_STATE.IN_PROGRESS) {
//       deltaTime = (endTime - startTime)/1000;
//       setTotalTime(deltaTime);
//       setGameState(GAME_STATE.ENDED)
//       setButtonText("Start!");
    
//     }
//   }
  

//   const handleChange = (event) => {
//     setSize(event.target.value);
//   };
  
//   return (
    
//     <div className="Toggle-game-state">
//       {
//       <Button style={{boaderRadius:35,"&:hover": {backgroundColor: "#ba68c8",},}} variant="outlined" color="secondary" onClick={() => updateGameState(Date.now())} >
//         {buttonText}
//       </Button>
//       }
      
//       { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED)  &&
//         <div className="Input-select-size">
//         <FormControl >
       
//         <Select
//           labelId="sizelabel"
//           id="sizemenu"     
//           onChange={handleChange}
//         >
//           <MenuItem value={3}>3</MenuItem>
//           <MenuItem value={4}>4</MenuItem>
//           <MenuItem value={5}>5</MenuItem>
//           <MenuItem value={6}>6</MenuItem>
//           <MenuItem value={7}>7</MenuItem>
//           <MenuItem value={8}>8</MenuItem>
//           <MenuItem value={9}>9</MenuItem>
//           <MenuItem value={10}>10</MenuItem>
//         </Select>
//          <FormHelperText>Set Grid Size</FormHelperText>
//         </FormControl>
//        </div>
//       }
//       {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED)  ?
//         <div className='Timed'>Timed Game: You have 2 minutes to complete the game</div> :
//         <div className='Timed-ingame'>Timed Game: You have {minutes} minutes and {seconds} seconds to complete the game</div>
//       }
//     </div>
//   );
// }

// export default ToggleGameState;
/* eslint-disable */
import React, {useState,useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './ToggleGameState.css';
import { collection, addDoc, query, getDocs, orderBy, limit } from "firebase/firestore";
import {db} from './firebase.js';
function ToggleGameState({gameState, setGameState, setSize, setTotalTime, numFound, theGrid, setGrid}) {

  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
  const [boardSize, setBoardSize] = useState(3);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [input, setInput] = useState("");
  const [deltaTime, setDeltaTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [grid_size, setGrid_size] = useState("Set Grid Size");
  
  let d = 0;
  var timer
  useEffect(()=>{
    timer=setInterval(()=>{
      setSeconds(seconds-1)
      if (seconds===1){
        setMinutes(minutes-1)
        setSeconds(59);
      }
      if (minutes===0 && seconds===1){
        setGameState(GAME_STATE.ENDED)
        setButtonText("Start!")
        setTotalTime(2);
      }
    },1000)
    return ()=> clearInterval(timer);
    },)

  function updateGameState(endTime) {
    
    if (gameState === GAME_STATE.SHOW_LEADERBOARD || gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setStartTime(Date.now());
      
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End Game");
      setMinutes(1)
      setSeconds(59)
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      d = (endTime - startTime)/ 1000.0;
      setDeltaTime(d);
      setTotalTime(d); 
      setGameState(GAME_STATE.ADD_LEADERBOARD);
 
      // setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
      StoreGameResults();

    }
  }
  
  /*Query Firestore to get all games ordered by boardSize, Time Solved */
  async function showLeaderBoard(){
   
      setGameState(GAME_STATE.SHOW_LEADERBOARD);
      setButtonText("Play Existing Game!");
    
      // build query and bind results to menu list
 
    try {
       const q = query(collection(db, "LeaderBoard"), orderBy("boardSize"), orderBy("solveTime", "asc"), limit(10));

       const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
              
       console.log(doc.id, " => ", doc.data());
        
       leaderBoard.push(doc.data());                
       setLeaderBoard([...leaderBoard, leaderBoard]);  //doc.boardSize, doc.solveTime, doc.playerName
       console.log("Entry = ", leaderBoard);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }

  /* Store the Game in Firestore */
  async function StoreGameResults() {

    try {
      const docRef = await addDoc(collection(db, "LeaderBoard"), {
      boardSize: boardSize,
      solveTime: deltaTime,
      numFound: numFound,    
      playerName: input,
      theBoard: theGrid
      });  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  function evaluateInput() {
    setGameState(GAME_STATE.ENDED);
    setButtonText("Start a new game!");
    StoreGameResults();
  }

  function keyPress(e) {
    if (e.key === 'Enter') {
      e.target.value = "";
      evaluateInput();
    }
  }
  
  const handleGridChange = (event) => {
  
    setSize(-11111);
    setGrid(JSON.parse(event.target.value));
    console.log("theGrid = ", event.target.value); 
  };
  
  const handleSizeMenuChange = (event) => {
    setBoardSize(event.target.value);
    setSize(event.target.value);
    setGrid_size(event.target.value);
  };

  
  return (
    <div>
      <div className="Toggle-game-state">
        { gameState === GAME_STATE.ADD_LEADERBOARD &&
          
          <TextField InputLabelProps={{style: { color: '#cfd8dc' }}} inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}} id="outlined-basic" label="Enter Your Name" variant="outlined" onKeyPress={(e) => keyPress(e)} onChange={(event) => setInput(event.target.value)} />
        }
        
        { gameState !== GAME_STATE.ADD_LEADERBOARD &&
          <Button style={{boaderRadius:35,"&:hover": {color: "#9c27b0",}}} color="primary" variant="outlined" onClick={() => updateGameState(Date.now())} >
          {buttonText}
          </Button>
        }
        { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) &&
        <div className="Toggle-game-state2">
              <Button style={{boaderRadius:35,"&:hover": {backgroundColor: "#9c27b0",}}} variant="outlined" color='primary' onClick={() => showLeaderBoard()} >
              Play Existing Games
              </Button>
        </div>
        }
        { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED)  &&
          <div className="Input-select-size">
            <FormControl className='app__dropdown'>
              <Select
                labelId="sizelabel"
                id="sizemenu"
                value={grid_size}
                onChange={handleSizeMenuChange}

              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
              <FormHelperText className='helper_text'>Set Grid Size</FormHelperText>
            </FormControl>
        </div>
        }

        {(gameState === GAME_STATE.SHOW_LEADERBOARD) &&
          <div className="Input-select-size">
          <FormControl className='app__dropdown'>
            
        <Select
          labelId="leaderboardlabel"
          id="leaderboardmenu"
          value=""
          onChange={handleGridChange}
        >
        {leaderBoard.map((item, idx) => {
          return (
              <MenuItem key={idx} value={item.theBoard}>
                Size: {item.boardSize} Words Found: {item.numFound} Name: {item.playerName}
              </MenuItem>
          );
        })}
        </Select>
        <FormHelperText>Select Game</FormHelperText>
          </FormControl>
          </div>
        }
        




        {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED || (gameState === GAME_STATE.ENDED))   &&
          <div className='Timed'>Timed Game: You have 2 minutes to complete the game</div> 
        }
        {!(gameState === GAME_STATE.SHOW_LEADERBOARD) && !(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) &&
        
          <div className='Timed-ingame'>Timed Game: You have {minutes} minutes and {seconds} seconds to complete the game</div>
        }
        
      </div>
    </div>
  );
}

export default ToggleGameState;