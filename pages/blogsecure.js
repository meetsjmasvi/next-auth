import { getSession, useSession } from "next-auth/react";

// ////////// This page is created to demo, how to secure page server side ////////// //
// ////////// where you learn how to redirect to sign and once sign-in how ////////// //
// ////////// to use the callback url to come back to the same page        ////////// //

export default function Blogsecure({ data }) {
  // basically useSession function returns two properties
  // which is data and status
  const { data: session, ...rest } = useSession();

  return (
    <>
      <h2>Blog Secure Page!</h2>
      <p>Diplaying all {data}</p>
      <br />
      <br />
      <p>
        // ////////// This page is created to demo, how to secure page server
        side ////////// <br />
        // // ////////// where you learn how to redirect to sign and once
        sign-in how ////////// // <br />
        // ////////// to use the callback url to come back to the same page
        ////////// //
      </p>
    </>
  );
}

export async function getServerSideProps(context) {
  // getSession return promise, the promise resolves session information
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination:
          "/api/auth/signin?callbackUrl=http://localhost:3000/blogsecure",
      },
    };
  }

  return {
    props: {
      session,
      data: session ? "personalised blogs!" : "free blogs!",
    },
  };
}
