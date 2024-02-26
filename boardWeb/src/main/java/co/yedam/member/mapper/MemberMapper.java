package co.yedam.member.mapper;

import java.util.List;

import co.yedam.common.SearchVO;
import co.yedam.member.Member;

public interface MemberMapper {
	Member selectMember(Member member);
	int insertMember(Member member);
	
	List<Member> memberList(SearchVO search);
	int getTotalMember(SearchVO search);
}
