<%@page import="co.yedam.common.PageDTO"%>
<%@page import="co.yedam.board.Board"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- action tag-header참조 -->
<jsp:include page="../includes/header.jsp"></jsp:include>

<style>
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
	
	.pagination a:hover:not(.active) {background-color: #ddd;}
</style>

<%
	List<Board> list = (List<Board>) request.getAttribute("list");
	PageDTO pageDTO = (PageDTO) request.getAttribute("page");
	String searchCondition = (String) request.getAttribute("searchCondition");
	String keyword = (String) request.getAttribute("keyword");
%>

	<div class="center">
		<form action="" method="get">
			<div class="row">
				<div class="col-sm-4">
					<select name="searchCondition" class="form-control">
						<option value="">선택하세요.</option>
						<option value="T">제목</option>
						<option value="W">작성자</option>
						<option value="TW">제목 & 작성자</option>
					</select>
				</div>
				<div class="col-sm-6">
					<input type="text" name="keyword" class="form-control">
				</div>
				<div class="col-sm-2">
					<input type="submit" value="조회" class="btn btn-primary">
				</div>
			</div>
		</form>
	</div>
	
	<h3>게시글 목록</h3>
	<table class="table">
		<thead>
			<tr>
				<th>글번호</th>
				<th>제목</th>
				<th>작성자</th>			
				<th>조회수</th>
				<th>작성일자</th>
			</tr>
		</thead>
		<tbody>
			<%for(Board board : list){ %>
			<tr>
				<td><%=board.getBoardNo() %></td>
				<td><a href="board.do?bno=<%=board.getBoardNo() %>"><%=board.getTitle() %></td>
				<td><%=board.getWriter() %></td>
				<td><%=board.getViewCnt() %></td>
				<td><%=board.getCreateDate() %></td>
			</tr>
			<%}	%>
		</tbody>
	</table>
	
	<div class="center">
	<div class="pagination">
	<%if (pageDTO.isPrev()){ %>
		<a href="boardList.do?page=<%=pageDTO.getStarPage()-1 %>&searchCondition=<%=searchCondition%>&keyword=<%=keyword%>"> &laquo; </a>
	<%} %>
	
	<%for(int p = pageDTO.getStarPage(); p<=pageDTO.getEndPage(); p++){ %>
		<%if(p == pageDTO.getPage()){ %>
		<a href="boardList.do?page=<%=p %>&searchCondition=<%=searchCondition%>&keyword=<%=keyword%>" class="active"><%=p %></a>
		<%}else{ %>
		<a href="boardList.do?page=<%=p %>&searchCondition=<%=searchCondition%>&keyword=<%=keyword%>"><%=p %></a>
		<%} %>
	<%} %>
	
	<%if (pageDTO.isNext()){ %>
		<a href="boardList.do?page=<%=pageDTO.getEndPage()+1 %>&searchCondition=<%=searchCondition%>&keyword=<%=keyword%>"> &raquo; </a>
	<%} %>
	</div>
	</div>
	
<!-- action tag-footer참조 -->
<jsp:include page="../includes/footer.jsp"></jsp:include>
	