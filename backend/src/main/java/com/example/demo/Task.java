package com.example.demo;

/** the simplest task 
 * 
 * @author luh
 */
public class Task {
	
	private String taskdescription; // wichtig: Name muss exakt gleich wie im Frontend sein
	private String oldTaskdescription;
	private String priority = "Mittel";

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
}