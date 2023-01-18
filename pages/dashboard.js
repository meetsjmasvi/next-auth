import { useSession, signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn("github");
      } else {
        setLoading(false);
      }
    };

    securePage();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return <h2>Dashboard Page!</h2>;
}
