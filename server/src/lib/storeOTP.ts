import { redisClient } from "./redisClient";

interface OTPData {
  email: string;
 
  otp: string;
  timestamp: number;
}

const storeOTP = async (
  email: string,
 
  otp: string
): Promise<void> => {
  const data: OTPData = {
    email,
   
    otp,
    timestamp: Date.now(),
  };

  const key = `otp:${email}`;

  // 300 seconds = 5 minutes
  await redisClient.set(key, data, {
    ex: 300,
  });
};

export default storeOTP;