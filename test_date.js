const today = new Date();
today.setHours(0,0,0,0);
const expiryDate = new Date("2024-05-15");
console.log(expiryDate < today);
