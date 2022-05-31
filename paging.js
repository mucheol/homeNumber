  /* [html 최초 로드 및 이벤트 상시 대기 실시] */
  window.onload = function() {
    console.log("");
    console.log("[window onload] : [start]");
    console.log(""); 

    // 동적으로 테이블 tbody tr 행 생성 실시
    tableInsert();
  };

  /* [테이블 리스트 전역 변수 선언 실시] */
  const tableList = []; // tableInsert 함수에서 for문을 돌면서 삽입 실시
  const pageList = 6; // 한개의 페이지에 보여질 목록 개수
  const pageMax = 5; // 최대 생성될 페이지 개수 (페이지를 더보려면 이전, 다음 버튼 클릭해야함)    	
  var idx = 0; //idx 값 확인 후 동적 페이지 전환 및 데이터 표시
  var page = 1; //생성 시작할 페이지 번호

  /* [tbody tr 동적 삽입 이벤트 수행 함수] */    	
  function tableInsert(){
    console.log("");
    console.log("[tableInsert] : [start]"); 
    console.log("");

    // [ajax 통신 >> tableList 테이블 데이터가 리스트에 포함된 경우]
    // pageInsert(page);
    
    // [for 반복문을 돌려서 tr 데이터 임의로 생성 실시]
    for (var i=0; i<=30; i++){
      // JSON 형식으로 리스트에 추가 실시
      var jsonObject = {"idx":i, "businessNumber":String(i) + " 사업자등록번호", "companyName":String(i) + " 회사명", "userId":String(i) + " 아이디", "userName":String(i) + " 이름", "state":String(i) + "상태"};
      tableList.push(jsonObject);
    }

    // [테이블 리스트에 저장된 데이터 확인]
    console.log("");
    console.log("[tableInsert] : [list] : " + JSON.stringify(tableList)); 
    console.log("");

    // [테이블 행 개수에따라 페이징 처리 실시]
    pageInsert(page);
  };

  /* [페이징 처리 이벤트 수행 함수] */
  function pageInsert(value){
    console.log("");
    console.log("[pageInsert] : [start] : " + value); 
    console.log("");

    // [페이징 목록 초기화 실시]
    $("#dyn_ul").empty();

    // [생성된 테이블 tr 개수 확인 >> 페이징 처리 5개씩 목록 자름]    		
    var startIndex = value; // 생성 시작 페이지    		
    //var endIndex = $("#dyn_tbody tr").length; // tbody에 동적으로 추가된 tr 개수 확인
    var endIndex = tableList.length; // 배열에 있는 길이 확인
    console.log("");
    console.log("[pageInsert] : [startIndex] : " + startIndex); 
    console.log("[pageInsert] : [endIndex] : " + endIndex); 
    console.log("");

    // [tr 개수에 따라 페이징 해야할 개수 확인]
    var pageCount = 0;
    var pagePlus = 0;
    if(endIndex > pageList){ // tr 행 개수가 5 이상인 경우 (임의로 설정)
      pageCount = Math.floor(endIndex / pageList); //생성될 페이지 수 (소수점 버림)
      pagePlus = endIndex % pageList; //추가 나머지 자식 수
      if(pagePlus > 0){ //추가 자식수가 있는경우 >> 페이지 추가
        pageCount = pageCount + 1;
      }
      console.log("");
      console.log("[pageInsert] : [pageCount] : " + pageCount); 
      console.log("[pageInsert] : [pagePlus] : " + pagePlus); 
      console.log("");
    }

    // [생성될 페이지 번호가 전체 생성되야하는 길이보다 크거나 작은지 확인]
    if(startIndex > pageCount){ //길이 초과 시 기존꺼로 다시 저장
      startIndex = page;
    }
    else if(startIndex < 0){ //길이 미만 시 기존꺼로 다시 저장
      startIndex = page;
    }
    else {
      page = startIndex;
    }

    // [동적 ul 페이징 처리 실시]
    if(pageCount == 1){ //생성해야할 페이지가 1페이지인 경우
      var insertUl = "<li class='page-item'>"; // 변수 선언
      insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(1);'>";
      insertUl += insertUl + i;
      insertUl += insertUl + "</a></li>";
      $("#dyn_ul").append(insertUl); //jquery append 사용해 동적으로 추가 실시      			
    }
    else if(pageCount >= 2){ //생성해야할 페이지가 2페이지 이상인 경우
      // 이전 페이지 추가 실시 
      var insertSTR = "<li class='page-item'>"; // 변수 선언
      insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage("+"-1"+");'>";
      insertSTR = insertSTR + "Previous";
      insertSTR = insertSTR + "</a></li>";
      $("#dyn_ul").append(insertSTR); //jquery append 사용해 동적으로 추가 실시      			

      // 특정 1, 2, 3 .. 페이지 추가 실시
      var count = 1;
      for(var i=startIndex; i<=pageCount; i++){
        if(count > pageMax){ //최대로 생성될 페이지 개수가 된 경우 
          page = i - pageMax; //생성된 페이지 초기값 저장 (초기 i값 4 탈출 인경우 >> 1값 저장)
          break; //for 반복문 탈출
        }
        var insertUl = "<li class='page-item'>"; // 변수 선언
        insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage("+i+");'>";
        insertUl = insertUl + String(i);
        insertUl = insertUl + "</a></li>";
        $("#dyn_ul").append(insertUl); //jquery append 사용해 동적으로 추가 실시  
        count ++;
      }

      // 다음 페이지 추가 실시
      var insertEND = "<li class='page-item'>"; // 변수 선언
      insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage("+"0"+");'>";
      insertEND = insertEND + "Next";
      insertEND = insertEND + "</a></li>";
      $("#dyn_ul").append(insertEND); //jquery append 사용해 동적으로 추가 실시
    }

    // [페이징 완료 후 >> tr 개수 전체 삭제 >> 페이징 개수에 맞게 다시 표시 실시]
    $("#dyn_tbody").empty(); //tbody tr 전체 삭제 실시

    // [새롭게 페이지 목록 리스트 처리 실시]
    newPage(startIndex);
  };

  /* [tbody tr 동적 삽입 이벤트 수행 함수] */    	
  function newPage(pageCurrent){
    // [pageCurrent [-1] >> 이전 / pageCurrent [1 이상] >> 일반 / pageCurrent [0] >> 다음]
    console.log("");
    console.log("[newPage] : [start]"); 
    console.log("[newPage] : [page] : " + pageCurrent); 
    console.log("");

    // [새롭게 테이블 tbody tr 데이터 생성 실시]
    if(pageCurrent == -1){ // 이전 페이지
      $("#dyn_tbody").empty(); //tbody tr 전체 삭제 실시

      // [새롭게 페이징 처리 실시]
      var newIdx = page - pageMax;

      // [테이블 데이터에 따라 페이징 처리 실시]
      pageInsert(newIdx); //표시될 페이지 번호 전송
    } 
    else if(pageCurrent == 0){ // 다음 페이지
      $("#dyn_tbody").empty(); //tbody tr 전체 삭제 실시

      // [새롭게 페이징 처리 실시]
      var newIdx = page + pageMax;

      // [테이블 데이터에 따라 페이징 처리 실시]
      pageInsert(newIdx); //표시될 페이지 번호 전송
    }
    else { // 일반 테이블 목록 리스트 갱신
      $("#dyn_tbody").empty(); //tbody tr 전체 삭제 실시

      // 저장된 idx 에서 페이지 수를 곱해서 새로운 idx 지정
      // [1페이지 클릭 >> (1*5) -5 = 0 시작]
      // [2페이지 클릭 >> (2*5) -5 = 5 시작]
      idx = (pageCurrent * pageList) - pageList;
      
      var checkCount = 1;
      for(var i=idx; i<tableList.length; i++){ //반복문을 수행하면서 tbody에 tr데이터 삽입 실시
        if(checkCount > pageList){ //한페이지에 표시될 목록을 초과한 경우
          return;
        }

        // json 데이터 파싱 실시
        var jsonObject = JSON.parse(JSON.stringify(tableList[i])); //각 배열에 있는 jsonObject 참조
        idx = jsonObject.idx;
        var businessNumber = jsonObject.businessNumber;
        var companyName = jsonObject.companyName;
        var userId = jsonObject.userId;
        var userName = jsonObject.userName;
        var state = jsonObject.state;


        // 동적으로 리스트 추가
        var insertTr = ""; // 변수 선언
        insertTr += "<tr>"; // body 에 남겨둔 예시처럼 데이터 삽입
        insertTr += "<th scope='row'>" + idx + "</th>"; // body 에 남겨둔 예시처럼 데이터 삽입
        insertTr += "<td>" + businessNumber + "</td>";
        insertTr += "<td>" + companyName + "</td>";
        insertTr += "<td>" + userId + "</td>";
        insertTr += "<td>" + userName + "</td>";
        insertTr += "<td>" + state + "</td>";
        insertTr += "<td>" + "<button>" + "승인" + "</button>" + "<span class='btwLine'>" + "</span>" + "<button>" + "삭제" + "</button>" + "</td>";
        insertTr += "</tr>";    

        // jquery append 사용해 동적으로 추가 실시
        $("#dyn_tbody").append(insertTr);  

        // 카운트 횟수 증가 		
        checkCount ++;	
      }							
    }
  };

  //db연결후 해야할 것 
  //1. 28번째 줄tablelist길이 동적으로 바꿔야함 지금 
  //2. 30, 175, 185내용 db랑 연결해야함