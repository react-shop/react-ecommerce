import React from 'react'
import { Field, reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'
import FormCategory from '../components/form/formCategory'
import Input from '../components/form/field'
import Button from '../components/form/button'

  const handleKeyPress = async(e, dispatch) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      return await dispatch(submit('searchForm'))
    }
  }


const CategoryForm = (props) => {
	const {handleSubmit, submitting, auth, dispatch} = props;
	return (
		<FormCategory onKeyDown={(e) => handleKeyPress(e, dispatch)}>
      <div>
        <label>Sizes:</label>
        <div>
          <Field name="sizes" component="select">
            <option></option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Field>
        </div>
      </div>
      <div>
        <label>Colors:</label>
        <div>
          <Field name="colors" component="select">
            <option></option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </Field>
        </div>
      </div>
      <Button onClick={handleSubmit}>
        Filter
      </Button>
		</FormCategory>
	)
}

export default reduxForm({
  form: 'categoryForm'
})(CategoryForm)
