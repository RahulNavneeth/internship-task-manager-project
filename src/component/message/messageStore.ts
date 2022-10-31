import type { post } from "src/libs/types/post";
import { writable } from "svelte/store";

export let Message = writable<post | null>(null);
