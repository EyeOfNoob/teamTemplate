package co.yedam.reply.mapper;

import java.util.List;
import java.util.Map;

import co.yedam.common.Center;
import co.yedam.common.SearchVO;
import co.yedam.reply.Reply;

public interface ReplyMapper {
//	목록,등록,삭제
//	List<Reply> selectList(@Param("bno") int bno, @Param("page"));
	List<Reply> selectList(SearchVO search); //여러값을 한번에 보내기위해 클래스이용
	
	List<Reply> selectList2(int bno);
	
//	마지막에 등록된 댓글 확인
	Reply lastReply(int bno);
	
	int insertReply(Reply reply);
	int deleteReply(int rno);
//	페이지 계산위한 전체건수.
	int selectCount(int bno);
	
//	여러건등록(센터).
	int insertCenter(Center[] array);
	int deleteCenter(Center[] array);
	
//	Chart.
	List<Map<String, Object>> countPerSido();
}
