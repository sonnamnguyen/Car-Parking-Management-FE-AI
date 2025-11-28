export interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}

export interface PaymentOrder {
  id: number;
  order_code: string;
  amount: string;
  amount_paid: string;
  description: string;
  account_number: string;
  account_name: string;
  status: string;
  created_at: string;
  paid_at: string;
  items: PaymentItem[];
  bank_logo?: string;
  short_name?: string;
  code?: string;
}

export interface PaymentResponse {
  code: string;
  desc: string;
  data: {
    orders: PaymentOrder[];
    totalRows: number;
  };
}

const PAYOS_API_URL = "https://api-app.payos.vn/organizations/f7af052796c111f08d570242ac110002/statistics/payment-link";

export async function fetchPayments(
  page: number = 0,
  pageSize: number = 50
): Promise<PaymentResponse> {
  const url = `${PAYOS_API_URL}?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
