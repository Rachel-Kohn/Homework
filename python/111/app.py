import random

number = random.randint(1, 100)

guesses = 0

print('Guess the number between 1 and 100')

while True:
    user_input = input('Give it your best guess: ')

    try:
        guess = int(user_input)
    except ValueError:
        print('Please enter a valid number.')
        continue

    guesses += 1

    if guess < number:
        print('Level up! Go higher.')
    elif guess > number:
        print('Dial it down.')
    else:
        print('Boom! You nailed it!')
        print('Took you', guesses, 'tries, but who counts.. oh wait, I am.')
        break