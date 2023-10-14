import React from "react";
import { useRouter } from "next/dist/client/router";

import { useDiscovery, useAuth } from "@/hooks";
import Wrapper from "@/components/Wrapper";

const Auth = () => {
  const router = useRouter();
  const { connect } = useAuth();
  const { instances, loading } = useDiscovery(1);

  if (router.query.auth_callback) router.push('/');

  return (
    
      <div>
        {loading && !instances.length ? (
          <p>Loading...</p>
        ) : (
          <button onClick={() => connect(instances[0])}>{instances[0].locationName}</button>
        )}
      </div>
    
  );
};

export default Auth;
