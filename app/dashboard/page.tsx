"use client"

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Dashboard() {

  const { data: session } = useSession();

  // useEffect(() => {
  //   console.log("session data client", session)
  // }, [])

  return (<>
    <h1>Super Secret Page </h1>
    {/* <div>User ID: {data}</div> */}
  </>)
}
