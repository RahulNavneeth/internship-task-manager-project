<script lang="ts">
	import { ACCESS_TIME, PASSWORD } from '../../libs/constant';
	import { access } from './password';

	let password = '';
	let passwordError = '';

	let setPasswordButton = false;

	$: password.length != 0 ? (setPasswordButton = true) : (setPasswordButton = false);
	const submit = () => {
		if (password === PASSWORD) {
			$access = true;
			setTimeout(() => {
				$access = false;
			}, ACCESS_TIME * 60 * 1000);
		} else {
			passwordError = 'Invalid Password!';
			password = '';
			setTimeout(() => {
				passwordError = '';
			}, 3000);
		}
	};
</script>

<div class="w-full mt-16 flex flex-col items-center justify-center">
	<form on:submit|preventDefault={submit}>
		<button
			disabled={!setPasswordButton}
			class="button p-2 {setPasswordButton
				? 'bg-red-400 hover:bg-red-500 active:bg-red-300'
				: 'bg-red-200'} border-2 border-black w-full outline-none rounded-md text-center font-bold disabled:opacity-100"
		>
			ENTER PASSWORD
		</button>

		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			class="bg-white outline-none border-2 border-black rounded-md mt-2 w-full text-center py-2 "
		/>
	</form>
	<!-- <TaskWindow /> -->
</div>
<span class="text-red-700 mt-16">{passwordError}</span>
