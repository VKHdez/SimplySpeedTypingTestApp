import React, { useState } from 'react';

import './App.css';
import { generate } from './utils/words';
import useKeyPress from './hooks/useKeyPress';
import { currentTime } from './utils/time';
import Menu from './components/Menu';

const App = () => {

    const initialWords = generate();
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );

    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);

    // updating keys
    useKeyPress(key => {
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;

        if(!startTime){
            setStartTime(currentTime());
        }

        if(key === currentChar){
            if(leftPadding.length > 0){
                setLeftPadding(leftPadding.substring(1));
            }
    
            if(incomingChars.charAt(0) === ' '){
                setWordCount(wordCount + 1);
                const durationInMinutes = (currentTime() - startTime) / 6000.0;
                setWpm(((wordCount+1) / durationInMinutes).toFixed(2));
            }




            updatedOutgoingChars += currentChar;
            setOutgoingChars(updatedOutgoingChars);

            setCurrentChar(incomingChars.charAt(0));

            updatedIncomingChars = incomingChars.substr(1);
            if(updatedIncomingChars.split(' ').length < 10){
                updatedIncomingChars +=' ' + generate();
            }

            setIncomingChars(updatedIncomingChars);
        }
    });

    return (
        <div className="App">
          <header className="App-header">
            <div className="Random-Text-Wrapper">
                <p className="Character">
                    <span className="Character-out">
                        {(leftPadding + outgoingChars).slice(-13)}
                    </span>
                    <span className="Character-current">
                        {currentChar}
                    </span>
                    <span>
                        {incomingChars.substr(0,13)}
                    </span>
                </p>
            </div>
            <div className="Data">
                <p> 
                    WPM: {wpm}
                </p>
            </div>
            <div className="Credits">
                <p>Made by VKHdez</p>
            </div>
          </header>
        </div>
    );
}

export default App;
