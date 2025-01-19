// 1: Order Sent, 2: Order Completed, 3: Order Cancelled, 4: In Production, 5: In Delivery
export function getStatus(type) {
  switch (type) {
    case 1:
      return "Order Sent";
    case 2:
      return "Order Completed";
    case 3:
      return "Order Cancelled";
    case 4:
      return "In Production";
    case 5:
      return "In Delivery";
    default:
      return "Unknown Status";
  }
}

export function generateRandomString(call) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < call; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
