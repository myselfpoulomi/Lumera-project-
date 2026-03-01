import { redisClient } from "./redisClient";
import { OTPData } from "./storeOTP";

const verifyOTP = async (email: string, enteredOTP: string) => {
  const key = `otp:${email}`;

  const storedData = await redisClient.get<OTPData>(key);

  if (!storedData) {
    throw new Error("OTP expired or not found");
  }

  if (storedData.otp !== enteredOTP) {
    throw new Error("Invalid OTP");
  }

  // Delete after successful verification
  await redisClient.del(key);

  return storedData;
};

export default verifyOTP;