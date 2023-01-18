import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

// ///////// USING FETCH STATEMENT TO GET SESSION DETAIL THROUGH //////// //
// ///////// CLIENT SIDE FETCHING WORK WELL BUT, ACCESSING THE   //////// //
// ///////// SAME API THROUGH GETSERVERSIDEPROPS WON'T WORK      //////// //
// ///////// BASED ON NEXT.JS DOCUMENTATION THE LOGIC HAS TO BE  //////// //
// ///////// IMPORTED TO GETSERVERSIDEPROS METHOD WORK AS BELOW  //////// //

////////////  APPROACH #1
// export default function CheckSecureAPI() {
//   const [displayMessage, setDisplayMessage] = useState("");
//   const [hasError, setHasError] = useState(null);

//   useEffect(() => {
//     const fetchSessionData = async () => {
//       const response = await fetch("http://localhost:3000/api/secure-api");
//       const { error = null, message = null } = await response.json();

//       if (error) {
//         setHasError(true);
//         setDisplayMessage(error);
//       } else {
//         setDisplayMessage(message);
//       }
//     };

//     fetchSessionData();
//   }, []);

//   if (hasError) {
//     return <h2>Sorry! {displayMessage}</h2>;
//   }

//   return <h1>You api requset is {displayMessage}</h1>;
// }

////////////  APPROACH #2
export default function CheckSecureAPI({ error, message }) {
  if (error) {
    return <h2>Sorry! {error}</h2>;
  }

  return <h1>You api requset is {message}</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      error: !session ? "Un-Authenticated User!" : null,
      message: session ? "Success!" : null,
    },
  };
}
