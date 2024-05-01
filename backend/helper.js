import bcrypt from 'bcryptjs'

export function hashpassword(password) {
    let salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

export function comparePassword(password, hashpassword) {
    return bcrypt.compareSync(password, hashpassword);
}