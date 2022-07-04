export default function leftpad(
  str: string,
  len: number,
  ch?: string | number
) {
  str = String(str);
  let i = -1;
  if (!ch && ch !== 0) ch = " ";
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
