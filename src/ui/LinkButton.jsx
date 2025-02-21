import { useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = `text-sm text-blue-500 hover:text-blue-600`;

  return (
    <button
      onClick={() => (to === -1 ? navigate(-1) : navigate(to))}
      className={className}
    >
      {children}
    </button>
  );
}

export default LinkButton;
