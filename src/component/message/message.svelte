<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Message } from './messageStore';
	setTimeout(() => {
		$Message = null;
	}, 3000);
</script>

{#if $Message != null}
	<div
		transition:slide
		class="{$Message.status === 301
			? 'text-red-700'
			: ''} w-full fixed bg-white shadow-md flex flex-col items-center justify-center rounded-b-md h-8 mt-12"
	>
		{$Message.message}
	</div>
{/if}
