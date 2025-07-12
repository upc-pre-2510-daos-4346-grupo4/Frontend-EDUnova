export class Resource {
  id: number;
  topicId: number;
  youtubeId: string;
  title: string;
  description: string;
  constructor() {
    this.id = 0;
    this.topicId = 0;
    this.youtubeId = "";
    this.title = "";
    this.description = "";
  }
}
