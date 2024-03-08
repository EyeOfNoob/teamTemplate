/**
 * boardAjax.js 
 */
const service = {
	// 댓글목록(1페이지당 5개씩 보여주는)
	replyList(param = {bno: 1, page: 1}, successCall, errorCall) {
		$.ajax({
			url: 'replyList.do',
			method: 'get',
			data: param,
			dataType: 'json'
		})
		.done(successCall)
		.fail(errorCall)
	},
	
	//페이지목록(페이징)
	pageList(bno = 1, successCall, errorCall){
		$.ajax({
			url: 'getTotal.do?bno=' + bno,
			method: 'get',
			dataType: 'json'
		})
		.done(successCall)
		.fail(errorCall)
	},
	
	//댓글삭제
	removeReply(rno=1, successCall, errorCall){
		$.ajax({
			url: 'removeReply.do',
			method: 'post',
			data: {rno},
			dataType: 'json'
		})
		.done(successCall)
		.fail(errorCall)
	},
	// 댓글등록
	addReply(param = {}, successCall, errorCall){
		$.ajax({
			url: 'addReply.do',
			method: 'post',
			data: param,
			dataType: 'json'
		})
		.done(successCall)
		.fail(errorCall)
	}
}
//function test() {};
//export {service, test};
//import {service} from './boardAjax.js';
export default service;
//import service from './boardAjax.js';