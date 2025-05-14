import { validateRut } from '../js/validations'

/**
 * Custom hook for form validation.
 *
 * @returns {Object} An object containing the `validateForm` function.
 */
export const useFormValidate = () => {

    const validate = (id_form) => {
        const form = document.getElementById(id_form);
        if (form) {
            const formData = new FormData(form);

            let message_error = '';
            const list_message_error = [];
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;

                const input = document.getElementsByName(key);
                const required = input[0].required ? true : false;

                if (required && value === '') {

                    input[0].classList.add('is-invalid');
                    const label_input = document.getElementById(`label_${key}`);

                    list_message_error.push({
                        message: `El campo ${label_input.innerHTML.replace(/ :/g, "")} es obligatorio.`
                    });
                } else if (input[0].type === 'file' && value === '') {
                    input[0].classList.add('is-invalid');
                    const label_input = document.getElementById(`label_${key}`);

                    list_message_error.push({
                        message: `El campo ${label_input.innerHTML.replace(/ :/g, "")} es obligatorio.`
                    });

                } else if (input[0].type === 'text' && value === '') {
                    input[0].classList.add('is-invalid');
                    const label_input = document.getElementById(`label_${key}`);

                    list_message_error.push({
                        message: `El campo ${label_input.innerHTML.replace(/ :/g, "")} es obligatorio.`
                    });
                    
                } else if (input[0].type === 'select-one' && value === '') {

                    input[0].classList.add('is-invalid');
                    const label_input = document.getElementById(`label_${key}`);

                    list_message_error.push({
                        message: `El campo ${label_input.innerHTML.replace(/ :/g, "")} es obligatorio.`
                    });
                } else {
                    // Validación de correo electrónico
                    if (input[0].type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            input[0].classList.add('is-invalid');
                            const label_input = document.getElementById(`label_${key}`);

                            list_message_error.push({
                                message: `El campo ${label_input.innerHTML.replace(/ :/g, "")} debe ser un correo electrónico válido.`
                            });
                        } else {
                            input[0].classList.remove('is-invalid');
                        }
                    }
                    // Validación de RUT
                    else if (input[0].classList.contains('rut')) {

                        if (!validateRut(value)) {
                            input[0].classList.add('is-invalid');
                            const label_input = document.getElementById(`label_${key}`);

                            list_message_error.push({
                                message: `El campo ${label_input.innerHTML.replace(/ :/g, "")} debe ser un RUT válido.`
                            });
                        } else {
                            input[0].classList.remove('is-invalid');
                        }
                    }
                }
            });

            if (list_message_error.length > 0) {
                list_message_error.map((message) => {
                    message_error += '<li>' + message.message + '</li>';
                });

                return {
                    error: true,
                    form_data: `<ul>${message_error}</ul>`
                }
            }

            return {
                error: false,
                form_data: formObject
            }
            
            
        }
    }

    return {
        validate,
    }
}
