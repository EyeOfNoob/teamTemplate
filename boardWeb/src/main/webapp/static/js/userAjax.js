/**
 * userAjax.js
 */
console.log('userAjax.js')

document.addEventListener('DOMContentLoaded', function(e) {
	//등록이벤트(click)
	//		  querySelector와 같은용도
	//					│
	document.getElementById('addBtn').addEventListener('click', function(e) {
		//서블릿 호출, 화면 제어.
		let bookCode = document.getElementById('bcode').value;
		let bname = document.getElementById('bname').value;
		let author = document.getElementById('bauth').value;
		let bpress = document.getElementById('bpress').value;
		let bprice = document.getElementById('bprice').value;
		let obj = { bookCode, bname, author, bpress, bprice };

		const addAjax = new XMLHttpRequest();
		addAjax.open('post', 'addBook.do');
		//get방식
		//addAjax.open('get', 'addBook.do?bcode=' + bcode
		//	+ '&bname=' + bname
		//	+ '&bauth=' + author
		//	+ '&bpress=' + bpress
		//	+ '&bprice=' + bprice);
		addAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//addAjax.send();
		addAjax.send(
			'bcode=' + bookCode
			+ '&bname=' + bname
			+ '&bauth=' + author
			+ '&bpress=' + bpress
			+ '&bprice=' + bprice
			);
		addAjax.onload = function(e) {
			let result = JSON.parse(addAjax.responseText);
			console.log(result);
			if (result.retCode == 'OK') {
				document.querySelector('#show tbody').appendChild(makeRow(obj));
			} else if (result.retCode == 'NG') {
				alert("처리중 에러");
			}
		}

	})

	//Asynchronous JAvaScript and XML
	//AJAX는 코드가 종료되기전에 다음 코드를 시작하게함(비동기방식)
	//데이터 파일 불러오기.
	let json = "";
	const xhtp = new XMLHttpRequest();
	xhtp.open('get', 'bookList.do');
	xhtp.send();
	xhtp.onload = function(e) {
		//console.log(xhtp.responseText);
		json = JSON.parse(xhtp.responseText);
		console.log('onload', json);

		//타이틀.
		//let title = json[0]; <--데이터가 하나도 없을때 호출되지않음.
		let title = ['도서코드', '도서명', '저자', '출판사', '가격'];
		let tr = document.createElement('tr');
		for (let prop of title) {
			let th = document.createElement('th');
			th.innerText = prop;
			tr.appendChild(th);
		}
		let th = document.createElement('th');
		th.innerText = '삭제';
		tr.appendChild(th);
		document.querySelector('#tableList thead').appendChild(tr);

		//데이터.
		//for(let prop of json){
		//	let tr2 = makeRow(prop);
		//	document.querySelector('#tableList thead').appendChild(tr2);
		//}

		json.reduce((acc, item) => {
			acc.appendChild(makeRow(item));
			return acc;
		}, document.querySelector('#show tbody'));
		//                초기값
	}//end of onload

}); //end of DOMContentLoaded.

// 한건생성.(Object값을 넣으면 해당값으로 행을 생성.)
function makeRow(obj = {}) {
	let tr = document.createElement('tr');
	tr.setAttribute('id', 'book_' + obj.bookCode);
	tr.setAttribute('data-code', obj.bookCode);
	for (let prop in obj) {
		let td = document.createElement('td');
		td.innerText = obj[prop];
		tr.appendChild(td);
	}
	//삭제버튼추가
	let btn = document.createElement('button');
	btn.addEventListener('click', deleteRow, true);
	btn.innerText = '삭제';
	let td = document.createElement('td');
	td.appendChild(btn);
	tr.appendChild(td);

	return tr;
} // end of makeRow

//삭제함수.
function deleteRow(e) {
	let tr = this.parentElement.parentElement;
	let bcode = tr.dataset.code; // => 삭제하려는 bookCode
	//tr.getAttribute('id') // => book_B001
	//tr.getAttribute('data-code') // => B001
	//tr.dataset.code // => B001
	const addAjax = new XMLHttpRequest();
		addAjax.open('post', 'removeBook.do');
		addAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		addAjax.send(
			'bcode=' + bcode
			);
		addAjax.onload = function(e) {
			let result = JSON.parse(addAjax.responseText);
			console.log(result);
			if (result.retCode == 'OK') {
				tr.remove();
			} else if (result.retCode == 'NG') {
				alert("삭제중 에러");
			}
		}
	
} // end of deleteRow