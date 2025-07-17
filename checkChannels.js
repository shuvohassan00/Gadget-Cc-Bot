async function userJoinedChannels(ctx, channels) {
  const userId = ctx.from.id;
  for (const channel of channels) {
    try {
      const member = await ctx.telegram.getChatMember(channel, userId);
      if (["left", "kicked"].includes(member.status)) {
        return false;
      }
    } catch (err) {
      console.log(`Error checking ${channel}:`, err.message);
      return false;
    }
  }
  return true;
}

module.exports = { userJoinedChannels };