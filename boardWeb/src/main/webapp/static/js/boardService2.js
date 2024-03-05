/**
 * boardService2.js
 */
// .pagenation>a click이벤트.
let page = 1;
function pagingFunc() {
	document.querySelectorAll('.pagination>a') // NodeList
		.forEach(item => {
			//console.log(item);
			item.addEventListener('click', function(e) {
				e.preventDefault(); //a태그의 링크기능 차단.
				page = item.dataset.page;
				//page = item.getAttribute('data-page'); //item.dataset.page와 같은값 얻을수 있음.

				//let a = item.getAttribute('data-page');
				//console.log(a);

				replyList(page);
				pageList();
			})
		});
}


// 등록이벤트.
document.querySelector('.addReply').addEventListener('click', addReplyFnc);
function addReplyFnc(e) { //세션내 id는 js가 아니고 jsp쪽에서 담을 변수(상수)를 선언해서 불러와야함.
	let reply = document.querySelector('input[name="reply"]').value;
	if (!replyer) { //비로그인 입력 처리
		alert('댓글은 로그인한 사용자만 작성할수 있습니다.')
		return;
	}
	if (!reply) { //댓글 공백처리
		alert('댓글 입력하세요.')
		return;
	}

	const addHtp = new XMLHttpRequest();
	addHtp.open('post', 'addReply.do');
	addHtp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	addHtp.send('bno=' + bno + '&reply=' + reply + '&replyer=' + replyer);
	addHtp.onload = function(e) {
		let result = JSON.parse(addHtp.responseText);
		if (result.retCode == 'OK') {
			alert('정상 등록');
			//document.querySelector('.reply ul').appendChild(makeRow2(result.retVal)); //페이지를 새로불러오므로 필요없음.
			document.querySelector('#reply').value = '';

			//건수 계산하기위한 ajax 호출.(마지막 페이지로 보내기)
			const ckHtp = new XMLHttpRequest();
			ckHtp.open('get', 'getTotal.do?bno=' + bno);
			ckHtp.send();
			//=-=========================체크필요===================================
			ckHtp.onload = function(e) {
				let result = JSON.parse(ckHtp.responseText);
				//let totalCnt = result.totalCount;
				//let realEnd = Math.ceil(totalCnt / 5);
				//let endPage = Math.ceil(page / 5) * 5;
				//endPage = endPage > realEnd ? realEnd : endPage;
				//console.log(totalCnt + ' ' + endPage + ' ' + realEnd);
				//page = realEnd;
				page = Math.ceil(result.totalCount / 5);
				
				//첫페이지로 보내기
				//page = 1;
				replyList(page);
				pageList();
			}
		} else {
			alert('등록 중 오류발생');
		}
	}
	//console.log(bno, reply, replyer);
}

// 댓글 목록.
function makeRow(obj = {}) {
	let fields = ['replyNo', 'reply', 'replyer'];
	let liTag = document.createElement('li');
	liTag.setAttribute('data-rno', obj.replyNo);
	fields.forEach(prop => {
		let span = document.createElement('span');
		span.innerText = obj[prop];
		if (prop == 'reply') {
			span.className = 'col-sm-5';
		} else {
			span.className = 'col-sm-2';
		}
		liTag.appendChild(span);
	});
	//삭제버튼
	let span = document.createElement('span');
	span.className = 'col-sm-2';
	let btn = document.createElement('button');
	btn.addEventListener('click', deleteRow);
	btn.innerText = '삭제';
	span.appendChild(btn);
	liTag.appendChild(span);
	return liTag;
}

//댓글목록(cloneNode를 이용해서 li생성없이 행생성.)
function makeRow2(obj = {}) {
	let clon = document.querySelector('.content>ul>li:nth-of-type(1)')
		.cloneNode(true);
	clon.setAttribute('data-rno', obj.replyNo);
	clon.querySelector('span:nth-of-type(1)').innerText = obj.replyNo;
	clon.querySelector('span:nth-of-type(2)').innerText = obj.reply;
	clon.querySelector('span:nth-of-type(3)').innerText = obj.replyer;
	//삭제버튼.
	let btn = document.createElement('button');
	//===================================================
	if (replyer != obj.replyer) {
		//btn.disabled = true;
		btn.setAttribute('disabled', true);
	}
	//===================================================
	btn.addEventListener('click', deleteRow);
	btn.innerText = '삭제';
	clon.querySelector('span:nth-of-type(4)').innerText = '';
	clon.querySelector('span:nth-of-type(4)').appendChild(btn);
	return clon;
}

