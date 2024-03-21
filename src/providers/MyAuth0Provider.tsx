"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const MyAuth0Provider = ({ children }: PropsWithChildren) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const callbackUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URI;

  const router = useRouter();

  if (!domain || !clientId || !callbackUri) {
    throw new Error("Unable to initialize auth0");
  }

  const onRedirectCallback = () => {
    router.push("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callbackUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default MyAuth0Provider;
