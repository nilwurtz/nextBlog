class Me():
    def __init__(self, **kwargs):
        self.name = kwargs["name"]
        self.age = kwargs["age"]
        self.gender = kwargs["gender"]
        self.occupation = kwargs["job"]

    def greet(self):
        print(f"Hi! I'm {self.name}!")


me = Me(name="ragnar",
        age=24,
        gender="man",
        job="software engineer")
me.greet()