//삭제함수.
function deleteRow() {
	let rno = this.parentElement.parentElement.dataset.rno;
	let li = this.parentElement.parentElement;
	//작성자와 로그인 비교.
	console.log('1 ' + this.parentElement.previousElementSibling.previousElementSibling.innerText);
	console.log('2 ' + li.querySelector('span:nth-of-type(3)').innerText);
	let writer = this.parentElement.previousElementSibling.innerText;
	if (replyer != writer) {
		alert('작성한 댓글만 삭제할 수 있습니다.');
		return;
	}

	const delHtp = new XMLHttpRequest();
	delHtp.open('post', 'removeReply.do');
	delHtp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	delHtp.send('rno=' + rno);
	delHtp.onload = function(e) {
		console.log(delHtp);
		const result = JSON.parse(delHtp.responseText);
		if (result.retCode == 'OK') {
			alert(result.retMsg);
			li.remove();
			replyList(page);
			pageList();
		} else {
			alert(result.retMsg);
		}
	}
}

//목록함수.
function replyList(rpage = 1) {
	const xhtp = new XMLHttpRequest();
	xhtp.open('get', 'replyList.do?bno=' + bno + '&page=' + rpage);
	xhtp.send();
	xhtp.onload = function(e) {
		//console.log(xhtp.responseText);
		const data = JSON.parse(xhtp.responseText);
		//기존목록 삭제.
		document.querySelectorAll('li[data-rno]').forEach(item => item.remove());
		//목록.
		data.forEach(item => {
			document.querySelector('.reply ul').appendChild(makeRow2(item));
		});
		//목록이 없을때
		if (!data.length && page > 1 ) {
			//if (page > 1) {
			//	page--;
			//} else {
			//	page;
			//}
			page--;
			replyList(page);
			pageList();
		}
	}
}
replyList(page);

// 페이징 목록.
function pageList() {
	const plistHtp = new XMLHttpRequest();
	plistHtp.open('get', 'getTotal.do?bno=' + bno);
	plistHtp.send();
	plistHtp.onload = function(e) {
		// 기존 페이지 삭제.
		document.querySelector('div.pagination').innerHTML = '';

		let result = JSON.parse(plistHtp.responseText);
		let totalCnt = result.totalCount;
		let startPage, endPage; // 1~5, 6~10,...
		let next, prev;
		let realEnd = Math.ceil(totalCnt / 5);
		endPage = Math.ceil(page / 5) * 5;
		startPage = endPage - 4;
		endPage = endPage > realEnd ? realEnd : endPage;
		next = endPage < realEnd ? true : false;
		prev = startPage > 1;
		if (prev) {
			let aTag = document.createElement('a');
			//aTag.innerText = startPage - 1;
			aTag.innerHTML = '&laquo;';
			aTag.setAttribute('data-page', startPage - 1);
			aTag.href = '#';
			document.querySelector('div.pagination').appendChild(aTag);
		}
		for (let p = startPage; p <= endPage; p++) {
			let aTag = document.createElement('a');
			aTag.innerText = p;
			aTag.setAttribute('data-page', p);
			aTag.href = '#';
			if (p == page) {
				aTag.className = 'active';
			}
			document.querySelector('div.pagination').appendChild(aTag);
		}
		if (next) {
			let aTag = document.createElement('a');
			//aTag.innerText = endPage + 1;
			aTag.innerHTML = '&raquo;';
			aTag.setAttribute('data-page', endPage + 1);
			aTag.href = '#';
			document.querySelector('div.pagination').appendChild(aTag);
		}
		pagingFunc();
	}
}
pageList();

