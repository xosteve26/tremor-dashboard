// components/QRCodeScanner.js
'use client';
import React, { useState } from "react";
import { QrReader } from 'react-qr-reader';

export default function QrCodeScanner(){
    const [result, setResult] = useState("");
    const [isScannerOn, setIsScannerOn] = useState(true);

    const handleScan = (data) => {
        if (data) {
            setResult(data.text);
            console.log(data)
        }
    };

    const toggleScanner = () => {
        setIsScannerOn((prevScannerState) => !prevScannerState);
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
        {isScannerOn ?
            <QrReader
                delay={300}
                onError={handleError}
                onResult={handleScan}
                style={{ width: "100%" }}
                constraints={{ facingMode: "environment" }} />
                :  (<p>Scanner is turned off. Click the button to turn it back on.</p>)
        }
            {result && <p>QR Code Result: {result}</p>}
            <button onClick={toggleScanner}>
                {isScannerOn ? "Turn Off Scanner" : "Turn On Scanner"}
            </button>
        </div>
    );
}
