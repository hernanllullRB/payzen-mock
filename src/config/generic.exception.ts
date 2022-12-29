export abstract class GenericException {
  protected constructor(private readonly description) { }

  getDescription() : string {
    return this.description
  }
}