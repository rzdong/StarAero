import { uploadFile } from './OctokitInstance';

export enum TaskStatus {
  /** 空闲，init */
  idle,
  /** 等待，由于最大并发数限制，当前任务可能会在上传前等待的状态 */
  wait,
  /** 停止，任务被用户手动停止 */
  stop,
  /** 解析中，任务文件需要被解析为base64 的content */
  resolveing,
  /** 上传中，任务正在上传 */
  uploading,
  /** 成功，任务已经上传成功 */
  success,
  /** 失败，任务上传失败 */
  error,
}

interface TaskClass {
  /** 当前状态 */
  taskStatus: TaskStatus;
  /** 任务uuid */
  uuid: string | null;
  /** 任务进度 */
  taskProgress: boolean;
  /** 要上传的文件 */
  file: File;
  /** 要上传的路径 */
  uploadPath: string;
  /** 要上传的content数据 */
  uploadData: string;
  /** 任务有更新时通知外面 */
  update: (props: { status: TaskStatus }) => void;
};


class Task implements TaskClass {
  public taskStatus: TaskStatus = TaskStatus.idle;
  public taskProgress = false;
  public uploadData: string = '';
  private abortController!: AbortController;

  public constructor(
    public uploadPath: string,
    public owner: string,
    public repo: string,
    public file: File,
    public uuid: string,
    public update: (props: { status: TaskStatus, task?: Task }) => void,
  ) {
    this.createUpload();
  }

  /** 停止上传 */
  public stop(): void {
    if (this.taskStatus === TaskStatus.uploading) { // 已经在上传
      // 调用停止上传
      this.abortController?.abort();
    }
    // 其他情况，改为stop
    this.taskStatus = TaskStatus.stop;
    const _this = this;
    this.update({ status: TaskStatus.stop, task: _this });
  }

  /** 重新上传 */
  public restart(): void {
    // 调用上传
    this.createUpload();
  }

  /** 开始上传 */
  public async createUpload() {
    const _this = this;
    this.taskStatus = TaskStatus.resolveing; // 开始解析文件内容
    this.update({ status: TaskStatus.resolveing, task: _this });
    
    if (!this.uploadData) {
      const [content] = await this.getFileBase64(this.file);
      this.uploadData = content;
    }

    const controller = new AbortController();
    this.abortController = controller

    this.taskStatus = TaskStatus.uploading; //开始上传
    this.update({ status: TaskStatus.uploading, task: _this });

    try {
      const res = await uploadFile({
        owner: this.owner,
        repo: this.repo,
        path: this.uploadPath,
        content: this.uploadData,
        signal: controller.signal,
      });
      if (res.status === 201) {
        this.taskStatus = TaskStatus.success;
        this.update({ status: TaskStatus.success, task: _this });
        return;
      }
  
      this.taskStatus = TaskStatus.error;
      this.update({ status: TaskStatus.error });
    } catch (error: any) {
      const res = error.toString();
      if (!res.includes('AbortError')) {
        this.taskStatus = TaskStatus.error;
        this.update({ status: TaskStatus.error });
      }
    }
  }

  /** 解析文件为base64 */
  public getFileBase64 = async (file: File): Promise<any> => {
    const _this = this;
    this.update({ status: TaskStatus.resolveing, task: _this });
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const baseContent = (reader.result as string)!.replace(/data:\S+;base64,/, '');
        resolve([baseContent, null]);
      }
      reader.readAsDataURL(file);
      reader.onerror = (e) => {
        resolve([null, e]);
      }
    })
  }

}

export default Task;
