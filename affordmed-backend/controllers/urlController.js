import {saveUrl,getUrl} from "../db/urls.js";
import logEvent from "../../affordmed-logging/logMiddleware.js";
import {nanoid} from "nanoid";

export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortId = nanoid(6);
    await saveUrl(shortId, originalUrl);
    await logEvent("backend", "info", "controller", `Shortened URL: ${originalUrl} -> ${shortId}`);
    res.status(201).json({ shortUrl: `http://localhost:3000/api/${shortId}` });
  } 
  catch (error) {
    await logEvent("backend", "error", "controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const originalUrl = await getUrl(shortId);
    if (originalUrl) {
      await logEvent("backend", "info", "controller", `Redirecting to ${originalUrl}`);
      res.redirect(originalUrl);
    } 
    else {
      await logEvent("backend", "warn", "controller", `No URL found for ID: ${shortId}`);
      res.status(404).json({ error: "URL not found" });
    }
  } 
  catch (error) {
    await logEvent("backend", "fatal", "controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
