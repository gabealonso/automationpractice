function randomEmail () {
    return Math.random().toString(36).substring(7);
}

function createEmail (domain = '@mail.com') {
    return randomEmail() + domain;
}

export default {
    randomEmail,
    createEmail,
}