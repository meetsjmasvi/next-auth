import { getSession } from "next-auth/react";

// this demo api is to exmplain how to secure api routes
// and to send response based on the user authentication
const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: "Unauthenticated User!" });
  } else {
    res.status(200).json({ message: "Success!", session });
  }
};

export default handler;

// If you require more to do, you can do that base on the informtion
// provided in the session object eg: authorization check for accessing
// a page or a feature etc.
