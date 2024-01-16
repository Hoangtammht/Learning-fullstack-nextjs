export default function formatMoney(amount) {
  const options = {
    style: "currency",
    currency: "USB",
    minimunFractionDigits: 2,
  };
  if (amount % 100 === 0) {
    options.minimunFractionDigits = 0;
  }
  const formatter = Intl.NumberFormat("en-US", options.minimunFractionDigits);
  return formatter.format(amount / 100);
}
