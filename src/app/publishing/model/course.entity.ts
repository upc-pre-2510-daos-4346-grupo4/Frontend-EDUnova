export class Course {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  creatorId: string;
  image: string;
  language: string;
  difficulty: string;
  constructor() {
    this.id = "";
    this.name = "";
    this.description = "";
    this.category = "";
    this.price = 0;
    this.creatorId = "";
    this.image = "";
    this.language = "";
    this.difficulty = "";
  }
}
