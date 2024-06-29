const InputDefault = (props) => {
    return (
        <>
          <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.action}
            placeholder={props.placeholder}
          />
        </>
    );
}

export default InputDefault;