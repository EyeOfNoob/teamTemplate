/**
 * center.js 
 */
console.log('center.js');

let url = 'https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=KtKopGS0v23Pk4MuPmo5WZ1gdp6uZxrwSMhSYltvXMpQnYDrzjhM8%2F%2FfD0R05UEBrdy%2FY8YXP7jnpQGfj6EPFg%3D%3D';

let showFields = ['id', 'centerName', 'phoneNumber', 'sido']
let tbodyTag = document.querySelector('#list');

fetch(url)
	.then(resolve => resolve.json())
	.then(result => {
		console.log(result);
		result.data.forEach(center => {
			let tr = document.createElement('tr');
			showFields.forEach(field => {
				let td = document.createElement('td');
				if (field == 'centerName') {
					td.innerText = center[field].substring('코로나19'.length);
				} else {
					td.innerText = center[field];
				}
				tr.append(td);
			})
			tbodyTag.append(tr);
		})
	})
	.catch(err => console.log(err));


//조회 이벤트 처리
//document.querySelector('.searchBtn').addEventListener('click', searchFnc);
let btn = document.querySelector('#searchBtn')
btn.addEventListener('click', searchFnc);

function searchFnc(e) {
	let searchK = document.querySelector('#keyword').value;
	tbodyTag.innerHTML = '';
	fetch(url)
		.then(resolve => resolve.json())
		.then(result => {
			console.log(result);
			console.log(result);
			result.data.forEach(center => {

				if (center.sido == searchK || searchK == '') {

					let tr = document.createElement('tr');
					showFields.forEach(field => {
						let td = document.createElement('td');
						if (field == 'centerName') {
							td.innerText = center[field].substring('코로나19'.length);
						} else {
							td.innerText = center[field];
						}
						tr.append(td);
					})
					tbodyTag.append(tr);

				}

			})
		})
		.catch(err => console.log(err));
}


