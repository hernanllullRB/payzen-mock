export class RestClientConfiguration {
  constructor(private readonly timeout : number) {
  }
  getTimeout() : number{
    return this.timeout
  }
}