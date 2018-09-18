class EditInput extends React.Component {
  render() {
    const { display, ref, value, onChange, onBlur, onKeyPress } = this.props
    if (!display) {
      return <input className="edit" />
    }
    return (
      <input
        className="edit"
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
    )
  }
}

export default EditInput
