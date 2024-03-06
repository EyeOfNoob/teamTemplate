<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      
      let dataAry = [['Sido','Cnt per Sido']]; // [['Sido','Cnt per Sido'],['서울', 33],[]...]
      
      fetch('../getSidoInfo.do')
      .then(resolve => resolve.json())
      .then(result => {
    	  console.log(result); // [{sido: '서울특별시', cnt: 43},...]
    	  //[{},{}...] => [[],[]...]
    	  result.forEach(item => {
    		  console.log(item);
    		  //let ary = [];
    		  //for(let prop in item){
    			//  ary.push(item[prop]);
    		  //}
    		  //dataAry.push(ary);
    		  dataAry.push([item.sido, item.cnt]);
    	  })
    	  
    	  google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);  
          
      })
      .catch(err => console.log(err));

      
      
      function drawChart() {

        var data = google.visualization.arrayToDataTable(dataAry);

        var options = {
          title: '시도별 예방접종센터 분포도'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>
