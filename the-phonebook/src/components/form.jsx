const Form = ({ onSubmit, newName, newPhone, handleName, handlePhone }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        phone: <input type="number" value={newPhone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
