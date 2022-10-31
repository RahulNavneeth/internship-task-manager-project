<script lang="ts">
	import { goto } from '$app/navigation';
	import { interval } from '../libs/interval';
	import { inEmployeeMode } from './employeeStore';
</script>

<div class="flex flex-col items-center justify-center h-60">
	<button
		class="p-6 bg-red-400 border-2 border-black hover:bg-red-500 active:bg-red-300 rounded-md w-full font-black"
		on:click={() => {
			goto('/dashboard');
		}}
	>
		Admin
	</button>
	<button
		disabled={$inEmployeeMode}
		class="p-6  border-2 {!$inEmployeeMode
			? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
			: 'bg-red-200'} border-black rounded-md w-full mt-2 font-black"
		on:click={async () => {
			alert(
				`You are in EMPLOYEE mode! \n ( Every ${
					$interval % 1 === 0
						? $interval === 1
							? `${$interval} hr`
							: `${$interval} hrs`
						: `${$interval * 100} mins`
				} )`,
			);
			$inEmployeeMode = true;
			goto('/record');
		}}
	>
		Employee
	</button>
	{#if $inEmployeeMode}
		<span class="underline mt-4">( In Employee Mode )</span>
	{/if}
</div>
