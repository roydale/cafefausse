import { apiClient } from "@/lib/api-client";

/**
 * Creates a reservation through the API.
 * @param {Object} formData - Data from the reservation form.
 */
export const createReservation = async (formData) => {
  const payload = {
    customer_name: formData.name,
    customer_email: formData.email,
    phone_number: formData.phone,
    newsletter_signup: formData.newsletter_signup || false,
    time_slot: `${formData.date}T${formData.time}`,
    guest_count: formData.guests,
  };
  return apiClient.post("/reservations", payload);
};
