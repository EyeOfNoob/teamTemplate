<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<h3>UserList page</h3>

<script src="static/js/userAjax.js"></script>

<!-- <script src="static/js/userList.js"></script> -->
<!-- <script src="static/js/userService.js"></script> -->

<input type="text" id="name">
<select id="genderList" class="form-control">
	<option value="All">전체조회</option>
	<option value="Male">남성</option>
	<option value="Female">여성</option>
</select>

<table class="table">
	<tr>
		<th>도서코드</th>
		<td><input type="text" id="bcode" value="B005"></td>
	</tr>
	<tr>
		<th>도서명</th>
		<td><input type="text" id="bname" value="파워자바"></td>
	</tr>
	<tr>
		<th>저자</th>
		<td><input type="text" id="bauth" value="홍길동"></td>
	</tr>
	<tr>
		<th>출판사</th>
		<td><input type="text" id="bpress" value="행복출판사"></td>
	</tr>
	<tr>
		<th>금액</th>
		<td><input type="number" id="bprice" value="20000"></td>
	</tr>
	<tr>
		<td colspan="2" align="center">
			<button id="addBtn">등록</button>
		</td>
	</tr>
</table>

<div id="show">
	<table class="table" border="1" id="tableList">
		<thead>
		   <!-- <tr>
				<th>id</th>
				<th>first_name</th>
				<th>last_name</th>
				<th>email</th>
				<th>salary</th>
			</tr> -->
		</thead>
		<tbody>
			<tr>
		   <!-- <td>101</td>
				<td>first_name</td>
				<td>last_name</td>
				<td>email@com</td>
				<td>2345</td> -->
			</tr>
		</tbody>
	</table>
</div>