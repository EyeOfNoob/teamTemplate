<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>



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

	<div class="center">
		<form action="" method="get">
			<div class="row">
				<div class="col-sm-4">
					<select name="searchCondition" class="form-control">
						<option value="">선택하세요.</option>
						<option value="I">아이디</option>
						<option value="N">이름</option>
						<option value="A">권한</option>
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
	
	<h3>회원 목록</h3>
	<table class="table">
		<thead>
			<tr>
				<th>아이디</th>
				<th>이름</th>
				<th>권한</th>
				<th>이미지 파일</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="member" items="${list }">
				<tr>
					<td>${member.id }</td>
					<td>${member.name }</td>
					<td>${member.auth }</td>
					<td>${member.image }</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	
	
	
	<div class="center">
	<div class="pagination">
	
	<!-- if -->
	<c:if test="${page.prev }">
		<a href="memberList.do?page=${page.starPage - 1 }&searchCondition=${searchCondition }&keyword=${keyword }"> &laquo; </a>
	</c:if>
	
	<!-- for -->
	<c:forEach begin="${page.starPage }" end="${page.endPage }" var="p">
		<c:choose>
			<c:when test="${p eq page.page }">
				<a href="memberList.do?page=${p }&searchCondition=${searchCondition }&keyword=${keyword }" class="active">${p }</a>
			</c:when>
			<c:otherwise>
				<a href="memberList.do?page=${p }&searchCondition=${searchCondition }&keyword=${keyword }">${p }</a>
			</c:otherwise>
		</c:choose>
	</c:forEach>
	
	<!-- if -->
	<c:if test="${page.next }">
		<a href="memberList.do?page=${page.endPage + 1 }&searchCondition=${searchCondition }&keyword=${keyword }"> &raquo; </a>
	</c:if>
	
	</div>
	</div>


