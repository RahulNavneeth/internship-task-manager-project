import type { post } from '../../libs/types/post';
import { supabase } from '..';
export const postIssue = async (name: string): Promise<post> => {
	const { data, error } = await supabase.from('issue').insert({ name });
	if (error) {
		return { status: 301, message: error.message };
	}
	return { status: 200, message: `"${name}" : Added to the database` };
};
