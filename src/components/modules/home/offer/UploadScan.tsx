"use client";

import img1 from "@/app/assets/home/bi_qr-code-scan.png"
import img2 from "@/app/assets/home/mage_camera.png"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { FiX } from "react-icons/fi"
import { toast } from "sonner"
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";
import jsQR from "jsqr"

export default function UploadScan() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [rewardData, setRewardData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTorchOn, setIsTorchOn] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start camera when scanner opens
  useEffect(() => {
    if (showScanner) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showScanner]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          setScanning(true);
          startScanning();
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const startScanning = () => {
    if (scanIntervalRef.current) return;

    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && !isScanned && !isProcessing) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code && code.data) {
            onQRDetected(code.data);
          }
        }
      }
    }, 300); // Scan every 300ms
  };

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const stopCamera = () => {
    stopScanning();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const onQRDetected = (qrCodeData: string) => {
    if (isScanned || isProcessing) return;

    setIsScanned(true);
    setIsProcessing(true);
    console.log('Raw QR Code scanned:', qrCodeData);
    
    // Call API to redeem QR code
    redeemQrCode(qrCodeData);
  };

  const redeemQrCode = async (qrCodeData: string) => {
    try {
      // Extract QR code ID from the scanned data
      let qrCodeId = qrCodeData;

      // Check if it's a full URL
      if (qrCodeData.includes('http')) {
        // Extract UUID from URL like: http://10.10.7.114:8001/commerce/api/v1/qr/9a6d8e8e-c476-4689-9649-ea3906555cf4/redeem/
        const urlPattern = /\/qr\/([a-f0-9-]+)/;
        const match = qrCodeData.match(urlPattern);
        if (match && match[1]) {
          qrCodeId = match[1];
        }
      }

      console.log('Extracted QR Code ID:', qrCodeId);

      // API call disabled — static mode
      // Simulate successful redemption
      setRewardData({ reward: "$5.00", campaign: "Summer Cashback" });
      setShowSuccessModal(true);
      stopCamera();

    } catch (err) {
      console.error('QR redeem error:', err);
      setErrorMessage("Failed to process QR code. Please try again.");
      setShowErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    const capabilities = track.getCapabilities?.() as any;
    if (capabilities?.torch) {
      await track.applyConstraints?.({ advanced: [{ torch: !isTorchOn } as any] });
      setIsTorchOn(!isTorchOn);
    }
  };

  return (
    <div>
      {/* Trigger Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowScanner(true)}
          className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl py-5 px-3 hover:shadow-md transition"
        >
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Image src={img1} alt="Scan QR" width={28} height={28} />
          </div>
          <p className="font-semibold text-gray-800 text-sm">Scan QR</p>
          <p className="text-xs text-gray-400 text-center">Earn Rewards Faster</p>
        </button>

        <button className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl py-5 px-3 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Image src={img2} alt="Upload" width={28} height={28} />
          </div>
          <p className="font-semibold text-gray-800 text-sm">Upload Receipt</p>
          <p className="text-xs text-gray-400 text-center">Get Cashback</p>
        </button>
      </div>

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-black">
            <p className="text-white font-semibold">Scan QR Code</p>
            <button onClick={() => { setShowScanner(false); setIsScanned(false); }} className="text-white">
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/40 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#3E3EDF] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#3E3EDF] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#3E3EDF] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#3E3EDF] rounded-br-lg" />
              </div>
            </div>
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm">Processing...</p>
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-4 bg-black flex items-center justify-center">
            <button onClick={toggleTorch} className={`text-white text-xs font-semibold px-4 py-2 rounded-lg border ${isTorchOn ? "border-yellow-400 text-yellow-400" : "border-white"}`}>
              {isTorchOn ? "Torch Off" : "Torch On"}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reward Claimed!</h3>
            <p className="text-sm text-gray-500 mb-4">You have successfully redeemed {rewardData?.reward} from {rewardData?.campaign}.</p>
            <button onClick={() => { setShowSuccessModal(false); setIsScanned(false); setShowScanner(false); }} className="w-full bg-[#3E3EDF] text-white font-semibold py-3 rounded-xl hover:bg-[#3232c0] transition">Done</button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Scan Failed</h3>
            <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
            <button onClick={() => { setShowErrorModal(false); setIsScanned(false); setIsProcessing(false); }} className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition">Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
}
