/*
* script.js
*/

console.log("script.js");
console.log(document);

                    //button의 클래스값.
document.querySelector('button.btn').addEventListener('click', clickFnc); //콜백함수 

function clickFnc(e)	{
	console.log(e);
	                                     //input의 아이디값.
	let userValue = document.querySelector('input#name').value; // => 입력값
	let liTag = document.createElement('li'); // => <li></li>
	let delBtn = document.createElement('button');
	
	liTag.innerText = userValue + ' '; // => <li>입력값</li>
	delBtn.innerText = '삭제';
	liTag.appendChild(delBtn); // =liTag.append(delBtn); 
	
	document.querySelector('#list').append(liTag);
	//document.querySelector('#list').append(delBtn); //<-이렇게만 할경우 li 밖에 생성됨.
	
	// init.
	document.querySelector('#name').value = '';
}

document.querySelector('button#addBtn').addEventListener('click', addRow); 
function addRow(){
	let sno, sname, score;
	sno = document.querySelector('input#sno').value;
	sname = document.querySelector('input#sname').value;
	score = document.querySelector('input#score').value;
	//sno = document.querySelector('input.sno:nth-of-type(1)').value;
	//sno = document.querySelector('input.sno:nth-of-type(2)').value;
	//sno = document.querySelector('input.sno:nth-of-type(3)').value;
	//                          id가 아니고 class로 여러개를 만들어 쓸경우.
	if(!sno || !sname || !score){
		alert('빈값을 채워주세요.');
		return; //함수종료
	}
	
	let obj = {sno, sname, score};// ={sno:sno, sname:sname, score:score}
	let tr = makeRow(obj);
	document.querySelector('#studlist').appendChild(tr);
	
	//document.querySelector('#sno').value = '';
	//document.querySelector('#sname').value = '';
	//document.querySelector('#score').value = '';
	
	//테이블내 input 한번에 초기화
	document.querySelectorAll('#stdTable input').forEach(function(item, idx, ary){
		item.value = '';
	});
}

//row 생성
function makeRow(student={sno:1, sname:'test', score:90}){
	let tr = document.createElement('tr');
	tr.addEventListener('click', displayRow);
	for(let prop in student){
		let td = document.createElement('td');
		td.innerText = student[prop];
		tr.appendChild(td);
	}
	//삭제버튼추가
	let btn = document.createElement('button');
	btn.addEventListener('click', deleteRow, false);
	//                                      bubbling 방식. true일 경우엔 capturing로 실행
	//                                      하 -> 상                   상 -> 하
	//btn.addEventListener('click', deleteRow()); 
	//                      <--이렇게할경우 클릭이아니라 해당코드를 읽을때 실행되버림.
	btn.innerText = '삭제';
	let td = document.createElement('td');
	td.appendChild(btn);
	tr.appendChild(td);
	
	return tr;
}
//row 상세보기
function displayRow(e){
	//console.log(e.target, this);
	document.querySelector('#sno').value = this.children[0].innerText;
	document.querySelector('#sname').value = this.children[1].innerText;
	document.querySelector('#score').value = this.children[2].innerText;
}
//row 삭제
function deleteRow(e){
	e.stopPropagation(); //디폴트가 false이므로 하 -> 상위요소로 이벤트 전파 중단.
	console.log(e.target);
	e.target.parentElement.parentElement.remove();
}
//row 수정
document.querySelector('button#editBtn').addEventListener('click', updateRow);
function updateRow(){
	let sno, sname, score;
	sno = document.querySelector('input#sno').value;
	sname = document.querySelector('input#sname').value;
	score = document.querySelector('input#score').value;
	
	let list = document.querySelectorAll('#studlist tr');
	
	//for 둘다 가능함.
	//for(let i=0; i<list.length; i++){
	//	if(list[i].children[0].innerText == sno){
	//	list[i].children[1].innerText = sname;
	//	list[i].children[2].innerText = score;
	//	}
	//}
	for(let std of list){
		if(std.children[0].innerText == sno){
		std.children[1].innerText = sname;
		std.children[2].innerText = score;
		}
	}
	
}


// str에 값을 활용해서 화면출력.
function makeTr(){
	for(let student of str){
			//0.tr생성.
			//let trTag = document.createElement('tr');
			//               => <tr></tr>
			
			//1.수동생성.
			//td *3 생성.
			//let noTag = document.createElement('td');
			//let nameTag = document.createElement('td');
			//let scoTag = document.createElement('td');
			
			//생성된 td에 값부여
			//noTag.innerText = student.sno;
			//nameTag.innerText = student.sname;
			//scoTag.innerText = student.score;
			
			//tr 하위요소로 생성된 td할당
			//trTag.append(noTag, nameTag, scoTag)
			
			//2.for로 생성.
			//for(let prop in student){
			//	let tdTag = document.createElement('td');
			//	//               => <td></td>
			//	tdTag.innerText = student[prop];
			//	                 => <td> student[prop] </td>
			//	trTag.appendChild(tdTag);
			//	                 => <tr><td> student[prop] </td></tr>
			//}
			//               => <tr>
			//                    <td> student[prop1] </td>
			//                    <td> student[prop2] </td>
			//                    <td> student[prop3] </td>
			//                  </tr>
			
			//tr을 tbody.appendChild
			//document.querySelector('#studlist').appendChild(trTag);
			
			let trd = makeRow(student);
			
			document.querySelector('#studlist').appendChild(trd);
			
		}
}
makeTr();
