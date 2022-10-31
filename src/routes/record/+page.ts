import { getCompany } from '../../api/company/get';
import { getEmployee } from '../../api/employee/get';
import { getIssue } from '../../api/issue/get';
import { getProject } from '../../api/project/get';

export const load = async () => {
	const company = await getCompany();
	const employee = await getEmployee();
	const project = await getProject();
	const issue = await getIssue();
	return {
		company,
		employee,
		project,
		issue,
	};
};
