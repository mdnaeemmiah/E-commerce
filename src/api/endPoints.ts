// src/api/endpoints.js

import { get } from "axios";

export const ENDPOINTS = {
  BASEURL: "http://10.10.7.85:8001",
  BrandRegister: "/brand/api/v1/brand/create/",
  BrandLogin: "/brand/api/v1/brand/login/",
  forgetPassword: "/user/api/v1/send-reset-otp/",
  verifyOtp: "/user/api/v1/verify-reset-otp/",
  newPassword: "/user/api/v1/set-new-password-after-otp/",
  createCampaigns: "/commerce/api/v1/campaigns/",
  allCampaigns: "/commerce/api/v1/campaigns/all/",
  brandDashboardHome: "/commerce/api/v1/brand/dashboard/",
  generateCampaignQr: "/commerce/api/v1/qr/generate/",
  getAllCampaign: "/commerce/api/v1/campaigns/all/",

  shopperRegister: "/user/api/v1/register/",
  shopperLogin: "/user/api/v1/user/login/",
  updateShopperProfile: "/user/api/v1/shopper/profile/update/",
  getShopperProfile: `/user/api/v1/user/`,

  createProduct: "/brand_product/api/v1/product/create/",
  productList:"/brand_product/api/v1/product/all/",
  createCategory: "/product_category/api/v1/product/create/",
  categoryList: "/commerce/api/v1/categories/list/",

  receiptUpload: "/commerce/api/v1/receipts/upload/",
  receiptHistory: "/commerce/api/v1/receipts/",
  walletPayment: "/payments/api/v1/wallet/",
  getRewards: "/payments/api/v1/rewards/",
  getTransactionHistory: "/payments/api/v1/wallet/withdrawals/",

  searchField: "/commerce/api/v1/category/",
  qrScanGenerate: "/commerce/api/v1/qr",
  receiveRedeem: "/commerce/api/v1/qr/redeem/",

  receiptUploadAi: "/api/receipt/upload/",
  startReview: "/api/review/start/",
};
