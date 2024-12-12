export interface InputAction {
  id: string;
  value: string;
  url: string;
}

export class Scraping {
  constructor(public url: string, public inputActions: InputAction[] = []) {}
}
