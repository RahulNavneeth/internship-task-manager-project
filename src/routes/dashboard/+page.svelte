<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { post } from '../../libs/types/post';
	import { postCompany } from '../../api/company/post';
	import { postProject } from '../../api/project/post';
	import { postEmployee } from '../../api/employee/post';
	import { Message } from '../../component/message/messageStore';
	import { postInterval } from '../../api/timer/post';
	import { interval } from '../../libs/interval';
	import { postIssue } from '../../api/issue/post';

	export let data: any;

	let setTime = data.intervalData[0].interval | 0;

	type props = {
		set: string;
		toggle: boolean;
	};

	let timerProps = {
		set: false,
		toggle: false,
	};

	let companyProps: props = {
		set: '',
		toggle: false,
	};

	$: companyProps.set.length != 0 ? (companyProps.toggle = true) : (companyProps.toggle = false);

	let projectProps = {
		set: '',
		toggle: false,
	};

	$: projectProps.set.length != 0 ? (projectProps.toggle = true) : (projectProps.toggle = false);

	let employeeProps = {
		set: '',
		toggle: false,
	};

	$: employeeProps.set.length != 0
		? (employeeProps.toggle = true)
		: (employeeProps.toggle = false);

	let issueProps = {
		set: '',
		toggle: false,
	};

	$: issueProps.set.length != 0 ? (issueProps.toggle = true) : (issueProps.toggle = false);

	const intervalData = [
		...[...Array(6).keys()].map((i) => i / 10),
		...[...Array(24).keys()].map((i) => i + 1),
	];

	const submit = async (processId: number) => {
		let get_data: post;
		switch (processId) {
			case 1:
				get_data = await postInterval(setTime);
				$Message = get_data;
				timerProps.set = false;
				interval.set(setTime);
				break;
			case 2:
				get_data = await postCompany(companyProps.set);
				$Message = get_data;
				companyProps.set = '';
				break;
			case 3:
				get_data = await postProject(projectProps.set);
				$Message = get_data;
				projectProps.set = '';
				break;
			case 4:
				get_data = await postEmployee(employeeProps.set);
				$Message = get_data;
				employeeProps.set = '';
				break;
			case 5:
				get_data = await postIssue(issueProps.set);
				$Message = get_data;
				issueProps.set = '';
				break;
		}
	};
</script>

<span class="font-black">Timer :</span>

<button
	on:click={() => {
		submit(1);
	}}
	disabled={!timerProps.set}
	class="button p-2 {timerProps.set
		? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
		: 'bg-red-200'} border-2 border-black outline-none rounded-md text-center font-bold disabled:opacity-100"
>
	SET TIMER
</button>

<div class="flex flex-row justify-center items-center">
	<div
		class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
	>
		<span class="text-black ">{setTime}</span>
		{$interval === 1 ? 'hr' : `hrs`}
	</div>
	<button
		class="outline-none border-none text-xl mt-2 ml-4 pr-2"
		on:click={() => {
			timerProps.toggle ? (timerProps.toggle = false) : (timerProps.toggle = true);
		}}
	>
		{#if !timerProps.toggle}
			<img
				class="text-sm w-4 h-4 "
				alt="arrow"
				src="https://cdn.discordapp.com/attachments/912021235582533674/1031821056522059806/unknown.png"
			/>
		{:else}
			<img
				class="text-sm w-4 h-4 "
				alt="arrow"
				src="https://media.discordapp.net/attachments/912021235582533674/1031822673031995412/unknown.png"
			/>
		{/if}
	</button>
</div>

{#if timerProps.toggle}
	<div
		transition:slide
		class="bg-white mt-2 h-36 border-2 border-black overflow-auto rounded-md flex flex-col items-center w-full"
	>
		{#each intervalData as value, _index}
			<button
				on:click={() => {
					setTime = value;
					timerProps.toggle = false;
					timerProps.set = true;
				}}
				class="p-2 border-none  outline-none hover:bg-gray-100 mt-2 {value === 24
					? 'mb-2'
					: ''} w-11/12 rounded-md text-center"
			>
				{value % 1 === 0 ? value : `${value * 100} mins`}
			</button>
		{/each}
	</div>
{/if}

<span class="mt-8 font-black">Inputs :</span>

<div class="flex flex-col justify-center items-center w-full">
	<button
		on:click={() => {
			submit(2);
		}}
		disabled={!companyProps.toggle}
		class="button p-2 {companyProps.toggle
			? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
			: 'bg-red-200'} border-2 border-black w-full  outline-none rounded-md text-center font-bold disabled:opacity-100"
	>
		ADD COMPANY
	</button>

	<input
		type="text"
		bind:value={companyProps.set}
		placeholder="Company Name"
		class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
	/>
	<span class="font-black">________________________</span>
	<button
		on:click={() => {
			submit(3);
		}}
		disabled={!projectProps.toggle}
		class="button p-2 mt-4 {projectProps.toggle
			? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
			: 'bg-red-200'} border-2 border-black w-full outline-none rounded-md text-center font-bold disabled:opacity-100"
	>
		ADD PROJECT
	</button>
	<input
		type="text"
		bind:value={projectProps.set}
		placeholder="Project Name"
		class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
	/>
	<span class="font-black">________________________</span>
	<button
		on:click={() => {
			submit(4);
		}}
		disabled={!employeeProps.toggle}
		class="button p-2 mt-4 {employeeProps.toggle
			? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
			: 'bg-red-200'} border-2 border-black w-full outline-none rounded-md text-center font-bold disabled:opacity-100"
	>
		ADD EMPLOYEE
	</button>
	<input
		type="text"
		bind:value={employeeProps.set}
		placeholder="Employee Name"
		class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
	/>
	<span class="font-black">________________________</span>
	<button
		on:click={() => {
			submit(5);
		}}
		disabled={!issueProps.toggle}
		class="button p-2 mt-4 {issueProps.toggle
			? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
			: 'bg-red-200'} border-2 border-black w-full outline-none rounded-md text-center font-bold disabled:opacity-100"
	>
		ADD ISSUE
	</button>
	<input
		type="text"
		bind:value={issueProps.set}
		placeholder="Issue Name"
		class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
	/>
</div>
