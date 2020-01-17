import React from 'react';
import './App.css';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../utils/constants";
import {Artist} from "./artist/Artist";

function App() {
    const createArtist = (canvas) => new Artist(canvas);
    return (
        <div className="wrapper">
            <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={createArtist}/>
        </div>
    );
}

export default App;
