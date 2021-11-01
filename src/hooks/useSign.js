import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();

    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
       
        return mutate({ variables: { credentials: { username, password } } });

    };

    return [signIn, result];
};

export default useSignIn
