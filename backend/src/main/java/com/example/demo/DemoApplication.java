package com.example.demo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	private List<Task> tasks = new ArrayList<>();

	@CrossOrigin
	@GetMapping("/")
	public List<Task> getTasks() {
		return tasks;
	}

	@CrossOrigin
	@PostMapping("/tasks")
	public String addTask(@RequestBody String taskdescription) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			Task task = mapper.readValue(taskdescription, Task.class);

			if (task.getTaskdescription() == null || task.getTaskdescription().trim().isEmpty()) {
				return "redirect:/";
			}

			if (task.getPriority() == null || task.getPriority().trim().isEmpty()) {
				task.setPriority("Mittel");
			}

			for (Task t : tasks) {
				if (t.getTaskdescription().equals(task.getTaskdescription())) {
					return "redirect:/";
				}
			}

			tasks.add(task);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return "redirect:/";
	}

	@CrossOrigin
	@PostMapping("/update")
	public String updateTask(@RequestBody String taskdescription) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			Task updatedTask = mapper.readValue(taskdescription, Task.class);

			if (updatedTask.getTaskdescription() == null || updatedTask.getTaskdescription().trim().isEmpty()) {
				return "redirect:/";
			}

			if (updatedTask.getPriority() == null || updatedTask.getPriority().trim().isEmpty()) {
				updatedTask.setPriority("Mittel");
			}

			for (Task t : tasks) {
				if (t.getTaskdescription().equals(updatedTask.getOldTaskdescription())) {
					t.setTaskdescription(updatedTask.getTaskdescription());
					t.setPriority(updatedTask.getPriority());
					return "redirect:/";
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return "redirect:/";
	}

	@CrossOrigin
	@PostMapping("/done")
	public String toggleDone(@RequestBody String taskdescription) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			Task task = mapper.readValue(taskdescription, Task.class);

			for (Task t : tasks) {
				if (t.getTaskdescription().equals(task.getTaskdescription())) {
					t.setCompleted(!t.isCompleted());
					return "redirect:/";
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return "redirect:/";
	}

	@CrossOrigin
	@PostMapping("/delete")
	public String delTask(@RequestBody String taskdescription) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			Task task = mapper.readValue(taskdescription, Task.class);
			Iterator<Task> it = tasks.iterator();

			while (it.hasNext()) {
				Task t = it.next();

				if (t.getTaskdescription().equals(task.getTaskdescription())) {
					it.remove();
					return "redirect:/";
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return "redirect:/";
	}
}