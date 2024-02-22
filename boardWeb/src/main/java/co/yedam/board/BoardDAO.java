package co.yedam.board;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import co.yedam.common.DAO;

public class BoardDAO {
	Connection conn;
	ResultSet rs;
	PreparedStatement psmt;
	
//	삭제
	public boolean deleteBoard(int bno) {
		conn = DAO.getConn();
		String sql = "DELETE FROM tbl_board "
				+ "   WHERE  board_no = ? ";
				
				try {
					psmt = conn.prepareStatement(sql);
					psmt.setInt(1, bno);
					
					int r = psmt.executeUpdate();
					if(r >0) {
						return true;
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
		return false;
	}
	
//	수정
	public boolean updateBoard(Board board) {
		conn = DAO.getConn();
		String sql = "UPDATE tbl_board "
				+ "   SET    writer = ?, "
				+ "          content = ?, "
				+ "          title = ? "
				+ "   WHERE  board_no = ? ";
		try {
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, board.getWriter());
			psmt.setString(2, board.getContent());
			psmt.setString(3, board.getTitle());
			psmt.setInt(4, board.getBoardNo());
			
			int r = psmt.executeUpdate();
			if(r >0) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
//	등록.
	public boolean insertBoard(Board board) {
		conn = DAO.getConn();
		String sql = "INSERT INTO tbl_board (board_no, "//
				+ "                          title, "//
				+ "                          content, "//
				+ "                          writer) "//
				+ "VALUES(board_seq.nextval, "//
				+ "       ?, "//
				+ "       ?, "//
				+ "       ?)";
		
		try {
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, board.getTitle());
			psmt.setString(2, board.getContent());
			psmt.setString(3, board.getWriter());
			int r = psmt.executeUpdate();
			if(r >0) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	
//	목록.
	public List<Board> boardList(){
		conn = DAO.getConn();
		List<Board> list = new ArrayList<>();
		String sql = "SELECT   * "
				+ "   FROM     tbl_board "
				+ "   ORDER BY 1";
		
		try {
			psmt = conn.prepareStatement(sql);
			rs = psmt.executeQuery();
			while(rs.next()) {
				Board board = new Board();
				board.setBoardNo(rs.getInt("board_no"));
				board.setContent(rs.getString("content"));
				board.setTitle(rs.getString("title"));
				board.setCreateDate(rs.getDate("create_date"));
				board.setViewCnt(rs.getInt("view_cnt"));
				board.setWriter(rs.getString("writer"));
				list.add(board);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
//				if (conn != null) {
					conn.close();
//				}
//				if (psmt != null) {
					psmt.close();
//				}
//				if (rs != null) {
					rs.close();
//				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}
	
}
