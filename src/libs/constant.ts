export const COMPANY_NAME: string = 'Agaram';
export const PASSWORD: string = 'admin';
export const ACCESS_TIME: number = 30; // in mins
const SHEET_API: string = '1w7Fgb8dBSd5MV-dPYTutXQF6znxJMHzumkUggZwQi9I';
const PRODUCTION: boolean = true;
const HOST: string = !PRODUCTION
	? 'http://localhost:3000/'
	: 'https://access-sheets-api-backend.vercel.app/';
export const url: string = `${HOST}sheet?id=${SHEET_API}`;
//localhost:3000/sheet?id=1w7Fgb8dBSd5MV-dPYTutXQF6znxJMHzumkUggZwQi9I
///sheet?id=1w7Fgb8dBSd5MV-dPYTutXQF6znxJMHzumkUggZwQi9I&type=KEY_VALUE
