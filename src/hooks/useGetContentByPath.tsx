import { PLACEHOLDER_FILENAME } from "@/configs/const";
import { getObject } from "@/utils/OctokitInstance";
import { useState } from "react"

export enum TipStatus {
  idle,
  loading,
  empty,
  error,
  success,
}


const useGetContentByPath = () => {
  const [tipStatus, setTipStatus] = useState(TipStatus.idle);
  const [files, setFiles] = useState<any[]>([]);
  const [queryTmp, setQuery] = useState({})

  const getFiles = async (query?: any) => {
    if (query) setQuery(query);
    setFiles([]);
    try {
      setTipStatus(TipStatus.loading);
      const res = await getObject(query || queryTmp);
      const files = (res.data as any[]).filter(v => v.name !== PLACEHOLDER_FILENAME);
      if (res.status === 200) {
        if (files.length === 0) {
          setTipStatus(TipStatus.empty);
          return;
        }
        setFiles(files);
        setTipStatus(TipStatus.success);
        return;
      }
      
      setTipStatus(TipStatus.error);
    } catch (error: any) {
      console.log(error.message)
      if (error.message.includes('empty')) {
        setTipStatus(TipStatus.empty);
        return;
      }
      setTipStatus(TipStatus.error);
    }
  }


  return {
    getFiles,
    tipStatus,
    files,
    setFiles,
  }
};

export default useGetContentByPath;
