package co.yedam.board;

import lombok.Data;

@Data
public class Book {
	private String bookCode;
	private String bookName;
	private String author;
	private String press;
	private int price;
}
