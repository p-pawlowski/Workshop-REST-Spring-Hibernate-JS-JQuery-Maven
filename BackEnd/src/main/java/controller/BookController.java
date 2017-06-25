package controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import bean.MockBookService;
import model.Book;

@RestController
@RequestMapping("/books")
public class BookController {
	
	@Autowired
	private MockBookService bookService;

	@GetMapping("/all")
	public @ResponseBody List<Book> getList(){
		return bookService.getList();
	}
	
	@GetMapping("/{id}")
	public Book getBook(@PathVariable Long id){
		return this.bookService.getById(id);
	}
	
	@PostMapping("/add")
	public void addBook( @RequestBody Book book){
		bookService.add(book);
	}
	
	@DeleteMapping("remove/{id}")
	public void removeBook(@PathVariable Long id){
		bookService.deleteById(id);
	}		

}