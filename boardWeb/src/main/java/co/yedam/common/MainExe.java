package co.yedam.common;

import java.util.List;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;

public class MainExe {
	public static void main(String[] args) {
//		SqlSessionFactory factory = DataSource.getInstance();
//		SqlSession session = factory.openSession();
//		BoardMapper mapper = session.getMapper(BoardMapper.class);
//		List<Board> list = mapper.boardList();
		
//		List<Board> list = session.selectList("co.yedam.board.mapper.BoardMapper.boardList");
//		list.forEach(null);
		
		SearchVO search = new SearchVO();
		search.setPage(1);
		search.setSearchCondition("T");
		search.setKeyword("테스트");
		BoardService svc = new BoardServiceImpl();
		List<Board> list = svc.boardList(search);
		
		for(Board board : list) {
			System.out.println(board.toString());
		}
	}
}
