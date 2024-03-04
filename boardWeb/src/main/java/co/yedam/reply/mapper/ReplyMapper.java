package co.yedam.reply.mapper;

import java.util.List;

import co.yedam.common.SearchVO;
import co.yedam.reply.Reply;

public interface ReplyMapper {
//	목록,등록,삭제
//	List<Reply> selectList(@Param("bno") int bno, @Param("page"));
	List<Reply> selectList(SearchVO search); //여러값을 한번에 보내기위해 클래스이용
	int insertReply(Reply reply);
	int deleteReply(int rno);
//	페이지 계산위한 전체건수.
	int selectCount(int bno);
	
}
