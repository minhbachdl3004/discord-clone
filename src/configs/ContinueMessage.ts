export const continueMessage = (messages: any, m: any, i: number) => {
  if (i > 0) {
    const prevMessageTime = new Date(messages[i - 1]?.createdAt);
    const currentMessageTime = new Date(m?.createdAt);

    const diffInMilliseconds = Math.abs(
      currentMessageTime.getTime() - prevMessageTime.getTime()
    );
    const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
    return diffInMinutes < 5 &&
      messages[i - 1]?.senderId._id === m?.senderId._id
      ? true
      : false;
  }
  return false;
};
