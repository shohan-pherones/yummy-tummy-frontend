"use client";

import { useCreateUser } from "@/hooks/useCreateUser";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";

const MyAuth0Provider = ({ children }: PropsWithChildren) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const callbackUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URI;

  const { createUser } = useCreateUser();

  if (!domain || !clientId || !callbackUri) {
    throw new Error("Unable to initialize auth0");
  }

  const onRedirectCallback = (appSate?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
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
