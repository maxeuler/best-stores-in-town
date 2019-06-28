import styled from 'styled-components';

const Form = styled.form`
  max-width: 900px;
  margin: 5rem auto;
  border: 1px solid #ccc;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  label {
    font-size: 1.8rem;
    font-weight: 600;
  }
  input[type='text'],
  textarea {
    border: 1px solid #ccc;
  }
  input,
  textarea {
    padding: 0.5rem;
    font-size: 1.6rem;
    display: block;
    width: 100%;
    margin: 2rem 0;
  }
  h3 {
    font-size: 4rem;
    text-transform: uppercase;
    margin: 2rem 1rem;
    text-align: right;
  }
  button {
    margin-top: 2rem;
    background: ${props => props.theme.primary};
    border: none;
    border-radius: 2px;
    padding: 1rem 4rem;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 600;
    align-self: flex-end;
    cursor: pointer;
    opacity: 0.9;
    :hover {
      opacity: 1;
    }
  }
`;

export default Form;
