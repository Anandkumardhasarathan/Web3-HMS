const twilio = require("twilio");
require("dotenv").config();

// ✅ Twilio Config
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


// ✅ Send Notification to Doctor
const sendDoctorNotification = async (doctorID, message) => {
  try {
    const doctorPhoneNumber = `+91xxxxxxxxxx`; // Fetch doctor’s phone from DB

    await client.messages.create({
      body: `Doctor Alert: ${message}`,
      from: twilioPhoneNumber,
      to: doctorPhoneNumber,
    });

    console.log("✅ Notification sent to Doctor:", doctorID);
  } catch (error) {
    console.error("❌ Failed to send notification:", error);
  }
};

module.exports = { sendDoctorNotification };
