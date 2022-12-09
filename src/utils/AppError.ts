// type Message = string | { [key: string]: string[] };
type Message = string;

export class AppError {
  message: Message;

  constructor(message: Message) {
    this.message = message;
  }
}