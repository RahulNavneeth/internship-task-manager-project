import { supabase } from '..';
export const getEmployee = async () => {
	const { data, error } = await supabase.from('employee').select();
	return data;
};
