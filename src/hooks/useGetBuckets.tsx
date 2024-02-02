import { BUCKET_PREFIX } from "@/configs/const";
import { getRepositories } from "@/utils/OctokitInstance";
import { useEffect, useMemo, useState } from "react";

export interface SelectOptions {
  [key: string]: any;
}

const useGetBuckets = () => {
  const [currentBucket, setCurrentBucket] = useState(localStorage.getItem('current-bucket') ||'');
  const [buckets, setBuckets] = useState<SelectOptions[]>([]);
  const [loading, setLoading] = useState(false);

  const getBuckets = async () => {
    setLoading(true);
    const res = await getRepositories();
    setLoading(false);
    if (res.data.length > 0) {
      const buckets = res.data.filter(bucket => bucket.name.startsWith(BUCKET_PREFIX));
      setBuckets(buckets);
    }
  };

  useEffect(() => {
    getBuckets();
  }, []);

  const selectBucket = useMemo(() => {
    return buckets.find(bucket => bucket.name === currentBucket);
  }, [currentBucket, buckets]);


  useEffect(() => {
    if (currentBucket) {
      localStorage.setItem('current-bucket', currentBucket);
    }
  }, [currentBucket]);

  return {
    buckets,
    loading,
    currentBucket,
    selectBucket,
    setBuckets,
    refreshBuckets: getBuckets,
    onBucketChange: (v: string) => setCurrentBucket(v),
  }
};

export default useGetBuckets;
