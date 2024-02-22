<%@page import="co.yedam.board.Board"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- action tag-header참조 -->
<jsp:include page="../includes/header.jsp"></jsp:include>
	<%
		Board board = (Board) request.getAttribute("board");
	%>
	<h3>상세조회</h3>
	<table class="table">
		<tr>
			<th>글번호</th>
			<td><%=board.getBoardNo() %></td>
			<th>조회수</th>
			<td><%=board.getViewCnt() %></td>
		</tr>
		<tr>
			<th colspan="2">글제목</th>
			<td colspan="2"><%=board.getTitle() %></td>
		</tr>
		<tr>
			<td colspan="4"><%=board.getContent() %></td>
		</tr>
		<tr>
			<th>작성자</th><td><%=board.getWriter() %></td>
			<th>작성일시</th><td><%=board.getCreateDate() %></td>
		</tr>
	</table>

<jsp:include page="../includes/footer.jsp"></jsp:include>