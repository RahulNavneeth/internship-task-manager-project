type rgbType = [r: number, g: number, b: number];

const rgbData: rgbType[] = [
	[230, 184, 175],
	[244, 204, 204],
	[252, 229, 205],
	[255, 242, 204],
	[217, 234, 211],
	[208, 224, 227],
	[201, 218, 248],
	[207, 226, 243],
	[217, 210, 233],
	[234, 209, 220],
];
export const random_rgb = (name: string) => {
	return rgbData[name.length % rgbData.length] as rgbType;
};
