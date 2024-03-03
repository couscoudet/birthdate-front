export function getVhUnit() {
  if (CSS.supports("height", "100dvh")) {
    return "dvh";
  } else {
    return "vh";
  }
}
