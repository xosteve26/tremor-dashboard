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
        console.log("DATA: ",data)
        if (data && data.text) {
            setResult(data.text);
            sendQRDataToServer(data.text)
          // Turn off the scanner after a successful scan
        }
    };

    useEffect(() => {
        setIsScannerOn(props.scanStatus)
    },[props.scanStatus])

    const sendQRDataToServer = async (data) => {
        try {
            console.log("QR DATA: ",data)
            const splitData = data.split("|")
            const email = splitData[0]
            const eventId = splitData[1]
            const day = splitData[2]

            const response = await axios.put(`https://alpha.theesports.club/events/ticket/checkin/${eventId}`, {
                email:email,
                day: day
            },{
                headers:
                    {Authorization: "Bearer "}
            })
            if (response.data.statusCode === 200) {
                successAudioRef.current.play();
                console.log(response.data)
                setResult("");
            } else {
                console.log("ERROR")
                errorAudioRef.current.play()
            }
        } catch (error) {
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
                style={{ width: "75%" }}
                constraints={{ facingMode: "environment" }} />
        }
            <audio ref={successAudioRef} src="/sounds/success.wav" autoPlay></audio>
            <audio ref={errorAudioRef} src="/sounds/error.wav" autoPlay></audio>
        </div>
    );
}



