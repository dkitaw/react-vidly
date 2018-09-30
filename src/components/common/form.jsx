import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    };

    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();

        this.setState(
            {errors: errors || {}}
        )

        if (!errors) {
            this.doSubmit();
        }
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const data = {...this.state.data};
        const errorMessage = this.validateProperty(input);

        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        }
        
        data[input.name] = input.value;
        
        this.setState({
            data,
            errors
        });
    }

    validate = () => {
        const options = { abortEarly: false }
        const {error} = Joi.validate(this.state.data, this.schema, options);

        if (!error) {
            return null;
        }

        const errors = {};

        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    };

    validateProperty = ({ name, value }) => {
        const field = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(field, schema);

        return error ? error.details[0].message : null;
    }
}
 
export default Form;