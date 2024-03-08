/**
 *  boardService3.js
 */
import service from './boardAjax.js';

let page = 1;
// 댓글 목록 5건 출력
function showList(){
	service.replyList({ bno: bno, page: page }, // 인자값1
		replyListCall,
		err => console.log('error=> ' + err)
		//	function(err) {
		//		console.log('error=> ' + err);
		//	}
	);
}
showList();

function replyListCall(result) {
	if(!result.length && page > 1) {
		page--;
		service.replyList({ bno: bno, page: page }, // 인자값1
			replyListCall,
			err => console.log('error=> ' + err)
			);
	}				
	let ul = $('.content>ul');
	//기존목록 삭제
	$('.content>ul>li:gt(1)').remove();
	
	console.log(result);
	$(result).each(function(idx, item) {
		let clon = $('.content>ul>li').eq(0).clone();
		
		//댓글삭제버튼
		let delBtn = $('<button class="btn btn-warning">삭제</button>');
		delBtn.click(function(e) {
			let writer = $(this).parent().prev().text();
			if (replyer != writer) {
				alert('작성한 댓글만 삭제할 수 있습니다.');
				return;
			}
			service.removeReply(item.replyNo, 
				function(result) {
					if (result.retCode == 'OK') {
						alert(result.retMsg);
						service.replyList({ bno: bno, page: page }, // 인자값1
						replyListCall,
						err => console.log('error=> ' + err)
						);
					} else {
						alert(result.retMsg);
					}
				},
				function(err) {
					console.log('error=> ' + err)
				}
			);
		} )
		clon.find('span:eq(0)').text(item.replyNo);
		clon.find('span:eq(1)').text(item.reply);
		clon.find('span:eq(2)').text(item.replyer);
		clon.find('span:eq(3)').html(delBtn);
		ul.append(clon);
	});
	
	//페이지 리스트 생성.
	service.pageList(bno,
	createPageElement,
	err => console.log('error=> ' + err)
	)
}

// 페이지 목록 출력(페이징)
/*service.pageList(bno,
	createPageElement,
	err => console.log('error=> ' + err)
);*/

//페이지 목록 생성
function createPageElement(result) {
	// 기존 페이지 삭제.
	let pagination = $('div.pagination');
	pagination.html('');

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
		$('<a />').attr('href', '#').attr('data-page', startPage - 1).html('&laquo;').appendTo(pagination);
	}

	for (let p = startPage; p <= endPage; p++) {
		let aTag = $('<a />').attr('href', '#').attr('data-page', p).html(p).appendTo(pagination);
		if (p == page) {
			aTag.addClass('active');
		}
	}
	if (next) {
		$('<a />').attr('href', '#').attr('data-page', endPage + 1).html('&raquo;').appendTo(pagination);
	}
}

//사과 appendTo 바구니 
//바구니 append 사과

// 페이지 이동.(이벤트 위임 방식)
$('.pagination').on('click', 'a', function(e) {
		page = $(this).data('page');
		service.replyList({bno: bno, page: page}, // 인자값1
		replyListCall,
		err => console.log('error=> ' + err)
	);
})

// 댓글등록 이벤트
$('.addReply').on('click', function(e){
	let reply = $('input[name="reply"]').val();
	if (!replyer) { //비로그인 입력 처리
		alert('댓글은 로그인한 사용자만 작성할수 있습니다.');
		return;
	}
	if (!reply) { //댓글 공백처리
		alert('댓글 입력하세요.');
		return;
	}
	service.addReply({bno: bno, reply: reply, replyer: replyer}, // 인자값1
		function(result) {
			if (result.retCode == 'OK') {
				alert('등록성공');
				service.pageList(bno, function (result){
					page = Math.ceil(result.totalCount / 5);
					service.replyList({ bno: bno, page: page }, // 인자값1
						replyListCall,
						err => console.log('error=> ' + err)
					);
				},
				err => console.log('error=> ' + err))
			} else {
				alert('등록실패');
			}
		},
		err => console.log('error=> ' + err)
		);
		
})
