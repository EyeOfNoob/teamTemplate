package co.yedam;

import org.apache.ibatis.session.SqlSession;

import co.yedam.common.DataSource;
import co.yedam.common.SearchVO;
import co.yedam.reply.Reply;
import co.yedam.reply.mapper.ReplyMapper;

public class MapperTest {
	public static void main(String[] args) {
		SqlSession session = DataSource.getInstance().openSession(true);
		ReplyMapper mapper = session.getMapper(ReplyMapper.class);
		
		SearchVO search = new SearchVO();
		search.setBno(163);
		search.setRpage(2);
		
//		Reply rep = new Reply();
//		rep.setBoardNo(163);
//		rep.setReply("163번 댓글입니다");
//		rep.setReplyer("newbie");
//		mapper.insertReply(rep);
//		
//		System.out.println(rep);
		
//		mapper.deleteReply(5);
		
		mapper.selectList(search) // List<Reply>
				.forEach(reply -> System.out.println(reply.toString()));
	}
}
