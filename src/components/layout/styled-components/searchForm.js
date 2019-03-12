import React from 'react'
import { Field, reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'
import Form from './search/form'
import Input from './search/field'
import Button from './search/button'

  const handleKeyPress = async(e, dispatch) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      return await dispatch(submit('searchForm'))
    }
  }


const SearchForm = (props) => {
	const {handleSubmit, submitting, auth, dispatch} = props;
	return (
		<Form onKeyDown={(e) => handleKeyPress(e, dispatch)}>
			<Field
        name="term"
        component={Input}
        returnKeyType="next"
        type="text"
        placeholder="Search"/>
      <Button onClick={handleSubmit}>
        <i className="fa fa-search" />
      </Button>
		</Form>
	)
}

export default reduxForm({
  form: 'searchForm'
})(SearchForm)
