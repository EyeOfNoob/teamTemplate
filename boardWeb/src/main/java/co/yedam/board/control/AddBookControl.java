package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Book;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class AddBookControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/json;charset=utf-8");
		
		String bcode = req.getParameter("bcode");
		String bname = req.getParameter("bname");
		String author = req.getParameter("bauth");
		String press = req.getParameter("bpress");
		String price = req.getParameter("bprice");
		
		Book book = new Book();
		book.setBookCode(bcode);
		book.setBookName(bname);
		book.setAuthor(author);
		book.setPress(press);
		book.setPrice(Integer.parseInt(price));
		
		BoardService svc = new BoardServiceImpl();
		
		try {
			if(svc.addBook(book)) {
				// {"retCode": "OK"}
				resp.getWriter().print("{\"retCode\": \"OK\"}");
			}else { // <- 제대로 기능하지않음.(예외로 빠지기때문.)
				// {"retCode": "NG"}
				resp.getWriter().print("{\"retCode\": \"NG\"}");
			}
		} catch (Exception e) { // <- 때문에 예외처리 필요.
			// TODO: handle exception
			resp.getWriter().print("{\"retCode\": \"NG\"}");
			e.printStackTrace(); //<-오류발생시 콘솔에 메시지 출력해줌.
			//e.getMessage(); //<-오류메시지
		}
		
	}

}
