import React, { useState, useEffect } from 'react';
import { actionMap } from '../../js/validations';
import Select from 'react-select';
import './style_inputs.css';

const customStylesSelectMultiple = ({    
    multiValue: (provided) => ({
        ...provided,
        flexWrap: 'wrap',  // Ajusta los elementos seleccionados a múltiples líneas
    }),
});

const customStyles = (isInvalid) => ({
    control: (provided) => ({
        ...provided,
        borderColor: isInvalid ? 'red' : '#c5ccd6',
        height: '40px',
        minHeight: '40px',
    }),
});

export const InputTextDynamic = ({ config_input }) => {

    const input = config_input;
    const [selectedValues, setSelectedValues] = useState({});

    const handleMultipleSelectChange = (e, name) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setSelectedValues(prevValues => ({
            ...prevValues,
            [name]: selectedOptions
        }));
    };

    // Inicializa el estado del formulario con los valores iniciales de inputs
    const initial_form = {};
    input.forEach((input) => {
        initial_form[input.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")] = input.value ?? '';
    });

    const [formState, setFormState] = useState(initial_form);
    const [hasError, setHasError] = useState(false);

    // Función para manejar los cambios en los campos de entrada
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    };

    // Función para manejar los cambios en los campos de tipo select_autocomplete
    const onSelectChange = (name, selectedOption) => {

        setFormState({ ...formState, [name]: selectedOption ? selectedOption.value : '' });
    };

    const onSelectChangeMultiple = (name, selectedOption) => {
        const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
        setFormState({ ...formState, [name]: selectedValues });
    };
    

    const renderInput = (key) => {

        // Función para manejar eventos de manera genérica
        const handleEvent = (key, e) => {
            if (e.target.value.trim() === '') {
                return;
            }

            if (key.evento && actionMap[key.evento.action]) {
                // Ejecuta la acción correspondiente
                const isValid = actionMap[key.evento.action](e.target.value);

                $.alert({
                    title: 'Error!',
                    content: isValid ? key.evento.message.success : key.evento.message.error,
                });
                return;
            }
        };

        // Prepara el objeto de propiedades del evento de manera condicional
        const eventProps = key.evento ? { [key.evento.name]: (e) => handleEvent(key, e) } : {};
        const name_input = key.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")

        switch (key.type) {
            case "hidden":
                return (
                    <input
                        type="hidden"
                        id={key.id}
                        key={key.name.toLowerCase().replace(/ /g, "_")+key.id}
                        name={name_input}
                        value={formState[name_input] ?? key.value}
                        {...eventProps}
                    />  
                );

            case "select":

                return (
                    <select
                        id={key.id}
                        className="form-control"
                        name={name_input}
                        required={!!key.required}
                        value={formState[name_input]} // Usa formState para el valor
                        onChange={onInputChange}
                        style={{ height: '48px' }}
                    >
                        {key.text_default && <option>{key.value}</option>}
                        {key.options.map((option) => (
                            <option key={option.key} selected={option.default ? option.key : ''}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                );

            case "select_autocomplete_fetch":
                return (
                    <Select
                        id={key.id}
                        name={name_input}
                        options={key.options}
                        placeholder={key.text_default}
                        required={!!key.required}
                        value={key.options.find(option => option.value === (formState[name_input] ?? key.value))} // Usa formState para el valor
                        onChange={key.change_function}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        styles={customStyles(key.isInvalid)}
                    />
                );

            case "select_autocomplete":
                    return (
                        <Select
                            id={key.id}
                            name={name_input}
                            options={key.options}
                            placeholder={key.text_default}
                            required={!!key.required}
                            value={key.options.find(option => option.value === (formState[name_input] ?? key.value))} // Usa formState para el valor
                            onChange={(selectedOption) => onSelectChange(name_input, selectedOption)}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            styles={{
                                ...customStyles(key.isInvalid),
                                container: (provided) => ({
                                    ...provided,
                                    width: '400px'  // Ajusta el tamaño fijo aquí
                                })
                            }}
                        />
                    );
            case "select_multiple":

                return (
                    <>
                        <Select
                            id={key.id}
                            name={name_input}
                            options={key.options}
                            isMulti
                            placeholder={key.text_default}
                            required={!!key.required}
                            value={Array.isArray([formState[name_input]])
                                ? key.options.filter(option => formState[name_input].includes(option.value))
                                : key.options.filter(option => formState[name_input] === option.value)}
                            onChange={(selectedOption) => onSelectChangeMultiple(name_input, selectedOption)}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            styles={customStylesSelectMultiple}
                            className='basic-multi-select'
                        />
                        <input 
                            type="hidden" 
                            name={name_input} 
                            value={Array.isArray(formState[name_input]) 
                                ? formState[name_input].join(', ') 
                                : formState[name_input] || ''}  // Si no es array, usar el valor tal como es
                        />
                    </>

                );   
            case "checkbox":
                return (
                    <input
                        type="checkbox"
                        id={key.id}
                        className="form-check-input"
                        name={name_input}
                        required={!!key.required}
                        checked={formState[name_input] ?? key.value}
                        onChange={onInputChange}
                        {...eventProps}
                    />
                );

            case "date":
                return (
                    <input
                        type="date"
                        id={key.id}
                        className="form-control"
                        name={name_input}
                        required={!!key.required}
                        disabled={key.disabled}
                        value={formState[name_input] ?? key.value}
                        onChange={key.def ? key.def : onInputChange}
                        placeholder={key.placeholder}
                        {...eventProps}
                    />
                );
            
            case "number":
                return (
                    <input
                        type="number"
                        id={key.id}
                        className="form-control"
                        name={name_input}
                        required={!!key.required}
                        disabled={key.disabled}
                        value={formState[name_input] ?? key.value}
                        onChange={key.def ? key.def : onInputChange}
                        placeholder={key.placeholder}
                        {...eventProps}
                    />
                );
            
            case "email":
                return (
                    <input
                        type="email"
                        id={key.id}
                        className="form-control"
                        name={name_input}
                        required={!!key.required}
                        disabled={key.disabled}
                        value={formState[name_input] ?? key.value}
                        onChange={key.def ? key.def : onInputChange}
                        placeholder={key.placeholder}
                        {...eventProps}
                    />
                );

            case "rut":
                return (
                    <input
                        type="text"
                        tag-rut="true"
                        id={key.id}
                        className={`form-control ${key.type}`}
                        name={name_input}
                        required={!!key.required}
                        disabled={key.disabled}
                        value={formState[name_input] ?? key.value}
                        onChange={key.def ? key.def : onInputChange}
                        placeholder={key.placeholder}
                        {...eventProps}
                    />
                );

            case "textarea":
                return (
                    <textarea
                        id={key.id}
                        className="form-control"
                        name={name_input}
                        required={!!key.required}
                        disabled={key.disabled}
                        value={formState[name_input] ?? key.value}
                        onChange={key.def ? key.def : onInputChange}
                        {...eventProps}
                    />
                );

            case "text":
            default:
                return (
                    <input
                        type="text"
                        id={key.id}
                        className="form-control"
                        name={name_input}
                        required={!!key.required}
                        disabled={key.disabled}
                        value={(formState[name_input] ?? key.value) ?? ''}
                        onChange={key.def ? key.def : onInputChange}
                        placeholder={key.placeholder}
                        {...eventProps}
                    />
                );
        }
    };

    return (
        <>
            {input.map((key, index) => (
                <React.Fragment key={key.id || index}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            {renderInput(key)}
                        </div>
                        
                        {key.button && (
                            <div style={{ marginLeft: '10px' }}>
                                <button className="btn btn-primary btn-sm" type="button" onClick={key.button.def}>
                                    {key.button.label}
                                </button>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            ))}
        </>
    );
};