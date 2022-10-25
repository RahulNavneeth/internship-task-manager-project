<script lang="ts">
	import { goto } from '$app/navigation';
	import { COMPANY_NAME } from '../libs/constant';
	import { Message } from '../component/message/messageStore';
	import MessageComp from '../component/message/message.svelte';
	import { access } from '../component/password/password';
	import Password from '../component/password/password.svelte';
	import '../app.css';
	import { page } from '$app/stores';
</script>

{#if $page.url.pathname != '/record'}
	<div class=" w-full h-fit primary p-4 flex flex-col items-center bg-red-100 ">
		{#if $Message != null}
			<MessageComp />
		{/if}
		<button
			on:click={() => {
				if ($page.url.pathname != '/record') {
					goto('/');
				}
			}}
			class="font-black shadow-md fixed bg-red-100 w-full text-2xl border-b-2 border-red-300 -mt-4 py-4 underline outline-none"
		>
			{COMPANY_NAME.toUpperCase()} TASK MANAGER!
		</button>
		{#if $access || ['/', '/record'].includes($page.url.pathname)}
			<div class="flex flex-col h-full justify-center w-full p-4 mt-12 rounded-lg">
				<slot />
			</div>
		{:else}
			<Password />
		{/if}
	</div>
{:else}
	<div class=" w-full h-screen primary flex flex-col items-center bg-red-100 ">
		<slot />
	</div>
{/if}

<style global>
	.primary {
		font-family: 'Merriweather', serif;
	}
</style>
