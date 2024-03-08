/**
 * boardService.js
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
async function addReplyFnc(e) { 
	let reply = document.querySelector('input[name="reply"]').value;
	//세션내 id는 js에서 호출불가.jsp쪽에서 담을 변수(상수)를 선언해서 불러와야함.
	if (!replyer) { //비로그인 입력 처리
		alert('댓글은 로그인한 사용자만 작성할수 있습니다.');
		return;
	}
	if (!reply) { //댓글 공백처리
		alert('댓글 입력하세요.');
		return;
	}

	//ajax 호출.
	try{
		//fetch
		let resolve = await fetch('addReply.do', {
			//'addReply.do'가 불러와지는 페이지가 http://localhost:8080/boardWeb/A
			//일 경우 boardWeb 바로 아래기때문에 ../이 없어도 된다.
			//http://localhost:8080/boardWeb/A/B 에서 불러와질경우엔 필요.
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'bno=' + bno + '&reply=' + reply + '&replyer=' + replyer
		});
		//.then
		let result = await resolve.json();
		if (result.retCode == 'OK') {
			alert('등록 성공');
			document.querySelector('#reply').value = '';
			resolve = await fetch('getTotal.do?bno=' + bno);
			result = await resolve.json();
			page = Math.ceil(result.totalCount / 5);
			replyList(page);
			pageList();
		} else {
			alert('처리 실패');
		}
	}catch(err){
		 console.log(err);
	} //end of ajax 호출.
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
	if (replyer != obj.replyer) {
		//btn.disabled = true;
		btn.setAttribute('disabled', true);
	}
	btn.addEventListener('click', deleteRow);
	btn.innerText = '삭제';
	clon.querySelector('span:nth-of-type(4)').innerText = '';
	clon.querySelector('span:nth-of-type(4)').appendChild(btn);
	return clon;
}

//삭제함수.
async function deleteRow() {
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

	//ajax 호출
	const optObj = {
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'rno=' + rno
	}
	try {
		let resolve = await fetch('removeReply.do', optObj);
		let result = await resolve.json();
		if (result.retCode == 'OK') {
			alert(result.retMsg);
			//li.remove();
			replyList(page);
			pageList();
		} else {
			alert(result.retMsg);
		}
	}catch(err){
		 console.log(err);
	}
} //end of deleteRow

//목록함수.
function replyList(rpage = 1) {
	fetch('replyList.do?bno=' + bno + '&page=' + rpage, {
		method: 'get'
	})
		.then(resolve => resolve.json())
		.then(data => {
			document.querySelectorAll('li[data-rno]').forEach(item => item.remove());
			data.forEach(item => {
				document.querySelector('.reply ul').appendChild(makeRow2(item));
			});
			if (!data.length && page > 1) {
				//if (page > 1) {
				//	page--;
				//} else {
				//	page;
				//}
				page--;
				replyList(page);
				pageList();
			}
		})
		.catch(err => console.log(err));
}
replyList(page);

// 페이징 목록.
function pageList() {
	fetch('getTotal.do?bno=' + bno)
		.then(resolve => resolve.json())
		.then(createPageElement)
		//.catch(err => console.log(err));
		.catch(function(err){
			console.log(err);
		}); 
		
	//페이지목록 생성
	function createPageElement(result) {
		// 기존 페이지 삭제.
		document.querySelector('div.pagination').innerHTML = '';
	
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
		pagingFunc(); //새로 추가된 A에 추가
	}
}
pageList();

