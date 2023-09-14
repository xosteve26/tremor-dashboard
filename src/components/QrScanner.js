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
                    {Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjE2R2JOSjFwOWxrbUVEd3ZLRWxUeHliTlpNZyJ9.eyJhdWQiOiI4ODUxZTRiMC0wZGQwLTQ0NzUtODZhMy00NDQ5ZWJiMzU2NzgiLCJleHAiOjE2OTUyODMwMDMsImlhdCI6MTY5NDY3ODIwMywiaXNzIjoiaHR0cDovL2Z1c2lvbkF1dGg6OTAxMSIsInN1YiI6IjY2ZGIzNjVmLTRmOTMtNGEyNi1hNDNhLWJmOThlOTJmNzgwMyIsImp0aSI6IjAzNjk4MjgzLWNmZTUtNGQxZi04NDVmLTM4Y2VhMjVmOTVjYSIsImF1dGhlbnRpY2F0aW9uVHlwZSI6IlBBU1NXT1JEIiwiZW1haWwiOiJzdGV2ZWRvb2Q3NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOiI4ODUxZTRiMC0wZGQwLTQ0NzUtODZhMy00NDQ5ZWJiMzU2NzgiLCJyb2xlcyI6WyJzdXBlcl9hZG1pbiJdLCJhdXRoX3RpbWUiOjE2OTQ2NzgyMDMsInRpZCI6IjMxM2RjZmVkLTcwZjUtNWIxNS1iYzZkLTJkMTU4NDI4NDUzMSJ9.bbk50OOZbGmLuGw693P66bc1G-FAZse_1IUgmHJ1Gse8jvx2YMtxNmFIser-sOAqEMxvL9cAMwRwuahEyVk3qVqW-xFbqwNsbT4iMyH2t4GuLMR01_3_t_HBNYa6812S2dHlu2iGNzqx15L7l9pOyWQ69bh5u3MgflPcFJOuASpqF6HYa6UTTeWHkLSrT7ojCJSz123tFk85nMst8ZozWliuC6DoOPOtiUL2ILIRe6S-UmX0FWdV1FwiKhG_T5YT_FHNQM23sqjEBZOmfQKJG4bb8kEweOloW7XjNJzk1BkO2kJ5iPvswlA1KW_YOVDmh7dvnLzz6VoR5h0ges3gEg"}
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



