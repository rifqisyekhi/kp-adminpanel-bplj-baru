import axiosInstance from "../utils/axiosInstance";

export async function getAllRunningText() {
  try {
    const { status, data } = await axiosInstance.get("/running-text");

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}

export async function updateRunningText(id, formData) {
  try {
    const { status, data } = await axiosInstance.put(
      `/running-text/${id}`,
      formData
    );

    if (status === 200) {
      return { success: true, status, data };
    } else {
      return { success: false, status, message: status };
    }
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
}
