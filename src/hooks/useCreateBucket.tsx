import { createRepository } from "@/utils/OctokitInstance";
import { useState } from "react";


const useCreateBucket = () => {

  const [loading, setLoading] = useState(false);
  
  const createBucket = async ({
    name = '',
    description = '',
    isPrivate = false,
  }) => {
    setLoading(true);
    const res = await createRepository({name, description, isPrivate});
    setLoading(false);
    return res;
  }

  return { loading, createBucket };
};

export default useCreateBucket;
