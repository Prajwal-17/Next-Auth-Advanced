import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import React from "react";

export default function Email(props: any) {
  const { url } = props;

  return (
    <Html lang="en">
      <p>HI</p>
      <h1>This is Verification Email </h1>
      <Button href={url}>Verify</Button>
    </Html>
  );
}
