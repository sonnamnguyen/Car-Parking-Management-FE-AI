// Dashboard API functions for revenue, trends, and status data

export interface RevenueData {
  total_revenue: number;
}

export interface TrendOrder {
  date: string;
  count: number;
}

export interface TrendsData {
  orders: TrendOrder[];
  total: number;
}

export interface StatusItem {
  status: string;
  count: number;
}

export interface StatusData {
  statuses: StatusItem[];
  total: number;
}

const BASE_URL = "https://newparkai-production.up.railway.app/backend/parkin/v1/admin/parking-orders";

// Retry utility function
const retryWithDelay = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  apiName: string = "API"
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 ${apiName} - Attempt ${attempt}/${maxRetries}`);
      const result = await fn();
      console.log(`✅ ${apiName} - Success on attempt ${attempt}`);
      return result;
    } catch (error: any) {
      console.error(
        `❌ ${apiName} - Failed attempt ${attempt}:`,
        error.message
      );

      if (attempt === maxRetries) {
        console.error(`💥 ${apiName} - All ${maxRetries} attempts failed`);
        throw new Error(
          `${apiName} failed after ${maxRetries} attempts: ${error.message}`
        );
      }

      // Exponential backoff: 1s, 2s, 4s...
      const currentDelay = delay * Math.pow(2, attempt - 1);
      console.log(`⏳ ${apiName} - Retrying in ${currentDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
    }
  }
  throw new Error(`${apiName} - Unexpected error in retry logic`);
};

// Get user token from localStorage
const getAuthToken = (): string | null => {
  // Try to get token directly first (preferred method)
  const directToken = localStorage.getItem("token");
  if (directToken) {
    return directToken;
  }

  // Fallback to old method for backward compatibility
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.access_token || null;
    } catch {
      return null;
    }
  }
  return null;
};

// Fetch revenue data
export const fetchRevenue = async (
  period: string = "1w",
  startTime: string,
  endTime: string
): Promise<RevenueData> => {
  return retryWithDelay(
    async () => {
      const token = getAuthToken();
      console.log(
        "🔍 Fetching revenue with token:",
        token ? "✅ Available" : "❌ Missing"
      );

      const url = `${BASE_URL}/revenue?period=${period}&start_time=${startTime}&end_time=${endTime}`;
      console.log("📡 Revenue API URL:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📊 Revenue response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Revenue API error:", response.status, errorText);
        throw new Error(
          `Revenue API failed: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("✅ Revenue data:", data);
      return data;
    },
    5,
    1000,
    "Revenue API"
  );
};

// Fetch trends data
export const fetchTrends = async (
  period: string = "1w",
  startTime: string,
  endTime: string
): Promise<TrendsData> => {
  return retryWithDelay(
    async () => {
      const token = getAuthToken();
      console.log(
        "🔍 Fetching trends with token:",
        token ? "✅ Available" : "❌ Missing"
      );

      const url = `${BASE_URL}/trends?period=${period}&start_time=${startTime}&end_time=${endTime}`;
      console.log("📡 Trends API URL:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📈 Trends response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Trends API error:", response.status, errorText);
        throw new Error(`Trends API failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Trends data:", data);
      return data;
    },
    5,
    1000,
    "Trends API"
  );
};

// Fetch status data
export const fetchStatus = async (
  period: string = "1w",
  startTime: string,
  endTime: string
): Promise<StatusData> => {
  return retryWithDelay(
    async () => {
      const token = getAuthToken();
      console.log(
        "🔍 Fetching status with token:",
        token ? "✅ Available" : "❌ Missing"
      );

      const url = `${BASE_URL}/status?period=${period}&start_time=${startTime}&end_time=${endTime}`;
      console.log("📡 Status API URL:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📋 Status response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Status API error:", response.status, errorText);
        throw new Error(`Status API failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Status data:", data);
      return data;
    },
    5,
    1000,
    "Status API"
  );
};
