package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
		assertTrue(true, "alles gut");
	}


	@Test
	void taskHasDefaultPriorityMittel() {
		Task task = new Task();

		assertEquals("Mittel", task.getPriority());
	}

	@Test
	void taskIsNotCompletedByDefault() {
		Task task = new Task();

		assertFalse(task.isCompleted());
	}

	@Test
	void taskCanBeMarkedAsCompleted() {
		Task task = new Task();

		task.setCompleted(true);

		assertTrue(task.isCompleted());
	}

	@Test
	void taskDescriptionCanBeChanged() {
		Task task = new Task();

		task.setTaskdescription("Altes Todo");
		task.setTaskdescription("Neues Todo");

		assertEquals("Neues Todo", task.getTaskdescription());
	}

}
