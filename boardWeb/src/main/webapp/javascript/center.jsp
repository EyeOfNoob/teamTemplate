<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<label>시도</label><input type="text" name="" id="keyword">
	<button id="searchBtn">조회</button>
	<br>
	<div id="show">
		<table border="1">
			<thead id="title">
				<tr>
					<th>센터ID</th>
					<th>센터명</th>
					<th>연락처</th>
					<th>시도</th>
				</tr>
			</thead>
			<tbody id="list"></tbody>
		</table>
	</div>
	<script src="center.js"></script>
</body>
</html>
