-- Function to define classes in Lua
function Class()
    local ClassType = {}
    ClassType.__index = ClassType

    function ClassType:New(...)
        local Instance = setmetatable({}, ClassType)
        if Instance.Init then
            Instance:Init(...)
        end
        return Instance
    end

    return ClassType
end

-- Defining the "Person" class
local Person = Class()

function Person:Init(Name, Age)
    self.Name = Name
    self.Age = Age
end

function Person:SayHello()
    print("Hello, my name is " .. self.Name .. " and I am " .. self.Age .. " years old.")
end

-- Table to store created objects
local Objects = {}

-- Function to display the menu and get the user's choice
function DisplayMenu()
    print("\nInteractive Menu")
    print("1. Create a new person")
    print("2. List all people")
    print("3. Say hello as someone")
    print("4. Exit")
    io.write("Choose an option: ")
    local Choice = io.read("*n")  -- Reads a number from the user
    io.read("*l") -- Clears the input buffer
    return Choice
end

-- Function to create a new person
function CreatePerson()
    io.write("Enter the name: ")
    local Name = io.read()
    io.write("Enter the age: ")
    local Age = tonumber(io.read("*l")) -- Reads age as a number
    if not Age then
        print("Invalid age. Please enter a number.")
        return false
    end
    local NewPerson = Person:New(Name, Age)
    table.insert(Objects, NewPerson)
    print("Person created successfully!")
    return true
end

-- Function to list all created people
function ListPeople()
    if #Objects == 0 then
        print("No people have been created yet.")
    else
        print("\nList of people:")
        for i, Person in ipairs(Objects) do
            print(i .. ". " .. Person.Name .. " (" .. Person.Age .. " years old)")
        end
    end
end

-- Function to call the "SayHello" method for a specific person
function SayHello()
    ListPeople()
    if #Objects > 0 then
        io.write("Choose the number of the person to say hello as: ")
        local Choice = tonumber(io.read("*l")) -- Reads choice as a number
        local SelectedPerson = Objects[Choice]
        if SelectedPerson then
            SelectedPerson:SayHello()
            return true
        else
            print("Invalid choice.")
            return false
        end
    end
end

-- Main loop for the interactive menu
while true do
    local Choice = DisplayMenu()
    if Choice == 1 then
        CreatePerson()
    elseif Choice == 2 then
        ListPeople()
    elseif Choice == 3 then
        SayHello()
    elseif Choice == 4 then
        print("Exiting the program.")
        break
    else
        print("Invalid option. Please try again.")
    end
end