// src/api/endpoints.js

export const ENDPOINTS = {
  BASEURL: "http://10.10.7.85:8001",
  BrandRegister: "/brand/api/v1/brand/create/",
  BrandLogin:"/brand/api/v1/brand/login/",
  forgetPassword:"/user/api/v1/send-reset-otp/",
  verifyOtp:"/user/api/v1/verify-reset-otp/",
  newPassword:"/user/api/v1/set-new-password-after-otp/",
  createCampaigns:"/commerce/api/v1/campaigns/",
  allCampaigns:"/commerce/api/v1/campaigns/all/",
//   codeVarify: "/api/verify-otp/",
//   resendCode: "/api/resend-otp/",
//   USERLOGIN: "/api/login/",
//   updateUser: "/api/me/",
//   getUser: "/api/me/", 
//   vendorLogin:"api/login/",
//   vendorPrifile:"/api/complete-vendor-profile/",
//   LOGOUT: "auth/jwt/refresh/", 
};

