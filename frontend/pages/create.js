import StoreForm from '../components/StoreForm';
import CheckAuth from '../components/CheckAuth';

const Create = () => (
  <CheckAuth>
    <StoreForm />
  </CheckAuth>
);

export default Create;
