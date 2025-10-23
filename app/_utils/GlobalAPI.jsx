const axios = require("axios");
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${ API_KEY }`,
  },
});
const getCategory = () => {
  return axiosClient.get("/categories?populate=*"); //populated all categories
};
const getDoctorList=()=>{
 return axiosClient.get("/doctors?populate=*");
}
const getDoctorByCategory=(category)=>axiosClient.get('/doctors?filters[categories][Name][$in]='+category+"&populate=*" )
const getDoctorById = (id) => axiosClient.get('/doctors/' + id + '?populate=*');
const bookappointment = (data) => axiosClient.post('/appointments', data);
const sendEmail = (data) => {
  console.log("Sending email with data:", data);
  return axios.post('/api/sendEmail', data);
};

const getUserBookings = (userEmail) => {
  return axiosClient.get(`/appointments?filters[Email][$eq]=${userEmail}&populate=doctor.Image`);
};


// ❌ Cancel (Delete) Appointmentconst deleteBooking = async (bookingId) => {
  const deleteBooking = async (bookingId) => {
    if (!bookingId) throw new Error("Booking ID is required to delete booking");
    console.log("Deleting bookingId:", bookingId);
    try {
      const response = await axiosClient.delete(`/appointments/${bookingId}`);
      console.log("Delete response:", response.data);
      return response;
    } catch (error) {
      console.error("Delete error:", error.response || error.message);
      throw error;
    }
  };
  


export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookappointment,
  sendEmail,
  getUserBookings,
  deleteBooking 
};
