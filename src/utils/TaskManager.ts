
import Task, { TaskStatus } from "./Task";
import EventEmitter from 'eventemitter3';

class TaskManager extends EventEmitter {
  private static instance: TaskManager;
  /** 最大并行上传数目 */
  private maxProcess = 5;
  /** 当前并行上传的数目，如果无上传，就是0 */
  private currTaskIndex = 0;

  private updateTimeGap = 1000;

  /** 被管理的上传任务 */
  public tasks: Task[] = [];

  public intervalId: any = null;

  private constructor(){
    super();
  };
  public static getInstance(): TaskManager {
    if (!this.instance) {
      this.instance = new TaskManager();
    }
    return this.instance;
  };

  /** 新建上传任务并加入到tasks */
  public addTask({ owner, repo, file, uploadPath, uuid,
  }: {
    owner: string, repo: string, file: File, uploadPath: string, uuid: string,
  }) {
    const newTask = new Task(
      uploadPath,
      owner,
      repo,
      file,
      uuid,
      ({ status, task }) => {  // 当task有跟新时，回调此函数，此函数调用this.update 反馈给外部
        this.update(status, task);
      },
    );
    this.tasks.push(newTask);
    this.createInterval();
  }

  public stopTask(uuid: string) {
    const findTask = this.tasks.find(v => v.uuid === uuid);
    findTask?.stop();
  }

  public startTask(uuid: string) {
    const findTask = this.tasks.find(v => v.uuid === uuid);
    findTask?.restart();
  }

  public deleteTask(uuid?: string) {
    if (!uuid) {
      this.tasks = [];
      return;
    }
    const findTaskIndex = this.tasks.findIndex(v => v.uuid === uuid);
    this.tasks.splice(findTaskIndex, 1);
  }

  /** 创建定时器，指定时间内触发外部监听器 */
  public createInterval() {
    if (this.intervalId) return;
    this.emit('taskUpdate');
    this.intervalId = setInterval(() => {
      console.log('taskUpdate');
      this.emit('taskUpdate');
    }, this.updateTimeGap);
  }

  /** 子任务success的时候会触发 taskUploaded 是事件 */
  public update(status: TaskStatus, task?: Task) {
    if (status === TaskStatus.success) {
      this.emit('taskUploaded', task);
    }
    if (this.tasks.every(v => v.taskStatus !== TaskStatus.uploading)) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.emit('taskUpdate');
    }
  }

}

export default TaskManager;

