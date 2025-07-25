import React, { useRef, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { STATUS_APPROVED, STATUS_INITIAL, STATUS_PARTIAL } from './Constant';
import { useAuth } from '../AuthContext';
import BackendApi from './BackendApi';

const VideoRecorder = () => {
    const [recording, setRecording] = useState(STATUS_INITIAL);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const chunks = useRef([]);
    const videoRef = useRef();
    const streamRef = useRef();

    const context = useAuth();

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
        setRecording(STATUS_PARTIAL);
    };

    const stopRecording = async () => {
        mediaRecorder.stop();
        streamRef.current.getTracks().forEach(track => track.stop());
        setRecording(STATUS_APPROVED);


        const {data} = await BackendApi.kycDoneApi(context.mobileNumber);

        console.log(data);

    };

    const kycDone = () => {
        return (
            <Card className="p-4 mt-4 shadow">
                <h2 className="text-success mb-3">🎉 KYC Successfully Completed</h2>
                <p>Thank you for completing your KYC. Our team will now review your details. Please allow 3–5 working days for the next steps.</p>
            </Card>
        );
    }


    const kycInitial = () => {
        return (
            <Row className="justify-content-center">
                <Col md={9}>
                    <Card className="p-4 shadow justify-content-center">
                        <video ref={videoRef} autoPlay playsInline width="600"
                            style={{ "alignSelf": "center" }} />
                        <div className="mt-3 text-center">
                            {recording === STATUS_INITIAL? (
                                <button onClick={startRecording}>Start KYC</button>
                            ) : (
                                <button onClick={stopRecording}>Stop</button>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }

    return (
        <div className="container mt-1">
            
            { recording === STATUS_APPROVED ? kycDone():kycInitial()}
            

        </div >
    );
};

export default VideoRecorder;
