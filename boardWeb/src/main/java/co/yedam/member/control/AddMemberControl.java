package co.yedam.member.control;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

import co.yedam.common.Control;
import co.yedam.member.Member;
import co.yedam.member.service.MemberServiceImpl;

public class AddMemberControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
//		1)요청정보 2)저장경로 3)최대크기 4)인코딩방식 5)리네임정책 
		String savePath = req.getServletContext().getRealPath("static/img");
//					  바이트	메가바이트 5mb
		int maxSize = 1024 * 1024 * 5;
		String enc = "utf-8";
//													 요청정보   저장경로   최대크기 인코딩방식 		      리네임정책 
		MultipartRequest multi = new MultipartRequest(req, savePath, maxSize, enc, new DefaultFileRenamePolicy());
		String id = multi.getParameter("id");
		String pw = multi.getParameter("pw");
		String name = multi.getParameter("name");
		String img = multi.getFilesystemName("image"); //변경된 파일의 이름.

		Member member = new Member();
		member.setId(id);
		member.setPw(pw);
		member.setName(name);
		member.setImage(img);
		
//		mapper : insertMember
//		service : addMember
//		정상처리시 게시글목록이동/아니면 에러페이지
		MemberServiceImpl svc = new MemberServiceImpl();
		if(svc.addMember(member)) {
			resp.sendRedirect("boardList.do");
		}else {
			req.setAttribute("message", "오류발생.");
			String path = "WEB-INF/view/member/error.jsp";
			req.getRequestDispatcher(path).forward(req, resp);
		}
		
	}

}
