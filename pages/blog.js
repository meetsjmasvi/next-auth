import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Blog({ data }) {
  // basically useSession function returns two properties
  // which is data and status
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("user sesssion data : ", session);
  }, []);

  return (
    <>
      <h2>Blog Page!</h2>
      <p>Diplaying all {data}</p>
    </>
  );
}

export async function getServerSideProps(context) {
  // getSession return promise, the promise resolves session information
  const session = await getSession(context);

  return {
    props: {
      session,
      data: session ? "personalised blogs!" : "free blogs!",
    },
  };
}
