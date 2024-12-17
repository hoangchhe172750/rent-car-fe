import {api} from './api.js';

export async function bookingService(carId, customerId, startDate, endDate, paymentMethod) {

    try {
        const formData = {startDate, endDate, paymentMethod}
        const token = localStorage.getItem("authToken")
        const result = await api.post(
            `/booking/add?carId=${carId}&customerId=${customerId}`,
            formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("The result from bookingService:", result);
        return result.data; // Adjust to `return result` if more details are needed
    } catch (error) {
        console.error("Booking service failed:", error);
        throw error;
    }
}

export async function updateBooking(bookingId, bookingData){
    try {
        const response = await api.put(
            `/booking/update/${bookingId}`,
            bookingData
        );
        console.log("Two :", response.data.message);
        return response;
    } catch (error) {
        throw error;
    }
};

export async function cancelBooking(bookingId) {
    try {
        const response = await api.put(
            `/booking/${bookingId}/cancel`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function approveBooking(bookingId) {
    try {
        const response = await api.put(
            `/booking/${bookingId}/approve`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function declineBooking(bookingId){
    try {
        const response = await api.put(
            `/booking/${bookingId}/decline`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function completeBooking(bookingId) {
    try {
        const response = await api.put(
            `/booking/${bookingId}/complete`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBookingById = async (bookingId) => {
    try {
        const result = await api.get(
            `/booking/get/${bookingId}`
        );
        return result.data;
    } catch (error) {
        throw error;
    }
};