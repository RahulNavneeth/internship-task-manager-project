import { writable } from 'svelte/store';

export let inEmployeeMode = writable<boolean>(false);
