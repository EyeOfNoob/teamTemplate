package co.yedam.common;

import lombok.Data;

@Data
public class PageDTO {
	private int page;
	private int starPage, endPage; // 페이지가 일정수 이상일때 현재 보여주는 페이지를 기준으로 페이지표시
	private boolean prev, next;

	public PageDTO(int page, int totalCnt) {
		this.page = page; //현재 페이지
		int realEnd = (int) Math.ceil(totalCnt / 5.0); //실제 마지막 페이지
		
		this.endPage = (int) Math.ceil(page / 10.0) * 10;
		this.starPage = this.endPage - 9;
		
		this.endPage = this.endPage > realEnd ? realEnd : this.endPage;
		
		this.prev = this.starPage > 1;
		this.next = this.endPage < realEnd;
	}
}
