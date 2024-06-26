import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { getUserById } from "./appwrite";
interface UseAppwriteProps {
  userId: string;
}
const useGetUser = ({ userId }: UseAppwriteProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserById(userId);
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useGetUser;
