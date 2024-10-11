let users = [];
export function getAllUsersService() {
    return cleanUser(users);
}
export function getUserByIdService(id) {
    return cleanUser(users.find((User) => User.id === id));
}
export function createUserService(newUser) {
    newUser.id = crypto.randomUUID();
    users.push(newUser);
    return { create: true, user: cleanUser(newUser) };
}
export function updateUserService(updateUser) {
    const index = users.findIndex((user) => user.id === updateUser.id);
    users[index] = { ...users[index], ...updateUser };
    console.log(users);
    return { update: true, user: cleanUser(updateUser) };
}
export function deleteUserService(deleteUser) {
    users = users.filter((user) => user.id !== deleteUser.id);
    return { delete: true, user: cleanUser(deleteUser) };
}

function cleanUser(user) {
    delete user.password;
    delete user.passwordHash;
    delete user.secret;
    return user;
}
function cleanUsers(users) {
    users.forEach(cleanUser);
    return users;
}