export class ThisSite {
  siteName: string;
  categories:string[];
  constructor(siteName: string,
              categories: string[]) {
    this.siteName = siteName;
    this.categories = categories;
  }
  greet() {
    console.log(`Welcome to ${this.siteName}`);
  }
}

const categories = ["Python", "Django", "React",
                    "typescript", "Docker"];
const site = new ThisSite("Ragnar Blog",
                          categories);
site.greet();
