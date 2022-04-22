export default class User {
  constructor({ userId, firstname, lastname, role, phone, email, collectId }) {
    this.id = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
    this.phone = phone;
    this.email = email;
    this.collectId = collectId;
  }

  get isAgent() {
    return ["AGENT", "ADMIN"].includes(this.role);
  }
}
