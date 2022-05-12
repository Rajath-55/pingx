const writeToClipboard = async txt => {
	try {
		const type = 'text/plain';
		const blob = new Blob([txt], { type });
		const data = [new window.ClipboardItem({ [type]: blob })];
		await navigator.clipboard.write(data);
	} catch (e) {
		console.log('Could not write room ID to clipboard - \n' + e);
	}
};

const readFromClipboard = async () => {
	try {
		const data = await navigator.clipboard.readText();
		return data;
	} catch (e) {
		console.log('Could not read room ID from clipboard - \n' + e);
	}
};

export { writeToClipboard, readFromClipboard };
