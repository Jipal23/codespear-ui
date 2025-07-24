import React, { useRef, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const VideoRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const chunks = useRef([]);
    const videoRef = useRef();
    const streamRef = useRef();

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => chunks.current.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            // Upload blob to server or show preview
            console.log("Recorded video URL:", url);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        streamRef.current.getTracks().forEach(track => track.stop());
        setRecording(false);
    };

    return (
        <div className="container mt-5">
            <Row className="justify-content-center">
                <Col md={9}>
                    <Card className="p-4 shadow justify-content-center">
                        <video ref={videoRef} autoPlay playsInline width="600"
                            style={{ "alignSelf": "center" }} />
                        <div className="mt-3 text-center">
                            {!recording ? (
                                <button onClick={startRecording}>Start KYC</button>
                            ) : (
                                <button onClick={stopRecording}>Stop</button>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div >
    );
};

export default VideoRecorder;
