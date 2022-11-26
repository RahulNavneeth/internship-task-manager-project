<script lang="ts">
	import type { dataDB } from '../../libs/types/data';
	import { slide } from 'svelte/transition';
	import type { record } from 'src/libs/types/record';
	import axios from 'axios';
	import { Message } from '../../component/message/messageStore';
	import MessageComp from '../../component/message/message.svelte';
	import { COMPANY_NAME, url } from '../../libs/constant';
	import { interval } from '../../libs/interval';
	import { random_rgb } from '../../libs/rgbdata';

	type employeeView = {
		company: dataDB[];
		project: dataDB[];
		employee: dataDB[];
		issue: dataDB[];
	};
	export let data: employeeView;

	let interpeted_s: number = 0;
	type props = {
		toggle: boolean;
		set: string;
	};

	let companyProps: props = {
		toggle: false,
		set: 'Company',
	};

	let issueProps: props = {
		toggle: false,
		set: 'Issue',
	};

	let projectProps: props = {
		toggle: false,
		set: 'Project',
	};

	let employeeProps: props = {
		toggle: false,
		set: 'Employee',
	};

	let infoProps = '';

	let setRecordButton: boolean = false;

	$: companyProps.set != 'Company' &&
	projectProps.set != 'Project' &&
	employeeProps.set != 'Employee' &&
	!!infoProps &&
	issueProps.set != 'Issue'
		? (setRecordButton = true)
		: (setRecordButton = false);

	let sec: number = 0;
	let hours: string = '0';
	let int_id: any;
	const x = window.screenX;
	const y = window.screenY;
	function secondsToHms(d: any) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);
		hours = `${h}:${m}:${s}`;
	}
	function secondsToMin(d: any) {
		d = Number(d);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);
		return parseFloat(`${m}.${Math.floor(s / 10) === 0 ? `0${s}` : s}`);
	}
	$: secondsToHms(sec);
	let resized: boolean = true;

	int_id = setInterval(() => {
		sec++;
	}, 1000);

	let new_int_id = setInterval(
		() => {
			window.resizeTo(400, 400);
			window.moveTo(x, y);
			clearTimeout(int_id);
			sec = 0;
			resized = false;
		},
		// @ts-ignore
		$interval % 1 === 0 ? $interval * 60 * 60 * 1000 : $interval * 100 * 60 * 1000,
	);

	function toHoursAndMinutes(totalMinutes: number) {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}.${minutes.toFixed(2)}`;
	}

	const cleanData = () => {
		companyProps.set = 'Company';
		projectProps.set = 'Project';
		employeeProps.set = 'Employee';
		infoProps = '';
		issueProps.set = 'Issue';
	};
	setTimeout(() => {
		window.resizeTo(50, 50);
		window.moveTo(1000000, 1000000);
	}, 1000);
	const submit = async () => {
		const getRes = await axios.get(`${url}&type=KEY_VALUE`, {
			params: {
				data: {
					range: ['sheet1'],
				},
			},
		});
		console.log(getRes);
		const data = getRes.data as record[];
		const hs_rows = data.filter(
			(i) =>
				i.Company === companyProps.set &&
				i.Project === projectProps.set &&
				i.Employee === employeeProps.set &&
				`${i.Info}`.toLocaleLowerCase() === `${infoProps}`.toLocaleLowerCase() &&
				i.Date === new Date().toLocaleDateString(),
		);
		console.log(hs_rows);
		let hs: any;
		if (interpeted_s === 0) {
			hs =
				hs_rows.length === 0
					? $interval % 1 === 0
						? $interval * 60
						: $interval * 100
					: parseFloat(hs_rows[0].Mins_spent.split(' ')[0]) +
					  ($interval % 1 === 0 ? $interval * 60 : $interval * 100);
		} else {
			const num = hs_rows.length != 0 ? hs_rows[0].Mins_spent.split(' ')[0] : '0';
			hs =
				hs_rows.length === 0
					? secondsToMin(interpeted_s)
					: parseInt(num) + secondsToMin((parseFloat(num) % 10) * 100 + interpeted_s);
			interpeted_s = 0;
		}
		console.log({ hs, len: hs_rows.length === 0, hs_rows });
		const rgb = random_rgb(employeeProps.set);
		const recordData: record[] = [
			{
				Date: new Date().toLocaleDateString(),
				Company: companyProps.set,
				Project: projectProps.set,
				Employee: employeeProps.set,
				Info: infoProps,
				Issue: issueProps.set,
				Mins_spent: `${hs.toFixed(2)} mins`,
				Hours_spent: `${toHoursAndMinutes(hs)} hrs`,
				iat: `${new Date()}`,
			},
		];
		const update_d = hs_rows.filter((i) => i.Info.toLowerCase() === infoProps.toLowerCase());
		if (update_d.length != 0) {
			const d = data.indexOf(update_d[update_d.length - 1]) + 2;
			recordData[0].Info = hs_rows[0].Info;
			await axios.put(`${url}`, {
				data: { values: recordData, range: ['Sheet1', `A${d}`, `I${d}`] },
			});
		} else {
			console.log(rgb);
			await axios.post(`${url}&sheetId=0&sheetName=Sheet1`, {
				data: recordData,
				props: {
					font: 'Roboto Mono',
					bgrgb: [rgb[0], rgb[1], rgb[2], 5],
				},
			});
		}
		Message.set({ status: 200, message: 'Data recorded successfully' });
		setTimeout(() => {
			window.resizeTo(50, 50);
			window.moveTo(1000000, 1000000);
			const int = setInterval(() => {
				sec++;
			}, 1000);
			int_id = int;
			clearTimeout(new_int_id);
			new_int_id = setInterval(
				() => {
					window.resizeTo(400, 400);
					window.moveTo(x, y);
					clearTimeout(int_id);
					sec = 0;
					resized = false;
				},
				// @ts-ignore
				$interval % 1 === 0 ? $interval * 60 * 60 * 1000 : $interval * 100 * 60 * 1000,
			);
			resized = true;
			cleanData();
		}, 4000);
	};
</script>

{#if !resized}
	<button
		class="font-black z-50 shadow-md fixed bg-red-100 w-full text-2xl border-b-2 border-red-300 py-4 underline outline-none"
	>
		{COMPANY_NAME.toUpperCase()} TASK MANAGER
	</button>
	<div class="w-full mt-4">
		{#if $Message != null}
			<MessageComp />
		{/if}
	</div>
	<div class="bg-red-100 w-full mt-4 flex flex-col justify-center p-6 pt-16">
		<div class="font-black">RECORD TASK :</div>
		<input
			bind:value={infoProps}
			class="w-full bg-white mt-4 border-2 border-black p-2 rounded-md outline-none"
			placeholder="INFO"
		/>
		<span class="font-black mb">_________________________</span>
		<div class="flex flex-row items-center justify-center">
			<div
				class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
			>
				<span class="text-black ">{companyProps.set}</span>
			</div>
			<button
				on:click={() => {
					companyProps.toggle
						? (companyProps.toggle = false)
						: (companyProps.toggle = true);
				}}
				class="border-none outline-none text-xl mt-2 ml-4 pr-2"
			>
				{#if !companyProps.toggle}
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
		{#if companyProps.toggle}
			<div
				transition:slide
				class="bg-white mt-2 h-30 overflow-auto border-2 border-black rounded-md flex flex-col items-center w-full"
			>
				{#each data.company as value, index}
					<button
						on:click={() => {
							companyProps.set = value.name;
							companyProps.toggle = false;
						}}
						class="p-2 border-none  outline-none hover:bg-gray-100 mt-2 {index ===
						data.company.length - 1
							? 'mb-2'
							: ''} w-11/12 rounded-md text-center"
					>
						{value.name}
					</button>
				{:else}
					<span class="font-black">No data!</span>
				{/each}
			</div>
		{/if}
		<span class="font-black mb">_________________________</span>
		<div class="flex flex-row items-center justify-center mt-2">
			<div
				class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
			>
				<span class="text-black ">{projectProps.set}</span>
			</div>
			<button
				on:click={() => {
					projectProps.toggle
						? (projectProps.toggle = false)
						: (projectProps.toggle = true);
				}}
				class="border-none outline-none text-xl mt-2 ml-4 pr-2"
			>
				{#if !projectProps.toggle}
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
		{#if projectProps.toggle}
			<div
				transition:slide
				class="bg-white mt-2 h-30 overflow-auto border-2 border-black rounded-md flex flex-col items-center w-full"
			>
				{#each data.project as value, index}
					<button
						on:click={() => {
							projectProps.set = value.name;
							projectProps.toggle = false;
						}}
						class="p-2 border-none  outline-none hover:bg-gray-100 mt-2 {index ===
						data.project.length - 1
							? 'mb-2'
							: ''} w-11/12 rounded-md text-center"
					>
						{value.name}
					</button>
				{:else}
					<span class="font-black">No data!</span>
				{/each}
			</div>
		{/if}
		<span class="font-black mb">_________________________</span>
		<div class="flex flex-row items-center justify-center mt-2">
			<div
				class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
			>
				<span class="text-black ">{employeeProps.set}</span>
			</div>
			<button
				on:click={() => {
					employeeProps.toggle
						? (employeeProps.toggle = false)
						: (employeeProps.toggle = true);
				}}
				class="border-none outline-none text-xl mt-2 ml-4 pr-2"
			>
				{#if !employeeProps.toggle}
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
		{#if employeeProps.toggle}
			<div
				transition:slide
				class="bg-white mt-2 h-30 overflow-auto border-2 border-black rounded-md flex flex-col items-center w-full"
			>
				{#each data.employee as value, index}
					<button
						on:click={() => {
							employeeProps.set = value.name;
							employeeProps.toggle = false;
						}}
						class="p-2 border-none  outline-none hover:bg-gray-100 mt-2 {index ===
						data.employee.length - 1
							? 'mb-2'
							: ''} w-11/12 rounded-md text-center"
					>
						{value.name}
					</button>
				{:else}
					<span class="font-black">No data!</span>
				{/each}
			</div>
		{/if}

		<span class="font-black mb">_________________________</span>
		<div class="flex flex-row items-center justify-center mt-2">
			<div
				class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
			>
				<span class="text-black ">{issueProps.set}</span>
			</div>
			<button
				on:click={() => {
					issueProps.toggle ? (issueProps.toggle = false) : (issueProps.toggle = true);
				}}
				class="border-none outline-none text-xl mt-2 ml-4 pr-2"
			>
				{#if !issueProps.toggle}
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
		{#if issueProps.toggle}
			<div
				transition:slide
				class="bg-white mt-2 h-30 overflow-auto border-2 border-black rounded-md flex flex-col items-center w-full"
			>
				{#each data.issue as value, index}
					<button
						on:click={() => {
							issueProps.set = value.name;
							issueProps.toggle = false;
						}}
						class="p-2 border-none  outline-none hover:bg-gray-100 mt-2 {index ===
						data.issue.length - 1
							? 'mb-2'
							: ''} w-11/12 rounded-md text-center"
					>
						{value.name}
					</button>
				{:else}
					<span class="font-black">No data!</span>
				{/each}
			</div>
		{/if}
		<button
			on:click={submit}
			disabled={!setRecordButton}
			class="button p-2 {setRecordButton
				? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
				: 'bg-red-200'} border-2 border-black w-full  outline-none rounded-md text-center mt-4 font-bold disabled:opacity-100"
		>
			RECORD DATA
		</button>
	</div>
{:else}
	<div class="w-screen h-screen flex flex-col items-center justify-center">
		<div class="w-full h-1/2 flex flex-col items-center justify-center">
			{hours}
		</div>
		<div class="w-full h-1/2 flex flex-col items-end justify-center">
			<button
				class="w-screen h-full bg-red-400 hover:bg-red-500 active:bg-red-300"
				on:click={() => {
					window.resizeTo(400, 400);
					window.moveTo(x, y);
					clearTimeout(int_id);
					interpeted_s = sec;
					sec = 0;
					resized = false;
				}}
			>
				&uarr;
			</button>
		</div>
	</div>
{/if}
