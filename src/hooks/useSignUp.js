import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

export const useSignUp = () => {

    const [mutate, result] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
       
        return mutate({ variables: { user: { username, password } } });

    };

    return [signUp, result];
};

export default useSignUp;