import React, { useState, useEffect } from "react";
import "../css/admin.css";

interface Payment {
  id: number;
  money: string;
  bank_name: string;
  bank_number: string;
  description: string;
  day: string;
}

// Mock payment data - 25 accounts (5 people x 5 transactions each)
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

const AdminPayment: React.FC = () => {
  const [orders, setOrders] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Payment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;
  const totalItems = mockPayments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const loadPaymentData = React.useCallback(async () => {
    setLoading(true);
    // Simulate 1-2s loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Sort all payments by day (newest first)
    const sortedPayments = [...mockPayments].sort((a, b) => 
      new Date(b.day).getTime() - new Date(a.day).getTime()
    );

    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    let filteredOrders = sortedPayments.slice(startIdx, endIdx);

    // Apply search filter
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.bank_number.includes(searchTerm) ||
          order.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setOrders(filteredOrders);
    setError(null);
    setLoading(false);
  }, [currentPage, searchTerm]);

  useEffect(() => {
    loadPaymentData();
  }, [loadPaymentData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number.parseFloat(price));
  };

  const handleViewDetails = (order: Payment) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const loadingSpinner = (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading data...</p>
    </div>
  );

  if (loading && orders.length === 0) {
    return (
      <div className="admin-container">
        <div className="loading-container">{loadingSpinner}</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Transaction Management</h1>
      </div>

      {error && (
        <div className="error-container">
          Error: {error}
          <button onClick={loadPaymentData} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="admin-controls">
        <div className="control-group">
          <label htmlFor="search" className="control-label">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by bank number, bank name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="control-input"
          />
        </div>
      </div>

      <div className="admin-table-container">
        {loading && (
          <div className="table-loading-overlay">
            {loadingSpinner}
          </div>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Số Tiền</th>
              <th>Tên Ngân Hàng</th>
              <th>Số Tài Khoản</th>
              <th>Mô Tả</th>
              <th>Ngày</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>
                  <strong>{formatPrice(order.money)}</strong>
                </td>
                <td>{order.bank_name}</td>
                <td>
                  <strong>{order.bank_number}</strong>
                </td>
                <td>{order.description}</td>
                <td>{formatDate(order.day)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="btn-view"
                      title="View Details"
                    >
                      👁️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && !loading && (
          <div className="no-data">No payments found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage + 1} of {totalPages} ({totalItems} total transaction)
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Payment Details - #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <label className="modal-field-label">Payment Information</label>
                <div className="modal-fields">
                  <div className="modal-field">
                    <span className="field-name">ID:</span>
                    <span className="field-value">#{selectedOrder.id}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Số Tiền:</span>
                    <span className="field-value">{formatPrice(selectedOrder.money)}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Tên Ngân Hàng:</span>
                    <span className="field-value">{selectedOrder.bank_name}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Số Tài Khoản:</span>
                    <span className="field-value">{selectedOrder.bank_number}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Mô Tả:</span>
                    <span className="field-value">{selectedOrder.description}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Ngày:</span>
                    <span className="field-value">{formatDate(selectedOrder.day)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="modal-button modal-button-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayment;
