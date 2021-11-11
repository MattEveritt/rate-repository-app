import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

export const useAddReview = () => {

    const [mutate, result] = useMutation(CREATE_REVIEW);

    const addReview = async ({ repositoryName, ownerName, rating, text }) => {
       
        return mutate({ variables: { review: { repositoryName, ownerName, rating, text } } });

    };

    return [addReview, result];
};

export default useAddReview;