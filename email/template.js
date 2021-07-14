const getWelcomeMailTemplate = user => {
    return `
        <p> Hello ${user.name}, Welcome to The Network </P>
    `;
};

const getActivationTemplate = activationToken => {
    const link = `${process.env.FRONTEND_URL}/api/auth/activate/${activationToken}`;
    return `
        To activate your account please follow the link -
        Link: <a href=${link}> ${link} </a>
    `;
};

const getPasswordResetTemplate = passwordResetTemplate => {
    const link = `${process.env.FRONTEND_URL}/password/reset/verify/${passwordResetTemplate}`;
    return `
        To reset your password please follow the link -
        Link: <a href=${link}> ${link} </a>
    `;
};

const getPasswordResetSuccessTemplate = user => {
    return `
        <p>Hello ${user.name}, Your password reset successful </P>
    `;
};

const getContactMessage = (from, msg) => {
    return `
        <p><strong>You have received an email from - ${from} </strong> </P>
        <br/>
        <p><strong>Message body</strong></p>
        <p>${msg} </p>
    `;
};

module.exports = {
    getWelcomeMailTemplate,
    getActivationTemplate,
    getPasswordResetTemplate,
    getPasswordResetSuccessTemplate,
    getContactMessage
};