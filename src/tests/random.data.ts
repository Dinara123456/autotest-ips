function getRandomString(length: number): string {
    let result = '';
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characterSet.length;
    let counter = 0;
    while (counter < length) {
      result += characterSet.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function getTimeStamp(): number {
  let timestamp = new Date().getTime();
  return(timestamp)
}

export {
  getRandomString,
  getTimeStamp
} 