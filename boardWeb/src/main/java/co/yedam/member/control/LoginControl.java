package co.yedam.member.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.common.Control;
import co.yedam.member.Member;
import co.yedam.member.service.MemberService;
import co.yedam.member.service.MemberServiceImpl;

public class LoginControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		
		Member member = new Member();
		member.setId(id);
		member.setPw(pw);
		
		MemberService svc = new MemberServiceImpl();
		member = svc.loginCheck(member);
		
		if(member != null) {
			resp.sendRedirect("boardList.do");
		} else {
			req.setAttribute("message", "아이디와 비밀번호를 확인하세요.");
			String path = "WEB-INF/view/member/loginForm.jsp";
			req.getRequestDispatcher(path).forward(req, resp);
		}
	}

}
