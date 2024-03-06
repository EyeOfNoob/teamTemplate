/**
 * center.js 
 */
console.log('center.js');

let url = 'https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=KtKopGS0v23Pk4MuPmo5WZ1gdp6uZxrwSMhSYltvXMpQnYDrzjhM8%2F%2FfD0R05UEBrdy%2FY8YXP7jnpQGfj6EPFg%3D%3D';

let showFields = ['id', 'centerName', 'phoneNumber', 'sido']
let tbodyTag = document.querySelector('#list');
let searchSido = document.querySelector('#searchSido');
let centerList = '';
let filtAry = [];

//전체목록 출력
fetch(url)
.then(resolve => resolve.json())
.then(result => {
	centerList = result.data; 
	console.log(result);
	console.log('====');
	console.log(centerList);
	
	result.data.forEach(center => {
		tbodyTag.append(displayList(center));
		if (filtAry.indexOf(center.sido) == -1) {
			filtAry.push(center.sido); //동일한 값이 없으면 추가하기
		}
		})
		filtAry.forEach(item => { //fetch가 비동기진행되므로 안에 있어야 정상작동가능.
			//console.log(item);
			let opt = document.createElement('option');
			opt.innerText = item;
			searchSido.append(opt);
		})
})
.catch(err => console.log(err));

//배열에서 중복되는 항목 거르고 새로운 배열 생성하기
//fetch(url)
//.then(resolve => resolve.json())
//.then(result => {
//	console.log(result);
//	result.data.forEach(center => {
//		if (filtAry.indexOf(center.sido) == -1) {
//			filtAry.push(center.sido); //동일한 값이 없으면 추가하기
//		}
//	})
//	filtAry.forEach(item => { //fetch가 비동기진행되므로 안에 있어야 정상작동가능.
//		//console.log(item);
//		let opt = document.createElement('option');
//		opt.innerText = item;
//		searchSido.append(opt);
//	})
//})
//.catch(err => console.log(err));

//조회 이벤트 처리
//document.querySelector('.searchBtn').addEventListener('click', searchFnc);
let btn = document.querySelector('#searchBtn');
btn.addEventListener('click', searchFnc);

	//키다운 이벤트
let btnV = document.querySelector('#keyword');
btnV.addEventListener('keyup', searchFnc);//<-'change'로 지정시 엔터로 작동

//조건검색
function searchFnc(e) {
	let searchK = document.querySelector('#keyword').value;
	tbodyTag.innerHTML = '';
	//=============교수님이 한거(검색)=============
	//centerList.filter(center => center.sido == searchK)//시도값이 같은 배열
	//	.forEach(center => tbodyTag.append(displayList(center)));
	//=============내가 한거(부분검색)=============
	//centerList.forEach(center => {
	//			let subK = center.sido.indexOf(searchK);
	//			if (center.sido == searchK || searchK == '' || subK != -1) {
	//				tbodyTag.append(displayList(center));
	//			}
    //
	//		})
	//=============교수님거 응용(부분검색)=============
	centerList.filter(center => (searchK == '' || center.sido.indexOf(searchK) != -1))//시도값이 같은 배열
		.forEach(center => tbodyTag.append(displayList(center)));
	//=============내가 한거(검색/공백시 전체검색)=============
	//fetch(url)
	//	.then(resolve => resolve.json())
	//	.then(result => {
	//		result.data.forEach(center => {
	//			let subK = center.sido.indexOf(searchK);
	//			if (center.sido == searchK || searchK == '' || subK != -1) {
	//				tbodyTag.append(displayList(center));
	//			}
    //
	//		})
	//	})
	//	.catch(err => console.log(err));
}

//셀렉트 이벤트 처리
searchSido.addEventListener('change', selectFnc);
function selectFnc(e){
	let selsido = searchSido.value;
	tbodyTag.innerHTML = '';
	//===========================
	//centerList.filter(center => center.sido == selsido)//시도값이 같은 배열
	//	.forEach(center => tbodyTag.append(displayList(center)));
	//==========================
	fetch(url)
		.then(resolve => resolve.json())
		.then(result => {
			result.data.forEach(center => {

				if (center.sido == selsido) {
					tbodyTag.append(displayList(center));
				}

			})
		})
		.catch(err => console.log(err));
	//==========================
}

//한행 생성
function displayList(center = []) {
	let tr = document.createElement('tr');
	tr.addEventListener('click', function(e){
		//let name = center.centerName.substring('코로나19'.length);
		let name = center.centerName;
		location.href = 'map.jsp?lat='+center.lat+'&lng='+center.lng+'&name='+name;
		//window.open('map.jsp?lat='+center.lat+'&lng='+center.lng+'&name='+name);
	})
	//보여줄 항목 지정.
	showFields.forEach(field => {
		let td = document.createElement('td');
		if (field == 'centerName') {
			td.innerText = center[field].substring('코로나19'.length);
		} else {
			td.innerText = center[field];
		}
		tr.append(td);
	})
	return tr;
}

// json 전송 db 입력기능.
document.getElementById('registerData').addEventListener('click', function(e){
	fetch('../registerCenter.do', {
		method:'post',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(centerList)
	})
	.then(resolve => resolve.text())
	.then(result => console.log(result))	
	.catch(err => console.log(err));
})

