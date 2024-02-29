/**
 * userService.js
 */
function filterList(gender = 'Male') {
	document.querySelector('tbody').innerHTML = '';

	//let jAry = json.filter(function(item, idx, ary){
	//	return item.gender == gender || gender == 'All';
	//})
	//jAry.forEach()

	//method 체인
	json//
		.filter(function(item, idx, ary) {
			return item.gender == gender || gender == 'All';
		})//
		.forEach(function(item) {
			document.querySelector('tbody').appendChild(makeRow(item))
		})
}

function reduceList(gender = 'Female'){
	let tbody = document.querySelector('tbody');
	tbody.innerHTML = '';
	
	json.reduce((acc, item) => {
		if(item.gender == gender || gender == 'All'){
			//let tr = makeTr(item); makeTr()을 안만든듯?
			tbody.appendChild(makeRow(item));
		}
		return acc;
	}, tbody);
}

document.addEventListener('DOMContentLoaded', function(e) {
	console.clear();
	console.log('userService.js');

	// forEach() -> 반환값은 없음.

	// filter()=> 새로운 배열 생성. A -> B
	let fAry = json.filter(function(item, idx, ary) {
		return item.salary > 3000;
	});

	// map() A -> A`
	//item {id, fn, ln, email, gender, salary}
	//item {id, name, salary}
	//                변수가 1개면 괄호생략가능.   실행내용이 한개면 중괄호도 생략가능.
	let mAry = fAry.map((item, idx, ary) => {
		let obj = {
			id: item.id, //
			name: item.first_name + '-' + item.last_name, //
			salary: item.salary
		}
		return obj;
	});
	//다 생략한 버전
	//let mAry = fAry.map( item => { 
	//	return{	id: item.id, //
	//			name: item.first_name + '-' + item.last_name, //
	//			salary: item.salary		}
	//});

	console.log('==map==');
	console.log(mAry);
	console.log('==filter==');
	console.log(fAry);

	//reduce() -> 새로운 값(배열이 아닐수도있음)을 생성.
	//json.reduce(함수,초기값(acc));


	console.log('==reduce==');
	//                             전회시행 반환값(누적됨)
	//                                    │
	let result = [1, 2, 3, 4, 5].reduce((acc, item, idx, ary) => {
		console.log(acc, item, idx);
		acc.push(item * 2);
		return acc;
	}, []);//초기값 -> 설정안할경우 idx0을 건너뜀. 
	console.log(result);

	let ary = [1, 2, 3, 4, 5];
	let res = 0;
	ary.forEach(item => {
		res += item
	})
	console.log(res);

	result = json.reduce((acc, item, idx) => {
		if(item.gender == 'Male'){
			acc.push(item);
		}
		return acc;
	}, []);
	console.log(result);
	
}); //end of DOMContentLoaded.