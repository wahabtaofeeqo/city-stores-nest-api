export const generateReference = (limit = 18) =>
  Number(`${Date.now().toString().slice(0, limit)}`);

export class Str {

  public static number(length: number = 4) {
      return Math.floor(
        Math.pow(10, length - 1) +
          Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
  }
  
  public random = (length: number) : string  => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
  };
}