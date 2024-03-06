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
	
	<label>시도목록</label>
	<select id="searchSido"></select>
	
	<button id="registerData">데이터 생성</button>
	<!-- <button id="deleteData">데이터 삭제</button> -->
	
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
	<script>
		const origAry = ['1','2','1','2','3']
		let filAry = []
		origAry.forEach(item => {
			if(filAry.indexOf(item.sido) == -1){
				filAry.push(item.sido);
			}
		})
		//console.log(filAry);

	</script>
</body>
</html>
