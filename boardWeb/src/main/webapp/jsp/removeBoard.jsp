<%@page import="co.yedam.board.BoardDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h3>게시글 삭제기능</h3>
	<!-- jsp/removeBoard.jsp -->
	<%
//		자바영역. 자바코드 사용.
		BoardDAO dao = new BoardDAO();
		String bno = request.getParameter("bno");
		
		if(dao.deleteBoard(Integer.parseInt(bno))){
	%>
			<p>삭제되었습니다.</p>
		<%
		}else{
		%>
			<p>처리중 에러.</p>
	<%
		}
	%>
</body>
</html>