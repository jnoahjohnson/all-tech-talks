# class Person():
#     def __init__(self, first_name, last_name):
#         self.first_name = first_name
#         self.last_name = last_name

# person_list = []

# for iCount in range(0, 4):
#     # Get Inputs

#     person = Person('noah', 'johnson')

#     # How many team members?
#     # Loop
#         # Get player inputs
#         # create a new newplayer
#         # team.list.append(newplyaer)

#     person_list.append(person)

# print(person_list)

# for person in person_list:
#     print(person.first_name)

user_id = ""

while user_id == "":
    try:
        user_id = int(input("What is your id? "))
    except:
        print('Please enter a valid id')
        user_id = ""


