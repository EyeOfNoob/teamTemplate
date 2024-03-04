package co.yedam.reply.control;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import co.yedam.common.Control;
import co.yedam.reply.Reply;
import co.yedam.reply.service.ReplyService;
import co.yedam.reply.service.ReplyServiceImpl;

public class AddReplyControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.setContentType("text/json;charset=utf-8");
		
		String bno = req.getParameter("bno");
		String replyer = req.getParameter("replyer");
		String reply = req.getParameter("reply");

		Reply rep = new Reply();
		rep.setBoardNo(Integer.parseInt(bno));
		rep.setReply(reply);
		rep.setReplyer(replyer);

		ReplyService svc = new ReplyServiceImpl();
		Map<String, Object> map = new HashMap<>();
		
		if (svc.addReply(rep)) {
			map.put("retCode", "OK");
			map.put("retVal", rep);
		} else {
			map.put("retCode", "NG");
		}
		Gson gson = new GsonBuilder().create();
		resp.getWriter().print(gson.toJson(map));

	}

}
