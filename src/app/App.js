import React from 'react';
import './App.css';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../utils/constants";
import {SwarmSimulation} from "./SwarmSimulation/SwarmSimulation";
import {Settings} from "./Settings/Settings";
import {AgentList} from "./AgentList/AgentList";

function App() {
    const createSimulation = (canvas) => new SwarmSimulation(canvas);
    return (
        <>
            <div className="canvasWrapper">
                <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={createSimulation}/>
            </div>

            <div className="stuffWrapper">
                <AgentList/>
                <Settings/>
            </div>
        </>
    );
}

export default App;
