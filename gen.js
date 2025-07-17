const axios = require("axios");

function generateCard(bin) {
  const random = (length) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  const cc = bin + random(16 - bin.length);
  const mm = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const yy = String(Math.floor(Math.random() * 5) + 25); // Exp year 2025+
  const cvv = random(3);
  return `${cc}|${mm}|${yy}|${cvv}`;
}

async function generateCC(bin) {
  try {
    // Generate 10 cards
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(generateCard(bin));
    }

    // Fetch BIN info
    const res = await axios.get(`https://lookup.binlist.net/${bin}`);
    const info = res.data;

    const bank = info.bank?.name || "Unknown Bank";
    const country = info.country?.name || "Unknown";
    const emoji = info.country?.emoji || "🌍";
    const brand = info.scheme?.toUpperCase() || "N/A";
    const type = info.type?.toUpperCase() || "N/A";

    // Format response
    const message = `
🔢 𝗕𝗜𝗡: ${bin}
💳 𝗔𝗺𝗼𝘂𝗻𝘁:
\`${cards.join('\`\n\`')}\`

🧾 𝐈𝐧𝐟𝐨: ${type} - (${brand})
🏦 𝐈𝐬𝐬𝐮𝐞𝐫: ${bank}
🌍 𝐂𝐨𝐮𝐧𝐭𝐫𝐲: ${country} ${emoji}
`.trim();

    return message;

  } catch (err) {
    return "❌ Invalid BIN or lookup failed.";
  }
}

module.exports = generateCC;