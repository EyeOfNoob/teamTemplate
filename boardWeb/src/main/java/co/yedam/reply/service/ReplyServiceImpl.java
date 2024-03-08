package co.yedam.reply.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import co.yedam.common.Center;
import co.yedam.common.DataSource;
import co.yedam.common.SearchVO;
import co.yedam.reply.Reply;
import co.yedam.reply.mapper.ReplyMapper;

public class ReplyServiceImpl implements ReplyService{

	SqlSession session = DataSource.getInstance().openSession(true);
	ReplyMapper mapper = session.getMapper(ReplyMapper.class);
	
	@Override
	public List<Reply> replyList(SearchVO search) {
		return mapper.selectList(search);
	}

	@Override
	public List<Reply> replyList2(int bno) {
		return mapper.selectList2(bno);
	}
	
	@Override
	public boolean addReply(Reply reply) {
		return mapper.insertReply(reply) == 1;
	}

	@Override
	public boolean removeReply(int rno) {
		return mapper.deleteReply(rno) == 1;
	}

	@Override
	public int totalCount(int bno) {
		return mapper.selectCount(bno);
	}

	@Override
	public int addCenter(Center[] array) {
		return mapper.insertCenter(array);
	}

	@Override
	public int removeCenter(Center[] array) {
		return mapper.deleteCenter(array);
	}

	@Override
	public List<Map<String, Object>> getCntSido() {
		return mapper.countPerSido();
	}


}
