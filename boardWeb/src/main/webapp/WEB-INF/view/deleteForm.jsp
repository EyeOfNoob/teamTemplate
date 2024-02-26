<%@page import="co.yedam.board.Board"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- action tag-header참조 -->

	<!-- html안에서 호출할 데이터 -->
	<%
		Board board = (Board) request.getAttribute("board");
	%>

	<!-- view/main.jsp -->
	<h3>글 삭제</h3>
	<form action="removeBoard.do">
	<input type="hidden" value="<%=board.getBoardNo() %>" name="bno">
	<table class="table">
		<tr>
			<th>글번호</th>		
			<td><%=board.getBoardNo() %></td>
		</tr>
		<tr>
			<th>제목</th>
			<td><%=board.getTitle() %></td>
		</tr>
		<tr>
			<td colspan="2">
				<button type=submit class="btn btn-danger">삭제</button>
				<button type=reset class="btn btn-secondary">취소</button>
			</td>
		</tr>
	</table>
	</form>
<!-- action tag-footer참조 -->
	