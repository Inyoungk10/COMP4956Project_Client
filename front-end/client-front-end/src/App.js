import Navbar from './components/Navbar';

import Unity, { unityContext } from 'react-unity-webgl';

const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});

// const unityContext = new UnityContext({
//   loaderUrl: 'buildUnity/ContainerApp.loader.js',
//   dataUrl: 'buildUnity/ContainerApp.data',
//   frameworkUrl: 'buildUnity/ContainerApp.framework.js',
//   codeUrl: 'buildUnity/ContainerApp.wasm',
//   webglContextAttributes: {
//     preserveDrawingBuffer: true,
//   },
// });

function App() {
  return(
    <Unity unityContext={unityContext} />
  )
  // return (
  //   <div className="App">
  //     <Navbar/>
  //   </div>
  // );
}

export default App;
