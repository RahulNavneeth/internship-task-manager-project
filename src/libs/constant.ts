export const COMPANY_NAME: string = 'NAME';
export const PASSWORD: string = 'PASSWORD';
export const ACCESS_TIME: number = 30; // password timeout in mins
const SHEET_API: string = 'API';
const PRODUCTION: boolean = true;
const HOST: string = !PRODUCTION ? 'LOCALHOST' : 'HOSTED_BACKEND';
export const url: string = `${HOST}/sheet?id=${SHEET_API}`;
console.log(import.meta.env.Ci);
