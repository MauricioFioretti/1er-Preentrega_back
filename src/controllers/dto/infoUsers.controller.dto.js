export function filterInfoUsers(users) {
    let usersFilter = []
    users.forEach(el => {
        let user = {
            firstName: el.firstName,
            email: el.email,
            role: el.role,
        }

        usersFilter.push(user)
    })
    return usersFilter
}