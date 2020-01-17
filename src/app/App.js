import React, {useEffect, useRef} from 'react';
import './App.css';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../utils/constants";
import {Artist} from "./artist/Artist";

function App() {
  const canvasRef = useRef();
  const isCanvasFound = !!canvasRef.current;
  useEffect(() => isCanvasFound && new Artist(canvasRef.current), [isCanvasFound]);

  return (
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
    </canvas>
  );
}

export default App;
