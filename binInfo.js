const axios = require("axios");

async function getBinInfo(bin) {
  try {
    const response = await axios.get(`https://bins.antipublic.cc/bins/${bin}`);
    if (!response.data || !response.data.result) {
      return { valid: false };
    }

    const data = response.data.result;
    return {
      valid: true,
      vendor: data.vendor || "N/A",
      type: data.type || "N/A",
      level: data.level || "N/A",
      bank: data.bank || "N/A",
      country: data.country || "N/A",
      countryEmoji: data.countryInfo?.emoji || "🌍"
    };
  } catch (error) {
    console.error("BIN Info Fetch Error:", error.message);
    return { valid: false };
  }
}

module.exports = getBinInfo;