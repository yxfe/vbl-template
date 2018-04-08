export var formatDate = function (date) {
	let today = new Date(date)
	let year = today.getFullYear()
	let month = ('0' + (today.getMonth() + 1)).slice(-2)
	let day = ('0' + today.getDate()).slice(-2)
	let hour = today.getHours()
	let minute = today.getMinutes()
	let second = today.getSeconds()
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
};