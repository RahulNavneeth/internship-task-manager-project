import type { post } from '../../libs/types/post';
import { supabase } from '..';
export const postProject = async (name: string): Promise<post> => {
	const { data, error } = await supabase.from('project').insert({ name });
	if (error) {
		return { status: 301, message: error.message };
	}
	return { status: 200, message: `"${name}" : Added to the database` };
};
