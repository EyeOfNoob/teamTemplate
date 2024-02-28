package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class RemoveForm implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String bno = req.getParameter("bno");
//		System.out.println(bno);
		
//		작동시킬 업무로직
		BoardService svc = new BoardServiceImpl();
//		전달 시킬 변수
		Board board = svc.getBoard(Integer.parseInt(bno));
		
		req.setAttribute("board", board);
		
//		WEB-INF/view/deleteForm.jsp
//		호출할 html
		String path = "board/deleteForm.tiles";
//								html
		req.getRequestDispatcher(path).forward(req, resp);
		
		
	}

}
