export interface ParkingSlot {
  id: number;
  lot_id: number;
  lot_name: string;
  code: string;
  is_available: boolean;
  slot_type: string;
  floor: string;
  created_at: string;
}

export interface ParkingSlotsResponse {
  list: ParkingSlot[];
  total: number;
}

// API Base URL - sử dụng environment variable hoặc fallback
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_DEV_API_URL ||
  "https://newparkai-production.up.railway.app/backend/parkin/v1";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Test function to check backend connectivity
export const testBackendConnection = async () => {
  try {
    console.log("Testing backend connection...");

    // Test 1: Check if backend is running
    const testUrl = `${API_BASE_URL.replace("/backend/parkin/v1", "")}/health`;
    console.log("Testing health endpoint:", testUrl);

    try {
      const healthResponse = await fetch(testUrl);
      console.log("Health check status:", healthResponse.status);
    } catch (err) {
      console.log("Health endpoint not available:", err);
    }

    // Test 2: Try different possible endpoints
    const possibleEndpoints = [
      "/parking-slots",
      "/slots",
      "/parking",
      "/parkin-slots",
      "/parking-lot",
      "/lots",
    ];

    for (const endpoint of possibleEndpoints) {
      try {
        const testResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "GET",
          headers: getAuthHeaders(),
        });
        console.log(`Endpoint ${endpoint}: ${testResponse.status}`);
        if (testResponse.ok) {
          console.log(`✅ Found working endpoint: ${endpoint}`);
          break;
        }
      } catch (err) {
        console.log(`❌ Endpoint ${endpoint} failed:`, err);
      }
    }
  } catch (error) {
    console.error("Backend connection test failed:", error);
  }
};

export const fetchParkingSlots = async (): Promise<ParkingSlotsResponse> => {
  try {
    const url = `${API_BASE_URL}/parking-slots`;
    console.log("Fetching parking slots from:", url);
    console.log("Auth headers:", getAuthHeaders());

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching parking slots:", error);
    throw error;
  }
};

export const updateParkingSlot = async (
  id: number,
  updateData: Partial<ParkingSlot>
): Promise<ParkingSlot> => {
  try {
    const response = await fetch(`${API_BASE_URL}/parking-slots/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating parking slot:", error);
    throw error;
  }
};

export const createParkingSlot = async (
  slotData: Omit<ParkingSlot, "id" | "created_at">
): Promise<ParkingSlot> => {
  try {
    const response = await fetch(`${API_BASE_URL}/parking-slots`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(slotData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating parking slot:", error);
    throw error;
  }
};

export const deleteParkingSlot = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/parking-slots/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting parking slot:", error);
    throw error;
  }
};
