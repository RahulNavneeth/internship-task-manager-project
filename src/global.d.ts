/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
declare interface Window {
	electron: any;
}
interface ImportMetaEnv {
	COMPANY_NAME: string;
}
