export default function isEmpty(obj) {
  return typeof obj == Object && Object.keys(obj).length === 0;
}
