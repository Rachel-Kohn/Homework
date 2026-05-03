import random

class Die:
    def __init__(self, sides=6):
        self.sides = sides

    def roll(self):
        return random.randint(1, self.sides)


die = Die(6)

for i in range(10):
    result = die.roll()
    print('Roll', i + 1, ':', result)