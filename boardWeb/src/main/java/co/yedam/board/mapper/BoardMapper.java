package co.yedam.board.mapper;

import java.util.List;

import co.yedam.board.Board;
import co.yedam.common.SearchVO;

public interface BoardMapper {
	List<Board> boardList(SearchVO search);
	int getTotalCnt(SearchVO search);
	
//	상세화면에 사용될 데이터.
	Board selectBoard(int bno);
	
//	조회수 증가(insert,update,delete는 처리된건수(int)반환)
	int updateCount(int bno);
//	글수정 페이지.
	int updateBoard(Board board);
//	저장버튼
	int modifyBoard(Board board);
	
//	삭제버튼
	int deleteBoard(int bno);
	
//	글등록.
	int insertBoard(Board board);
}
