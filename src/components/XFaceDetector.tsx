import React, { useEffect, useRef } from "react";
import 'x-face-detector';

interface XFaceDetectorElement extends HTMLElement {
  startVideo: Function;
  stopVideo: Function;
  startPredictions: Function;
  stopPredictions: Function;
}

const getXFaceDetector = () =>
  document.querySelector('x-face-detector') as XFaceDetectorElement;

const XFaceDetector: React.FC = () => {
  const XFaceDetector = useRef<XFaceDetectorElement>(null);
  const handleFaceDetection = (e: any) => {
    console.log(`${e.type === 'x-face-detector-no-face-detected' ? 'NO ' : ''}face detected`);
  };

  useEffect(() => {
    const current = XFaceDetector.current

    current!.addEventListener('x-face-detector-face-detected', handleFaceDetection);
    current!.addEventListener('x-face-detector-no-face-detected', handleFaceDetection);

    return () => {
      current!.removeEventListener('x-face-detector-face-detected', handleFaceDetection);
      current!.removeEventListener('x-face-detector-no-face-detected', handleFaceDetection);
    };
  }, []);

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => getXFaceDetector().startVideo()}>start video</button>
        <button onClick={() => getXFaceDetector().stopVideo()}>stop video</button>
        <button onClick={() => getXFaceDetector().startPredictions()}>start predictions</button>
        <button onClick={() => getXFaceDetector().stopPredictions()}>stop predictions</button>
      </div>
      <x-face-detector
        ref={XFaceDetector}
        linewidth="5"
        strokestyle="blue"
        imgurl="https://avatars3.githubusercontent.com/u/3065761"
        wasmpath={process.env.PUBLIC_URL + '/tfjs-backend-wasm.wasm'}
      ></x-face-detector>
    </>
  );
}

export default XFaceDetector;
