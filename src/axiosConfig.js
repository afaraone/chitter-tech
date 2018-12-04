export const sessionPath = 'https://chitter-backend-api.herokuapp.com/sessions';
export const userPath = 'https://chitter-backend-api.herokuapp.com/users';
export const peepsPath = "https://chitter-backend-api.herokuapp.com/peeps";
export const peepIdPath = (id) => "https://chitter-backend-api.herokuapp.com/peeps/" + id;
export const peepLikePath = (peepId, userId) => peepIdPath + '/likes/' + userId;
