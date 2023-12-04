export class ItemDoesNotExistError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
  }
}

export class ItemAlreadyExistError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name
  }

}
