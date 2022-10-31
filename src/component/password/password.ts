import { writable } from 'svelte/store';

export let access = writable<boolean>(false);
