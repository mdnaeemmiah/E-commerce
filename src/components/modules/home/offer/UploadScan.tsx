"use client";

import img1 from "@/app/assets/home/bi_qr-code-scan.png"
import img2 from "@/app/assets/home/mage_camera.png"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { FiX } from "react-icons/fi"
import { toast } from "sonner"
import baseApi from "@/api/baseApi"
import { ENDPOINTS } from "@/api/endPoints";
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

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Token not found, please login again.");
        setIsProcessing(false);
        setIsScanned(false);
        return;
      }

      // Call API to redeem - baseApi already adds Authorization header via interceptor
      const response = await baseApi.get(`${ENDPOINTS.qrScanGenerate}/${qrCodeId}/redeem/`);

      console.log('API Response:', response);

      if (response.status === 200 || response.status === 201) {
        const rewardAmount = response.data?.reward_amount || '0.00';
        const isRedeemed = response.data?.is_redeemed || false;

        setRewardData({
          rewardAmount,
          isAlreadyRedeemed: isRedeemed,
        });
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.data?.message || 'Failed to redeem QR code');
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error('Error redeeming QR code:', error);
      
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("access_token");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
        return;
      }
      
      setErrorMessage(
        error.response?.data?.message || 
        error.response?.data?.detail || 
        error.message || 
        'Error redeeming QR code'
      );
      setShowErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleTorch = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      const capabilities = track.getCapabilities() as any;
      
      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !isTorchOn } as any]
          });
          setIsTorchOn(!isTorchOn);
        } catch (error) {
          toast.error("Could not toggle torch");
        }
      } else {
        toast.error("Torch not available on this device");
      }
    }
  };

  const switchCamera = async () => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: streamRef.current ? "user" : "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.onloadedmetadata = () => {
          startScanning();
        };
      }
    } catch (error) {
      toast.error("Could not switch camera");
      startCamera();
    }
  };

  const handleCloseScanner = () => {
    stopCamera();
    setShowScanner(false);
    setIsScanned(false);
    setIsProcessing(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleCloseScanner();
  };

  const handleErrorRetry = () => {
    setShowErrorModal(false);
    setIsScanned(false);
    setIsProcessing(false);
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
    handleCloseScanner();
  };

  return (
    <div className="mt-20">
      <h2 className='text-2xl text-center font-semibold '>Scan & Receipt</h2>
      <div className='w-[90%] mx-auto lg:container mt-10 mb-10 flex items-center justify-center '>
        <div className="flex flex-col md:flex-row gap-6">
          <div 
            onClick={() => setShowScanner(true)}
            className="border border-gray-100 w-56 p-6 rounded-2xl flex flex-col items-center shadow cursor-pointer hover:shadow-lg transition-shadow"
          >
            <Image
              src={img1}
              alt="qr"
              width={60}
              height={20}
            ></Image>
            <h1 className="text-[18px] font-semibold mt-4">Scan QR</h1>
            <p className="text-[#959595]">Earn rewards instantly</p>
          </div>
          <Link href="/scan" className="border border-gray-100 w-56 p-6 rounded-2xl flex flex-col  items-center shadow">
            <Image
              src={img2}
              alt="qr"
              width={60}
              height={20}
            ></Image>
            <h1 className="text-[18px] font-semibold mt-4">Upload Receipt</h1>
            <p className="text-[#959595]">Get cashback</p>
          </Link>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={handleCloseScanner}
          ></div>

          {/* Modal */}
          <div className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            {/* Close Button */}
            <button
              onClick={handleCloseScanner}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition z-20"
            >
              <FiX size={20} />
            </button>

            {/* Scanner Header */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold mb-2">Scan QR Code</h2>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={toggleTorch}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  title="Toggle Flash"
                >
                  {isTorchOn ? "🔦" : "💡"}
                </button>
                <button
                  onClick={switchCamera}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  title="Switch Camera"
                >
                  🔄
                </button>
              </div>
            </div>

            {/* Scanner Area */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              ></video>
              
              {/* Hidden canvas for QR detection */}
              <canvas ref={canvasRef} className="hidden"></canvas>
              
              {/* Scanning Frame Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-64 h-64">
                  {/* Corner borders */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#3E3EDF] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#3E3EDF] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#3E3EDF] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#3E3EDF] rounded-br-lg"></div>
                  
                  {/* Scanning line animation */}
                  {scanning && !isProcessing && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#3E3EDF] shadow-lg shadow-[#3E3EDF] animate-scan"></div>
                  )}
                </div>
              </div>

              {/* Loading state */}
              {!scanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-white text-center">
                    <svg className="animate-spin h-10 w-10 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm">Starting camera...</p>
                  </div>
                </div>
              )}

              {/* Processing overlay */}
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <div className="text-white text-center">
                    <svg className="animate-spin h-10 w-10 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm">Processing...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Text */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {isProcessing ? 'Processing QR code...' : 'Position QR code within the frame'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && rewardData && (
        <div className="fixed  inset-0 z-50 flex justify-center items-center px-4">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          
          <div className="relative z-10 rounded-2xl p-6 w-full max-w-md shadow-xl bg-gradient-to-br from-[#4B3FF2] to-[#6C5CE7]">
            <div className="flex flex-col items-center">
              {/* Success Icon */}
              <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-6">
                <span className="text-6xl">
                  {rewardData.isAlreadyRedeemed ? "✓" : "🎁"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-4">
                {rewardData.isAlreadyRedeemed ? 'Already Redeemed!' : 'Congratulations!'}
              </h2>

              {/* Reward Amount */}
              <div className="bg-white bg-opacity-20 rounded-xl px-6 py-4 mb-4">
                <p className="text-[#4B3FF2] text-opacity-70 text-lg text-center mb-1">Reward</p>
                <p className="text-4xl font-bold text-[#4B3FF2]">${rewardData.rewardAmount}</p>
              </div>

              {/* Message */}
              <p className="text-white text-opacity-80 text-center mb-6">
                {rewardData.isAlreadyRedeemed 
                  ? 'Buy the product in-store'
                  : `
    Buy the product in-store,
    Upload your receipt and pick this campaign when approving
 `}
              </p>

              {/* Done Button */}
              <button
                onClick={handleSuccessClose}
                className="w-full bg-white cursor-pointer text-[#4B3FF2] font-bold py-3 rounded-xl hover:bg-opacity-90 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          
          <div className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center">
              {/* Error Icon */}
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <span className="text-5xl text-red-500">⚠️</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>

              {/* Error Message */}
              <p className="text-gray-600 text-center mb-6">{errorMessage}</p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleErrorClose}
                  className="flex-1 border-2 border-[#4B3FF2] text-[#4B3FF2] font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleErrorRetry}
                  className="flex-1 bg-[#4B3FF2] text-white font-semibold py-3 rounded-xl hover:bg-[#3E2FD1] transition"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
