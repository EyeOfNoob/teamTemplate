package co.yedam;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import co.yedam.common.DataSource;
import co.yedam.reply.mapper.ReplyMapper;

public class MapperTest {
	public static void main(String[] args) {
//		리플테스트
//		SqlSession session = DataSource.getInstance().openSession(true);
//		ReplyMapper mapper = session.getMapper(ReplyMapper.class);
		
//		SearchVO search = new SearchVO();
//		search.setBno(163);
//		search.setRpage(2);
		
//		Reply rep = new Reply();
//		rep.setBoardNo(163);
//		rep.setReply("163번 댓글입니다");
//		rep.setReplyer("newbie");
//		mapper.insertReply(rep);
//		
//		System.out.println(rep);
		
//		mapper.deleteReply(5);
		
//		mapper.selectList(search) // List<Reply>
//				.forEach(reply -> System.out.println(reply.toString()));
		
//		센터입력/삭제
//		Center c1 = new Center();
//		c1.setId(1);
//		c1.setCenterName("center1");
//		c1.setSido("sido1");
//		c1.setPhoneNumber("010-1111");
//		c1.setAddress("address1");
//		Center c2 = new Center();
//		c2.setId(2);
//		c2.setCenterName("center2");
//		c2.setSido("sido2");
//		c2.setPhoneNumber("010-2222");
//		c2.setAddress("address2");
//		Center[] list = {c1, c2};
//		
//		ReplyMapper mapper = DataSource.getInstance()//
//				.openSession(true)//
//				.getMapper(ReplyMapper.class);
//		
//		//System.out.println(mapper.insertCenter(list));
//		System.out.println(mapper.deleteCenter(list));
		
//		맵에 넣을 시도카운팅 테스트
		ReplyMapper mapper = DataSource.getInstance()//
				.openSession(true)//
				.getMapper(ReplyMapper.class);
		
		List<Map<String, Object>> list = mapper.countPerSido();
		for(Map<String, Object> map : list) {
			Set<Entry<String, Object>> set = map.entrySet();
			System.out.println(set);
			for(Entry<String, Object> entry : set) {
				System.out.println(entry.getKey() + ":" + entry.getValue());
			}
			System.out.println("================================");
		}
	}
}
