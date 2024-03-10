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

public class LastReplyControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.setContentType("text/json;charset=utf-8");
		
		String bno = req.getParameter("bno");

		ReplyService svc = new ReplyServiceImpl();
		Map<String, Object> map = new HashMap<>();
		
		Reply currRep = svc.currReply(Integer.parseInt(bno));
		
		map.put("currRepNo", currRep.getReplyNo());
		map.put("currRepDate", currRep.getReplyDate());
		
		Gson gson = new GsonBuilder().create();
		resp.getWriter().print(gson.toJson(map));

	}

}
