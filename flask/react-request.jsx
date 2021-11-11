import React, { useState, useRef } from 'react'
import Webcam from "react-webcam";

await fetch('backend url (of app.py)', {
    method: 'POST',
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ 
        // body to be sent to backend
    })
})
.then(res => res.json())
.then(response => {
    // do something with the response
})



function ReactRequest(props) {
    const webcamRef = useRef(null);
    const [cameraOn, setCameraOn] = useState(false)

    const capture = () => {
        if(cameraOn){
            const imageSrc = webcamRef.current.getScreenshot();
            props.imageData(cameraOn, imageSrc)
            // this imageSrc contains the image data (pass it to the body of the request)
        }
        else{ alert('Please turn on the camera first') }
    };

    const turnOnCamera = event => {
        event.preventDefault()
        setCameraOn(!cameraOn) 
    }
    return (
        <main id="auth-camera">
            <div className="camera">
                { cameraOn ? 
                (<Webcam id="videoElement" audio={false} ref={webcamRef} screenshotFormat="image/jpeg" mirrored={true} />) 
                : <div id="videoElement"></div> }
                
            </div>
            <div className="controls">
                <button id="capture" onClick={capture}>
                    <i className="btn fas fa-camera"></i>
                </button>
                <button id="stop" onClick={turnOnCamera}>
                    <i className="btn fas fa-video-slash"></i>
                </button>
            </div>
        </main>
    )
}
        
export default ReactRequest