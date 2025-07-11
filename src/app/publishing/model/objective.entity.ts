export class Objective {
  id: number;
  topicId: number;
  title: string;
  header:string;
  mainParagraph: string;
  footer: string;
  conclusion: string;
  constructor() {
    this.id = 0;
    this.topicId = 0;
    this.title = "";
    this.header = "";
    this.mainParagraph = "";
    this.footer = "";
    this.conclusion = "";
  }
}
