package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class AddForm implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		req.setCharacterEncoding("utf-8");
//		
//		String title = req.getParameter("title");
//		String writer = req.getParameter("writer");
//		String content = req.getParameter("content");
//		
//		Board board = new Board();
//		board.setTitle(title);
//		board.setWriter(writer);
//		board.setContent(content);
//		
//		req.setAttribute("board", board);
		
		String path = "board/addForm.tiles";
		req.getRequestDispatcher(path).forward(req, resp);
	}

}
