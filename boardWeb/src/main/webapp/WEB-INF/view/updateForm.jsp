<%@page import="co.yedam.board.Board"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


	<!-- html안에서 호출할 데이터 -->
	<%
		Board board = (Board) request.getAttribute("board");
	%>
	
	<h3>수정화면</h3>
	<form action="modifyBoard.do">
		<input type="hidden" value="<%=board.getBoardNo() %>" name="bno">
		
		<table class="table">
			<tr>
				<th>글번호</th>
				<td><%=board.getBoardNo() %></td>
				<th>조회수</th>
				<td><%=board.getViewCnt() %></td>
			</tr>
			<tr>
				<th>글제목</th>
				<td colspan="3"><input class="form-control" type="text" name="title" value="<%=board.getTitle() %>"></td>
			</tr>
			<tr>
				<th>글내용</th>
				<td colspan="4"><textarea class="form-control" name="content" cols="30" rows="3"><%=board.getContent() %></textarea></td>
			</tr>
			<tr>
				<th>작성자</th><td><%=board.getWriter() %></td>
				<th>작성일시</th><td><%=board.getCreateDate() %></td>
			</tr>
			<tr>
				<td colspan="4" align="center">
					<button type="submit" class="btn btn-primary" ${board.writer eq logid ? '' : 'disabled'}>저장</button>
					<button type="reset" class="btn btn-secondary" ${board.writer eq logid ? '' : 'disabled'}>취소</button>
				</td>
			</tr>
		</table>
	</form>
