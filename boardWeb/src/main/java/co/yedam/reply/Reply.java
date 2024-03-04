package co.yedam.reply;

import java.util.Date;

import lombok.Data;

@Data
public class Reply {
	private int replyNo;
	private int boardNo;
	private String reply;
	private String replyer;
	private Date replyDate;
}
