import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from 'react-unity-webgl'

const unityContext = new UnityContext({
  loaderUrl: "\\build\\Build.loader.js",
  dataUrl: "\\build\\Build.data",
  frameworkUrl: "\\build\\Build.framework.js",
  codeUrl: "\\build\\Build.wasm",
});

const Sandbox = () => {

  const [progression, setProgression] = useState(0);

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  useEffect(function () {
    unityContext.on("canvas", function (canvas) {
      canvas.width = 100;
      canvas.height = 50;
    });
  }, []);

  // when box is clicked info of box is displayed in div
  const displayInfo = () => {
    let infoDiv = document.getElementById('boxInfo');
    infoDiv.innerHTML = '';
    
    let bb = document.createElement('p');
    bb.innerHTML = "Basketball";

    let sb = document.createElement('p');
    sb.innerHTML = "Soccer Ball";

    let rb = document.createElement('p');
    rb.innerHTML = "Rugby Ball";

    infoDiv.appendChild(bb);
    infoDiv.appendChild(sb);
    infoDiv.appendChild(rb);
  }

  return (
    <div style={{width: '100%', display: 'table'}}>
      <div style={{display: 'table-row'}}>
        <div style={{width: '600px', display: 'table-cell'}}> 
        <h1>Sndbox</h1>
        <p>Loading {progression * 100} percent...</p>
        <Unity
          unityContext={unityContext}
          matchWebGLToCanvasSize={false}
          style={{ width: "900px", height: "640px" }}
        />
      </div>
        <div style={{display: "table-cell"}}>
          <button onClick={displayInfo}>View Info Test</button>
          <div id="boxInfo" style={{'background-color': 'Beige'}}>
          </div>
      </div>
    </div>
  </div>
  );
}

export default Sandbox