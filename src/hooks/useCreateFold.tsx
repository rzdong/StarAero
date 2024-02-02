import { PLACEHOLDER_FILENAME } from "@/configs/const";
import { uploadFile } from "@/utils/OctokitInstance";
import { useState } from "react";


const useCreateFold = () => {

  const [loading, setLoading] = useState(false);
  
  const createFold = async ({
    owner = '',
    repo = '',
    path = '',
  }) => {
    setLoading(true);
    const res = await uploadFile({
      owner,
      repo,
      path: `${path}/${PLACEHOLDER_FILENAME}`, // 在当前目录下创建一个文件夹，
      content: 'cGxhY2Vob2xkZXI=',
    });
    setLoading(false);
    return res;
  }

  return { loading, createFold };
};

export default useCreateFold;
