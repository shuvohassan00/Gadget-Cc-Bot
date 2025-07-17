// bot.js const { Telegraf } = require("telegraf"); const dotenv = require("dotenv"); const generateCC = require("./utils/gen"); const generateAddress = require("./utils/fake"); const getBinInfo = require("./utils/binInfo");

// Load .env dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN); const CHANNELS = process.env.CHANNELS ? process.env.CHANNELS.split(",") : [];

// Channel checker middleware bot.use(async (ctx, next) => { if (ctx.message && CHANNELS.length > 0) { for (let channel of CHANNELS) { try { const member = await ctx.telegram.getChatMember(channel, ctx.from.id); if (["left", "kicked"].includes(member.status)) { return ctx.reply("❌ Please join our channel first to use the bot: " + channel); } } catch (err) { console.error("Channel Check Error:", err.message); return ctx.reply("⚠️ Error checking channel membership."); } } } return next(); });

// /start bot.start((ctx) => { const name = ctx.from.first_name; ctx.reply( `🎉 স্বাগতম ${name}🥾!

🔰 𝗧𝗼 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲 𝗖𝗖: ➡️ /gen 516989

🔰 𝗙𝗼𝗿 𝗙𝗮𝗸𝗲 𝗔𝗱𝗱𝗿𝗲𝘀𝘀: ➡️ /fake bd, /fake us`, { reply_markup: { inline_keyboard: [ [{ text: "🎲 BIN Generate", callback_data: "bin" }], [{ text: "💳 CC Generator", callback_data: "cc" }], [{ text: "🧪 CC Checker", callback_data: "check" }], [{ text: "🏠 Fake Address", callback_data: "fake" }], ], }, } ); });

// Inline button handler bot.on("callback_query", async (ctx) => { const data = ctx.callbackQuery.data;

if (data === "bin") { await ctx.answerCbQuery(); ctx.reply("⚠️ Example: /gen 516989"); } else if (data === "cc") { await ctx.answerCbQuery(); ctx.reply("💳 Use /gen <bin> to generate credit card numbers."); } else if (data === "check") { await ctx.answerCbQuery(); ctx.reply("🧪 CC Checker is under development."); } else if (data === "fake") { await ctx.answerCbQuery(); ctx.reply("🏠 Use /fake <country> (bd, us, in)"); } });

// /gen command bot.command("gen", async (ctx) => { const args = ctx.message.text.split(" "); if (args.length < 2) return ctx.reply("⚠️ Example: /gen 516989");

const bin = args[1]; const ccs = generateCC(bin); const info = await getBinInfo(bin);

ctx.reply(𝗕𝗜𝗡: ${bin} 𝗔𝗺𝗼𝘂𝗻𝘁: ${ccs.length}\n\n${ccs.join("\n")}\n\n${info}); });

// /fake command bot.command("fake", (ctx) => { const args = ctx.message.text.split(" "); if (args.length < 2) return ctx.reply("⚠️ Example: /fake bd");

const address = generateAddress(args[1]); ctx.reply(address); });

bot.launch(); console.log("✅ Gadget CC Bot চালু হয়েছে!");

