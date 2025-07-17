function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateAddress(code) {
  const country = code.toLowerCase();
  switch (country) {
    case "bd":
      return `🏠 ${Math.floor(Math.random() * 999)} ${random(["North", "East", "West", "South"])} ${random(["Dhaka", "Chittagong", "Sylhet", "Khulna"])}, Bangladesh`;
    case "us":
      return `🏠 ${Math.floor(Math.random() * 9999)} ${random(["Main St", "Broadway", "Park Ave"])}, ${random(["New York", "LA", "Chicago"])}, USA`;
    case "in":
      return `🏠 ${Math.floor(Math.random() * 999)} ${random(["MG Road", "NH8", "Park St"])}, ${random(["Delhi", "Mumbai", "Kolkata", "Bangalore"])}, India`;
    default:
      return "⚠️ Country code not supported. Use: bd, us, in";
  }
}

module.exports = generateAddress;