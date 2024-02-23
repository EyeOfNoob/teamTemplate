package co.yedam.board.service;

import java.util.List;

import co.yedam.board.Board;
import co.yedam.common.SearchVO;

public interface BoardService {
	List<Board> boardList(SearchVO search);
	int boardTotalCnt(SearchVO search);
	
//	단건조회.
	Board getBoard(int bno);
	
//	수정
	boolean modifyBoard(Board board);
	
//	삭제
	boolean deleteBoard(int bno);
//	글등록
	boolean addBoard(Board board);
}
