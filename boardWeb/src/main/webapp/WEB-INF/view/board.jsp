<%@page import="co.yedam.board.Board"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<style>
div.reply div {
	margin: auto;
}

div.reply span {
	display: inline-block;
}

div.reply ul {
	list-style-type: none;
	margin-top: 10px;
}

div.reply li {
	padding-top: 1px;
	padding-bottom: 1px;
}

.center {
	text-align: center;
	width: 60%;
	margin: auto;
}

.pagination {
	display: inline-block;
}

.pagination a {
	color: black;
	float: left;
	padding: 8px 16px;
	text-decoration: none;
	transition: background-color .3s;
	/*border: 1px solid #ddd;*/
	/*margin: 0 4px;*/
}

.pagination a.active {
	background-color: #4CAF50;
	color: white;
	border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {
	background-color: #ddd;
}
</style>

<h3>상세조회</h3>
<!--      submit작동시 보낼 페이지 							  -->
<form action="updateForm.do">
	<!--                              수정/삭제용 글번호저장 		  -->
	<input type="hidden" value="${board.boardNo }" name="bno">
	<table class="table">
		<tr>
			<th>글번호</th>
			<td>${board.boardNo }</td>
			<th>조회수</th>
			<td>${board.viewCnt }</td>
		</tr>
		<tr>
			<th colspan="2">글제목</th>
			<td colspan="2">${board.title }</td>
		</tr>
		<tr>
			<td colspan="4">${board.content }</td>
		</tr>
		<tr>
			<th>작성자</th>
			<td>${board.writer }</td>
			<th>작성일시</th>
			<td>${board.createDate }</td>
		</tr>
		<tr>
			<td colspan="4" align="center"><c:choose>
					<c:when test="${board.writer eq logid }">
						<!--        form으로 전송(새페이지로 이동)                    -->
						<button type="submit" class="btn btn-primary">수정</button>
						<button type="button" class="btn btn-warning"
							onclick="removeFunc()">삭제</button>
					</c:when>
					<c:otherwise>
						<button type="submit" class="btn btn-primary" disabled>수정</button>
						<button type="button" class="btn btn-warning" disabled
							onclick="removeFunc()">삭제</button>
					</c:otherwise>
				</c:choose></td>
		</tr>
	</table>
</form>

<!-- 댓글목록. -->
<div class="container reply" style="width: 80%;">
	<div class="header">
		<input class="col-sm-8" type="text" name="reply" id="reply">
		<button class="col-sm-3 addReply">댓글등록</button>
	</div>
	<div class="content">
		<ul>
			<li>
				<span class="col-sm-2">글번호</span>
				<span class="col-sm-5">내용</span>
				<span class="col-sm-2">작성자</span>
				<span class="col-sm-2">삭제</span>
			</li>
			<li><hr></li>
			<!-- 
			<li><span class="col-sm-2">1</span> <span class="col-sm-6">내용1234</span>
				<span class="col-sm-2">user01</span></li>
			-->
		</ul>
	</div>
	<div class="footer">
		<div class="center">
			<div class="pagination">
				<a href="">1</a> 
				<a href="">2</a> 
				<a href="" class="active">3</a>
			</div>
		</div>
	</div>
</div>
<!-- div.container.reply -->

<script>
	const bno = "${board.boardNo }";
	const replyer = "${logid}";
	console.log(bno);
	function removeFunc() {
		let form = document.querySelector('form');
		console.log(form.action);
		form.action = 'removeForm.do';
		form.submit();
		form.action = 'updateForm.do';
	}
</script>
<script src="static/js/boardService.js"></script>
