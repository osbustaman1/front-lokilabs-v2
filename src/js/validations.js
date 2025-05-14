export const validateRut = (rut) => {
    /**
     * Validates if a Chilean RUT is valid.
     * 
     * The RUT can be entered in the following formats:
     * - "111111111"
     * - "11.111.111-1"
     * - "11111111-1"
     * 
     * @param {string} rut
     * @return {boolean}
     */
    
    // Remove dots and hyphens from the RUT
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    
    // Get the verifier digit
    const verifierDigit = rut.slice(-1).toUpperCase();
    
    // Get the RUT number without the verifier digit
    const number = rut.slice(0, -1);

    // Validate if the number is really a number
    if (!/^\d+$/.test(number)) {
        return false;
    }
    
    // Calculate the expected verifier digit
    let sum = 0;
    let multiplier = 2;

    for (let i = number.length - 1; i >= 0; i--) {
        sum += parseInt(number.charAt(i)) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedVerifier = 11 - (sum % 11);
    let calculatedVerifier = '';

    if (expectedVerifier === 11) {
        calculatedVerifier = '0';
    } else if (expectedVerifier === 10) {
        calculatedVerifier = 'K';
    } else {
        calculatedVerifier = expectedVerifier.toString();
    }

    return verifierDigit === calculatedVerifier;
}


function validateEmail(email) {
    /**
     * Validates if an email address is valid.
     * 
     * The email must follow the standard format:
     * - local-part@domain
     * 
     * @param {string} email
     * @return {boolean}
     */
    // Regular expression pattern for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Test the email against the pattern
    return emailPattern.test(email);
}


// Mapeo de acciones a funciones
export const actionMap = {
    validateEmail: validateEmail,
    validateRut: validateRut, // Asegúrate de que validateRut esté definida
    // Agrega más mapeos de acciones aquí según sea necesario
};


export const capitalizeFirstLetter = (string) => {

    if (typeof string !== 'string') {
        console.error('Expected a string but received:', typeof string);
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};
