import { GenericException } from "../../config/generic.exception";

export class NotAvailableException extends GenericException {
  constructor(response: string) {
    super(response);
  }
}