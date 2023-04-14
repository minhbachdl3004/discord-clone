export const dividerForNewMessage = (messages: any, m: any, i: number) => {
  const prevMessageDate = new Date(messages[i - 1]?.createdAt);
  const currentMessageDate = new Date(m?.createdAt);
  const prevMessageDay = prevMessageDate.getDate();
  const currentMessageDay = currentMessageDate.getDate();
  if (i === 0) return true;
  else if (i > 0 && prevMessageDay !== currentMessageDay) return true
  else return false;
};
