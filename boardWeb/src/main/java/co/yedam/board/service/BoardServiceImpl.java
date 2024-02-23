package co.yedam.board.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.yedam.board.Board;
import co.yedam.board.mapper.BoardMapper;
import co.yedam.common.DataSource;
import co.yedam.common.SearchVO;

// 업무로직을 담고 있는 프로세스.
// 데이터처리는 mapper 기능.
public class BoardServiceImpl implements BoardService {

//															자동커밋설정(기본값:false)
	SqlSession session = DataSource.getInstance().openSession(true);
	BoardMapper mapper = session.getMapper(BoardMapper.class); // BoardDAO bdao = new BoardDAO?

	@Override
	public List<Board> boardList(SearchVO search) {

		return mapper.boardList(search);
	}

	@Override
	public int boardTotalCnt(SearchVO search) {
		return mapper.getTotalCnt(search);
	}

//	상세조회 + 조회수증가
	@Override
	public Board getBoard(int bno) {
//		조회시 조회수 증가기능 실행
		mapper.updateCount(bno);
//		상세조회
		return mapper.selectBoard(bno);
	}

	@Override
	public boolean modifyBoard(Board board) {
		// TODO Auto-generated method stub
//		int r = excuteupdate
//		if(r > 0)
		if (mapper.modifyBoard(board) > 0) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean deleteBoard(int bno) {
		if (mapper.deleteBoard(bno) > 0) {
			return true;
		} else {
			return false;
		}
	}

//	글등록
	@Override
	public boolean addBoard(Board board) {
		if (mapper.insertBoard(board) == 1) {
			return true;
		} else {
			return false;
		}
	}
}
