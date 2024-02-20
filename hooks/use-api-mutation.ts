import { useMutation } from 'convex/react';
import { useState } from 'react';

import React from 'react';

const useApiMutation = (mutationFn: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFn);

    const mutate = (payload: any) => {
        setPending(true);
        return apiMutation(payload)
            .finally(() => setPending(false))
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            });
    };

    return {
        mutate,
        pending,
    };
};

export default useApiMutation;
