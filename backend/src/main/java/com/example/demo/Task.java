package com.example.demo;

/** the simplest task 
 * 
 * @author luh
 */
public class Task {
  
  private String taskdescription;
  private String oldTaskdescription;

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

}