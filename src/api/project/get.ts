import { supabase } from '..';
export const getProject = async () => {
	const { data, error } = await supabase.from('project').select();
	return data;
};
