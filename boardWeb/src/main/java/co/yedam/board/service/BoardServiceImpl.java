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

	SqlSession session = DataSource.getInstance().openSession();
	BoardMapper mapper = session.getMapper(BoardMapper.class); //BoardDAO bdao = new BoardDAO
	
	@Override
	public List<Board> boardList(SearchVO search) {
		
		return mapper.boardList(search);
	}

	@Override
	public int boardTotalCnt(SearchVO search) {
		return mapper.getTotalCnt(search);
	}

	@Override
	public Board getBoard(int bno) {
		return mapper.selectBoard(bno);
	}
	
}
