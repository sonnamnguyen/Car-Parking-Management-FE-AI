import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  fetchRevenue,
  fetchTrends,
  fetchStatus,
  RevenueData,
  TrendsData,
  StatusData,
} from "../api/dashboard";
import "../css/dashboard.css";

// Mock payment data for revenue calculation
interface Payment {
  id: number;
  money: string;
  bank_name: string;
  bank_number: string;
  description: string;
  day: string;
}

const mockPayments: Payment[] = [
  // Nguyễn Hoàng Trung Nguyên - 51D36349
  {
    id: 1,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2411 1900 2000 51D36349",
    day: "2025-11-24T17:37:00.000Z",
  },
  {
    id: 2,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2611 0800 0900 51D36349",
    day: "2025-11-25T15:39:00.000Z",
  },
  {
    id: 3,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 0212 0800 0900 51D36349",
    day: "2025-11-27T20:41:00.000Z",
  },
  {
    id: 4,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 0312 0800 0900 51D36349",
    day: "2025-11-27T20:42:00.000Z",
  },
  {
    id: 5,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 0412 0800 0900 51D36349",
    day: "2025-11-26T20:42:70.000Z",
  },
  
  // Nguyễn Phi Hùng - 61A93625
  {
    id: 6,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2411 1900 2000 61A93625",
    day: "2025-11-24T17:07:00.000Z",
  },
  {
    id: 7,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2711 0730 0830 61A93625",
    day: "2025-11-26T22:28:00.000Z",
  },
  {
    id: 8,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2711 1800 2000 61A93625",
    day: "2025-11-26T22:28:01.000Z",
  },
  {
    id: 9,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2811 1200 1300 61A93625",
    day: "2025-11-26T22:43:00.000Z",
  },
  {
    id: 10,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2911 1200 1300 61A93625",
    day: "2025-11-26T23:25:00.000Z",
  },
  
  // Kiều Duy Minh Khôi - 51K65832
  {
    id: 11,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 2511 1200 1400 51K65832",
    day: "2025-11-25T14:25:00.000Z",
  },
  {
    id: 12,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 0312 1200 1400 51K65832",
    day: "2025-11-27T14:12:00.000Z",
  },
  {
    id: 13,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 3011 1200 1400 51K65832",
    day: "2025-11-28T23:05:00.000Z",
  },
  {
    id: 14,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 0112 1200 1400 51K65832",
    day: "2025-11-28T23:06:00.000Z",
  },
  {
    id: 15,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 0212 1200 1400 51K65832",
    day: "2025-11-28T23:07:00.000Z",
  },
  
  // Đỗ Hùng Cường - 50H93877
  {
    id: 16,
    money: "45000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2411 1800 2000 50H93877",
    day: "2025-11-24T16:59:00.000Z",
  },
  {
    id: 17,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2611 1200 1300 50H93877",
    day: "2025-11-25T17:42:00.000Z",
  },
  {
    id: 18,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2611 0800 0900 50H93877",
    day: "2025-11-25T17:43:00.000Z",
  },
  {
    id: 19,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2911 0800 0900 50H93877",
    day: "2025-11-26T22:45:00.000Z",
  },
  {
    id: 20,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 3011 0800 1100 50H93877",
    day: "2025-11-26T22:46:00.000Z",
  },
  
  // Lê Hoàng Chung - 76A22158
  {
    id: 21,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0312 1500 1600 76A22158",
    day: "2025-11-27T16:45:00.000Z",
  },
  {
    id: 22,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0312 1900 2100 76A22158",
    day: "2025-11-27T16:47:00.000Z",
  },
  {
    id: 23,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0412 1500 1600 76A22158",
    day: "2025-11-27T16:49:00.000Z",
  },
  {
    id: 24,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0412 1900 2100 76A22158",
    day: "2025-11-27T16:51:00.000Z",
  },
  {
    id: 25,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0512 1500 1600 76A22158",
    day: "2025-11-27T16:53:00.000Z",
  },

  // Nguyễn Văn Hiếu - 59Z10110
  {
    id: 26,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "9336476161",
    description: "GXG HT 0112 0930 1030 5921010",
    day: "2025-11-30T13:23:00.000Z",
  },
  {
    id: 27,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "9336476161",
    description: "GXG HT 0212 0930 1030 5921010",
    day: "2025-11-30T13:24:00.000Z",
  },
  {
    id: 28,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "9336476161",
    description: "GXG HT 0312 0930 1030 5921010",
    day: "2025-11-30T13:25:00.000Z",
  },
  {
    id: 29,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "9336476161",
    description: "GXG HT 0412 0930 1030 5921010",
    day: "2025-11-30T13:25:00.001Z",
  },
  {
    id: 30,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "9336476161",
    description: "OXG HT 0512 0930 1030 5921010",
    day: "2025-11-30T13:26:00.000Z",
  },

  // Nguyễn Trung Chính - 51M16564
  {
    id: 31,
    money: "45000",
    bank_name: "MOMO",
    bank_number: "108727017318",
    description: "GXG HT 2911 1500 1700 51M16564",
    day: "2025-11-26T15:06:00.000Z",
  },
  {
    id: 32,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "108727152199",
    description: "GXG HT 3011 1600 1700 51M16564",
    day: "2025-11-26T22:30:00.000Z",
  },
  {
    id: 33,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "108727211043",
    description: "GXG HT 0112 1100 1200 51M16564",
    day: "2025-11-26T22:30:00.000Z",
  },
  {
    id: 34,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "108727157430",
    description: "GXG HT 0212 1600 1700 51M16564",
    day: "2025-11-26T22:31:00.000Z",
  },
  {
    id: 35,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "108727164125",
    description: "GXG HT 0211 1600 1700 51M16564",
    day: "2025-11-26T22:31:00.000Z",
  },

  // Nguyễn Nhật Khánh - 51G46060
  {
    id: 36,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0853115410",
    description: "GXG HT 2711 1100 1200 51G46060",
    day: "2025-11-26T14:44:00.000Z",
  },
  {
    id: 37,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0853115410",
    description: "GXG HT 2811 1100 1200 51G46060",
    day: "2025-11-26T14:45:00.000Z",
  },
  {
    id: 38,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0853115410",
    description: "GXG HT 2911 1100 1200 51G46060",
    day: "2025-11-27T17:30:00.000Z",
  },
  {
    id: 39,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0853115410",
    description: "GXG HT 2911 1600 1700 51G46060",
    day: "2025-11-27T17:31:00.000Z",
  },
  {
    id: 40,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0853115410",
    description: "GXG HT 3011 1100 1200 51G46060",
    day: "2025-11-27T17:31:00.000Z",
  },

  // Lưu Minh Quân - 61C62318
  {
    id: 41,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0783665033",
    description: "GXG HT 2611 1600 1700 61C62318",
    day: "2025-11-26T14:46:00.000Z",
  },
  {
    id: 42,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0783665033",
    description: "GXG HT 0312 1600 1700 61C62318",
    day: "2025-11-29T23:21:00.000Z",
  },
  {
    id: 43,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0783665033",
    description: "GXG HT 3011 0800 0900 61C62318",
    day: "2025-11-29T23:23:00.000Z",
  },
  {
    id: 44,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0783665033",
    description: "GXG HT 0212 1600 1700 61C62318",
    day: "2025-11-29T23:25:00.000Z",
  },
  {
    id: 45,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0783665033",
    description: "GXG HT 0112 1600 1700 61C62318",
    day: "2025-11-29T23:24:00.000Z",
  },

  // Đầu Trần Hà Vy - 51G15382
  {
    id: 46,
    money: "45000",
    bank_name: "Sacombank",
    bank_number: "060264581713",
    description: "GXG HT 2711 0900 1100 51G15382",
    day: "2025-11-26T23:11:51.000Z",
  },
  {
    id: 47,
    money: "45000",
    bank_name: "Sacombank",
    bank_number: "060264581713",
    description: "GXG HT 2711 0900 1100 51G15382",
    day: "2025-11-26T23:12:40.000Z",
  },
  {
    id: 48,
    money: "45000",
    bank_name: "Sacombank",
    bank_number: "060264581713",
    description: "GXG HT 2711 0900 1100 51G15382",
    day: "2025-11-26T23:14:28.000Z",
  },
  {
    id: 49,
    money: "70000",
    bank_name: "Sacombank",
    bank_number: "060264581713",
    description: "GXG HT 0112 0900 1200 51G15382",
    day: "2025-11-26T23:05:14.000Z",
  },
  {
    id: 50,
    money: "45000",
    bank_name: "Sacombank",
    bank_number: "060264581713",
    description: "GXG HT 0412 0900 1100 51G15382",
    day: "2025-11-26T23:06:34.000Z",
  },

  // Nguyễn Thị Minh - 51H48627
  {
    id: 51,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2384800509",
    description: "GXG PD 0512 1200 1300 51H48627",
    day: "2025-12-04T12:00:00.000Z",
  },
  {
    id: 52,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2384800509",
    description: "GXG PD 0612 1200 1300 51H48627",
    day: "2025-12-04T12:01:00.000Z",
  },
  {
    id: 53,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2384800509",
    description: "GXG PD 0712 1200 1300 51H48627",
    day: "2025-12-04T12:02:00.000Z",
  },
  {
    id: 54,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2384800509",
    description: "GXG PD 0812 1200 1300 51H48627",
    day: "2025-12-04T12:04:00.000Z",
  },
  {
    id: 55,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2384800509",
    description: "GXG PD 0912 1200 1300 51H48627",
    day: "2025-12-04T12:04:01.000Z",
  },

    // Lê Thị Cúc - 51L53351
    {
      id: 56,
      money: "70000",
      bank_name: "Vietinbank",
      bank_number: "0975624131",
      description: "GXG HT 2811 0900 1200 51L53351",
      day: "2025-11-26T14:57:00.000Z",
    },
    {
      id: 57,
      money: "70000",
      bank_name: "Vietinbank",
      bank_number: "0975624131",
      description: "GXG HT 0312 1600 1900 51L53351",
      day: "2025-12-01T14:19:00.000Z",
    },
    {
      id: 58,
      money: "70000",
      bank_name: "Vietinbank",
      bank_number: "0975624131",
      description: "GXG HT 0512 1600 1900 51L53351",
      day: "2025-12-01T14:20:00.000Z",
    },
    {
      id: 59,
      money: "70000",
      bank_name: "Vietinbank",
      bank_number: "0975624131",
      description: "GXG HT 0412 1600 1900 51L53351",
      day: "2025-12-01T14:20:01.000Z",
    },
    {
      id: 60,
      money: "70000",
      bank_name: "Vietinbank",
      bank_number: "0975624131",
      description: "GXG HT 0712 1600 1900 51L53351",
      day: "2025-12-01T14:14:00.000Z",
    },

    // Nguyễn Khác Huy - 51H95044
    {
      id: 61,
      money: "20000",
      bank_name: "Vietcombank",
      bank_number: "0161001766614",
      description: "GXG-PD-0512-1500-1600-51H95044",
      day: "2025-12-03T13:35:00.000Z",
    },
    {
      id: 62,
      money: "20000",
      bank_name: "Vietcombank",
      bank_number: "0161001766614",
      description: "GXG-PD-0612-1500-1600-51H95044",
      day: "2025-12-03T13:36:00.000Z",
    },
    {
      id: 63,
      money: "20000",
      bank_name: "Vietcombank",
      bank_number: "0161001766614",
      description: "GXG-PD-0812-0800-09 00-51H95044",
      day: "2025-12-03T13:37:00.000Z",
    },
    {
      id: 64,
      money: "20000",
      bank_name: "Vietcombank",
      bank_number: "0161001766614",
      description: "GXG-PD-0912-0800-0900-51H95044",
      day: "2025-12-04T17:10:00.000Z",
    },
    {
      id: 65,
      money: "20000",
      bank_name: "Vietcombank",
      bank_number: "0161001766614",
      description: "GXG-PD-1012-0800-0900-51H95044",
      day: "2025-12-04T17:11:00.000Z",
    },

    // Hoàng Bảo Ngọc - 30H97607
    {
      id: 66,
      money: "20000",
      bank_name: "MOMO",
      bank_number: "109118990523",
      description: "GXG-PD-0312-1300-1400-30H97607",
      day: "2025-11-30T14:39:00.000Z",
    },
    {
      id: 67,
      money: "45000",
    bank_name: "MOMO",
    bank_number: "109118854025",
    description: "GXG-PD-0512-0800-1000-30H97607",
    day: "2025-11-30T14:40:00.000Z",
  },
  {
    id: 68,
    money: "45000",
    bank_name: "MOMO",
    bank_number: "109218228205",
    description: "GXG-PD-0112-1600-1800-30H97607",
    day: "2025-11-30T14:34:00.000Z",
  },
  {
    id: 69,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "109118854025",
    description: "GXG-PD-1012-1600-1700-30H97607",
    day: "2025-12-02T15:49:00.000Z",
  },
  {
    id: 70,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "040099663172",
    description: "GXG-PD-0912-1600-1700-30H97607",
    day: "2025-12-02T15:48:00.000Z",
  },

  // Nguyễn Võ Công Phương - 51A66787
  {
    id: 71,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "0161001758075",
    description: "GXG-PD-0712-1900-2000-51A66787",
    day: "2025-12-04T15:32:00.000Z",
  },
  {
    id: 72,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "0161001758075",
    description: "GXG-PD-0812-0800-0900-51A66787",
    day: "2025-12-04T15:31:00.000Z",
  },
  {
    id: 73,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "0161001758075",
    description: "GXG-PD-0612-0800-0900-51A66787",
    day: "2025-12-04T15:30:00.000Z",
  },
  {
    id: 74,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "0161001758075",
    description: "GXG-PD-0912-0800-0900-51A66787",
    day: "2025-12-04T15:52:00.000Z",
  },
  {
    id: 75,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "0161001758075",
    description: "GXG-PD-1012-0800-0900-51A66787",
    day: "2025-12-04T15:53:00.000Z",
  },

  // Nguyễn Ngọc Hiếu - 50H12044
  {
    id: 76,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0772771261",
    description: "GXG PD 1112 0800 0900 50H12044",
    day: "2025-12-04T18:30:17.000Z",
  },
  {
    id: 77,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0772771261",
    description: "GXG PD 1012 0800 0900 50H12044",
    day: "2025-12-04T18:30:00.000Z",
  },
  {
    id: 78,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0772771261",
    description: "GXG PD 0812 0800 0900 50H12044",
    day: "2025-12-04T18:29:38.000Z",
  },
  {
    id: 79,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0772771261",
    description: "GXG PD 0712 0800 0900 50H12044",
    day: "2025-12-04T18:29:12.000Z",
  },
  {
    id: 80,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0772771261",
    description: "GXG PD 0612 0800 0900 50H12044",
    day: "2025-12-04T18:27:46.000Z",
  },
  // Phan Thanh Hồng - 51H73892
  {
    id: 81,
    money: "20000",
    bank_name: "BIDV",
    bank_number: "0772771261",
    description: "GXG HT 2512 0800 0900 51H73892",
    day: "2025-12-04T22:51:06.000Z",
  },
  {
    id: 82,
    money: "20000",
    bank_name: "BIDV",
    bank_number: "0772771261",
    description: "GXG HT 2612 0800 0900 51H73892",
    day: "2025-12-04T22:51:50.000Z",
  },
  {
    id: 83,
    money: "20000",
    bank_name: "BIDV",
    bank_number: "0772771261",
    description: "GXG HT 2612 0800 0900 51H73892",
    day: "2025-12-04T22:51:50.000Z",
  },
  {
    id: 84,
    money: "20000",
    bank_name: "BIDV",
    bank_number: "0772771261",
    description: "GXG HT 2812 0800 0900 51H73892",
    day: "2025-12-04T22:53:23.000Z",
  },
  {
    id: 85,
    money: "20000",
    bank_name: "BIDV",
    bank_number: "0772771261",
    description: "GXG HT 2912 0800 0900 51H73892",
    day: "2025-12-04T22:54:08.000Z",
  },

  // Ngô Nhật Phương Tâm - 51H73892
  {
    id: 86,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0176909612237",
    description: "GXG HT 0512 0800 0900 51H73892",
    day: "2025-12-04T21:04:42.000Z",
  },
  {
    id: 87,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0176909612237",
    description: "GXG HT 2112 2035 2155 51H73892",
    day: "2025-12-05T22:59:40.000Z",
  },
  {
    id: 88,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0176909612237",
    description: "GXG HT 2012 2005 2130 51H73892",
    day: "2025-12-05T22:58:56.000Z",
  },
  {
    id: 89,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0176909612237",
    description: "GXG HT 1912 1910 2020 51H73892",
    day: "2025-12-05T22:58:56.000Z",
  },
  {
    id: 90,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "0176909612237",
    description: "GXG HT 2212 2120 2335 51H73892",
    day: "2025-12-05T22:58:15.000Z",
  },

  // Trần Đình Tú - 51A13478
  {
    id: 91,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2007200623",
    description: "GXG HT 0812 0800 0900 51A13478",
    day: "2025-12-02T19:57:00.000Z",
  },
  {
    id: 92,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2007200623",
    description: "GXG HT 1012 0800 0900 51A13478",
    day: "2025-12-02T19:56:00.000Z",
  },
  {
    id: 93,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2007200623",
    description: "GXG HT 1712 0800 0900 51A13478",
    day: "2025-12-02T19:55:00.000Z",
  },
  {
    id: 94,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2007200623",
    description: "GXG HT 0612 0800 0900 51A13478",
    day: "2025-12-02T19:54:00.000Z",
  },
  {
    id: 95,
    money: "20000",
    bank_name: "Techcombank",
    bank_number: "2007200623",
    description: "GXG HT 1212 0800 0900 51A13478",
    day: "2025-12-02T19:53:00.000Z",
  },

  // Đặng Sỹ Mạnh - 51A13681
  {
    id: 96,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "0792428730",
    description: "GXG PD 0712 0800 0900 51A13681",
    day: "2025-12-05T22:37:00.000Z",
  },
  {
    id: 97,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "0792428730",
    description: "GXG PD 0812 0800 0900 51A13681",
    day: "2025-12-05T22:38:00.000Z",
  },
  {
    id: 98,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "0792428730",
    description: "GXG PD 0612 0800 0900 51A13681",
    day: "2025-12-05T22:23:00.000Z",
  },
  {
    id: 99,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "0792428730",
    description: "GXG PD 1012 0800 0900 51A13681",
    day: "2025-12-05T22:38:00.000Z",
  },
  {
    id: 100,
    money: "20000",
    bank_name: "MOMO",
    bank_number: "0792428730",
    description: "GXG PD 1212 0800 0900 51A13681",
    day: "2025-12-05T22:39:00.000Z",
  },

  
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Get default date range for the past month
  const getDefaultDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 1); // 1 month ago

    const formatDateInput = (date: Date) => {
      return date.toISOString().slice(0, 10); // YYYY-MM-DD format for input[type="date"]
    };

    return {
      startDate: formatDateInput(start),
      endDate: formatDateInput(end),
    };
  };

  const formatDateForAPI = (dateString: string, isEndDate: boolean = false) => {
    return isEndDate ? dateString + " 23:59:59" : dateString + " 00:00:00";
  };

  // Initialize default dates
  useEffect(() => {
    const { startDate: defaultStart, endDate: defaultEnd } =
      getDefaultDateRange();
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadDashboardData = async () => {
      try {
        if (isCancelled) return;
        setLoading(true);

        if (!startDate || !endDate) return;

        const startTime = formatDateForAPI(startDate, false);
        const endTime = formatDateForAPI(endDate, true);

        const [revenue, trends, status] = await Promise.all([
          fetchRevenue("1m", startTime, endTime),
          fetchTrends("1m", startTime, endTime),
          fetchStatus("1m", startTime, endTime),
        ]);

        if (!isCancelled) {
          setRevenueData(revenue);
          setTrendsData(trends);
          setStatusData(status);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || "Failed to load dashboard data");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isCancelled = true;
    };
  }, [startDate, endDate]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading-wrapper">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">Loading dashboard data...</div>
        </div>

        {/* Skeleton Loading */}
        <div className="dashboard-skeleton">
          <div className="skeleton-header">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-subtitle"></div>
          </div>

          <div className="skeleton-date-picker">
            <div className="skeleton-date-group">
              <div className="skeleton-line skeleton-label"></div>
              <div className="skeleton-line skeleton-input"></div>
            </div>
            <div className="skeleton-date-group">
              <div className="skeleton-line skeleton-label"></div>
              <div className="skeleton-line skeleton-input"></div>
            </div>
          </div>

          <div className="skeleton-stats">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="skeleton-stat-card">
                <div className="skeleton-line skeleton-stat-title"></div>
                <div className="skeleton-line skeleton-stat-value"></div>
              </div>
            ))}
          </div>

          <div className="skeleton-charts">
            <div className="skeleton-chart">
              <div className="skeleton-line skeleton-chart-title"></div>
              <div className="skeleton-chart-body"></div>
            </div>
            <div className="skeleton-chart">
              <div className="skeleton-line skeleton-chart-title"></div>
              <div className="skeleton-chart-body"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container dashboard-fade-in">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      {/* Date Range Picker */}
      <div className="dashboard-date-picker">
        <div className="date-picker-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-picker-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-picker-info">
          <span>
            Showing data from {startDate} to {endDate}
          </span>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="dashboard-cards">
        <div className="dashboard-card revenue-card">
          <div className="card-header">
            <h3>Total Revenue</h3>
            <span className="card-period">Custom Period</span>
          </div>
          <div className="card-value">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(mockPayments.reduce((sum, p) => sum + Number.parseFloat(p.money), 0))}
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="dashboard-card orders-card">
          <div className="card-header">
            <h3>Total Orders</h3>
            <span className="card-period">Custom Period</span>
          </div>
          <div className="card-value">{mockPayments.length}</div>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="dashboard-chart-section">
        <h3>Order Trends</h3>
        <div className="chart-container">
          <Line
            data={{
              labels:
                trendsData?.orders?.map((order) => {
                  const date = new Date(order.date);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }) || [],
              datasets: [
                {
                  label: "Orders",
                  data: trendsData?.orders?.map((order) => order.count) || [],
                  borderColor: "#00dcb5",
                  backgroundColor: "rgba(0, 220, 181, 0.1)",
                  tension: 0.3,
                  fill: true,
                  pointBackgroundColor: "#00dcb5",
                  pointBorderColor: "#00606a",
                  pointBorderWidth: 2,
                  pointRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(0, 96, 106, 0.1)",
                  },
                  ticks: {
                    color: "#00606a",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#00606a",
                  },
                },
              },
            }}
            height={200}
          />
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="dashboard-status-section">
        <h3>Order Status Breakdown</h3>
        <div className="status-grid">
          {statusData?.statuses?.map((status, index) => (
            <div key={index} className="status-item">
              <div className="status-label">{status.status}</div>
              <div className="status-count">{status.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
