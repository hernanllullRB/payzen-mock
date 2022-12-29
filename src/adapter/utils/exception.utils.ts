export const getException = (error: any): string => {
  const SEPARATOR: string = ":";
  const QUANTITY_ELEMENTS_OUTPUT: number = 2;
  const elements: string[] = error
    .toString()
    .split(SEPARATOR, QUANTITY_ELEMENTS_OUTPUT);
  return findFirst(elements);
}

const findFirst = (list: string[]): string => {
  return list.find((elem) => typeof elem === "string");
}

export const UNHANDLED_EXCEPTION = 'UnhandledException';
export const UNHANDLED_REST_EXCEPTION = -1;

export const getStatus = (e:any) : number => {
  const error = JSON.stringify(e);
  const errorParsed = JSON.parse(error);
  const {status} = errorParsed;
  return status;
}