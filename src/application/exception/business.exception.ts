export class BusinessException {
  constructor(private readonly description) {  }

  getDescription() : string {
    return this.description
  }
}