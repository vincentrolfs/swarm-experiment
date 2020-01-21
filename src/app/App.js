import React from 'react';
import './App.css';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../utils/constants";
import {SwarmSimulation} from "./SwarmSimulation/SwarmSimulation";

function App() {
    const createSimulation = (canvas) => new SwarmSimulation(canvas);
    return (
        <div className="wrapper">
            <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={createSimulation}/>
        </div>
    );
}

export default App;
