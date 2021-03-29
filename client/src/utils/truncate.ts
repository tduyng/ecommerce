export function truncate(text: string, num: number) {
  if (text.length > num) {
    return text.substr(0, num) + '...';
  }
  return text;
}
