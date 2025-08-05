import axios from "axios";
import { config } from "dotenv";

config();

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function logEvent(stack,level,logPackage,message){
    try{
        const payload={
            stack,
            level,
            package: logPackage,
            message,
        };
        const headers={
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        };
        const res=await axios.post(LOG_API_URL,payload,{headers});
        console.log(`[LOG SUCCESS] ${res.data.message} (${res.data.logID})`);
    }
    catch(error){
        console.error("[LOG ERROR]", error.response?.data || error.message);
    }
}

export default logEvent;