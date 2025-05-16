export class Course {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  creatorId: number;
  image: string;
  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.category = "";
    this.price = 0;
    this.creatorId = 0;
    this.image = "";
  }
}
