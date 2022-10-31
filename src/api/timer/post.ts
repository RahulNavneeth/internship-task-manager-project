import type { post } from '../../libs/types/post';
import { supabase } from '..';
export const postInterval = async (interval: number): Promise<post> => {
	const { data, error } = await supabase.from('timer').update({ interval }).eq('id', 1);
	if (error) {
		return { status: 301, message: error.message };
	}
	return { status: 200, message: `"${interval}" : Updated The Interval` };
};
