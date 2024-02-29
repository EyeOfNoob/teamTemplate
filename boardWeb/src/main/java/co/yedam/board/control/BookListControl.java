package co.yedam.board.control;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Book;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class BookListControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		jsp: page생성 반환.
//		ajax: json값을 반환.
		resp.setContentType("text/json;charset=utf-8");
//		[{"bookCode":"B001", "bookName":"이것이 자바다"},{}]
		BoardService svc = new BoardServiceImpl();
		List<Book> list = svc.bookList();
		String json = "[";
		for (int i = 0; i < list.size(); i++) {
			json += "{\"bookCode\":\""+list.get(i).getBookCode()+"\", "//
					+ "\"bookName\":\""+list.get(i).getBookName()+"\", "//
					+ "\"author\":\""+list.get(i).getAuthor()+"\", "//
					+ "\"press\":\""+list.get(i).getPress()+"\", "//
					+ "\"price\":\""+list.get(i).getPrice()+"\"}";
			if(i != list.size()-1) {
				json += ",";
			}
			
		}
		json += "]";
		
		resp.getWriter().print(json);
	}

}
