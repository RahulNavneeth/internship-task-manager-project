import type { dataDB } from 'src/libs/types/data';
import { supabase } from '..';
export const getCompany = async () => {
	const { data, error } = await supabase.from('company').select();
	return data;
};
