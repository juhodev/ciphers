export interface SelectOption {
	displayName: string;
	id: number | string;
}

export interface Cam {
	x: number;
	y: number;
	position: number;
}

export interface BasicInfo {
	name: string;
	date: string;
	country: string;
	link: string;
}

export const MACHINE_BASIC_INFO: BasicInfo[] = [
	{
		name: 'Enigma',
		date: '1923',
		country: 'Germany',
		link: '/enigma',
	},
	{
		name: 'Lorenz cipher (Lorenz SZ40)',
		date: '1940 or something',
		country: 'Germany',
		link: '/lorenz',
	},
];
