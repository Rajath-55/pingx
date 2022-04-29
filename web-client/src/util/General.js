const writeToClipboard = async txt => {
	const type = 'text/plain';
	const blob = new Blob([txt], { type });
	const data = [new window.ClipboardItem({ [type]: blob })];
	await navigator.clipboard.write(data);
};

const readFromClipboard = async () => {
	const data = await navigator.clipboard.readText();
	return data;
	// return data.clipboardData.getData('text/plain');
};

export { writeToClipboard, readFromClipboard };
