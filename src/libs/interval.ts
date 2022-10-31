import { getInterval } from '../api/timer/get';
import { writable } from 'svelte/store';
export const interval = writable<number>(0);

const getI = async () => {
	const gInterval: any = await getInterval();
	const int: number = gInterval[0].interval;
	interval.set(int);
};

getI();
