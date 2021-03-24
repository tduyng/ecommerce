import React, { useEffect, useState } from 'react';
import {
  MeDocument,
  MeQuery,
  useAutoRefreshMutation,
  useMeQuery,
  User,
} from 'src/generated/graphql';

export const useUserAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { data, loading } = useMeQuery();
  const [refresh] = useAutoRefreshMutation();

  useEffect(() => {
    if (loading) return;
    if (data?.me?.user) {
      setUser(data?.me?.user as User);

      // Try access refreshToken if accessToken expired
    } else {
      const callRefresh = async () => {
        try {
          const response = await refresh({
            variables: {},
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: { user: data?.autoRefresh?.user },
                },
              });
            },
          });
          if (response?.data?.autoRefresh?.user) {
            setUser(response?.data?.autoRefresh?.user as User);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.log(error.message);
          setUser(null);
        }
      };
      callRefresh();
    }
  }, [data, loading]);

  return [user, setUser] as const;
};
