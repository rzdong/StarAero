export function formatFileSize(bytes: number, isFile: boolean): string {
  if (!isFile) return ''; 
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isImage(filename: string) {
  // 列举浏览器可以显示的图片文件扩展名
  var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

  // 获取文件扩展名，并转换为小写
  var extension = (filename.split('.').pop() as string).toLowerCase();

  // 检查扩展名是否在我们的列表中
  return imageExtensions.includes(extension);
}