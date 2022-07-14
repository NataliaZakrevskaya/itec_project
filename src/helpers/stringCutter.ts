
export const stringCutter = (string: string) => {
  string = string.trim();
  if( string.length <= 70) return string;
  string = string.slice( 0, 70);
  const lastSpace = string.lastIndexOf(" ");
  if( lastSpace > 0) {
    string = string.substr(0, lastSpace);
  }
  return string + "...";
}