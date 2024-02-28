/**
 * userList.js
 */
console.log('userList.js');

let str = `[{"id":1,"first_name":"Rene","last_name":"Duggen","email":"rduggen0@skyrock.com","gender":"Male","salary":2291},
{"id":2,"first_name":"Faye","last_name":"Sommerlin","email":"fsommerlin1@mediafire.com","gender":"Female","salary":2192},
{"id":3,"first_name":"Hannah","last_name":"Hardstaff","email":"hhardstaff2@fotki.com","gender":"Female","salary":3756},
{"id":4,"first_name":"Corenda","last_name":"Edmondson","email":"cedmondson3@live.com","gender":"Female","salary":3973},
{"id":5,"first_name":"Bessy","last_name":"Domek","email":"bdomek4@kickstarter.com","gender":"Female","salary":2944},
{"id":6,"first_name":"Brien","last_name":"Merill","email":"bmerill5@bizjournals.com","gender":"Male","salary":2093},
{"id":7,"first_name":"Giulietta","last_name":"Schops","email":"gschops6@arstechnica.com","gender":"Female","salary":4463},
{"id":8,"first_name":"Kerr","last_name":"Couch","email":"kcouch7@cloudflare.com","gender":"Male","salary":3329},
{"id":9,"first_name":"Iago","last_name":"Whitwood","email":"iwhitwood8@google.de","gender":"Male","salary":2794},
{"id":10,"first_name":"Idalina","last_name":"Flacknoe","email":"iflacknoe9@icio.us","gender":"Female","salary":3450},
{"id":11,"first_name":"Goober","last_name":"Fike","email":"gfikea@themeforest.net","gender":"Male","salary":3742},
{"id":12,"first_name":"Thane","last_name":"McQuode","email":"tmcquodeb@vistaprint.com","gender":"Male","salary":2615},
{"id":13,"first_name":"Franz","last_name":"Bremmell","email":"fbremmellc@quantcast.com","gender":"Male","salary":3154},
{"id":14,"first_name":"Hirsch","last_name":"Kroll","email":"hkrolld@cafepress.com","gender":"Male","salary":4011},
{"id":15,"first_name":"Lorraine","last_name":"McKag","email":"lmckage@home.pl","gender":"Female","salary":4165}]`;

let json = JSON.parse(str); // 문자열 -> object로 변환.
console.log(json);

//                         html이 모두 로딩되면.     명령실행.
document.addEventListener('DOMContentLoaded', function(e) {
	document.querySelector('#name').value = '홍길동';
	//thead 생성.
	let title = json[0];
	let tr = document.createElement('tr');
	for (let prop in title) {
		let th = document.createElement('th');
		th.innerText = prop;
		tr.appendChild(th);
	}
	document.querySelector('#tableList thead').appendChild(tr);

	//tbody 영역.
	//                     요소  인덱스 전체배열  <- 필요없는건 빼도됨.
	json.forEach(function(item, idx, ary) {
		//console.log(item, idx, ary); // item => {}
		//if (item.gender == 'Female') {
		let tr = document.createElement('tr');
		for (let prop in item) {
			let td = document.createElement('td');
			td.innerText = item[prop];
			tr.appendChild(td);
		}
		document.querySelector('#tableList tbody').appendChild(tr);
		//}
	});


	document.querySelector('#genderList').addEventListener('change', genderOutput);

	function genderOutput() {
		//내용 초기화.
		document.querySelector('tbody').innerHTML = '';
		let choice = document.querySelector('#genderList').value;
		json.forEach(function(item, idx, ary) {
			if (item.gender == choice) {
				let tr = document.createElement('tr');
				for (let prop in item) {
					let td = document.createElement('td');
					td.innerText = item[prop];
					tr.appendChild(td);
				}
				document.querySelector('#tableList tbody').appendChild(tr);
			}
		})

	}
});