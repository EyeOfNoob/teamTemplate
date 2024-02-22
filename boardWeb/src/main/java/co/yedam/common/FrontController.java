package co.yedam.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.control.BoardControl;
import co.yedam.board.control.BoardListControl;

// init -> service ->destroy
public class FrontController extends HttpServlet {

//	Map타입으로 url과 실행할 클래스.
	Map<String, Control> controls;
	
	public FrontController(){
		controls = new HashMap<>();
	}
	
//	init - 서버 호출시 최초 한번 실행.
	@Override
	public void init(ServletConfig config) throws ServletException {
//		System.out.println("init 실행.");
		
		controls.put("/resume.do", new ResumeForm());
//		controls.put("/a.do", new Acontrol());
//		controls.put("/b.do", new Bcontrol());
		
		controls.put("/main.do", new MainControl());
//		게시글목록으로 이동컨트롤
		controls.put("/boardList.do", new BoardListControl());
		controls.put("/board.do", new BoardControl());
//		
	}

//	service - 서버 요청때마다 실행
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		System.out.println("service 실행.");
		String uri = req.getRequestURI(); // 현재 페이지의 url
//		System.out.println("uri: "+uri);
		
		String context = req.getContextPath(); // 어플리케이션
//		System.out.println("context: " + context);
		
		String path = uri.substring(context.length());
		System.out.println("path: " + path);
		
		Control control = controls.get(path);
		control.exec(req, resp); //요청url과 실행컨트롤을 호출.
		
	}

}
