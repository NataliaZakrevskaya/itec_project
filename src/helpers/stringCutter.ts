export const stringCutter = ( string: string, limit: number ) => {
  string = string.trim();
  if ( string.length <= limit ) return string;
  string = string.slice( 0, limit );
  const lastSpace = string.lastIndexOf( ' ' );
  if ( lastSpace > 0 ) {
    string = string.substr( 0, lastSpace );
  }
  // @ts-ignore
  if ( string.split( '' ).slice( -1 ) == ',' || string.split( '' ).slice( -1 ) == '.' ) {
    return `${ string.slice( 0, -1 ) }...`;
  }
  return `${ string }...`;
};
