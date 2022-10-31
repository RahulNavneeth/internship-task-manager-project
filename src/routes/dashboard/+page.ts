import { getInterval } from '../../api/timer/get';

export const load = async () => {
	const interval = await getInterval();
	console.log(interval);
	return {
		intervalData: interval,
	};
};
