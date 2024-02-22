package co.yedam.board;

import java.util.Date;

import lombok.Data;

@Data
public class Board {
	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private int viewCnt;
	private Date createDate;
}
