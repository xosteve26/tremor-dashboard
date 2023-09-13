// components/QRCodeScanner.js
'use client';
import React, { useState, useRef, useEffect } from "react";
import { QrReader } from 'react-qr-reader';
import axios from "axios";

export default function QrCodeScanner(props){
    const [result, setResult] = useState("");
    const [isScannerOn, setIsScannerOn] = useState(true);
    const successAudioRef = useRef(null);
    const errorAudioRef = useRef(null);
    const handleScan = (data) => {
        if (data) {
            setResult(data.text);
            sendQRDataToServer(data); // Send the scanned data to the server
          // Turn off the scanner after a successful scan
        }
    };

    useEffect(() => {
        setIsScannerOn(props.scanStatus)
    },[props.scanStatus])

    const sendQRDataToServer = async (data) => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            if (response.status === 200) {
                // Successful response
                // Play the success sound
                successAudioRef.current.play();
                console.log(response.data)

                // Reset component state for the next scan
                setResult("");
            } else {
                console.log("ERROR")
                // Handle unsuccessful response if needed
                errorAudioRef.current.play()
            }
        } catch (error) {
            // Handle Axios request error
            console.error("Axios error:", error);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="qr-code-scanner-container">
        {isScannerOn &&
            <QrReader
                delay={300}
                onError={handleError}
                onResult={handleScan}
                style={{ width: "50%" }}
                constraints={{ facingMode: "environment" }} />
        }
            <audio ref={successAudioRef} src="/sounds/success.wav" autoPlay></audio>
            <audio ref={errorAudioRef} src="/sounds/error.wav" autoPlay></audio>
        </div>
    );
}



