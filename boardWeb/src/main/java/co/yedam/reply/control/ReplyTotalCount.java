package co.yedam.reply.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.common.Control;
import co.yedam.reply.service.ReplyService;
import co.yedam.reply.service.ReplyServiceImpl;

public class ReplyTotalCount implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String bno = req.getParameter("bno");

		ReplyService svc = new ReplyServiceImpl();
		int cnt = svc.totalCount(Integer.parseInt(bno));

		// {"totalCount":3}
		resp.getWriter().print("{\"totalCount\":" + cnt + "}");
	}

}
