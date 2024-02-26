package co.yedam.member.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.yedam.common.DataSource;
import co.yedam.common.SearchVO;
import co.yedam.member.Member;
import co.yedam.member.mapper.MemberMapper;

public class MemberServiceImpl implements MemberService {

	SqlSession session = DataSource.getInstance().openSession(true);
	MemberMapper mapper = session.getMapper(MemberMapper.class);

	@Override
	public Member loginCheck(Member member) {
		return mapper.selectMember(member);
	}

	@Override
	public boolean addMember(Member member) {
		if (mapper.insertMember(member) > 0) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<Member> memberList(SearchVO search) {
		// TODO Auto-generated method stub
		return mapper.memberList(search);
	}

	@Override
	public int memberTotalCnt(SearchVO search) {
		// TODO Auto-generated method stub
		return mapper.getTotalMember(search);
	}

}
