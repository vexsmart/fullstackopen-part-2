const Message = ({ message, style }) => {
  if (message === null) {
    return null;
  }
  return <div className="error" style={style}>{message}</div>;
};

export default Message