import { supabase } from '..';
export const getInterval = async () => {
	const { data, error } = await supabase.from('timer').select().eq('id', 1);
	return data;
};
