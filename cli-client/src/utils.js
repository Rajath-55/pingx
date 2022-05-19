const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

const serverURL =
	// process.env.NODE_ENV === 'development'
	// 	?
	'http://localhost:5500';
// : 'https://pingx-server.herokuapp.com';

export { sleep, serverURL };
