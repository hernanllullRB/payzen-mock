import { GenericException } from "../../config/generic.exception";

export class NotFoundException extends GenericException{
  constructor(response: string) {
    super(response);
  }
}