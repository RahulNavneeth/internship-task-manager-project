import { supabase } from '..';
export const getIssue = async () => {
	const { data, error } = await supabase.from('issue').select();
	return data;
};
