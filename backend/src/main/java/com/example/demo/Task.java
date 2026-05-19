package com.example.demo;

public class Task {

	private String taskdescription;
	private String oldTaskdescription;
	private String priority = "Mittel";
	private boolean completed = false;

	public Task() {
	}

	public String getTaskdescription() {
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) {
		this.taskdescription = taskdescription;
	}

	public String getOldTaskdescription() {
		return oldTaskdescription;
	}

	public void setOldTaskdescription(String oldTaskdescription) {
		this.oldTaskdescription = oldTaskdescription;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
}