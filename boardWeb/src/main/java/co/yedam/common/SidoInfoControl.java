package co.yedam.common;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import co.yedam.reply.service.ReplyService;
import co.yedam.reply.service.ReplyServiceImpl;

public class SidoInfoControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.setContentType("text/json;charset=utf-8");
		
		ReplyService svc = new ReplyServiceImpl();
		List<Map<String, Object>> list = svc.getCntSido();
		
		Gson gson = new GsonBuilder().create();
		resp.getWriter().print(gson.toJson(list));
	}

}
