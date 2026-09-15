import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home, BookOpen, Code2, FolderKanban, RotateCcw, Library, TrendingUp,
  User, Settings as SettingsIcon, Terminal, Github, ShieldCheck, Database,
  Brain, Flame, Trophy, Sparkles, ChevronRight, ChevronLeft, Check, X,
  Lightbulb, Lock, Search, Menu, Copy, Download, AlertTriangle, Bug,
  ShieldAlert, Star, Clock, Target, Zap, LayoutDashboard, CheckCircle2,
  CircleDot, ArrowRight, RefreshCw, FileCode2, PlayCircle, ChevronDown,
  BadgeCheck, Cpu, FlaskConical, Award, Eye, EyeOff, Mail, LogOut, KeyRound,
  ShieldQuestion, ListChecks, GitBranch, GitCommit, GitPullRequest, FileText
} from "lucide-react";

/* =========================================================================
   CONTENT LAYER — curriculum, exercises, reference, projects
   ========================================================================= */

const LEVELS = [
  { id: "lvl0", num: 0, title: "Python Environment", track: "core", topics: ["What Python is", "Installing Python", "Python interpreter", ".py files", "Running programs", "PyCharm basics", "VS Code basics", "print()", "Comments", "Indentation", "Basic syntax"] },
  { id: "lvl1", num: 1, title: "Python Fundamentals", track: "core", topics: ["Variables", "Naming rules", "Integers & floats", "Strings", "Booleans", "type()", "Type conversion", "input()", "Output", "f-strings", "Arithmetic operators", "Comparison operators", "Logical operators", "Assignment operators"] },
  { id: "lvl2", num: 2, title: "Programming Logic", track: "core", topics: ["if / elif / else", "Nested conditions", "while loops", "for loops", "range()", "break", "continue", "pass", "Basic problem solving"] },
  { id: "lvl3", num: 3, title: "Data Structures", track: "core", topics: ["Lists", "Tuples", "Dictionaries", "Sets", "Indexing", "Slicing", "Adding/removing/updating", "Iterating collections", "Nested structures", "String methods"] },
  { id: "lvl4", num: 4, title: "Functions", track: "core", topics: ["Defining functions", "Parameters & arguments", "Return values", "Default arguments", "Keyword arguments", "Scope", "Local/global variables", "*args", "**kwargs", "Function design"] },
  { id: "lvl5", num: 5, title: "Errors & Debugging", track: "core", topics: ["Syntax errors", "Runtime errors", "Logic errors", "Tracebacks", "try / except", "else / finally", "raise", "Debugging techniques", "IDE debugger"] },
  { id: "lvl6", num: 6, title: "Files & Data", track: "core", topics: ["Reading files", "Writing files", "with", "pathlib", "JSON", "CSV", "Basic data persistence"] },
  { id: "lvl7", num: 7, title: "Regular Expressions", track: "core", topics: ["Regex concepts", "Character classes", "Quantifiers", "Groups", "Searching", "Matching", "re module", "Text validation"] },
  { id: "lvl8", num: 8, title: "Modules & Packages", track: "core", topics: ["import", "from ... import", "Standard library", "Creating modules", "Creating packages", "__name__", "__main__", "Package organization"] },
  { id: "lvl9", num: 9, title: "Object-Oriented Programming", track: "core", topics: ["Classes", "Objects", "Attributes", "Methods", "__init__", "Instance vs class attributes", "Encapsulation", "Inheritance", "Polymorphism", "Composition", "Special methods"] },
  { id: "lvl10", num: 10, title: "Professional Python Workflow", track: "core", topics: ["Virtual environments", "venv", "pip", "requirements.txt", "pyproject.toml", "Dependency management", "Git & GitHub", "Testing", "pytest", "Assertions", "Docstrings", "Type hints", "PEP 8", "Clean code", "Project structure"] },
];

const LESSONS = [
  {
    id: "l-intro",
    levelId: "lvl0",
    title: "What Is Python?",
    difficulty: "Easy",
    minutes: 8,
    prereq: [],
    concept: "Python is a programming language — a way of writing instructions that a computer can carry out.",
    analogy: "Think of Python as a recipe language. You aren't cooking yourself; you're writing a precise recipe, and the computer (the \"interpreter\") follows it step by step.",
    whyItMatters: "Python reads close to plain English, which makes it a forgiving place to learn how computers actually think — one instruction at a time, in order.",
    explanation: [
      "A `.py` file is just a text file containing Python instructions. When you run it, a program called the Python interpreter reads your file top to bottom and executes each line.",
      "You'll write code in an editor like VS Code or PyCharm, then run it from a terminal — a text-based way of talking to your computer.",
      "Everything you build in this course, from a five-line script to a machine learning pipeline, is made of the same small set of building blocks you're about to learn."
    ],
    syntax: 'print("Hello, world!")',
    example: 'print("Hello, world!")\n# Output:\n# Hello, world!',
    commonMistakes: [
      "Forgetting quotation marks around text — Python treats unquoted words as code, not text.",
      "Mismatched parentheses — every `(` needs a matching `)`.",
      "Running the wrong file, or saving changes but forgetting to re-run."
    ],
    practice: {
      prompt: "Write one line of code that prints your name to the screen.",
      starter: 'print("")',
      hint: "Put your name between the quotation marks, inside the parentheses."
    },
    challenge: {
      prompt: "Print three separate lines: your name, your favorite hobby, and today's goal — using three separate print() calls."
    },
    knowledgeCheck: [
      {
        q: "What does the Python interpreter do?",
        options: ["Designs the code editor", "Reads and executes your code line by line", "Compiles Python into a website", "Only checks for spelling errors"],
        answer: 1,
        explain: "The interpreter reads your `.py` file from top to bottom and carries out each instruction."
      }
    ]
  },
  {
    id: "l-variables",
    levelId: "lvl1",
    title: "Variables",
    difficulty: "Easy",
    minutes: 10,
    prereq: ["l-intro"],
    concept: "A variable is a named container that stores a value so you can use it later.",
    analogy: "Think of a variable like a labeled box. You write \"age\" on the box, put the number 25 inside, and from then on you can just say \"age\" instead of \"the number 25\".",
    whyItMatters: "Almost everything in programming involves storing a value now so you can use, change, or check it later. Variables are how you do that.",
    explanation: [
      "You create a variable with an `=` sign: the name goes on the left, the value on the right.",
      "Variable names should describe what they hold — `age`, not `x`. They can contain letters, numbers, and underscores, but can't start with a number.",
      "Variables can be reassigned at any time. The box keeps its label, but you can swap out what's inside."
    ],
    syntax: "name = value",
    example: 'age = 25\ncity = "Lagos"\nis_student = False\n\nprint(age)\nprint(city)\n\nage = 26  # reassigning\nprint(age)',
    commonMistakes: [
      "Using `=` when you mean \"equals\" — in Python, `=` assigns a value; `==` compares two values.",
      "Naming variables things like `1st_place` (can't start with a digit) or `class` (a reserved word).",
      "Typos in variable names later in the code — Python treats `Age` and `age` as two different variables."
    ],
    practice: {
      prompt: "Create a variable called `favorite_number` and set it to a whole number of your choice. Then print it.",
      starter: "favorite_number = \nprint(favorite_number)",
      hint: "Put a whole number, with no quotes, after the equals sign."
    },
    challenge: {
      prompt: "Create three variables — `first_name`, `last_name`, and `age` — then print a single sentence introducing yourself using all three."
    },
    knowledgeCheck: [
      {
        q: "What happens when you reassign a variable, like `age = 26` after `age = 25`?",
        options: ["Python creates a second variable named age", "It causes an error", "The box's label stays the same, but the value inside changes", "Nothing happens until you restart Python"],
        answer: 2,
        explain: "Reassignment replaces the stored value; the variable name still points to the same box."
      }
    ]
  },
  {
    id: "l-datatypes",
    levelId: "lvl1",
    title: "Data Types",
    difficulty: "Easy",
    minutes: 12,
    prereq: ["l-variables"],
    concept: "Every value in Python has a type — a category that determines what you can do with it.",
    analogy: "A type is like the kind of container something needs: liquid goes in a bottle, not a paper bag. Text needs different handling than numbers.",
    whyItMatters: "Type mismatches — like trying to do math on text — are one of the most common sources of bugs for beginners. Knowing the core types helps you avoid them.",
    explanation: [
      "`int` — whole numbers, like `7` or `-3`.",
      "`float` — decimal numbers, like `3.14`.",
      "`str` — text, always wrapped in quotes, like `\"hello\"`.",
      "`bool` — `True` or `False`, used for yes/no logic.",
      "`None` — represents \"no value at all\", not zero, not empty text.",
      "You can check any value's type with the built-in `type()` function, and convert between types with `int()`, `float()`, `str()`, and `bool()`."
    ],
    syntax: "type(value)   int(x)   float(x)   str(x)   bool(x)",
    example: 'price = 19.99       # float\nquantity = 3        # int\nname = "notebook"   # str\nin_stock = True      # bool\n\nprint(type(price))\ntotal = price * quantity\nprint(total)\n\nage_text = "25"\nage_number = int(age_text)  # type conversion\nprint(age_number + 1)',
    commonMistakes: [
      "Trying to add a string and a number directly, like `\"Age: \" + 25` — this raises a `TypeError`. Convert first: `\"Age: \" + str(25)`.",
      "Assuming input from a user is a number. `input()` always returns a string, even if someone types \"25\".",
      "Confusing `None` with `0` or `\"\"` — they are not the same thing."
    ],
    practice: {
      prompt: "You're given `quantity = \"4\"` as text. Convert it to an integer, multiply it by 3, and print the result.",
      starter: 'quantity = "4"\n# your code here',
      hint: "Use int() to convert quantity before doing any math with it."
    },
    challenge: {
      prompt: "Write code that takes the float 12.75, converts it to a whole number with int(), and prints both the original and the converted value with a short label for each."
    },
    knowledgeCheck: [
      {
        q: "What type does input() always return, no matter what the user types?",
        options: ["int", "str", "bool", "It depends on what was typed"],
        answer: 1,
        explain: "input() always returns text (str) — you must convert it yourself if you need a number."
      }
    ]
  },
  {
    id: "l-io",
    levelId: "lvl1",
    title: "Input & Output",
    difficulty: "Easy",
    minutes: 9,
    prereq: ["l-datatypes"],
    concept: "print() shows information to the user; input() asks the user to type something back.",
    analogy: "print() is your program talking; input() is your program listening.",
    whyItMatters: "Almost every interactive program — a calculator, a quiz, a login form — is built from this input-then-output loop.",
    explanation: [
      "`print()` can take multiple values separated by commas, and will space them automatically.",
      "`input(\"prompt\")` shows a message, pauses the program, and returns whatever the user typed — as a string.",
      "f-strings, written as `f\"...\"`, let you insert variables directly into text using curly braces."
    ],
    syntax: 'input("prompt")   f"text {variable} text"',
    example: 'name = input("What is your name? ")\nage = int(input("What is your age? "))\n\nprint(f"Hello, {name}! Next year you will be {age + 1}.")',
    commonMistakes: [
      "Forgetting that input() returns text, then trying to do math on it without converting first.",
      "Leaving out a space at the end of an input() prompt, so the user's typing runs into the question.",
      "Mixing up f-string braces `{}` with regular parentheses."
    ],
    practice: {
      prompt: "Ask the user for their name with input(), then print a greeting using an f-string.",
      starter: 'name = input("Your name: ")\n# print a greeting here',
      hint: "Use an f-string: f\"Hello, {name}!\""
    },
    challenge: {
      prompt: "Ask the user for two numbers using input(), convert both to floats, and print their sum using an f-string."
    },
    knowledgeCheck: [
      {
        q: "If you write `x = input(\"Enter a number: \")` and the user types 5, what is the type of x?",
        options: ["int", "float", "str", "bool"],
        answer: 2,
        explain: "input() always hands back a string — even numeric-looking text needs explicit conversion."
      }
    ]
  },
  {
    id: "l-operators",
    levelId: "lvl1",
    title: "Operators",
    difficulty: "Medium",
    minutes: 11,
    prereq: ["l-io"],
    concept: "Operators are symbols that perform an action on values — math, comparisons, or logic.",
    analogy: "Operators are verbs in a sentence: they tell Python what to do with the nouns (your values).",
    whyItMatters: "Comparisons and logic are what let programs make decisions — the entire next lesson (conditionals) depends on this one.",
    explanation: [
      "Arithmetic: `+ - * / // % **` (`//` is floor division, `%` is remainder, `**` is exponent).",
      "Comparison: `== != > < >= <=` — these always produce True or False.",
      "Logical: `and`, `or`, `not` — combine or invert True/False values.",
      "Membership: `in`, `not in` — check whether a value exists inside a collection."
    ],
    syntax: "a + b   a == b   a and b   x in collection",
    example: 'score = 82\npassed = score >= 60\nprint(passed)          # True\n\nhas_bonus = score > 90 or score == 82\nprint(has_bonus)       # True\n\nremainder = 17 % 5\nprint(remainder)       # 2',
    commonMistakes: [
      "Using `=` instead of `==` inside a comparison.",
      "Forgetting operator precedence — use parentheses to make intent explicit, e.g. `(a and b) or c`.",
      "Confusing `/` (always returns a float) with `//` (floor division, drops the remainder)."
    ],
    practice: {
      prompt: "Given `temperature = 30`, write an expression that checks whether the temperature is greater than 25 AND less than 35, and print the result.",
      starter: "temperature = 30\n# your code here",
      hint: "Combine two comparisons with `and`."
    },
    challenge: {
      prompt: "Write code that checks whether a number is divisible by both 3 and 5, and prints True or False."
    },
    knowledgeCheck: [
      {
        q: "What does `17 % 5` evaluate to?",
        options: ["3.4", "2", "3", "85"],
        answer: 1,
        explain: "`%` returns the remainder after division: 17 divided by 5 is 3 remainder 2."
      }
    ]
  },
  {
    id: "l-conditionals",
    levelId: "lvl2",
    title: "Conditionals",
    difficulty: "Medium",
    minutes: 12,
    prereq: ["l-operators"],
    concept: "Conditionals let your program choose different actions depending on whether something is True or False.",
    analogy: "A conditional is a fork in the road: \"if it's raining, take an umbrella; otherwise, don't.\"",
    whyItMatters: "Decision-making is the core of what separates a program from a simple script that just runs the same steps every time.",
    explanation: [
      "`if` runs a block only when its condition is True.",
      "`elif` (\"else if\") checks another condition if the first was False.",
      "`else` runs when none of the above conditions were True.",
      "Indentation (4 spaces) is how Python knows which lines belong inside the block — there are no curly braces."
    ],
    syntax: "if condition:\n    ...\nelif other_condition:\n    ...\nelse:\n    ...",
    example: 'age = 16\n\nif age >= 18:\n    print("You can vote.")\nelif age >= 16:\n    print("You can get a permit.")\nelse:\n    print("Not yet.")',
    commonMistakes: [
      "Forgetting the colon `:` at the end of an if/elif/else line.",
      "Inconsistent indentation — mixing tabs and spaces will crash your program.",
      "Writing a chain of separate `if` statements when you meant `elif`, causing multiple blocks to run."
    ],
    practice: {
      prompt: "Given `score = 72`, print \"Pass\" if score is 60 or above, otherwise print \"Fail\".",
      starter: "score = 72\n# your code here",
      hint: "You only need if and else here — no elif required."
    },
    challenge: {
      prompt: "Write a grading program: 90+ is \"A\", 80-89 is \"B\", 70-79 is \"C\", below 70 is \"F\". Use elif."
    },
    knowledgeCheck: [
      {
        q: "What determines which lines belong inside an if block in Python?",
        options: ["Curly braces {}", "Semicolons", "Indentation", "Parentheses"],
        answer: 2,
        explain: "Python uses consistent indentation (commonly 4 spaces) to define code blocks."
      }
    ]
  },
  {
    id: "l-loops",
    levelId: "lvl2",
    title: "Loops",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["l-conditionals"],
    concept: "Loops repeat a block of code — either a set number of times, or until a condition becomes False.",
    analogy: "A for loop is like flipping through every page in a book. A while loop is like reading until you hit \"The End\" — you don't know exactly how many pages that will take.",
    whyItMatters: "Loops let you process lists of data, repeat actions, and avoid writing the same code dozens of times.",
    explanation: [
      "`for item in collection:` runs once per item in a list, string, or range.",
      "`range(n)` produces numbers from 0 up to (but not including) n — handy for \"do this n times\".",
      "`while condition:` keeps running as long as the condition stays True — you're responsible for eventually making it False, or it loops forever.",
      "`break` exits a loop early; `continue` skips to the next iteration; `pass` does nothing (a placeholder)."
    ],
    syntax: "for item in collection:\n    ...\n\nwhile condition:\n    ...",
    example: 'for i in range(5):\n    print(i)          # 0 1 2 3 4\n\ncount = 0\nwhile count < 3:\n    print("counting", count)\n    count += 1',
    commonMistakes: [
      "Forgetting to update the variable in a while loop, creating an infinite loop.",
      "Off-by-one errors with range() — range(5) gives 0-4, not 1-5.",
      "Using break when continue was intended, or the reverse."
    ],
    practice: {
      prompt: "Use a for loop with range() to print the numbers 1 through 5 (inclusive).",
      starter: "# your code here",
      hint: "range(1, 6) starts at 1 and stops before 6."
    },
    challenge: {
      prompt: "Write a while loop that starts at 10 and counts down to 1, printing each number, then prints \"Liftoff!\"."
    },
    knowledgeCheck: [
      {
        q: "What does range(5) produce?",
        options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "5 only"],
        answer: 1,
        explain: "range(5) starts at 0 by default and stops before reaching 5."
      }
    ]
  },
  {
    id: "l-lists",
    levelId: "lvl3",
    title: "Lists",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["l-loops"],
    concept: "A list is an ordered, changeable collection of values.",
    analogy: "A list is like a numbered shelf: each item sits at a position (starting from 0), and you can add, remove, or rearrange items on the shelf.",
    whyItMatters: "Lists are the default way to store multiple related values in Python — and the foundation for working with any real dataset.",
    explanation: [
      "Create a list with square brackets: `fruits = [\"apple\", \"banana\"]`.",
      "Access an item by index: `fruits[0]`. Negative indexes count from the end: `fruits[-1]`.",
      "Slicing grabs a range: `fruits[1:3]`.",
      "Common methods: `.append()` adds to the end, `.remove()` deletes a value, `.sort()` orders the list, `len()` gives its size.",
      "List comprehensions offer a compact way to build a new list: `[x * 2 for x in numbers]`."
    ],
    syntax: "my_list = [item1, item2]\nmy_list.append(item)\nmy_list[index]",
    example: 'fruits = ["apple", "banana", "cherry"]\nfruits.append("date")\nprint(fruits[0])        # apple\nprint(fruits[-1])       # date\nprint(len(fruits))      # 4\n\ndoubled = [len(f) for f in fruits]\nprint(doubled)',
    commonMistakes: [
      "Off-by-one indexing errors — the first item is index 0, not 1.",
      "Trying to access an index that doesn't exist, causing an IndexError.",
      "Modifying a list while looping over it directly, which can skip items unexpectedly."
    ],
    practice: {
      prompt: "Create a list of three cities. Print the second city using its index, then append a fourth city and print the whole list.",
      starter: "cities = []\n# your code here",
      hint: "The second item is at index 1, since indexing starts at 0."
    },
    challenge: {
      prompt: "Given a list of numbers, write a loop that builds a new list containing only the even numbers."
    },
    knowledgeCheck: [
      {
        q: "What is the index of the first item in a Python list?",
        options: ["1", "0", "-1", "It depends on the list"],
        answer: 1,
        explain: "Python list indexing is zero-based — the first item is always at index 0."
      }
    ]
  },
  {
    id: "l-dicts",
    levelId: "lvl3",
    title: "Dictionaries",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["l-lists"],
    concept: "A dictionary stores data as key/value pairs, so you can look up a value by a meaningful name instead of a numeric position.",
    analogy: "A dictionary is like a real dictionary: you look up a word (the key) to find its definition (the value) — not by page number.",
    whyItMatters: "Dictionaries are how you represent structured, real-world records — a user profile, a product, a row of JSON data.",
    explanation: [
      "Create one with curly braces: `person = {\"name\": \"Ada\", \"age\": 30}`.",
      "Access a value with `person[\"name\"]`, or safely with `person.get(\"name\")` (returns None instead of crashing if the key is missing).",
      "`.keys()`, `.values()`, and `.items()` let you loop over a dictionary's contents.",
      "Dictionaries can be nested — a value can itself be another dictionary or a list."
    ],
    syntax: 'd = {"key": "value"}\nd["key"]\nd.get("key")\nd.items()',
    example: 'person = {"name": "Ada", "age": 30, "city": "Lagos"}\n\nprint(person["name"])\nprint(person.get("job", "Not specified"))\n\nfor key, value in person.items():\n    print(key, "->", value)',
    commonMistakes: [
      "Using `person[\"job\"]` when the key doesn't exist, causing a KeyError — use `.get()` when a key might be missing.",
      "Confusing dictionary keys (must be unique, often strings) with list indexes (always integers).",
      "Forgetting the colon between each key and value."
    ],
    practice: {
      prompt: "Create a dictionary representing a book with keys \"title\" and \"author\". Print a sentence combining both values.",
      starter: "book = {}\n# your code here",
      hint: "Use book[\"title\"] and book[\"author\"] inside an f-string."
    },
    challenge: {
      prompt: "Given a dictionary of student names to scores, loop through it and print each student's name and whether they passed (score >= 60)."
    },
    knowledgeCheck: [
      {
        q: "What is the safest way to read a key that might not exist in a dictionary?",
        options: ["dictionary[key]", "dictionary.get(key)", "dictionary.find(key)", "dictionary->key"],
        answer: 1,
        explain: ".get() returns None (or a default you provide) instead of raising a KeyError."
      }
    ]
  },
  {
    id: "l-functions",
    levelId: "lvl4",
    title: "Functions",
    difficulty: "Medium",
    minutes: 16,
    prereq: ["l-dicts"],
    concept: "A function is a reusable block of code that takes inputs, does something, and can return an output.",
    analogy: "A function is a machine: you feed it raw materials (arguments), it does its job, and it hands back a product (the return value).",
    whyItMatters: "Functions let you break large problems into small, testable, reusable pieces — the single biggest shift from writing scripts to writing real programs.",
    explanation: [
      "Define a function with `def name(parameters):` and a colon.",
      "`return` sends a value back to wherever the function was called; without it, a function returns None.",
      "Parameters can have default values: `def greet(name=\"friend\"):`.",
      "`*args` collects extra positional arguments; `**kwargs` collects extra keyword arguments.",
      "Variables created inside a function are local — they don't exist outside it, unless explicitly returned."
    ],
    syntax: "def name(parameter):\n    ...\n    return value",
    example: 'def calculate_total(price, quantity=1):\n    return price * quantity\n\ntotal = calculate_total(9.99, 3)\nprint(total)          # 29.97\n\ndefault_total = calculate_total(9.99)\nprint(default_total)  # 9.99',
    commonMistakes: [
      "Forgetting `return`, then being surprised the function \"gives back\" None.",
      "Confusing print() (displays something) with return (hands a value back to the caller for further use).",
      "Reusing a variable name inside a function and expecting it to change the outer variable — locals don't leak out."
    ],
    practice: {
      prompt: "Write a function called `square` that takes a number and returns its square. Call it with the number 6 and print the result.",
      starter: "def square(n):\n    # your code here\n\nprint(square(6))",
      hint: "Use `return n * n` inside the function."
    },
    challenge: {
      prompt: "Write a function `describe_temperature(celsius)` that returns \"Hot\", \"Mild\", or \"Cold\" based on the temperature, then test it with three different values."
    },
    knowledgeCheck: [
      {
        q: "What does a function return if it has no explicit `return` statement?",
        options: ["0", "An empty string", "None", "It causes an error"],
        answer: 2,
        explain: "A function without a return statement implicitly returns None."
      }
    ]
  },
  {
    id: "l-errors",
    levelId: "lvl5",
    title: "Errors & Debugging",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["l-functions"],
    concept: "Errors are Python's way of telling you exactly what went wrong and where. try/except lets your program handle them instead of crashing.",
    analogy: "A traceback is like a trail of breadcrumbs: it shows you the exact path your program took to reach the point where it broke.",
    whyItMatters: "Every real program eventually meets bad input or an unexpected condition. Handling errors gracefully is what separates a fragile script from a reliable tool.",
    explanation: [
      "Syntax errors happen before your code even runs — Python can't parse it. Runtime errors (exceptions) happen while running, like dividing by zero. Logic errors are the sneakiest: the code runs fine but produces the wrong result.",
      "`try` wraps risky code; `except ErrorType:` catches a specific kind of failure; `else` runs only if no error occurred; `finally` always runs, error or not.",
      "Reading a traceback from the bottom up usually tells you the actual error first, then the chain of calls that led there.",
      "`raise` lets you deliberately signal an error, which is useful when your own code detects an invalid state."
    ],
    syntax: "try:\n    risky()\nexcept ValueError:\n    ...\nelse:\n    ...\nfinally:\n    ...",
    example: 'try:\n    age = int(input("Age: "))\nexcept ValueError:\n    print("That\'s not a number.")\nelse:\n    print(f"You are {age}.")\nfinally:\n    print("Done asking.")',
    commonMistakes: [
      "Using a bare `except:` — it silently swallows every error, including ones you didn't expect and need to see.",
      "Catching an error but not doing anything useful with it (an empty except block hides real bugs).",
      "Confusing a logic error (wrong result, no crash) with a runtime error (a crash) — logic errors need testing, not try/except."
    ],
    practice: {
      prompt: "Write code that asks the user for a number with input(), converts it to an int inside a try block, and prints \"Invalid input\" if conversion fails.",
      starter: "# your code here",
      hint: "Wrap the int(input(...)) call in try, and catch ValueError."
    },
    challenge: {
      prompt: "Write a function `safe_divide(a, b)` that returns the division result, or the string \"Cannot divide by zero\" if b is 0 — using try/except instead of an if check."
    },
    knowledgeCheck: [
      {
        q: "What is the main problem with a bare `except:`?",
        options: ["It's slower than except ValueError", "It catches every error, hiding bugs you didn't anticipate", "It only works with ValueError", "It prevents the finally block from running"],
        answer: 1,
        explain: "A bare except catches all exceptions indiscriminately, including ones you'd actually want to see and fix."
      }
    ]
  },
  {
    id: "l-files",
    levelId: "lvl6",
    title: "Files & Data",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["l-errors"],
    concept: "Files let your program save data that survives after it stops running.",
    analogy: "Variables are a whiteboard — wiped clean when the program ends. Files are a notebook — what you write stays there.",
    whyItMatters: "Any real application needs to persist data: settings, user records, logs, or results — all of that lives in files.",
    explanation: [
      "`with open(\"file.txt\") as f:` opens a file and automatically closes it when the block ends, even if an error occurs.",
      "Mode matters: `\"r\"` reads, `\"w\"` overwrites, `\"a\"` appends.",
      "The `json` module converts between Python dictionaries/lists and JSON text — ideal for structured data.",
      "`pathlib.Path` gives you a cleaner, more reliable way to work with file paths than raw strings."
    ],
    syntax: 'with open("file.txt", "r") as f:\n    contents = f.read()\n\nimport json\njson.dump(data, f)\ndata = json.load(f)',
    example: 'import json\n\ndata = {"name": "Ada", "score": 95}\n\nwith open("result.json", "w") as f:\n    json.dump(data, f)\n\nwith open("result.json") as f:\n    loaded = json.load(f)\nprint(loaded["name"])',
    commonMistakes: [
      "Forgetting to close a file when not using `with` — this can corrupt data or lock the file.",
      "Opening a file in \"w\" mode when you meant \"a\", accidentally erasing existing content.",
      "Trying to read a file that doesn't exist without handling FileNotFoundError."
    ],
    practice: {
      prompt: "Write code that saves the dictionary {\"status\": \"ok\"} to a file called status.json using the json module.",
      starter: "import json\n# your code here",
      hint: "Open the file in write mode and use json.dump(data, f)."
    },
    challenge: {
      prompt: "Write code that tries to read notes.txt and prints its contents, printing \"No notes yet\" if the file doesn't exist."
    },
    knowledgeCheck: [
      {
        q: "Why is `with open(...) as f:` preferred over calling open() directly?",
        options: ["It's faster to type", "It automatically closes the file even if an error happens", "It's the only way to read JSON", "It prevents typos in the filename"],
        answer: 1,
        explain: "The with statement guarantees proper cleanup (closing the file) regardless of how the block exits."
      }
    ]
  },
  {
    id: "l-regex",
    levelId: "lvl7",
    title: "Regular Expressions",
    difficulty: "Hard",
    minutes: 15,
    prereq: ["l-files"],
    concept: "A regular expression is a pattern used to search, match, or extract specific text.",
    analogy: "Regex is a search template with wildcards — instead of finding the exact word \"cat\", you can find \"any three-digit number\" or \"anything that looks like an email\".",
    whyItMatters: "Regex is everywhere in real code: validating emails, parsing logs, cleaning messy data, and extracting structured info from text.",
    explanation: [
      "`\\d` matches a digit, `\\w` matches a word character, `.` matches any character, and `+`/`*` control how many times to match.",
      "`re.search(pattern, text)` finds the first match anywhere in the text; `re.findall(pattern, text)` returns every match.",
      "Parentheses `()` create a capturing group, letting you pull out just the part of the match you care about.",
      "Always use raw strings (`r\"...\"`) for patterns, so backslashes aren't interpreted by Python itself first."
    ],
    syntax: 'import re\nre.search(r"pattern", text)\nre.findall(r"pattern", text)',
    example: 'import re\n\nlog = "Failed login from 192.168.1.14 at 03:12"\nip = re.search(r"\\d+\\.\\d+\\.\\d+\\.\\d+", log)\nprint(ip.group())   # 192.168.1.14',
    commonMistakes: [
      "Forgetting the `r` prefix, causing escape sequences like `\\d` to be misinterpreted.",
      "Writing an overly greedy pattern that matches far more text than intended.",
      "Using re.search() when you meant re.findall() (or the reverse) and being confused by the result shape."
    ],
    practice: {
      prompt: "Use re.findall() with the pattern r\"\\d+\" to extract all numbers from the string \"Room 42, Floor 3\".",
      starter: 'import re\ntext = "Room 42, Floor 3"\n# your code here',
      hint: "re.findall(r\"\\d+\", text) returns a list of every number found."
    },
    challenge: {
      prompt: "Write a regex check that returns True if a string looks like a simple email address (something@something.something)."
    },
    knowledgeCheck: [
      {
        q: "Why should regex patterns usually be written as raw strings (r\"...\")?",
        options: ["Raw strings run faster", "So backslash sequences like \\d aren't interpreted by Python before re sees them", "It's required by the import statement", "Raw strings support Unicode better"],
        answer: 1,
        explain: "Without the r prefix, Python may interpret \\d or similar sequences before regex ever processes them."
      }
    ]
  },
  {
    id: "l-modules",
    levelId: "lvl8",
    title: "Modules & Packages",
    difficulty: "Medium",
    minutes: 11,
    prereq: ["l-regex"],
    concept: "A module is a single Python file of reusable code; a package is a folder of related modules.",
    analogy: "Modules are like toolboxes — instead of building every tool from scratch, you import the one you need.",
    whyItMatters: "No real project lives in a single file. Splitting code into modules keeps large projects organized and lets you reuse the standard library instead of reinventing it.",
    explanation: [
      "`import module` gives you access via `module.thing`; `from module import thing` brings `thing` directly into your namespace.",
      "The standard library already includes modules like `os`, `math`, `random`, `datetime`, and `json` — always check before writing something from scratch.",
      "`if __name__ == \"__main__\":` lets a file be both a reusable module and a runnable script — code inside only runs when the file is executed directly, not when imported.",
      "A package is just a folder containing an `__init__.py` (even an empty one) plus other module files."
    ],
    syntax: 'import math\nfrom math import sqrt\n\nif __name__ == "__main__":\n    main()',
    example: 'import random\nfrom datetime import date\n\nprint(random.randint(1, 10))\nprint(date.today())',
    commonMistakes: [
      "Naming your own file the same as a standard library module (e.g. random.py), which shadows the real one.",
      "Forgetting `__init__.py` when organizing a package (needed in older Python versions and still common practice).",
      "Using `from module import *`, which pollutes your namespace and hides where names came from."
    ],
    practice: {
      prompt: "Import the math module and print the square root of 81 using math.sqrt().",
      starter: "# your code here",
      hint: "import math, then math.sqrt(81)."
    },
    challenge: {
      prompt: "Write a small script with a main() function, guarded by if __name__ == \"__main__\", that prints today's date using the datetime module."
    },
    knowledgeCheck: [
      {
        q: "What does `if __name__ == \"__main__\":` let you do?",
        options: ["Import a module faster", "Run code only when the file is executed directly, not when imported", "Skip writing functions", "Automatically install packages"],
        answer: 1,
        explain: "This guard separates 'run when executed' logic from 'run when imported as a module' logic."
      }
    ]
  },
  {
    id: "l-oop",
    levelId: "lvl9",
    title: "Object-Oriented Programming",
    difficulty: "Hard",
    minutes: 18,
    prereq: ["l-modules"],
    concept: "A class bundles related data (attributes) and behavior (methods) into a single reusable blueprint.",
    analogy: "A class is a blueprint for a house; each object you create from it is an actual house — same design, different address and paint color.",
    whyItMatters: "OOP is how most real-world Python code — frameworks, libraries, games, and applications — organizes complex, related data and behavior.",
    explanation: [
      "`class Dog:` defines a blueprint. `__init__(self, ...)` runs automatically when you create a new object, setting up its starting attributes.",
      "`self` refers to the specific object the method is being called on — it's how each object keeps its own separate data.",
      "Inheritance lets one class (`class Puppy(Dog):`) reuse and extend another's behavior instead of duplicating it.",
      "Encapsulation means keeping an object's internal details private-ish and exposing a clean interface through methods."
    ],
    syntax: "class Name:\n    def __init__(self, attr):\n        self.attr = attr\n    def method(self):\n        return self.attr",
    example: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n    def bark(self):\n        return f"{self.name} says woof!"\n\nrex = Dog("Rex", "Labrador")\nprint(rex.bark())',
    commonMistakes: [
      "Forgetting `self` as the first parameter of every instance method.",
      "Confusing class attributes (shared by all objects) with instance attributes (unique per object).",
      "Overusing inheritance when composition (an object containing another) would be simpler and more flexible."
    ],
    practice: {
      prompt: "Create a class `Book` with an __init__ that stores `title` and `author`. Create an instance and print its title.",
      starter: "class Book:\n    # your code here\n\nb = Book(\"Dune\", \"Frank Herbert\")\nprint(b.title)",
      hint: "def __init__(self, title, author): then self.title = title, self.author = author."
    },
    challenge: {
      prompt: "Add a method `describe(self)` to the Book class that returns a sentence combining title and author, then call it."
    },
    knowledgeCheck: [
      {
        q: "What is `self` inside an instance method?",
        options: ["A global variable", "A reference to the specific object the method was called on", "The class name", "An optional keyword argument"],
        answer: 1,
        explain: "self lets each object keep track of its own attributes, separate from every other instance of the class."
      }
    ]
  },
  {
    id: "l-workflow",
    levelId: "lvl10",
    title: "Virtual Environments & Git",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["l-oop"],
    concept: "Professional Python projects isolate their dependencies with virtual environments and track their history with Git.",
    analogy: "A virtual environment is a separate toolbox per project, so upgrading tools for one project never breaks another. Git is a save-file system for your code, with the ability to rewind or branch off.",
    whyItMatters: "These aren't optional extras — they're how real teams avoid dependency conflicts and lost work, and they're expected knowledge for any Python job.",
    explanation: [
      "`python -m venv .venv` creates an isolated environment; activating it makes `pip install` affect only that project.",
      "`requirements.txt` lists a project's dependencies so anyone (including future you) can recreate the same environment with `pip install -r requirements.txt`.",
      "Git tracks changes as commits. `git add`, `git commit -m \"message\"`, and `git push` are the core loop of saving and sharing work.",
      "Clean code habits — docstrings, type hints, and PEP 8 formatting — make code easier for others (and future you) to read and maintain."
    ],
    syntax: "python -m venv .venv\npip install -r requirements.txt\ngit add .\ngit commit -m \"message\"\ngit push",
    example: 'def add(a: int, b: int) -> int:\n    """Return the sum of two integers."""\n    return a + b',
    commonMistakes: [
      "Committing a virtual environment folder to Git — it should be excluded via .gitignore.",
      "Installing packages globally instead of inside an activated virtual environment, causing version conflicts later.",
      "Vague commit messages like \"fix stuff\" that give no information about what actually changed."
    ],
    practice: {
      prompt: "Write the docstring and type hints for a function `multiply(a: int, b: int) -> int` that returns the product.",
      starter: "def multiply(a, b):\n    # add type hints and a docstring, then implement\n    pass",
      hint: "Type hints go after the parameter name with a colon, and after -> for the return type."
    },
    challenge: {
      prompt: "Write out, in order, the exact git commands you'd run to save a new file called app.py to a repository for the first time."
    },
    knowledgeCheck: [
      {
        q: "Why should a project's virtual environment folder be excluded from Git (via .gitignore)?",
        options: ["Git can't handle folders", "It's large, machine-specific, and easily recreated from requirements.txt", "Virtual environments don't contain code", "GitHub blocks it automatically"],
        answer: 1,
        explain: "Environments are regenerable from requirements.txt and vary by machine, so tracking them in Git just adds noise and bloat."
      }
    ]
  }
];

/* =========================================================================
   CYBERSECURITY TRACK — curriculum
   ========================================================================= */

const CYBER_LEVELS = [
  { id: "cy-lvl1", num: 1, title: "Security Fundamentals", track: "cyber", topics: ["CIA triad", "Authentication", "Authorization", "Access control", "Threats", "Vulnerabilities", "Risk", "Attack surface", "Security principles"] },
  { id: "cy-lvl2", num: 2, title: "Networking", track: "cyber", topics: ["IP addresses", "MAC addresses", "Ports", "TCP", "UDP", "DNS", "HTTP/S", "Network layers", "Packets", "Client/server", "Sockets"] },
  { id: "cy-lvl3", num: 3, title: "Python Networking", track: "cyber", topics: ["socket", "TCP clients", "TCP servers", "Connections", "Basic protocol handling", "Timeouts", "Error handling"] },
  { id: "cy-lvl4", num: 4, title: "Operating Systems", track: "cyber", topics: ["Processes", "Filesystems", "Permissions", "Environment variables", "Subprocesses", "Logs", "System information"] },
  { id: "cy-lvl5", num: 5, title: "Logs & Security Analytics", track: "cyber", topics: ["Log formats", "Parsing", "Regex", "Event classification", "Authentication logs", "Error detection", "Suspicious patterns", "Basic anomaly detection"] },
  { id: "cy-lvl6", num: 6, title: "Cryptography Fundamentals", track: "cyber", topics: ["Hashing", "Encoding vs encryption", "Symmetric encryption", "Asymmetric encryption", "Keys", "Digital signatures", "Certificates", "Secure password storage"] },
  { id: "cy-lvl7", num: 7, title: "Secure Python", track: "cyber", topics: ["Input validation", "Safe file handling", "Authentication concepts", "Secrets management", "Dependency security", "Error handling", "Secure coding principles"] },
  { id: "cy-lvl8", num: 8, title: "Security Automation", track: "cyber", topics: ["Log analysis", "File integrity monitoring", "Security report generation", "System monitoring", "Safe automation"] },
];

const CYBER_LESSONS = [
  {
    id: "cy-cia",
    levelId: "cy-lvl1",
    title: "The CIA Triad & Security Principles",
    difficulty: "Easy",
    minutes: 12,
    prereq: [],
    concept: "Nearly every security decision comes back to three goals: Confidentiality, Integrity, and Availability — the CIA triad.",
    analogy: "Think of a bank vault: Confidentiality is the locked door (only authorized people get in), Integrity is the tamper-proof seal on each deposit box (contents aren't altered), and Availability is the bank actually being open when customers need it.",
    whyItMatters: "Every vulnerability, control, and security decision you'll learn about maps back to protecting one (or more) of these three properties. It's the shared vocabulary of the whole field.",
    explanation: [
      "Confidentiality means only authorized people or systems can read the data — protected by things like encryption and access control.",
      "Integrity means data hasn't been altered, accidentally or maliciously — protected by things like checksums and digital signatures.",
      "Availability means authorized users can access the system when they need it — threatened by things like denial-of-service attacks or hardware failure.",
      "Authentication (proving who you are) and authorization (what you're allowed to do once verified) are two different, often-confused steps that support all three goals.",
      "Risk is the likelihood of a threat exploiting a vulnerability, multiplied by the impact if it happens. The attack surface is everything an attacker could potentially target — the more entry points, the larger the surface."
    ],
    syntax: "Confidentiality · Integrity · Availability",
    example: "A password reset flow:\n- Confidentiality: the reset link is sent only to the verified email\n- Integrity: the new password can't be tampered with in transit (HTTPS)\n- Availability: the reset service stays up so a locked-out user can recover access",
    commonMistakes: [
      "Confusing authentication (who you are) with authorization (what you're allowed to do) — a user can be authenticated but not authorized for a specific action.",
      "Treating security as only about keeping secrets, and forgetting integrity and availability entirely.",
      "Assuming a system with no known vulnerabilities has no risk — risk also depends on likelihood and impact, which change over time."
    ],
    practice: {
      prompt: "For an online banking app, name one control that primarily protects Confidentiality, one for Integrity, and one for Availability.",
      starter: "# Write your three examples as comments, one per line",
      hint: "Confidentiality controls limit who can read something; integrity controls detect/prevent tampering; availability controls keep the service running."
    },
    challenge: {
      prompt: "Describe a real (hypothetical) scenario where improving Availability could actually weaken Confidentiality, and explain the tradeoff."
    },
    knowledgeCheck: [
      {
        q: "A hacker deletes log files to hide their tracks, but doesn't read or change any other data. Which part of the CIA triad have they violated?",
        options: ["Confidentiality only", "Integrity only", "Availability only", "Both Integrity and Availability"],
        answer: 3,
        explain: "Deleting logs alters/destroys existing records (integrity) and removes access to that data for legitimate use later (availability)."
      }
    ]
  },
  {
    id: "cy-networking",
    levelId: "cy-lvl2",
    title: "Networking Fundamentals",
    difficulty: "Medium",
    minutes: 15,
    prereq: ["cy-cia"],
    concept: "Networking is how computers find and talk to each other — the plumbing underneath every website, API, and attack you'll ever analyze.",
    analogy: "An IP address is like a street address (where to send the mail), a port is like an apartment number at that address (which specific service should receive it), and a protocol like TCP is the agreed-upon way the mail carrier and recipient confirm delivery.",
    whyItMatters: "You can't understand network attacks, packet captures, or log files without understanding what a normal connection looks like first.",
    explanation: [
      "An IP address identifies a device on a network; a MAC address identifies a specific physical network interface on the local network segment.",
      "A port number identifies which service on a device should handle traffic — port 80 for HTTP, port 443 for HTTPS, port 22 for SSH, and so on.",
      "TCP is connection-oriented and reliable (it confirms delivery); UDP is faster but doesn't guarantee delivery — used for things like video streaming.",
      "DNS translates human-readable domain names into IP addresses.",
      "In client/server architecture, a client initiates a request and a server listens and responds — this is the model almost every socket connection follows."
    ],
    syntax: "IP address : Port  →  e.g. 192.168.1.10:443",
    example: "A browser visiting https://example.com:\n1. DNS resolves example.com → an IP address\n2. The browser opens a TCP connection to that IP on port 443\n3. HTTPS (HTTP over TLS) is spoken over that connection\n4. The server responds with the page content",
    commonMistakes: [
      "Confusing a port number with an IP address — a port only makes sense combined with a specific host.",
      "Assuming UDP is 'worse' than TCP — it's a deliberate tradeoff of reliability for speed, appropriate for some use cases.",
      "Forgetting that DNS results can be spoofed or poisoned — trusting a hostname doesn't guarantee trusting its resolved IP."
    ],
    practice: {
      prompt: "List which port is conventionally used for: HTTP, HTTPS, and SSH.",
      starter: "# HTTP: \n# HTTPS: \n# SSH: ",
      hint: "These are three of the most common 'well-known' ports, all under 1024."
    },
    challenge: {
      prompt: "Explain, in your own words, why a service might deliberately choose UDP over TCP even though UDP can lose packets."
    },
    knowledgeCheck: [
      {
        q: "What's the main practical difference between TCP and UDP?",
        options: ["TCP is for text, UDP is for images", "TCP confirms delivery and is reliable; UDP is faster but doesn't guarantee delivery", "UDP is more secure than TCP", "There is no real difference"],
        answer: 1,
        explain: "TCP establishes a connection and confirms packets arrive; UDP just sends packets without that guarantee, trading reliability for speed."
      }
    ]
  },
  {
    id: "cy-sockets",
    levelId: "cy-lvl3",
    title: "Python Networking with Sockets",
    difficulty: "Hard",
    minutes: 16,
    prereq: ["cy-networking", "l-errors"],
    concept: "The socket module is Python's low-level interface for sending and receiving data over a network — the foundation underneath most networked Python tools.",
    analogy: "A socket is like a phone line: one end dials (the client), the other end must be listening and pick up (the server), and once connected, both sides can talk until someone hangs up.",
    whyItMatters: "Understanding sockets demystifies what's actually happening when any Python security tool scans a port, connects to a service, or listens for connections.",
    explanation: [
      "A server socket typically calls bind() (claim an address/port), listen() (wait for connections), and accept() (handle an incoming connection).",
      "A client socket calls connect() to a specific host and port.",
      "Always set a timeout on network operations — an unresponsive host can otherwise hang your program indefinitely.",
      "Wrap socket operations in try/except, since network errors (refused connections, timeouts, unreachable hosts) are common and expected, not exceptional edge cases."
    ],
    syntax: "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.settimeout(3)\ns.connect((host, port))",
    example: 'import socket\n\ndef check_port(host, port, timeout=2):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(timeout)\n    try:\n        s.connect((host, port))\n        return True\n    except (socket.timeout, ConnectionRefusedError, OSError):\n        return False\n    finally:\n        s.close()\n\nprint(check_port("example.com", 443))',
    commonMistakes: [
      "Forgetting to set a timeout, causing the program to hang on an unreachable host.",
      "Not closing sockets when done, leaking resources over many connections.",
      "Only running this against systems you own or are explicitly authorized to test — port scanning systems you don't have permission for is illegal in most places."
    ],
    practice: {
      prompt: "Write a function `check_port(host, port)` that returns True if a TCP connection to that host/port succeeds within 2 seconds, and False otherwise — only ever test 'localhost' or hosts you own.",
      starter: "import socket\n\ndef check_port(host, port):\n    # your code here\n    pass\n\nprint(check_port(\"localhost\", 80))",
      hint: "Use socket.socket(), settimeout(), connect(), and catch the relevant exceptions."
    },
    challenge: {
      prompt: "Extend check_port into a function that checks a short list of common ports (80, 443, 22) on localhost and reports which are open, clearly labeled as a tool for your own authorized systems only."
    },
    knowledgeCheck: [
      {
        q: "Why is setting a timeout important when writing socket client code?",
        options: ["It makes the connection faster", "Without it, an unreachable or slow host can hang your program indefinitely", "It's required by Python syntax", "It encrypts the connection"],
        answer: 1,
        explain: "Network calls can hang waiting for a response that never comes — a timeout guarantees your program eventually gives up and moves on."
      }
    ]
  },
  {
    id: "cy-logs",
    levelId: "cy-lvl5",
    title: "Logs & Security Analytics",
    difficulty: "Hard",
    minutes: 16,
    prereq: ["l-regex"],
    concept: "Security analysis usually starts with logs — text records of what happened, when, and who was involved.",
    analogy: "A log file is like a security camera's timestamped footage log — mostly routine, but occasionally showing something worth flagging, if you know what pattern to look for.",
    whyItMatters: "Log parsing and pattern recognition are the actual day-to-day work behind terms like 'threat detection' and 'security monitoring' — it's regex and data structures applied to a security problem.",
    explanation: [
      "Most logs share a rough shape: a timestamp, a source, an event type, and details — but the exact format varies wildly between systems.",
      "Regex is the standard tool for extracting structured fields (IPs, usernames, timestamps) out of unstructured log lines.",
      "Event classification means sorting log lines into categories (e.g. successful login, failed login, permission denied) so you can count and analyze them.",
      "Suspicious patterns often look like: many failed logins from one IP in a short time, logins at unusual hours, or access to resources a user doesn't normally touch. This kind of simple frequency-based flagging is 'basic anomaly detection' — noticing what's statistically unusual, not necessarily malicious."
    ],
    syntax: "import re\nre.search(r\"pattern\", log_line)",
    example: 'import re\n\nline = "2026-01-01 10:02:03 FAILED login user=admin ip=192.168.1.14"\nmatch = re.search(r"ip=(\\d+\\.\\d+\\.\\d+\\.\\d+)", line)\nif match:\n    print(match.group(1))   # 192.168.1.14',
    commonMistakes: [
      "Writing one giant regex that tries to parse an entire log line at once — usually more fragile than extracting fields with a few smaller, targeted patterns.",
      "Flagging a single failed login as 'suspicious' — real detection usually looks at frequency and pattern, not one isolated event.",
      "Assuming every log format is the same — always check a few sample lines before writing your parser."
    ],
    practice: {
      prompt: "Given a log line 'FAILED login user=root ip=10.0.0.5', use regex to extract the username and IP address separately.",
      starter: 'import re\nline = "FAILED login user=root ip=10.0.0.5"\n# your code here',
      hint: "Two separate re.search() calls with targeted patterns (user=(\\S+) and ip=(\\d+\\.\\d+\\.\\d+\\.\\d+)) are simpler than one combined pattern."
    },
    challenge: {
      prompt: "Given a list of (ip, status) tuples from parsed log lines, write code that flags any IP with 3 or more FAILED entries as suspicious."
    },
    knowledgeCheck: [
      {
        q: "What generally makes a pattern of failed logins 'suspicious' rather than just routine noise?",
        options: ["Any single failed login is automatically suspicious", "Frequency and pattern — e.g. many failures from one source in a short window", "The word 'FAILED' appearing anywhere in a file", "Failed logins are never meaningful"],
        answer: 1,
        explain: "One failed login is normal (typos happen); a burst of them from one source in a short time is the kind of pattern worth flagging."
      }
    ]
  },
  {
    id: "cy-crypto",
    levelId: "cy-lvl6",
    title: "Cryptography Fundamentals",
    difficulty: "Hard",
    minutes: 15,
    prereq: ["cy-cia"],
    concept: "Cryptography protects data using mathematical techniques — hashing, encryption, and digital signatures — each solving a different problem.",
    analogy: "Encryption is like a locked box with a key (reversible — you can get the contents back). Hashing is like a blender (irreversible — you can't reconstruct the fruit from a smoothie), but the same input always produces the same smoothie, which is exactly what makes it useful for verification.",
    whyItMatters: "Nearly every secure system depends on these concepts: passwords are hashed, connections are encrypted, and software updates are signed. Misunderstanding the difference between them is a classic source of real vulnerabilities.",
    explanation: [
      "Hashing converts data into a fixed-size fingerprint. It's one-way — you can't reverse a hash back into the original data. Used for verifying integrity and storing passwords (never store passwords as plain text).",
      "Encoding (like Base64) is NOT encryption — it's just a reversible format conversion, with no secret key involved. It provides zero confidentiality.",
      "Symmetric encryption uses the same key to encrypt and decrypt — fast, but the key must be shared secretly beforehand.",
      "Asymmetric encryption uses a public key (shared freely, used to encrypt) and a private key (kept secret, used to decrypt) — solves the key-sharing problem, at the cost of speed.",
      "A digital signature proves a message came from a specific sender and wasn't altered, using the sender's private key. Certificates bind a public key to an identity, verified by a trusted authority.",
      "For passwords specifically: never invent your own scheme. Use an established, slow, salted hashing algorithm designed for passwords (like bcrypt or Argon2) — never a fast general-purpose hash like plain MD5 or SHA-256 alone."
    ],
    syntax: "hash(data) -> fixed-size fingerprint (one-way)\nencrypt(data, key) -> ciphertext (reversible with the right key)",
    example: 'import hashlib\n\ndata = "hello world"\nfingerprint = hashlib.sha256(data.encode()).hexdigest()\nprint(fingerprint)\n# Same input always produces the same hash — useful for verifying nothing changed.',
    commonMistakes: [
      "Confusing encoding (Base64) with encryption — encoding provides no security at all, it's just a different representation of the same data.",
      "Storing passwords with a fast general-purpose hash (like raw MD5) instead of a slow, purpose-built password hashing algorithm — this makes brute-forcing far easier.",
      "Assuming 'encrypted' automatically means 'secure' — weak keys, bad implementations, or leaked keys can undermine strong algorithms."
    ],
    practice: {
      prompt: "Use Python's hashlib to compute the SHA-256 hash of the string 'pycademy' and print it as hex.",
      starter: 'import hashlib\ntext = "pycademy"\n# your code here',
      hint: "hashlib.sha256(text.encode()).hexdigest() gives you a hex string."
    },
    challenge: {
      prompt: "Write a short explanation (as a comment) of why storing passwords with plain SHA-256 alone is considered weak practice today, even though SHA-256 itself isn't broken."
    },
    knowledgeCheck: [
      {
        q: "What is the key practical difference between hashing and encryption?",
        options: ["They're the same thing", "Hashing is reversible, encryption is not", "Hashing is one-way (irreversible); encryption is reversible with the right key", "Encryption is only used for passwords"],
        answer: 2,
        explain: "Hashing produces a one-way fingerprint useful for verification; encryption is designed to be reversed by whoever holds the correct key."
      }
    ]
  },
  {
    id: "cy-secure-python",
    levelId: "cy-lvl7",
    title: "Secure Python Practices",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["cy-crypto", "l-errors"],
    concept: "Secure coding is less about exotic attacks and more about consistently validating input, handling errors safely, and never hardcoding secrets.",
    analogy: "Secure code is like a bouncer checking IDs at every door, not just the front entrance — every place data enters your program deserves scrutiny, not just the obvious ones.",
    whyItMatters: "The large majority of real-world vulnerabilities come from a small set of repeated mistakes: trusting input, hardcoded secrets, and swallowed errors — all fixable with consistent habits.",
    explanation: [
      "Input validation means checking that data is the type, format, and range you expect before using it — never trust input from a user, file, or network.",
      "Secrets (API keys, passwords, tokens) belong in environment variables or a secrets manager — never hardcoded in source code or committed to Git.",
      "Safe file handling means validating file paths (to avoid path traversal), and being careful with permissions on any files you create.",
      "Dependency security means keeping third-party packages updated, since vulnerabilities are regularly found and patched in popular libraries.",
      "Good error handling means catching specific exceptions and failing safely — not swallowing errors silently with a bare except, and not leaking sensitive details in error messages shown to users."
    ],
    syntax: "os.environ.get(\"API_KEY\")   # not: API_KEY = \"sk-abc123...\"",
    example: 'import os\n\napi_key = os.environ.get("API_KEY")\nif not api_key:\n    raise RuntimeError("API_KEY environment variable is not set")',
    commonMistakes: [
      "Hardcoding a password or API key directly in a script, especially one that might get committed to Git.",
      "Trusting a filename or path from user input without validating it, opening the door to path traversal.",
      "Showing raw exception details (like a stack trace or database error) directly to end users — this can leak information useful to an attacker."
    ],
    practice: {
      prompt: "Rewrite a snippet that hardcodes `API_KEY = \"sk-12345\"` to instead read it safely from an environment variable, raising a clear error if it's missing.",
      starter: '# API_KEY = "sk-12345"  <- fix this\n# your code here',
      hint: "os.environ.get(\"API_KEY\") returns None if the variable isn't set — check for that and raise a clear error."
    },
    challenge: {
      prompt: "Write a function that validates a username: only allows letters, numbers, and underscores, between 3 and 20 characters — rejecting anything else with a clear message."
    },
    knowledgeCheck: [
      {
        q: "Where should a real API key live in your code?",
        options: ["Hardcoded as a string constant", "In a comment for documentation", "In an environment variable, read at runtime", "In the filename"],
        answer: 2,
        explain: "Environment variables (or a dedicated secrets manager) keep credentials out of source code and version control."
      }
    ]
  }
];

/* =========================================================================
   DATA / AI / ML TRACK — curriculum
   ========================================================================= */

const DATA_LEVELS = [
  { id: "da-lvl1", num: 1, title: "Data Fundamentals", track: "data", topics: ["What data is", "Structured vs unstructured data", "Variables", "Records", "Missing data", "Data types"] },
  { id: "da-lvl2", num: 2, title: "NumPy", track: "data", topics: ["Arrays", "Shapes", "Indexing", "Vectorized operations", "Basic numerical computation"] },
  { id: "da-lvl3", num: 3, title: "pandas", track: "data", topics: ["Series", "DataFrames", "Reading CSV", "Filtering", "Sorting", "Grouping", "Missing values", "Cleaning", "Aggregation"] },
  { id: "da-lvl4", num: 4, title: "Visualization", track: "data", topics: ["Matplotlib", "Histograms", "Scatter plots", "Bar charts", "Line charts", "Interpreting graphs"] },
  { id: "da-lvl5", num: 5, title: "Statistics", track: "data", topics: ["Mean, median, mode", "Variance", "Standard deviation", "Correlation", "Distributions", "Sampling", "Basic probability"] },
  { id: "da-lvl6", num: 6, title: "Machine Learning Foundations", track: "data", topics: ["Features & labels", "Train/validation/test", "Supervised vs unsupervised", "Regression", "Classification", "Clustering", "Overfitting/underfitting", "Evaluation metrics", "scikit-learn"] },
  { id: "da-lvl7", num: 7, title: "Neural Networks & Beyond", track: "data", topics: ["Neurons & layers", "Weights & biases", "Activation functions", "Forward propagation", "Backpropagation", "Gradient descent", "Epochs & batches", "NLP & transformers concepts"] },
];

const DATA_LESSONS = [
  {
    id: "da-fundamentals",
    levelId: "da-lvl1",
    title: "What Is Data?",
    difficulty: "Easy",
    minutes: 10,
    prereq: ["l-dicts"],
    concept: "Data is any recorded information — and how it's structured determines what tools you can use to work with it.",
    analogy: "Structured data is like a spreadsheet — rows and columns, predictable and easy to query. Unstructured data is like a pile of letters — full of information, but you need extra work (like NLP) to extract anything usable from it.",
    whyItMatters: "Every data science and ML technique assumes a certain shape of data. Recognizing that shape is the first step before choosing any tool.",
    explanation: [
      "Structured data fits neatly into rows and columns — like a spreadsheet or database table. Each row is often called a record.",
      "Unstructured data has no fixed format — free text, images, audio. It usually needs preprocessing before it's usable.",
      "A missing value (often shown as NaN or null) represents data that wasn't recorded — handling it properly (rather than ignoring it) is one of the most common real-world data tasks.",
      "The core data types you'll work with are familiar from Python itself: numbers (int/float), text (str), booleans, and dates."
    ],
    syntax: "record = {\"name\": \"Ada\", \"age\": 30, \"score\": None}  # None represents missing data",
    example: 'students = [\n    {"name": "Ada", "score": 92},\n    {"name": "Sam", "score": None},  # missing\n    {"name": "Lee", "score": 78},\n]',
    commonMistakes: [
      "Treating a missing value as zero — a missing test score and a score of 0 mean very different things.",
      "Assuming all real-world data arrives clean and structured — most of it doesn't.",
      "Confusing a 'feature' (an input column) with a 'label' (the thing you're trying to predict) early on — this distinction matters a lot once you reach machine learning."
    ],
    practice: {
      prompt: "Given a list of student score dictionaries where some scores are None, write code that counts how many students have a missing score.",
      starter: 'students = [{"name": "Ada", "score": 92}, {"name": "Sam", "score": None}, {"name": "Lee", "score": 78}]\n# your code here',
      hint: "Loop through and check `if s[\"score\"] is None`."
    },
    challenge: {
      prompt: "Write code that computes the average score, correctly ignoring any students with a missing (None) score."
    },
    knowledgeCheck: [
      {
        q: "Why shouldn't a missing numeric value just be treated as 0?",
        options: ["It's fine, 0 is a safe default", "0 is a real, meaningful value that's different from 'we don't know'", "Missing values don't exist in real data", "Python doesn't allow storing missing values"],
        answer: 1,
        explain: "Treating 'unknown' the same as 'zero' silently corrupts any calculation involving that field, like an average."
      }
    ]
  },
  {
    id: "da-numpy",
    levelId: "da-lvl2",
    title: "NumPy Arrays",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["da-fundamentals", "l-lists"],
    concept: "NumPy provides fast, fixed-type arrays and lets you apply operations to entire collections of numbers at once, instead of looping manually.",
    analogy: "A Python list is like carrying groceries one bag at a time; a NumPy array is like a conveyor belt — you apply one operation and it runs across every item at once, much faster.",
    whyItMatters: "NumPy is the numerical foundation underneath pandas, scikit-learn, and most of the Python data/ML ecosystem — understanding arrays first makes everything built on top of them click faster.",
    explanation: [
      "Create an array with `np.array([...])`. Unlike a list, every element must be the same type.",
      "`.shape` tells you an array's dimensions — e.g. (3,) for a 1D array of 3 items, (2, 3) for 2 rows by 3 columns.",
      "Indexing and slicing work similarly to lists, but extend naturally to multiple dimensions: `arr[1, 2]` for row 1, column 2.",
      "Vectorized operations apply to the whole array at once — `arr * 2` doubles every element, no loop required, and it's dramatically faster than a Python for loop for large data."
    ],
    syntax: "import numpy as np\narr = np.array([1, 2, 3])\narr.shape\narr * 2",
    example: 'import numpy as np\n\nprices = np.array([10, 20, 30])\ndiscounted = prices * 0.9\nprint(discounted)          # [9. 18. 27.]\nprint(prices.shape)        # (3,)',
    commonMistakes: [
      "Looping over a NumPy array element-by-element with plain Python — this throws away the speed benefit; use vectorized operations instead.",
      "Mixing types in an array creation call and being surprised when NumPy silently converts everything to one type.",
      "Confusing shape (2,3) meaning '2 rows, 3 columns' with the reverse."
    ],
    practice: {
      prompt: "Create a NumPy array from the list [4, 8, 15, 16, 23], then print an array where every value has been increased by 10.",
      starter: "import numpy as np\ndata = [4, 8, 15, 16, 23]\n# your code here",
      hint: "np.array(data) + 10 adds 10 to every element at once."
    },
    challenge: {
      prompt: "Given a NumPy array of exam scores, write code that prints only the scores above the array's own mean (np.mean(arr))."
    },
    knowledgeCheck: [
      {
        q: "What does a vectorized operation like `arr * 2` do?",
        options: ["Doubles only the first element", "Applies the operation to every element at once, without an explicit loop", "Creates two copies of the array", "Raises an error unless you loop manually"],
        answer: 1,
        explain: "Vectorization applies the operation across the whole array internally, which is both more concise and much faster than a manual loop."
      }
    ]
  },
  {
    id: "da-pandas",
    levelId: "da-lvl3",
    title: "pandas: Series & DataFrames",
    difficulty: "Medium",
    minutes: 16,
    prereq: ["da-numpy", "l-dicts"],
    concept: "pandas is Python's core tool for working with tabular data — a DataFrame is essentially a smart, programmable spreadsheet.",
    analogy: "A DataFrame is a spreadsheet where every column can be filtered, sorted, or transformed with code instead of manual clicking — and a Series is just a single labeled column of it.",
    whyItMatters: "Almost every real data analysis workflow — cleaning, filtering, grouping, summarizing — happens through pandas before any visualization or modeling occurs.",
    explanation: [
      "A Series is a single labeled column of data; a DataFrame is a table made of multiple Series sharing the same index.",
      "`pd.read_csv(\"file.csv\")` loads tabular data straight into a DataFrame.",
      "Filter rows with boolean indexing: `df[df[\"score\"] > 80]`.",
      "`.sort_values()`, `.groupby()`, and `.agg()` cover most sorting, grouping, and aggregation needs.",
      "Missing values show up as NaN; `.dropna()` removes them and `.fillna(value)` replaces them — which one is appropriate depends on the analysis."
    ],
    syntax: "import pandas as pd\ndf = pd.read_csv(\"file.csv\")\ndf[df[\"col\"] > 10]\ndf.groupby(\"category\").mean()",
    example: 'import pandas as pd\n\ndata = {"name": ["Ada", "Sam", "Lee"], "score": [92, 55, 78]}\ndf = pd.DataFrame(data)\n\npassing = df[df["score"] >= 60]\nprint(passing)',
    commonMistakes: [
      "Confusing `df[\"col\"]` (a Series) with `df[[\"col\"]]` (a one-column DataFrame) — they behave differently for some operations.",
      "Forgetting that most pandas operations return a new DataFrame rather than modifying in place, unless you pass inplace=True or reassign the result.",
      "Not checking for missing values before aggregating, silently skewing averages or sums."
    ],
    practice: {
      prompt: "Given a DataFrame `df` with a 'score' column, write code that filters to rows where score is at least 70.",
      starter: 'import pandas as pd\ndf = pd.DataFrame({"name": ["Ada", "Sam", "Lee"], "score": [92, 55, 78]})\n# your code here',
      hint: "Boolean indexing: df[df[\"score\"] >= 70]"
    },
    challenge: {
      prompt: "Given a DataFrame with 'department' and 'salary' columns, write code that computes the average salary per department using groupby()."
    },
    knowledgeCheck: [
      {
        q: "What does df.groupby(\"category\").mean() do?",
        options: ["Deletes the category column", "Splits the DataFrame by unique category values and computes the mean of each group", "Sorts by category alphabetically", "Only works on numeric DataFrames with no categories"],
        answer: 1,
        explain: "groupby splits rows into groups sharing the same category value, then mean() aggregates each group separately."
      }
    ]
  },
  {
    id: "da-viz",
    levelId: "da-lvl4",
    title: "Visualization with Matplotlib",
    difficulty: "Medium",
    minutes: 12,
    prereq: ["da-pandas"],
    concept: "A chart can reveal patterns in data that are nearly invisible in a raw table — Matplotlib is Python's foundational plotting library.",
    analogy: "Reading a table of a thousand numbers to spot a trend is like trying to hear a song by reading its sheet music silently. A chart lets you actually 'hear' the pattern.",
    whyItMatters: "Every stage of a real project — exploring data, communicating results, debugging a model — depends on visualizing data effectively.",
    explanation: [
      "Line charts show change over a continuous variable, usually time.",
      "Bar charts compare quantities across discrete categories.",
      "Histograms show the distribution of a single numeric variable — how values are spread out.",
      "Scatter plots show the relationship between two numeric variables — useful for spotting correlation.",
      "Always label your axes and give the chart a title — an unlabeled chart can mislead as easily as it can inform."
    ],
    syntax: "import matplotlib.pyplot as plt\nplt.plot(x, y)\nplt.bar(categories, values)\nplt.hist(data)\nplt.scatter(x, y)\nplt.show()",
    example: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar"]\nsales = [120, 150, 90]\n\nplt.bar(months, sales)\nplt.title("Monthly Sales")\nplt.ylabel("Units sold")\nplt.show()',
    commonMistakes: [
      "Choosing the wrong chart type — like a line chart for unordered categories, which implies a trend that doesn't exist.",
      "Skipping axis labels and titles, leaving a chart's meaning ambiguous.",
      "Reading correlation from a scatter plot as proof of causation — a visible relationship doesn't tell you which variable is causing the other, or whether a third factor explains both."
    ],
    practice: {
      prompt: "Using matplotlib, create a bar chart of three fruits ['apple', 'banana', 'cherry'] with counts [10, 25, 15], with a title.",
      starter: 'import matplotlib.pyplot as plt\nfruits = ["apple", "banana", "cherry"]\ncounts = [10, 25, 15]\n# your code here',
      hint: "plt.bar(fruits, counts), then plt.title(\"...\"), then plt.show()."
    },
    challenge: {
      prompt: "Describe (as comments) which chart type you'd choose to show: (1) temperature over a week, (2) the relationship between study hours and test scores, and why."
    },
    knowledgeCheck: [
      {
        q: "Which chart type is best suited for showing the relationship between two numeric variables?",
        options: ["Bar chart", "Scatter plot", "Pie chart", "Histogram"],
        answer: 1,
        explain: "A scatter plot places each pair of values as a point, making relationships (or lack thereof) between two numeric variables visible."
      }
    ]
  },
  {
    id: "da-stats",
    levelId: "da-lvl5",
    title: "Statistics Fundamentals",
    difficulty: "Medium",
    minutes: 15,
    prereq: ["da-viz"],
    concept: "Statistics gives you the vocabulary to describe data precisely — and later, to judge whether a machine learning model is actually learning something real.",
    analogy: "Mean, median, and mode are three different ways of answering 'what's typical here?' — and picking the wrong one can paint a misleading picture, the same way describing a neighborhood's 'typical' income by its richest resident would.",
    whyItMatters: "Every machine learning model you'll eventually build is graded using statistical concepts — without this vocabulary, terms like 'variance' and 'distribution' in ML stay abstract.",
    explanation: [
      "Mean is the average; median is the middle value when sorted; mode is the most frequent value. Median is more robust to outliers than mean.",
      "Variance measures how spread out values are from the mean; standard deviation is the square root of variance, in the same units as the original data.",
      "Correlation measures how strongly two variables move together, from -1 (perfectly opposite) to 1 (perfectly together), with 0 meaning no linear relationship.",
      "A distribution describes the overall shape of how values are spread — like the classic bell-shaped 'normal distribution'.",
      "Sampling means studying a subset of data to draw conclusions about a larger population — the sample needs to be representative, or the conclusions won't generalize."
    ],
    syntax: "mean = sum(values) / len(values)\nimport statistics\nstatistics.median(values)\nstatistics.stdev(values)",
    example: 'import statistics\n\nscores = [72, 85, 90, 61, 95]\nprint(statistics.mean(scores))    # average\nprint(statistics.median(scores))  # middle value\nprint(statistics.stdev(scores))   # spread',
    commonMistakes: [
      "Using the mean on data with extreme outliers, when the median would give a more representative 'typical value'.",
      "Assuming correlation implies causation — two variables can move together without one causing the other.",
      "Drawing conclusions from a small or biased sample and assuming they apply to the whole population."
    ],
    practice: {
      prompt: "Given scores = [55, 60, 62, 58, 95], compute both the mean and median, and note (as a comment) which one better represents the 'typical' score given the outlier.",
      starter: "import statistics\nscores = [55, 60, 62, 58, 95]\n# your code here",
      hint: "statistics.mean(scores) and statistics.median(scores) — compare the two given the 95 outlier."
    },
    challenge: {
      prompt: "Write code that computes the standard deviation of two different lists of scores with the same mean, and explain in a comment what a higher standard deviation implies."
    },
    knowledgeCheck: [
      {
        q: "Why might the median be a better summary than the mean for data with extreme outliers?",
        options: ["The median is always larger", "The mean is pulled toward outliers, while the median is not", "The median is easier to calculate", "There's no difference between them"],
        answer: 1,
        explain: "A few extreme values can drag the mean far from what's 'typical', while the median stays anchored to the middle of the sorted data."
      }
    ]
  },
  {
    id: "da-ml-foundations",
    levelId: "da-lvl6",
    title: "Machine Learning Foundations",
    difficulty: "Hard",
    minutes: 20,
    prereq: ["da-stats"],
    concept: "Machine learning is the practice of having a program learn patterns from data, rather than being explicitly programmed with rules.",
    analogy: "Traditional programming is like writing a recipe yourself. Machine learning is like tasting thousands of example dishes and figuring out the recipe by inference — the 'recipe' the model learns is really just a set of numbers (weights) that produce good predictions.",
    whyItMatters: "Understanding these core concepts before touching scikit-learn is what separates 'I can call .fit()' from actually understanding what a model is doing and why it might fail.",
    explanation: [
      "A feature is an input variable (like square footage); a label is the value you're trying to predict (like house price). Supervised learning uses labeled examples; unsupervised learning finds structure in unlabeled data.",
      "Data is typically split into training data (used to fit the model), validation data (used to tune choices), and test data (used only at the very end, to estimate real-world performance).",
      "Regression predicts a continuous number (price, temperature); classification predicts a category (spam or not spam); clustering (unsupervised) groups similar items without predefined labels.",
      "Overfitting means a model memorized the training data's noise instead of the underlying pattern — it performs great on training data but poorly on new data. Underfitting means the model is too simple to capture the real pattern at all. Generalization is a model's ability to perform well on data it hasn't seen.",
      "Common evaluation metrics: accuracy (percent correct — misleading on imbalanced data), precision (of predicted positives, how many were right), recall (of actual positives, how many were found), and F1 score (a balance of precision and recall). A confusion matrix lays out correct/incorrect predictions per class.",
      "scikit-learn is Python's standard library for classical ML algorithms: linear regression, logistic regression, decision trees, random forests, k-nearest neighbors, and k-means clustering are common starting points — each fits a different shape of problem."
    ],
    syntax: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\nmodel.predict(X_test)",
    example: 'from sklearn.linear_model import LinearRegression\n\n# X: square footage, y: price (simplified example)\nX = [[500], [1000], [1500]]\ny = [150000, 250000, 350000]\n\nmodel = LinearRegression()\nmodel.fit(X, y)\nprint(model.predict([[1200]]))  # predicted price for 1200 sq ft',
    commonMistakes: [
      "Evaluating a model on the same data it was trained on — this always looks better than real-world performance and hides overfitting.",
      "Using accuracy alone on an imbalanced dataset (e.g. 99% of emails aren't spam) — a model that always guesses 'not spam' gets 99% accuracy while being useless.",
      "Treating a working model as understood — being able to call .fit() and .predict() isn't the same as understanding what the model learned or when it will fail."
    ],
    practice: {
      prompt: "In your own words (as comments), define: feature, label, and the difference between training data and test data.",
      starter: "# feature:\n# label:\n# training vs test data:",
      hint: "A feature is an input; a label is what you're predicting; training data fits the model, test data checks how well it generalizes to new examples."
    },
    challenge: {
      prompt: "Explain (as comments) why a spam classifier that reports 99% accuracy might still be a bad model, and which other metric(s) would reveal the problem."
    },
    knowledgeCheck: [
      {
        q: "A model performs excellently on training data but poorly on new, unseen data. What is this called?",
        options: ["Underfitting", "Overfitting", "Generalization", "Regression"],
        answer: 1,
        explain: "Overfitting means the model memorized specifics (including noise) of the training data rather than learning the general pattern."
      }
    ]
  },
  {
    id: "da-neural-networks",
    levelId: "da-lvl7",
    title: "Neural Networks & Modern AI Concepts",
    difficulty: "Hard",
    minutes: 18,
    prereq: ["da-ml-foundations"],
    concept: "A neural network is a machine learning model loosely inspired by neurons, built from layers of simple mathematical units that combine to approximate complex patterns.",
    analogy: "A single neuron in the network is like a tiny voting station: it takes several weighted inputs, adds them up (plus a bias), and passes the result through an activation function that decides how strongly to 'fire' — stack thousands of these across layers, and the network can approximate very complex functions.",
    whyItMatters: "Neural networks are the foundation of modern AI — image recognition, language models, and everything commonly branded 'AI' today. Understanding the basic mechanics demystifies what's actually happening, rather than treating it as magic.",
    explanation: [
      "A network is organized into layers: an input layer, one or more hidden layers, and an output layer. Each connection between neurons has a weight, and each neuron has a bias.",
      "An activation function (like ReLU or sigmoid) introduces non-linearity — without it, stacking layers would mathematically collapse into the same as one layer.",
      "Forward propagation is running input through the network to get a prediction. Loss measures how wrong that prediction was.",
      "Backpropagation calculates how much each weight contributed to the error; gradient descent then nudges every weight slightly to reduce that error. Repeating this many times, over many epochs (full passes through the data) and batches (chunks of data per update step), is 'training'.",
      "Computer vision (understanding images) and NLP (understanding language) are two major application areas. Modern NLP is dominated by transformers — architectures that use 'attention' to weigh which parts of the input matter most for each part of the output. Large Language Models (LLMs) are transformers trained on huge amounts of text.",
      "Important honesty check: being able to call an LLM API is not the same as understanding how it works, and a model producing fluent output is not the same as the model — or you — truly understanding the subject matter. These are genuinely advanced, ongoing research areas; this lesson is a map, not a mastery."
    ],
    syntax: "input → weights + bias → activation function → output\nloss → backpropagation → gradient descent → updated weights",
    example: "# Conceptual, not runnable — a single neuron's math:\n# output = activation(w1*x1 + w2*x2 + bias)\n# A network is just many of these, layered and connected.",
    commonMistakes: [
      "Assuming a neural network 'understands' concepts the way a person does — it's optimizing a mathematical function to match patterns in training data, nothing more.",
      "Skipping the fundamentals (loss, gradient descent) and jumping straight to using pretrained models — this makes debugging poor results nearly impossible.",
      "Treating 'more layers' as automatically better — deeper networks are harder to train and more prone to overfitting without enough data."
    ],
    practice: {
      prompt: "In your own words (as comments), explain what a loss function measures and why gradient descent needs it.",
      starter: "# What does a loss function measure?\n# Why does gradient descent depend on it?",
      hint: "Loss quantifies 'how wrong' a prediction was; gradient descent needs that signal to know which direction to adjust each weight."
    },
    challenge: {
      prompt: "Explain, in a few sentences, what 'attention' in a transformer conceptually does, using an analogy of your own (not copied from this lesson)."
    },
    knowledgeCheck: [
      {
        q: "Why is an activation function necessary in a neural network?",
        options: ["It makes training faster with no other effect", "Without it, stacking multiple layers would collapse into the equivalent of a single linear layer", "It's only used in the output layer", "It replaces the need for training data"],
        answer: 1,
        explain: "Activation functions introduce non-linearity, which is what allows deep networks to model complex, non-linear patterns instead of just a straight line."
      }
    ]
  }
];

/* =========================================================================
   ETHICAL HACKING TRACK
   Course/lesson titles below are preserved exactly as specified in the
   source curriculum brief (used as the track's course index / overview).
   Full interactive lessons are built for a defensively-framed subset —
   see HACKING_LESSONS below. Lessons whose only real content would be
   operational attack instructions (WEP/WPA key cracking, live ARP
   spoofing/MITM interception, building a credential-phishing page,
   building a keylogger, exploiting a live SQL injection or device) are
   kept as course-index entries only — PyCademy does not provide
   operational attack tooling or exploit walkthroughs, in line with the
   rest of the platform's cybersecurity content being concept-and-defense
   first. Everything below plugs into the existing lesson/exercise/
   project/achievement systems — no parallel systems were created.
   ========================================================================= */

const HACKING_LEVELS = [
  { id: "hk-lvl1", num: 1, title: "Know the OS", track: "hacking", topics: ["Introduction", "Installation", "Overview of Kali Linux", "Basic Linux Commands", "Common Networking Commands", "Getting You Ready for Scripting", "IP Sweeping Bash Script", "Test"] },
  { id: "hk-lvl2", num: 2, title: "Hack the MAC", track: "hacking", topics: ["Introduction", "What is MAC?", "Why change the MAC address?", "Changing MAC using Kali", "Changing MAC using Windows", "Preventing MAC Spoofing", "Some Facts", "Test"] },
  { id: "hk-lvl3", num: 3, title: "Gathering Information", track: "hacking", topics: ["Introduction", "Information Gathering — Why?", "Techniques to gather information", "Some more useful techniques", "Using Kali tools to gather information", "Using Kali — Part 2", "Real Life Facts", "Test"] },
  { id: "hk-lvl4", num: 4, title: "Leveraging AI for Hacking", track: "hacking", topics: ["Introduction to Generative AI", "Role of AI in Enhancing Cybersecurity", "Magic of ChatGPT", "Utilizing Gemini", "WormGPT: AI-Powered Hacking Analysis", "Test"] },
  { id: "hk-lvl5", num: 5, title: "Prompt Guide for Hacking", track: "hacking", topics: ["Threat Identification and Response", "Prompts for Network Security Analysis", "Phishing Detection and Mitigation", "AI in Password Security", "Secure Coding & Application Security", "Review"] },
  { id: "hk-lvl6", num: 6, title: "Surfing Anonymously", track: "hacking", topics: ["Introduction", "What is a VPN?", "Need for being anonymous", "Being anonymous using Opera Browser", "Some VPN Tools", "Being anonymous using Betternet", "Being anonymous using OpenVPN", "Real Life Facts", "Test"] },
  { id: "hk-lvl7", num: 7, title: "Hiding Messages", track: "hacking", topics: ["Introduction", "What is Steganography?", "Types of Steganography in Hacking", "Steganography using Windows Command...", "Steganography using Kali Linux", "Some Kali tools for Steganography", "Real Life Scenario", "Test"] },
  { id: "hk-lvl8", num: 8, title: "Social Media Hacking", track: "hacking", topics: ["Introduction", "What is Phishing?", "Types of Phishing", "Phishing using Shellphish", "Some More Tools", "How to Stay Safe from It", "Real Life Scenario", "Test"] },
  { id: "hk-lvl9", num: 9, title: "Credit and Debit Card Frauds", track: "hacking", topics: ["Introduction", "What is Social Engineering?", "SE Toolkit", "Credit Card Pastebin", "How much are you aware of?", "Credit card frauds using Phishing", "How to prevent yourself from it?", "Real Life Cases", "Test"] },
  { id: "hk-lvl10", num: 10, title: "Keyboard Spying", track: "hacking", topics: ["Introduction", "What is Keylogger?", "Why Keyloggers are a threat?", "Keyloggers using Kali - BeeLogger", "Let the hack begin", "Some more tools", "How to Prevent yourself from it", "Real Life Cases", "Test"] },
  { id: "hk-lvl11", num: 11, title: "WIFI HACKING - WEP Cracking", track: "hacking", topics: ["Introduction", "Wifi Encryptions", "Using External Wireless Adapter", "Enabling Monitor Mode", "Packet Sniffing", "Targeted Packet Sniffing", "Deauthentication Attack", "How to break WEP Encryption", "Cracking WEP", "How to prevent it", "Real Life Cases", "Test"] },
  { id: "hk-lvl12", num: 12, title: "WIFI HACKING - WPA-WPA2 Cracking", track: "hacking", topics: ["Introduction", "Revisiting WPA-WPA2", "Exploiting WPS feature", "Cracking WPA-WPA2 using WPS feature", "Capturing the Handshakes", "Creating Wordlists", "Cracking WPA-WPA2 using Wordlist", "How to prevent WPA-WPA2 cracking", "Real Life Cases", "Test"] },
  { id: "hk-lvl13", num: 13, title: "Network Spying", track: "hacking", topics: ["Introduction", "What is MITM Attacks?", "What is ARP Poisoning?", "Understanding Bettercap", "ARP Spoofing using Bettercap", "Spying on the Network", "Understanding HTTPS and How to tackle", "Bypassing HTTPS", "How to prevent MITM attacks", "Real Life Cases", "Test"] },
  { id: "hk-lvl14", num: 14, title: "Database Hacking", track: "hacking", topics: ["Introduction", "What is SQL Injection?", "Why is SQL Injection Dangerous?", "What is SQLMap?", "Using SQLMap", "How to prevent it?", "Real Life Cases", "Test"] },
  { id: "hk-lvl15", num: 15, title: "Android Hacking", track: "hacking", topics: ["Introduction", "What is Android?", "Why Android?", "Understanding Metasploit", "Hacking Android Phones", "Prevention against the attack", "Real Life Cases", "Test"] },
  { id: "hk-lvl16", num: 16, title: "Bringing down a website", track: "hacking", topics: ["Introduction", "What is DoS?", "Few Common DoS Techniques", "Bringing down a website", "Some more DoS Tools", "Diving Deep in DDoS", "Types of DDoS", "Preventing DoS Attack", "Real Life Cases", "Test"] },
  { id: "hk-lvl17", num: 17, title: "Cross-Site Scripting", track: "hacking", topics: ["Introduction", "What is XSS?", "Diving into Reflected XSS", "Discovering Stored XSS", "Preventing this vulnerability", "Real Life Cases", "Test"] },
  { id: "hk-lvl18", num: 18, title: "Make your data safe", track: "hacking", topics: ["Introduction", "What is Cryptography?", "Security of Cryptography", "Some terminologies you should know", "Encryption Algorithms", "Caesar Cipher", "Let's use a Crypt Tool", "Real Life Cases", "Test"] },
  { id: "hk-lvl19", num: 19, title: "Hacking Passwords", track: "hacking", topics: ["Introduction", "What is Password Cracking?", "How strong is your password?", "Password Cracking techniques", "Some tools you should know", "Let's crack it - Breaking Windows", "Countermeasures", "Real Life Cases", "Test"] },
  { id: "hk-lvl20", num: 20, title: "WordPress Scanning", track: "hacking", topics: ["Introduction", "What is WordPress?", "Introduction to WPScan", "Scanning WordPress site for vulnerabilities", "WordPress Security Guide", "Real Life Cases", "Test"] },
  { id: "hk-lvl21", num: 21, title: "Vulnerability Scanning and Reporting", track: "hacking", topics: ["Introduction", "Introduction to Nexpose", "Nexpose Installation", "Running Vulnerability Scans", "Generating Reports", "Test"] },
  { id: "hk-lvl22", num: 22, title: "Frequently Asked Interview Questions", track: "hacking", topics: ["General Hacking Based", "Vulnerability Assessment and Penetration", "Network Hacks", "Social Engineering", "Web Hacks", "Miscellaneous"] },
];

const HACKING_LESSONS = [
  {
    id: "hk-linux-commands",
    levelId: "hk-lvl1",
    title: "Basic Linux Commands",
    difficulty: "Easy",
    minutes: 12,
    prereq: [],
    concept: "Security work happens mostly in a terminal — a small set of Linux commands covers the vast majority of what you'll actually type.",
    analogy: "The terminal is like a text-based file explorer with superpowers: instead of clicking through folders, you name exactly where you want to go and what you want to do there.",
    whyItMatters: "Kali Linux and most security tooling assume comfort with the command line — this is the foundation every later lesson in this track builds on.",
    explanation: [
      "`pwd` prints your current directory; `ls` lists its contents; `cd` changes directory.",
      "`cat file` prints a file's contents; `nano file` or `vim file` edit one.",
      "`sudo` runs a command with elevated privileges — use deliberately, not by habit.",
      "`man command` opens that command's manual — the fastest way to check what a flag actually does before running something unfamiliar.",
      "Permissions (`ls -l`) show read/write/execute rights for owner, group, and others — central to both using and securing a Linux system."
    ],
    syntax: "pwd\nls -l\ncd path/\ncat file.txt\nman ls",
    example: "$ pwd\n/home/student\n$ ls -l\n-rw-r--r-- 1 student student 220 Jan 1 notes.txt\n$ cat notes.txt\nHello from the terminal.",
    commonMistakes: [
      "Running commands with sudo out of habit rather than checking whether elevated privileges are actually needed.",
      "Not reading a command's man page before running it with unfamiliar flags.",
      "Confusing relative paths (from your current directory) with absolute paths (starting from /)."
    ],
    practice: {
      prompt: "Write the three commands you'd run, in order, to: print your current directory, list its contents in long format, and view the manual page for ls.",
      starter: "# 1.\n# 2.\n# 3.",
      hint: "pwd, then ls -l, then man ls."
    },
    challenge: {
      prompt: "Explain, in your own words, what the r, w, and x characters mean in the output of ls -l, and why the 'others' permission column matters for a shared or internet-facing machine."
    },
    knowledgeCheck: [
      {
        q: "What does `man ls` do?",
        options: ["Deletes the ls command", "Opens the manual page explaining ls and its options", "Lists files as a man page", "Runs ls with admin rights"],
        answer: 1,
        explain: "man opens the manual for a command — the standard way to check what it does before running it."
      }
    ]
  },
  {
    id: "hk-networking-commands",
    levelId: "hk-lvl1",
    title: "Common Networking Commands",
    difficulty: "Easy",
    minutes: 11,
    prereq: ["hk-linux-commands"],
    concept: "A handful of built-in commands let you inspect your own machine's network configuration and connectivity without installing anything extra.",
    analogy: "These commands are like checking your own return address and testing whether the road to a destination is actually open — entirely about your own setup, not anyone else's.",
    whyItMatters: "Every later networking and reconnaissance lesson assumes you can already answer 'what's my IP?' and 'can I reach this host?' for your own machine.",
    explanation: [
      "`ip a` (or `ifconfig` on older systems) shows your machine's network interfaces and assigned IP addresses.",
      "`ping host` checks basic reachability and round-trip time to a host.",
      "`traceroute host` (or `tracert` on Windows) shows the path packets take, hop by hop.",
      "`whois domain` looks up public registration information for a domain — useful, and entirely legal to run against domains generally, since it queries public registry data.",
      "Only ever point diagnostic tools at hosts you own, manage, or are explicitly authorized to test."
    ],
    syntax: "ip a\nping -c 4 host\ntraceroute host\nwhois domain.com",
    example: "$ ping -c 2 localhost\nPING localhost (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.05 ms",
    commonMistakes: [
      "Running network scans against hosts without authorization — even 'just checking' can violate acceptable-use policies or the law.",
      "Confusing a failed ping (no reply) with 'the host is definitely down' — many hosts deliberately block ping.",
      "Not limiting ping's count (-c) and accidentally flooding your own terminal output."
    ],
    practice: {
      prompt: "Write the command to check your own machine's network interfaces and IP addresses.",
      starter: "# your command here",
      hint: "ip a (or ifconfig on older systems)"
    },
    challenge: {
      prompt: "Explain what traceroute reveals that a simple ping doesn't, and why that's useful when diagnosing a connectivity problem."
    },
    knowledgeCheck: [
      {
        q: "Which of these is true about running network diagnostic commands against a host?",
        options: ["It's always fine to scan any public IP", "You should only target hosts you own or are explicitly authorized to test", "ping always works even if a host blocks it", "traceroute requires admin access on every system"],
        answer: 1,
        explain: "Authorization scope is the line between routine diagnostics and unauthorized activity — always stay within it."
      }
    ]
  },
  {
    id: "hk-mac",
    levelId: "hk-lvl2",
    title: "What is MAC?",
    difficulty: "Easy",
    minutes: 12,
    prereq: ["hk-networking-commands"],
    concept: "A MAC address is a hardware identifier burned into a network interface — and changing your own is a routine, legal privacy technique, not inherently an attack.",
    analogy: "If an IP address is like a mailing address that can change, a MAC address is more like a serial number printed on the device itself — though, unlike a real serial number, most operating systems let you present a different one to the local network.",
    whyItMatters: "MAC addresses show up constantly in networking and security work — from home Wi-Fi settings to enterprise access control — so understanding what they are (and aren't) prevents both confusion and misuse.",
    explanation: [
      "Every network interface has a MAC address, typically shown as six pairs of hex digits, e.g. 00:1A:2B:3C:4D:5E.",
      "People change (spoof) their own MAC address for legitimate reasons: privacy on public Wi-Fi (many phones now randomize MAC by default for exactly this reason), working around a MAC-based device limit on their own router, or testing network configurations.",
      "It becomes a problem, ethically and often legally, when someone spoofs a MAC address to impersonate another specific device on a network they don't control, in order to bypass access controls or hide malicious activity.",
      "Defenders can watch for MAC spoofing indicators: a MAC address suddenly appearing on a different switch port than expected, or vendor-prefix mismatches between the claimed device type and its actual traffic pattern."
    ],
    syntax: "MAC address format: XX:XX:XX:XX:XX:XX (hexadecimal)",
    example: "# Viewing (not changing) your own interface's MAC on Linux:\n$ ip link show eth0\n2: eth0: ... link/ether 00:1a:2b:3c:4d:5e brd ff:ff:ff:ff:ff:ff",
    commonMistakes: [
      "Assuming a MAC address alone reliably identifies a specific physical device forever — it's easily changed by design on most operating systems.",
      "Treating any MAC change as automatically malicious — privacy-motivated randomization is now a default behavior on many phones.",
      "Confusing MAC addresses (local network, layer 2) with IP addresses (routable, layer 3) — they solve different problems."
    ],
    practice: {
      prompt: "In your own words, describe one legitimate privacy reason someone might randomize their device's MAC address, and one scenario where MAC spoofing would be unethical/unauthorized instead.",
      starter: "# Legitimate reason:\n# Unauthorized scenario:",
      hint: "Legitimate: avoiding being tracked across public Wi-Fi networks by MAC address. Unauthorized: impersonating a specific other device to bypass someone else's access control."
    },
    challenge: {
      prompt: "Describe one defensive indicator a network administrator might use to detect that a device's MAC address doesn't match its expected identity."
    },
    knowledgeCheck: [
      {
        q: "What determines whether changing a MAC address is ethical?",
        options: ["It's always unethical", "It's always fine no matter what", "Whether you're changing your own device's identifier versus impersonating another device without authorization", "Whether you use Kali Linux to do it"],
        answer: 2,
        explain: "The technique itself is neutral — authorization and intent (your own device/privacy vs. impersonating someone else's) is what makes it ethical or not."
      }
    ]
  },
  {
    id: "hk-recon",
    levelId: "hk-lvl3",
    title: "Techniques to gather information",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["hk-mac"],
    concept: "Reconnaissance is the process of legally and passively learning about an organization's public footprint before any authorized security assessment begins.",
    analogy: "Passive recon is like researching a company from published sources before a job interview — you're not breaking in anywhere, just reading what's already public.",
    whyItMatters: "Nearly every real penetration test starts here — and understanding what information is unintentionally public is itself a defensive skill (you can recon your own organization to see what an attacker would see).",
    explanation: [
      "Passive reconnaissance gathers information without directly interacting with the target's systems: public records, WHOIS data, search engines, social media, job postings (which often leak tech-stack details), and public DNS records.",
      "Active reconnaissance directly interacts with target systems (like scanning open ports) — this crosses into activity that requires explicit authorization, since it touches systems you don't own.",
      "DNS records (A, MX, TXT, NS) are public by design and reveal a surprising amount about an organization's infrastructure — this is why DNS lookups are a standard, legal first step.",
      "The goal of authorized recon is always documentation: what's exposed, why it matters, and what should be tightened — not exploitation."
    ],
    syntax: "whois domain.com\nnslookup domain.com\ndig domain.com MX",
    example: "$ nslookup example.com\nName: example.com\nAddress: 93.184.216.34",
    commonMistakes: [
      "Treating 'passive' as a license to do anything — some jurisdictions still regulate scraping and automated data collection.",
      "Jumping straight to active scanning without authorization, when passive sources already answer most early questions.",
      "Forgetting to document sources — a real recon report needs to show where each finding came from."
    ],
    practice: {
      prompt: "Write down three categories of publicly available information a passive recon phase might gather about an organization, and why each is useful to a security assessment.",
      starter: "# 1.\n# 2.\n# 3.",
      hint: "Consider DNS records, job postings, and public employee social media."
    },
    challenge: {
      prompt: "Explain, in a few sentences, why an organization might run reconnaissance against its own public footprint as a defensive exercise."
    },
    knowledgeCheck: [
      {
        q: "What's the key difference between passive and active reconnaissance?",
        options: ["Passive is illegal, active is legal", "Passive gathers public information without touching target systems directly; active interacts with the target's systems and needs authorization", "There's no real difference", "Active recon only uses search engines"],
        answer: 1,
        explain: "Passive recon stays with publicly available sources; active recon touches the target's systems directly, which is where authorization becomes essential."
      }
    ]
  },
  {
    id: "hk-vpn",
    levelId: "hk-lvl6",
    title: "What is a VPN?",
    difficulty: "Easy",
    minutes: 11,
    prereq: ["hk-recon"],
    concept: "A VPN (Virtual Private Network) encrypts your traffic and routes it through another server, hiding your traffic's contents and origin from your local network — but it's not the same as true anonymity.",
    analogy: "Using a VPN is like mailing a letter inside a sealed, opaque envelope addressed to a trusted courier who then re-mails it for you — your local post office can't read it, but the courier still knows who sent it.",
    whyItMatters: "VPNs are genuinely useful for privacy and security, but they're commonly misunderstood as a complete anonymity solution, which leads to a false sense of safety.",
    explanation: [
      "A VPN encrypts traffic between your device and the VPN provider's server, so your local network (like coffee-shop Wi-Fi) can't see its contents.",
      "It does NOT make you anonymous to the VPN provider itself — they can typically see your real traffic unless they have a genuine no-logs policy, which varies by provider and is hard to verify externally.",
      "It does NOT protect you if you log into an account that identifies you, regardless of the IP address the connection appears to come from.",
      "Proxies are related but distinct — a proxy usually doesn't encrypt traffic the way a VPN does; a VPN is a specific type of encrypted tunnel."
    ],
    syntax: "device → encrypted tunnel → VPN server → destination",
    example: "# Conceptual flow, not runnable code:\n# Without VPN: device -> local network (visible) -> destination\n# With VPN:    device -> encrypted tunnel -> VPN server -> destination",
    commonMistakes: [
      "Assuming a VPN makes all online activity completely anonymous.",
      "Trusting a 'no-logs' claim without any independent verification of the provider.",
      "Forgetting that logging into a personal account instantly re-identifies you, VPN or not."
    ],
    practice: {
      prompt: "In your own words, explain what a VPN hides, and what it does NOT hide.",
      starter: "# A VPN hides:\n# A VPN does NOT hide:",
      hint: "It hides traffic contents/destination from your local network; it doesn't hide your identity from the VPN provider or from services you log into."
    },
    challenge: {
      prompt: "Describe a scenario where using a VPN would meaningfully improve someone's security, and a separate scenario where it would give a false sense of anonymity."
    },
    knowledgeCheck: [
      {
        q: "Does a VPN make your online activity anonymous to the VPN provider itself?",
        options: ["Yes, always", "No — the provider can typically see your real traffic unless they have a genuine no-logs policy", "Only on public Wi-Fi", "Only if you pay for a premium plan"],
        answer: 1,
        explain: "A VPN shifts who can see your traffic (from your local network to the VPN provider) rather than making it invisible to everyone."
      }
    ]
  },
  {
    id: "hk-steganography",
    levelId: "hk-lvl7",
    title: "What is Steganography?",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-vpn"],
    concept: "Steganography hides the existence of a message inside another file, rather than scrambling its contents like encryption does.",
    analogy: "Encryption is a locked box in plain sight — everyone can see there's a box. Steganography is a message written in invisible ink on a page that looks completely blank.",
    whyItMatters: "Steganography shows up in both legitimate uses (digital watermarking, covert but authorized communication) and as a technique for hiding malicious payloads or exfiltrated data — which makes detection a genuine defensive skill.",
    explanation: [
      "A simple example: hiding a short text message by tweaking the least-significant bit of pixel color values in an image — changes invisible to the eye but recoverable if you know to look.",
      "Steganography is different from encryption: encryption makes data unreadable but obviously present; steganography tries to make hidden data go unnoticed entirely.",
      "It's also different from simple encoding (like Base64) — encoding just reformats data and is trivially reversible by anyone; the point of steganography is concealment, not obfuscation.",
      "Detection (forensics) often looks for statistical anomalies — file sizes larger than expected for their visible content, unusual metadata, or pixel-value patterns inconsistent with a normal photo."
    ],
    syntax: "Encoding: reformats data (reversible by anyone)\nEncryption: scrambles data (needs a key to reverse)\nSteganography: hides that data exists at all",
    example: "# Illustrative only — writing a short marker string appended after a text file's normal content:\nwith open('cover.txt', 'a') as f:\n    f.write('\\n<!--hidden marker, illustrative only-->')",
    commonMistakes: [
      "Confusing steganography with encryption — hiding a message isn't the same as making it unreadable if found.",
      "Assuming a 'normal-looking' file is safe — steganographic payloads are specifically designed to look unremarkable.",
      "Overestimating steganography's security — once someone knows to look, many techniques are detectable with the right forensic tools."
    ],
    practice: {
      prompt: "In your own words, explain the difference between encryption and steganography, focusing on what each one is trying to hide.",
      starter: "# Encryption hides:\n# Steganography hides:",
      hint: "Encryption hides the CONTENTS of a message. Steganography hides the fact that a hidden message EXISTS at all."
    },
    challenge: {
      prompt: "Describe one forensic technique a defender might use to detect that an image file contains a hidden steganographic payload."
    },
    knowledgeCheck: [
      {
        q: "What is the key difference between encryption and steganography?",
        options: ["They're the same technique", "Encryption hides content but is visibly present; steganography tries to hide that a message exists at all", "Steganography is a type of encryption", "Steganography only works on text files"],
        answer: 1,
        explain: "Encryption is an obviously-locked box; steganography tries to make the box invisible in the first place."
      }
    ]
  },
  {
    id: "hk-mitm",
    levelId: "hk-lvl13",
    title: "What is MITM Attacks?",
    difficulty: "Hard",
    minutes: 15,
    prereq: ["hk-steganography"],
    concept: "A Man-in-the-Middle (MITM) attack positions an attacker between two communicating parties, able to observe or alter traffic that both sides believe is private.",
    analogy: "It's like someone secretly intercepting mail between two friends, reading or even editing it, then resealing and forwarding it — both friends believe they're talking directly to each other.",
    whyItMatters: "Understanding how MITM attacks work conceptually is exactly what modern network defenses (HTTPS, certificate validation, encrypted DNS) are designed to prevent — this lesson is about recognizing and defending against the threat model, not executing it.",
    explanation: [
      "ARP poisoning is one common technique on local networks: a device on the same network segment lies about which MAC address owns an IP address, tricking other devices into sending it their traffic.",
      "Once positioned in the middle, an attacker can potentially observe unencrypted traffic — which is exactly why HTTPS (encrypting traffic end-to-end) matters so much on untrusted networks like public Wi-Fi.",
      "HTTPS specifically defends against MITM through certificate validation: your browser checks that the server's certificate is signed by a trusted authority and matches the domain, which is why certificate warnings should never be dismissed casually.",
      "Detection signs of ARP-based MITM include: unexpected ARP table changes, duplicate IP-to-MAC mappings, and tools like arpwatch that alert on ARP table anomalies.",
      "This platform teaches the concept and detection side of MITM — actually intercepting traffic on a network requires explicit authorization and belongs in a dedicated, isolated lab exercise, not a general lesson."
    ],
    syntax: "Normal:  A <---> B\nMITM:    A <---> Attacker <---> B  (attacker relays and can observe/alter traffic)",
    example: "# Conceptual — not an attack tool:\n# A properly validated HTTPS connection defeats a naive MITM attempt\n# because the attacker cannot produce a certificate trusted by the browser\n# for a domain they don't control.",
    commonMistakes: [
      "Dismissing a browser's certificate warning instead of treating it as a potential MITM red flag.",
      "Assuming being on a 'private' Wi-Fi network makes MITM impossible — anyone else legitimately or illegitimately on that same network segment is a potential risk.",
      "Believing HTTPS alone protects everything — DNS lookups themselves are often unencrypted unless you specifically use encrypted DNS (DoH/DoT)."
    ],
    practice: {
      prompt: "In your own words, explain what ARP poisoning tricks a device into doing, and why that positions an attacker to see traffic.",
      starter: "# Your explanation here",
      hint: "ARP poisoning lies about which MAC address owns an IP, so traffic meant for that IP gets sent to the attacker's MAC instead."
    },
    challenge: {
      prompt: "Explain why dismissing a certificate warning in your browser could be dangerous specifically in the context of a MITM attack."
    },
    knowledgeCheck: [
      {
        q: "What is the primary defense HTTPS provides against MITM attacks?",
        options: ["It hides your IP address", "Certificate validation lets your browser verify it's really talking to the legitimate server", "It blocks all network traffic from strangers", "It makes ARP poisoning impossible"],
        answer: 1,
        explain: "HTTPS certificate validation is specifically designed so a MITM attacker can't convincingly impersonate a server they don't control."
      }
    ]
  },
  {
    id: "hk-sqli",
    levelId: "hk-lvl14",
    title: "What is SQL Injection?",
    difficulty: "Hard",
    minutes: 16,
    prereq: ["hk-mitm"],
    concept: "SQL injection happens when untrusted input is inserted directly into a database query as code, instead of being treated strictly as data.",
    analogy: "It's like a form letter template where a mail-merge field lets someone write actual instructions in the 'name' blank instead of just their name — and the system blindly follows those instructions.",
    whyItMatters: "SQL injection has been one of the most common and damaging web vulnerabilities for decades, and understanding it is standard, essential knowledge for any developer, not just security specialists.",
    explanation: [
      "Vulnerable code builds a query by directly concatenating user input into a SQL string, letting an attacker's input change the query's actual structure.",
      "The fix is parameterized queries (also called prepared statements): the database driver keeps user input strictly separated from the query's code, no matter what characters it contains.",
      "This is a defensive-first lesson: the goal is recognizing vulnerable code and knowing how to fix it, not exploiting a live system. Any practical testing must be against a local application you deliberately built to be vulnerable, or a dedicated authorized lab target.",
      "Beyond parameterized queries, defense in depth includes input validation, least-privilege database accounts (the app's DB user shouldn't have permission to drop tables), and monitoring for anomalous query patterns."
    ],
    syntax: "# VULNERABLE — never do this:\nquery = f\"SELECT * FROM users WHERE name = '{user_input}'\"\n\n# SAFE — parameterized query:\ncursor.execute(\"SELECT * FROM users WHERE name = %s\", (user_input,))",
    example: '# Vulnerable (illustrative only):\nname = "anything\' OR \'1\'=\'1"\nquery = f"SELECT * FROM users WHERE name = \'{name}\'"\n# The injected OR \'1\'=\'1\' changes the query\'s logic entirely.\n\n# Safe fix:\ncursor.execute("SELECT * FROM users WHERE name = %s", (name,))\n# The database treats name strictly as data, never as part of the query structure.',
    commonMistakes: [
      "Trying to defend against SQL injection by manually 'sanitizing' input with string replacement — this is fragile and easy to bypass; use parameterized queries instead.",
      "Assuming SQL injection only matters for login forms — any field that reaches a database query is a potential vector (search boxes, URL parameters, even HTTP headers).",
      "Testing injection techniques against any real, live system without explicit written authorization."
    ],
    practice: {
      prompt: "Rewrite this vulnerable query construction to use a parameterized query instead: `query = f\"SELECT * FROM products WHERE id = {product_id}\"`",
      starter: 'product_id = "5"\n# your safe version here',
      hint: "cursor.execute(\"SELECT * FROM products WHERE id = %s\", (product_id,))"
    },
    challenge: {
      prompt: "Explain, in a few sentences, why parameterized queries fix SQL injection at a structural level, rather than just filtering out 'bad' characters."
    },
    knowledgeCheck: [
      {
        q: "What is the standard, reliable fix for SQL injection?",
        options: ["Blocking the word 'SELECT' in user input", "Parameterized queries that keep user input strictly separate from query code", "Using a stronger password on the database", "Encrypting the database"],
        answer: 1,
        explain: "Parameterized queries structurally prevent user input from ever being interpreted as part of the SQL command itself."
      }
    ]
  },
  {
    id: "hk-xss",
    levelId: "hk-lvl17",
    title: "What is XSS?",
    difficulty: "Hard",
    minutes: 14,
    prereq: ["hk-sqli"],
    concept: "Cross-Site Scripting (XSS) happens when untrusted input gets rendered as executable code in another user's browser, instead of being treated strictly as text.",
    analogy: "It's like a guestbook where, instead of writing a message, someone writes instructions that get read aloud and obeyed by everyone who later visits — the page 'trusted' their input too much.",
    whyItMatters: "XSS remains one of the most common web vulnerabilities, and defending against it (output encoding, Content Security Policy) is core secure web development knowledge.",
    explanation: [
      "Reflected XSS: malicious input comes from the current request (like a URL parameter) and is immediately reflected back into the page's HTML unescaped.",
      "Stored XSS: malicious input is saved server-side (like a comment or profile field) and served to other users later — generally more dangerous since it affects every visitor, not just whoever clicked a crafted link.",
      "The core fix is output encoding: escaping user-supplied content before rendering it as HTML, so `<script>` becomes harmless text (`&lt;script&gt;`) rather than executable markup.",
      "A Content Security Policy (CSP) header adds defense in depth, restricting which scripts a page is allowed to run at all, even if an encoding mistake slips through.",
      "As with SQL injection, this is defensive-first: the goal is recognizing and fixing the vulnerability pattern, and any hands-on testing belongs on a local, deliberately-vulnerable practice app."
    ],
    syntax: "# VULNERABLE — rendering raw user input as HTML:\npage_html = f\"<p>Comment: {user_comment}</p>\"\n\n# SAFER — escape before rendering (framework-dependent, illustrative):\nimport html\npage_html = f\"<p>Comment: {html.escape(user_comment)}</p>\"",
    example: '# If user_comment = \'<script>alert(1)</script>\'\n# Unescaped: browser executes the script.\nimport html\nsafe = html.escape("<script>alert(1)</script>")\nprint(safe)  # &lt;script&gt;alert(1)&lt;/script&gt;  -- now inert text',
    commonMistakes: [
      "Escaping input only on the way in (storage) but forgetting to also escape on the way out (rendering) — output encoding is what actually matters.",
      "Assuming a framework 'automatically handles' XSS everywhere — most do by default in templates, but raw string concatenation into HTML bypasses that protection.",
      "Confusing XSS (executes in another user's browser) with SQL injection (executes against the database) — they're different vulnerability classes with different fixes."
    ],
    practice: {
      prompt: "Using Python's html module, escape the string '<b>bold</b>' so it would render as inert text instead of HTML formatting.",
      starter: 'import html\ntext = "<b>bold</b>"\n# your code here',
      hint: "html.escape(text) converts special characters like < and > into their safe HTML entity equivalents."
    },
    challenge: {
      prompt: "Explain the difference between reflected and stored XSS, and why stored XSS is generally considered more dangerous."
    },
    knowledgeCheck: [
      {
        q: "What is the core defense against XSS?",
        options: ["Using a strong password", "Output encoding — escaping user input before rendering it as HTML", "Blocking all JavaScript on the site", "Using HTTPS"],
        answer: 1,
        explain: "Escaping output so injected markup renders as inert text is the structural fix; CSP adds a second layer of defense."
      }
    ]
  },
  {
    id: "hk-caesar",
    levelId: "hk-lvl18",
    title: "Caesar Cipher",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-xss"],
    concept: "The Caesar cipher shifts every letter in a message by a fixed number of positions in the alphabet — one of the oldest encryption techniques, and a great hands-on intro to how ciphers work mechanically.",
    analogy: "Imagine a decoder ring: rotate it by a set number of letters, and every letter you write gets swapped for the one that many positions ahead.",
    whyItMatters: "It's trivially breakable by modern standards (only 25 possible shifts to try), but implementing it teaches the mechanics every stronger cipher builds on, and its weakness is a perfect illustration of why key space size matters in real cryptography.",
    explanation: [
      "Encryption: shift each letter forward by `key` positions, wrapping around the alphabet (Z shifted by 1 becomes A).",
      "Decryption: shift each letter backward by the same `key`.",
      "Non-letter characters (spaces, punctuation) are typically left unchanged.",
      "Because there are only 26 possible shift values, a Caesar cipher can be broken instantly by trying all of them (brute force) — this is exactly why modern encryption uses enormous key spaces instead."
    ],
    syntax: "shifted = chr((ord(char) - ord('a') + key) % 26 + ord('a'))",
    example: "def caesar_encrypt(text, key):\n    result = []\n    for ch in text:\n        if ch.isalpha():\n            base = ord('A') if ch.isupper() else ord('a')\n            result.append(chr((ord(ch) - base + key) % 26 + base))\n        else:\n            result.append(ch)\n    return ''.join(result)\n\nprint(caesar_encrypt(\"hello\", 3))  # khoor",
    commonMistakes: [
      "Forgetting to handle uppercase and lowercase letters with different base offsets.",
      "Forgetting the modulo wraparound, so shifting 'z' forward crashes or produces a non-letter character.",
      "Assuming this or any single-alphabet substitution cipher is secure for anything beyond a teaching exercise — it isn't."
    ],
    practice: {
      prompt: "Write a function `caesar_decrypt(text, key)` that reverses a Caesar-encrypted string back to plain text.",
      starter: "def caesar_decrypt(text, key):\n    # your code here\n    pass\n\nprint(caesar_decrypt(\"khoor\", 3))",
      hint: "Decryption is the same shift logic as encryption, just with the key subtracted instead of added (or call your encrypt function with -key)."
    },
    challenge: {
      prompt: "Write a function that brute-forces a Caesar-encrypted string by trying all 26 possible shifts and printing each result, to demonstrate why this cipher offers essentially no real security."
    },
    knowledgeCheck: [
      {
        q: "Why is the Caesar cipher considered cryptographically insecure today?",
        options: ["It's too slow to compute", "There are only 26 possible keys, so it can be broken instantly by trying all of them", "It doesn't work on numbers", "It requires special hardware"],
        answer: 1,
        explain: "A tiny key space (26 possibilities) means brute-forcing every option is trivial for any modern computer — or even by hand."
      }
    ]
  },
  {
    id: "hk-password-strength",
    levelId: "hk-lvl19",
    title: "How strong is your password?",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-caesar"],
    concept: "Password strength comes from unpredictability (entropy) — length and character variety that make guessing computationally infeasible, not any single trick.",
    analogy: "A password is like a combination lock: the more possible combinations there are, and the less predictable your specific combination is, the longer a brute-force attempt would take.",
    whyItMatters: "Weak, reused, or predictable passwords remain one of the most common ways real accounts get compromised — this is directly actionable knowledge, for yourself and for any system you help secure.",
    explanation: [
      "Length matters more than complexity tricks — a long passphrase of unrelated words is typically stronger and more memorable than a short password with substituted symbols (like 'P@ssw0rd!').",
      "Reused passwords are a major risk: if one breached site leaks your password, attackers automatically try it everywhere else (credential stuffing).",
      "A password manager plus unique passwords per site, combined with multi-factor authentication (MFA) wherever available, is the realistic modern defense — not memorizing dozens of complex strings.",
      "On the defensive/analysis side, systems should never store passwords in plain text — they should be hashed with a slow, salted, purpose-built algorithm (like bcrypt or Argon2), which is why a data breach doesn't necessarily mean every password is instantly usable by the attacker."
    ],
    syntax: "entropy ≈ length × log2(character_set_size)",
    example: "# A simple strength heuristic (educational, not a production security control):\nimport string\n\ndef estimate_strength(pw):\n    variety = sum([\n        any(c.islower() for c in pw),\n        any(c.isupper() for c in pw),\n        any(c.isdigit() for c in pw),\n        any(c in string.punctuation for c in pw),\n    ])\n    return len(pw) * variety",
    commonMistakes: [
      "Judging password strength mainly by complexity tricks (symbols, capitalization) rather than length and unpredictability.",
      "Reusing the same password across multiple accounts.",
      "Treating MFA as optional when it's available — it defeats the vast majority of automated credential-based attacks even if a password does leak."
    ],
    practice: {
      prompt: "Write a function that returns True if a password is at least 12 characters long AND contains at least 3 of the 4 character types (lower, upper, digit, symbol).",
      starter: "import string\n\ndef is_strong(password):\n    # your code here\n    pass",
      hint: "Count how many of the four category checks are True, then combine that with a length check."
    },
    challenge: {
      prompt: "Explain, in your own words, why a long passphrase of random unrelated words can be both easier to remember AND harder to crack than a short complex password like 'P@ssw0rd!'."
    },
    knowledgeCheck: [
      {
        q: "Why is password reuse across multiple sites particularly dangerous?",
        options: ["It slows down your login", "If one site is breached, attackers can automatically try that same password on other sites (credential stuffing)", "It has no real security impact", "It only matters for banking sites"],
        answer: 1,
        explain: "Credential stuffing attacks specifically exploit reused passwords — a single breach can cascade into many compromised accounts."
      }
    ]
  },
  {
    id: "hk-ai-cybersecurity",
    levelId: "hk-lvl4",
    title: "Role of AI in Enhancing Cybersecurity",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["hk-password-strength"],
    concept: "Generative AI is a genuinely useful assistant for defensive security work — analyzing logs, explaining vulnerabilities, reviewing code — but it's a tool with real limitations, not an oracle.",
    analogy: "Using an AI assistant for security analysis is like having a very well-read junior analyst: fast, tireless, and often right — but it can confidently state something wrong, and it's on you to verify before acting.",
    whyItMatters: "AI-assisted workflows are now a normal part of real security work, but using them safely and skeptically is a skill in itself — not a replacement for understanding.",
    explanation: [
      "Legitimate defensive uses: summarizing and explaining log entries, drafting explanations of a CVE, reviewing code for common vulnerability patterns, brainstorming test cases, and speeding up documentation and report writing.",
      "Hallucination is the core limitation: a language model can generate confident, fluent, plausible-sounding output that is simply wrong — including inventing CVE numbers, misdescribing a vulnerability, or suggesting a 'fix' that doesn't actually work.",
      "Prompt injection is a security risk specific to AI systems: if an AI tool processes untrusted input (like a log file or a webpage) that contains hidden instructions, it may follow those instructions instead of the user's — an emerging area defenders need to understand.",
      "Malicious AI tools (sometimes marketed under names implying no safety limits) exist specifically to lower the skill barrier for attacks — understanding that this category exists, and why it's dangerous, is different from learning to use one. This platform does not teach or provide access to such tools.",
      "Responsible use means treating AI output as a draft or a starting hypothesis: verify facts, test suggested fixes, and never paste real secrets, credentials, or sensitive customer data into a third-party AI tool."
    ],
    syntax: "AI-assisted workflow: prompt -> draft analysis -> human verification -> action",
    example: "# Illustrative prompt pattern for defensive log analysis:\n# \"Here is a sample of authentication log lines. Identify any patterns that\n#  look like repeated failed login attempts, and explain what you're seeing\n#  and why it might be suspicious. Do not assume malicious intent without\n#  clear evidence.\"",
    commonMistakes: [
      "Trusting an AI-generated security finding or fix without independently verifying it.",
      "Pasting real credentials, API keys, or sensitive log data into a third-party AI tool.",
      "Assuming that because a malicious AI tool exists, learning how it works means learning how to use it — this platform teaches the risk model, not operation."
    ],
    practice: {
      prompt: "List three legitimate defensive cybersecurity tasks an AI assistant could reasonably help with, and one thing you should always double-check before trusting its output.",
      starter: "# 1.\n# 2.\n# 3.\n# Always double-check:",
      hint: "Think about log summarization, vulnerability explanation, and code review — and the risk of hallucinated details."
    },
    challenge: {
      prompt: "Explain, in a few sentences, what prompt injection is and why it's a risk specific to AI systems that process untrusted input."
    },
    knowledgeCheck: [
      {
        q: "What is 'hallucination' in the context of AI-assisted security analysis?",
        options: ["The AI refusing to answer", "The AI generating confident, plausible-sounding output that is factually wrong", "The AI running too slowly", "The AI encrypting its output"],
        answer: 1,
        explain: "Hallucination means the model states something with confidence that isn't actually true — which is why AI output always needs independent verification in security contexts."
      }
    ]
  },
  {
    id: "hk-ai-prompts",
    levelId: "hk-lvl5",
    title: "Prompts for Network Security Analysis",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-ai-cybersecurity"],
    concept: "Well-structured prompts turn a general-purpose AI assistant into a useful defensive security analysis tool — the skill is in what you ask and what context you provide.",
    analogy: "A vague prompt is like handing a new analyst a huge pile of logs with no instructions; a well-structured prompt is like giving them a clear assignment with the exact question you need answered.",
    whyItMatters: "This is a practical, immediately usable skill — the difference between a generic, unhelpful AI response and a genuinely useful defensive analysis often comes down entirely to how the prompt is written.",
    explanation: [
      "A good defensive-analysis prompt usually includes: the data (logs, code, a message), the specific question, and any relevant constraints (e.g. 'don't assume malicious intent without clear evidence').",
      "For threat identification: ask the model to identify patterns and explain its reasoning, not just give a verdict — 'explain why' surfaces useful detail and helps you catch a wrong conclusion.",
      "For phishing detection: provide the suspicious message text and ask for specific indicators (urgency language, mismatched sender domain, suspicious links) rather than just 'is this phishing?'.",
      "For secure code review: ask the model to check specific categories (input validation, injection risks, secrets handling) rather than a vague 'is this code secure?'.",
      "Always keep a human decision in the loop — use the AI's output to inform your judgment, not replace it, especially for anything that leads to a real action (blocking an IP, disabling an account)."
    ],
    syntax: "prompt = data + specific question + constraints",
    example: "# Example structured prompt (illustrative):\n# \"Here is an email's text and sender address. List specific phishing\n#  indicators you notice (sender mismatch, urgency, suspicious links),\n#  and rate your confidence. Do not assume phishing without evidence.\"",
    commonMistakes: [
      "Writing vague prompts ('is this bad?') that produce vague, low-value answers.",
      "Not asking the model to explain its reasoning, making it harder to catch a wrong conclusion.",
      "Skipping the human verification step for anything that leads to a real security action."
    ],
    practice: {
      prompt: "Rewrite this vague prompt into a more specific, structured one: \"Is this log file suspicious?\" — include what data you'd provide and what specific question you'd ask.",
      starter: "# Vague: \"Is this log file suspicious?\"\n# Rewritten:",
      hint: "Specify what to look for (e.g. repeated failures from one IP) and ask the model to explain its reasoning."
    },
    challenge: {
      prompt: "Write a structured prompt template (as a comment) for reviewing a piece of Python code for secure coding issues, covering at least 3 specific categories to check."
    },
    knowledgeCheck: [
      {
        q: "Why is it better to ask an AI assistant to 'explain its reasoning' rather than just give a verdict?",
        options: ["It makes the response longer for no reason", "It surfaces detail that helps you catch a wrong conclusion before acting on it", "It's required by every AI tool", "It has no real benefit"],
        answer: 1,
        explain: "Seeing the reasoning lets a human reviewer spot a flawed assumption or hallucinated detail before trusting the conclusion."
      }
    ]
  },
  {
    id: "hk-phishing",
    levelId: "hk-lvl8",
    title: "What is Phishing?",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["hk-ai-prompts"],
    concept: "Phishing tricks people into handing over credentials or sensitive information by impersonating a trusted sender or website.",
    analogy: "It's a con artist wearing a convincing uniform — the message or page looks legitimate enough that the normal instinct to trust it kicks in before suspicion does.",
    whyItMatters: "Phishing remains one of the most common ways real accounts get compromised, and recognizing it is a practical skill everyone needs, not just security specialists.",
    explanation: [
      "Common indicators: urgency language ('your account will be locked in 24 hours'), a sender address that doesn't quite match the claimed organization, generic greetings, and links whose actual destination (hover to check) doesn't match the displayed text.",
      "A phishing kit, conceptually, is a pre-built fake login page designed to look identical to a real one, paired with a way to capture whatever is typed into it — this platform explains how they work and how to detect them, not how to build or deploy one.",
      "Spear phishing targets a specific individual with personalized, researched details, making it harder to spot than generic mass phishing.",
      "Detection tools look for: domain age/reputation, mismatches between the visible link text and the actual URL, and known phishing page fingerprints. Browsers and email providers use exactly these kinds of signals to warn users automatically.",
      "The most effective personal defense is simple and boring: never enter credentials after clicking a link in an unsolicited message — navigate to the site directly instead."
    ],
    syntax: "Indicators: urgency + mismatched sender + suspicious link destination + generic greeting",
    example: "# Illustrative — analyzing a suspicious message's structure, not sending one:\nmessage = {\n    \"sender\": \"support@paypa1-security.com\",  # note the '1' instead of 'l'\n    \"subject\": \"Urgent: Verify your account within 24 hours\",\n    \"link_text\": \"paypal.com/login\",\n    \"actual_link\": \"http://paypa1-secure-verify.net/login\",\n}",
    commonMistakes: [
      "Judging a message's legitimacy by how professional it looks — modern phishing pages can be visually identical to the real thing.",
      "Trusting the displayed link text instead of checking the actual destination URL.",
      "Assuming phishing only happens over email — it also happens via SMS (smishing), social media DMs, and phone calls (vishing)."
    ],
    practice: {
      prompt: "Given the sample message dict in the example, write code that checks whether link_text and actual_link contain the same domain, printing a warning if they don't.",
      starter: 'message = {\n    "link_text": "paypal.com/login",\n    "actual_link": "http://paypa1-secure-verify.net/login",\n}\n# your code here',
      hint: "Extract the domain-looking substring from each and compare them — a simple 'in' check is enough for this exercise."
    },
    challenge: {
      prompt: "List four specific indicators you'd look for when deciding whether an email is a phishing attempt, and explain why each one is a red flag."
    },
    knowledgeCheck: [
      {
        q: "What's the safest way to respond to an urgent email asking you to 'verify your account' via a link?",
        options: ["Click the link immediately to avoid losing access", "Navigate to the site directly by typing its known address, rather than clicking the email's link", "Reply to the email asking if it's real", "Forward it to a friend to check"],
        answer: 1,
        explain: "Navigating directly avoids the core phishing mechanism entirely — the malicious page can't capture credentials you never enter into it."
      }
    ]
  },
  {
    id: "hk-social-engineering",
    levelId: "hk-lvl9",
    title: "What is Social Engineering?",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-phishing"],
    concept: "Social engineering manipulates human psychology — trust, urgency, authority, fear — to get someone to do something they otherwise wouldn't, often bypassing technical security entirely.",
    analogy: "No matter how strong a building's locks are, social engineering is convincing someone to just open the door for you by pretending to be the delivery driver.",
    whyItMatters: "Even perfectly secure systems can be compromised through the humans using them — this is why security awareness training is as important as technical controls.",
    explanation: [
      "Common tactics: impersonating authority (a 'bank representative' or 'IT support'), creating false urgency, exploiting helpfulness, and pretexting (inventing a plausible false scenario to extract information).",
      "In the specific context of payment fraud, this often looks like: a fake 'your card was charged, call this number to dispute it' message, or a fake payment page mimicking a real checkout flow.",
      "Defenders analyze these attempts by looking for: unsolicited contact, requests for information a legitimate organization wouldn't ask for over that channel, and pressure to act immediately without verification.",
      "The best individual defense is a simple habit: independently verify any unexpected request for sensitive information or money, using a contact method you already know is legitimate — not one provided by the person contacting you."
    ],
    syntax: "Social engineering red flags: unsolicited contact + urgency + request for sensitive info + pressure not to verify",
    example: "# Illustrative — classifying a synthetic message, not real fraud data:\nmessage = \"Your card ending in 4321 was charged $499.99. If this wasn't you, call us immediately at [number in the message].\"\n# Red flag: verification number is provided BY the suspicious message itself,\n# not looked up independently.",
    commonMistakes: [
      "Verifying a suspicious claim using contact info provided by the suspicious message itself, rather than a source you already trust.",
      "Assuming social engineering only targets 'less tech-savvy' people — well-crafted pretexts fool experienced people too.",
      "Focusing security spending entirely on technical controls while ignoring security awareness training."
    ],
    practice: {
      prompt: "Given a synthetic message claiming a suspicious charge with a callback number included in the message itself, explain in a comment why that's a red flag and what the safer verification step would be.",
      starter: "# Red flag:\n# Safer verification step:",
      hint: "The safe move is to call the number printed on your actual card or statement, not any number provided by the suspicious message."
    },
    challenge: {
      prompt: "Describe a fictional (clearly synthetic) social engineering scenario and identify which specific psychological lever it's exploiting (authority, urgency, fear, or helpfulness)."
    },
    knowledgeCheck: [
      {
        q: "Why is it risky to verify a suspicious claim using contact information provided within the suspicious message itself?",
        options: ["It's not risky at all", "The attacker controls that contact info too, so 'verifying' that way just confirms with the attacker", "It takes too long", "Phone numbers can't be faked"],
        answer: 1,
        explain: "If the attacker supplied the 'verification' contact info, calling it just reaches the attacker again, not a real independent check."
      }
    ]
  },
  {
    id: "hk-keylogger",
    levelId: "hk-lvl10",
    title: "What is Keylogger?",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-social-engineering"],
    concept: "A keylogger records keystrokes, capturing anything typed — including passwords — without the user's knowledge.",
    analogy: "It's the digital equivalent of someone secretly watching over your shoulder and writing down everything you type, every time, on every app.",
    whyItMatters: "Understanding how keyloggers operate and how they're detected is essential endpoint-security knowledge — the goal here is recognition and defense, not building one.",
    explanation: [
      "Keyloggers can be software (running as a background process) or hardware (a physical device between keyboard and computer) — software keyloggers are far more common today.",
      "They're dangerous because they capture everything: passwords, messages, financial details — regardless of how strong those passwords are, since the keylogger sees them before any encryption happens.",
      "Defensive detection signs: unexpected background processes, unusual outbound network connections (keyloggers need to send captured data somewhere), and endpoint security software flagging suspicious behavior patterns.",
      "Persistence, at a high level, refers to malware's techniques for surviving a reboot (e.g. registering itself to auto-start) — understanding that this concept exists is part of the threat model, without needing implementation details.",
      "Practical defenses: reputable endpoint security software, keeping systems patched, using a password manager with browser autofill (which some, not all, keyloggers can't capture as easily as manual typing), and multi-factor authentication, which limits the damage even if a password is captured."
    ],
    syntax: "Threat model: keystroke capture -> local storage/exfiltration -> attacker retrieval",
    example: "# Illustrative — analyzing SYNTHETIC process data for suspicious signs,\n# not building monitoring software:\nprocesses = [\n    {\"name\": \"chrome.exe\", \"network_connections\": 3},\n    {\"name\": \"svch0st.exe\", \"network_connections\": 12},  # note the zero instead of 'o'\n]\nfor p in processes:\n    if p[\"network_connections\"] > 10:\n        print(f\"Review: {p['name']} has unusually high network activity\")",
    commonMistakes: [
      "Assuming antivirus alone guarantees protection — defense in depth (MFA, patching, awareness) matters too.",
      "Overlooking hardware keyloggers on shared/public computers, which software security tools can't detect.",
      "Confusing a keylogger (captures input) with other malware categories (like ransomware, which encrypts data) — different threat models need different defenses."
    ],
    practice: {
      prompt: "Given the sample processes list in the example, write code that flags any process whose name looks like it's impersonating a known system process (hint: check for suspicious character substitutions) OR has unusually high network_connections.",
      starter: 'processes = [\n    {"name": "chrome.exe", "network_connections": 3},\n    {"name": "svch0st.exe", "network_connections": 12},\n]\n# your code here',
      hint: "You can flag on network_connections > some threshold as a simple heuristic for this exercise."
    },
    challenge: {
      prompt: "Explain, in a few sentences, why multi-factor authentication limits the damage of a keylogger even if it successfully captures a password."
    },
    knowledgeCheck: [
      {
        q: "Why can't strong password complexity alone protect against a keylogger?",
        options: ["Keyloggers only capture weak passwords", "A keylogger captures whatever is typed, including a strong password, before any encryption happens", "Keyloggers don't actually work", "Strong passwords are typed differently"],
        answer: 1,
        explain: "A keylogger sees raw keystrokes as they're typed — password strength doesn't matter if the password itself is captured directly."
      }
    ]
  },
  {
    id: "hk-wifi-wep",
    levelId: "hk-lvl11",
    title: "Wifi Encryptions",
    difficulty: "Hard",
    minutes: 15,
    prereq: ["hk-keylogger"],
    concept: "Wi-Fi encryption protocols have evolved because early standards had fundamental cryptographic weaknesses — understanding why WEP failed explains why modern standards look the way they do.",
    analogy: "WEP is like a lock that was designed with a predictable pattern — once enough people studied that pattern, picking it became fast and reliable, no matter how carefully you installed it.",
    whyItMatters: "This is a classic, well-documented case study in why key management and protocol design matter as much as key length — a lesson that generalizes far beyond Wi-Fi.",
    explanation: [
      "WEP (Wired Equivalent Privacy) used a small, reused initialization vector alongside a static key, which created statistically predictable patterns in the encrypted traffic — given enough captured packets, the key becomes mathematically recoverable.",
      "This is a protocol design flaw, not a matter of the password being 'weak' — even a long, complex WEP key doesn't fix the underlying issue, which is why WEP was fully deprecated industry-wide rather than patched.",
      "WPA and WPA2 replaced WEP's flawed key scheduling with much stronger cryptography (and WPA2 added AES encryption), which is why any network still using WEP today should be treated as effectively unprotected.",
      "Monitor mode (a wireless adapter mode that captures all nearby traffic rather than just traffic addressed to it) and packet capture are the underlying techniques security researchers use to study wireless traffic in authorized lab settings — this platform teaches the concept, not operational attack steps against real networks.",
      "Defensively: this whole lesson is really an argument for why using WPA2/WPA3 (never WEP) and strong, unique Wi-Fi passphrases matters — the protocol-level fix already happened; the remaining risk is misconfiguration."
    ],
    syntax: "WEP: static key + small reused IV -> statistically recoverable\nWPA2: much larger key space + AES -> not practically breakable this way",
    example: "# Conceptual only — not a cracking tool:\n# WEP's vulnerability comes from IV reuse creating detectable patterns\n# across many packets, not from any single packet being weak.",
    commonMistakes: [
      "Assuming a 'strong' WEP password would have been secure — the flaw was in the protocol itself, not password strength.",
      "Believing any encrypted Wi-Fi network is equally safe, regardless of which protocol it uses.",
      "Confusing 'monitor mode' (a passive traffic-capture capability used in authorized research) with actively attacking a network."
    ],
    practice: {
      prompt: "In your own words, explain why WEP's weakness is a protocol design flaw rather than something a longer password could fix.",
      starter: "# Your explanation here",
      hint: "The flaw is in how the initialization vector and key are used together across packets, not in the key's length or complexity."
    },
    challenge: {
      prompt: "Explain what changed between WEP and WPA2 that addressed WEP's fundamental cryptographic weakness."
    },
    knowledgeCheck: [
      {
        q: "Why was WEP deprecated industry-wide instead of being fixed with longer keys?",
        options: ["Longer keys were too slow to compute", "The vulnerability was in the protocol's key-scheduling design, not key length, so longer keys didn't fix it", "WEP was never actually vulnerable", "It was replaced for marketing reasons only"],
        answer: 1,
        explain: "WEP's flaw came from predictable patterns in how it combined a reused initialization vector with the key — a structural issue no amount of key length could fix."
      }
    ]
  },
  {
    id: "hk-wifi-wpa",
    levelId: "hk-lvl12",
    title: "Revisiting WPA-WPA2",
    difficulty: "Hard",
    minutes: 15,
    prereq: ["hk-wifi-wep"],
    concept: "WPA/WPA2 fixed WEP's core cryptographic flaws, but real-world weaknesses still exist — mostly around weak passphrases and the WPS convenience feature, not the core protocol.",
    analogy: "WPA2 is a genuinely strong lock — but if the 'key' (your passphrase) is short and guessable, or there's a poorly designed spare-key feature (WPS) bolted onto the door, the lock's strength doesn't matter.",
    whyItMatters: "This distinction — strong protocol, weak configuration — is one of the most common patterns in real-world security failures across many technologies, not just Wi-Fi.",
    explanation: [
      "The 4-way handshake is the process where a device proves it knows the network passphrase without transmitting the passphrase itself — captured handshake data can, in principle, be tested against password guesses offline, which is exactly why passphrase strength matters so much.",
      "WPS (Wi-Fi Protected Setup) was designed for convenience (push a button to connect) but its PIN-based implementation had a design flaw that made the PIN crackable in a reasonable number of attempts on many routers — the fix, in most modern routers, is disabling WPS entirely.",
      "A wordlist attack against a captured handshake only works if the passphrase is guessable — this is precisely why a long, random, non-dictionary Wi-Fi passphrase (not a short 'clever' one) is the actual defense.",
      "This platform does not provide operational cracking instructions — the security lesson here is entirely about why passphrase strength and disabling WPS matter, which is directly actionable for securing your own network.",
      "Defensive checklist: disable WPS, use WPA2 or WPA3, use a long random passphrase (think length over complexity, same principle as account passwords), and keep router firmware updated."
    ],
    syntax: "Passphrase strength defends against handshake-based offline guessing;\nWPS should be disabled entirely on any router you control.",
    example: "# Illustrative — estimating passphrase strength, not cracking anything:\nimport string\n\ndef passphrase_strength_estimate(passphrase):\n    return len(passphrase) >= 16 and not passphrase.isalpha()",
    commonMistakes: [
      "Leaving WPS enabled on a home router 'for convenience' without realizing it's a known weak point.",
      "Choosing a short, memorable Wi-Fi passphrase, not realizing it's exactly what makes offline guessing against a captured handshake feasible.",
      "Assuming WPA2 alone guarantees security regardless of passphrase choice or WPS configuration."
    ],
    practice: {
      prompt: "Write a function that checks whether a Wi-Fi passphrase is at least 16 characters long — a simple, practical strength heuristic based on this lesson.",
      starter: "def is_strong_wifi_passphrase(passphrase):\n    # your code here\n    pass\n\nprint(is_strong_wifi_passphrase(\"correcthorsebatterystaple123\"))",
      hint: "len(passphrase) >= 16 is the core check for this exercise."
    },
    challenge: {
      prompt: "Explain why disabling WPS is recommended even though WPA2 itself is cryptographically strong."
    },
    knowledgeCheck: [
      {
        q: "What is the main real-world weakness in most WPA2 network compromises — the protocol itself, or something else?",
        options: ["The WPA2 protocol's core cryptography is fundamentally broken", "Usually weak/guessable passphrases or the WPS feature, not the core WPA2 protocol", "WPA2 doesn't actually encrypt anything", "There is no real weakness at all"],
        answer: 1,
        explain: "WPA2's core cryptography is strong — real-world compromises typically exploit weak passphrases or the separate, poorly designed WPS convenience feature."
      }
    ]
  },
  {
    id: "hk-https-defense",
    levelId: "hk-lvl13",
    title: "Understanding HTTPS and How to tackle",
    difficulty: "Hard",
    minutes: 14,
    prereq: ["hk-mitm", "hk-wifi-wpa"],
    concept: "HTTPS (HTTP over TLS) is the primary real-world defense against network-level eavesdropping and MITM attacks — understanding exactly what it guarantees (and what it doesn't) is essential.",
    analogy: "A valid TLS certificate is like a notarized ID check before a conversation starts — both sides confirm who they're really talking to before anything sensitive is said, and the whole conversation is then sealed.",
    whyItMatters: "Building on the MITM concepts from the previous lesson, this is the concrete mechanism that defeats most network-level interception attempts in practice.",
    explanation: [
      "TLS provides three guarantees: encryption (contents are unreadable in transit), integrity (tampering is detectable), and authentication (via certificates, you can verify you're really talking to the claimed server).",
      "A certificate is issued by a Certificate Authority (CA) that vouches for the domain's ownership; your browser maintains a list of trusted CAs and rejects certificates it can't validate against that trust chain.",
      "'Bypassing HTTPS' in a MITM context generally doesn't mean breaking the cryptography — it means tricking the user into accepting an invalid certificate, or exploiting a site that doesn't properly enforce HTTPS everywhere (e.g. an HTTP page that later redirects to a sensitive HTTPS form).",
      "HSTS (HTTP Strict Transport Security) is a defensive header a site can send telling browsers 'never connect to me over plain HTTP again, even if a link says to' — this closes one specific downgrade weakness.",
      "The practical takeaway for anyone browsing: never dismiss a certificate warning, and look for HTTPS specifically on any page requesting sensitive information — not just somewhere on the site."
    ],
    syntax: "Certificate validation: domain match + valid signature chain + not expired + not revoked",
    example: "# Conceptual — checking a URL uses HTTPS before treating it as safe to submit data to:\ndef looks_safe_to_submit(url):\n    return url.startswith(\"https://\")\n\nprint(looks_safe_to_submit(\"http://example.com/login\"))   # False — red flag",
    commonMistakes: [
      "Dismissing a browser certificate warning to 'just get to the site' — this is exactly the scenario TLS validation exists to prevent.",
      "Assuming a site is safe because most of it uses HTTPS, without checking the specific page handling sensitive data.",
      "Confusing 'HTTPS present' with 'the site is trustworthy' — HTTPS proves you're talking to the claimed domain, not that the domain itself is legitimate."
    ],
    practice: {
      prompt: "Write a function looks_safe_to_submit(url) that returns True only if the URL starts with 'https://', and test it against both an http:// and an https:// URL.",
      starter: 'def looks_safe_to_submit(url):\n    # your code here\n    pass\n\nprint(looks_safe_to_submit("https://example.com/login"))\nprint(looks_safe_to_submit("http://example.com/login"))',
      hint: "url.startswith(\"https://\") is the core check."
    },
    challenge: {
      prompt: "Explain what HSTS defends against, and why a site sending that header is meaningfully safer than one that doesn't."
    },
    knowledgeCheck: [
      {
        q: "What does a valid TLS certificate primarily prove to your browser?",
        options: ["That the website has no bugs", "That you are actually connected to the domain the certificate claims, verified by a trusted authority", "That the website is not a scam", "That the connection is faster"],
        answer: 1,
        explain: "Certificate validation confirms identity (you're talking to the real domain) — it doesn't vouch for whether that domain's content is trustworthy."
      }
    ]
  },
  {
    id: "hk-android",
    levelId: "hk-lvl15",
    title: "What is Android?",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-https-defense"],
    concept: "Android's security model is built around app sandboxing and a permissions system — understanding both explains most mobile security risks and defenses.",
    analogy: "Each Android app runs in its own sealed box by default; permissions are the specific, revocable keys you hand an app to reach outside that box — into your contacts, camera, or location.",
    whyItMatters: "Mobile devices carry enormous amounts of personal data, and most real mobile security incidents come from misunderstanding or overgranting permissions, not from exotic exploits.",
    explanation: [
      "Each app runs sandboxed with its own user ID and restricted access by default; it must explicitly request permissions to access sensitive resources (camera, contacts, location, SMS).",
      "A malicious app typically works by requesting excessive, unrelated permissions (a flashlight app asking for SMS access is a classic red flag) or by disguising itself as a legitimate app (a fake banking app, for example).",
      "APKs (Android's app package format) installed from outside the official app store ('sideloading') skip much of the store's vetting process, which is why it significantly increases risk.",
      "Metasploit, conceptually, is a widely used penetration-testing framework that includes modules for testing device/application vulnerabilities in authorized assessments — this platform teaches that it exists and what its role is in professional security testing, not how to use it against a real device.",
      "Defensive practices: install only from official stores, review requested permissions against what the app actually needs, keep the OS and apps updated, and use device encryption and a lock screen."
    ],
    syntax: "App sandbox + explicit permission grants = Android's core security model",
    example: '# Illustrative — flagging apps that request excessive permissions for their category:\napps = [\n    {"name": "Flashlight Pro", "permissions": ["CAMERA", "SMS", "CONTACTS", "LOCATION"]},\n    {"name": "Notes App", "permissions": ["STORAGE"]},\n]\nfor app in apps:\n    if "Flashlight" in app["name"] and "SMS" in app["permissions"]:\n        print(f"Review: {app[\'name\']} requests unrelated permission SMS")',
    commonMistakes: [
      "Granting every permission an app requests without checking whether it's relevant to the app's actual function.",
      "Sideloading apps from untrusted sources to bypass store restrictions.",
      "Assuming mobile devices are inherently safer than computers — they carry similar, sometimes greater, risk given how much personal data they hold."
    ],
    practice: {
      prompt: "Given the sample apps list in the example, write code that flags any app requesting a permission that seems unrelated to its apparent function (you decide the logic — e.g., a 'Notes' app requesting CAMERA).",
      starter: 'apps = [\n    {"name": "Flashlight Pro", "permissions": ["CAMERA", "SMS", "CONTACTS", "LOCATION"]},\n    {"name": "Notes App", "permissions": ["STORAGE"]},\n]\n# your code here',
      hint: "A simple heuristic like checking if 'SMS' or 'CONTACTS' appears in a non-messaging app's permission list works for this exercise."
    },
    challenge: {
      prompt: "Explain why sideloading an app from outside the official app store increases risk, even if the app looks identical to a legitimate one."
    },
    knowledgeCheck: [
      {
        q: "What is the core purpose of Android's app sandboxing model?",
        options: ["To make apps run faster", "To isolate each app so it can't access sensitive resources without an explicit permission grant", "To prevent apps from being uninstalled", "To encrypt all network traffic automatically"],
        answer: 1,
        explain: "Sandboxing limits what an app can reach by default, with permissions acting as deliberate, revocable exceptions to that isolation."
      }
    ]
  },
  {
    id: "hk-dos",
    levelId: "hk-lvl16",
    title: "What is DoS?",
    difficulty: "Medium",
    minutes: 14,
    prereq: ["hk-android"],
    concept: "A Denial-of-Service attack aims to make a system unavailable to legitimate users — a direct attack on the 'Availability' leg of the CIA triad.",
    analogy: "It's like flooding a shop's entrance with people who have no intention of buying anything, just to make it impossible for real customers to get in.",
    whyItMatters: "Availability is just as much a security property as confidentiality — a service that's down provides zero value regardless of how well its data is protected.",
    explanation: [
      "Network-layer attacks try to exhaust bandwidth or connection capacity with sheer traffic volume; application-layer attacks target a specific expensive operation (like a slow database query) to exhaust server resources with comparatively little traffic.",
      "A DDoS (Distributed Denial-of-Service) attack sources that traffic from many different locations at once, making it much harder to block by simply denying a single IP address.",
      "Defensive layers: rate limiting (capping how many requests a single source can make), a Content Delivery Network/Web Application Firewall (absorbing and filtering traffic before it reaches your origin server), load balancing (spreading legitimate load across multiple servers), and traffic monitoring to detect abnormal patterns early.",
      "This platform does not provide DoS/DDoS tooling or instructions for taking down a real service — the useful, actionable skill here is recognizing abnormal traffic patterns and knowing which mitigations address which attack type."
    ],
    syntax: "availability threat model: legitimate capacity < attack traffic volume/cost = service degraded or down",
    example: "# Illustrative — analyzing SYNTHETIC request-rate data to flag abnormal traffic:\nrequests_per_minute_by_ip = {\"203.0.113.5\": 4200, \"192.168.1.10\": 12}\nfor ip, count in requests_per_minute_by_ip.items():\n    if count > 1000:\n        print(f\"Review: {ip} sent {count} requests/min — abnormal volume\")",
    commonMistakes: [
      "Assuming DoS is always about raw bandwidth — application-layer attacks can succeed with comparatively little traffic by targeting expensive operations.",
      "Relying on blocking a single IP as a full defense against a distributed (multi-source) attack.",
      "Treating availability as a lesser concern than confidentiality — an inaccessible service has failed its users regardless of how well its data is otherwise protected."
    ],
    practice: {
      prompt: "Given the sample requests_per_minute_by_ip dict in the example, write code that lists every IP exceeding a 1000 requests/minute threshold, sorted by request count descending.",
      starter: 'requests_per_minute_by_ip = {"203.0.113.5": 4200, "192.168.1.10": 12, "198.51.100.9": 1500}\n# your code here',
      hint: "Filter the dict items by value, then use sorted() with key=lambda pair: pair[1], reverse=True."
    },
    challenge: {
      prompt: "Explain the difference between a network-layer and an application-layer DoS attack, and name one defensive measure specifically suited to each."
    },
    knowledgeCheck: [
      {
        q: "Why is a DDoS attack harder to defend against than a DoS attack from a single source?",
        options: ["DDoS attacks are actually weaker", "Traffic comes from many different sources, making simple single-IP blocking ineffective", "DDoS only targets small websites", "There's no real difference"],
        answer: 1,
        explain: "Distributing the attack across many sources defeats the simplest defense (blocking one IP), requiring broader mitigations like rate limiting and traffic-pattern analysis instead."
      }
    ]
  },
  {
    id: "hk-wordpress",
    levelId: "hk-lvl20",
    title: "What is WordPress?",
    difficulty: "Medium",
    minutes: 13,
    prereq: ["hk-dos"],
    concept: "WordPress powers a huge share of the web, and its plugin/theme ecosystem is both its greatest strength and its most common source of security vulnerabilities.",
    analogy: "WordPress core is like a well-built house; plugins and themes are third-party renovations — the house's security is only as strong as the weakest renovation installed.",
    whyItMatters: "Because WordPress is so widely used, vulnerability scanning and hardening it is a genuinely common, practical security task — not a niche skill.",
    explanation: [
      "Most real-world WordPress compromises come from outdated or poorly coded plugins/themes, not from WordPress core itself, which is generally well-maintained.",
      "A vulnerability scanner like WPScan (used defensively, with authorization) checks a site's WordPress version, installed plugins/themes, and known configuration weaknesses against a database of known vulnerabilities — the same defensive workflow taught in the Vulnerability Scanning lesson.",
      "Common weak configurations: default admin usernames, weak passwords, exposed debug information, outdated software versions, and overly permissive file permissions.",
      "Hardening steps: keep WordPress core, themes, and plugins updated, remove unused plugins/themes entirely (not just deactivate), use strong unique credentials, and limit login attempts.",
      "Any scanning exercise in this course targets localhost or a deliberately vulnerable lab installation — never a live WordPress site without explicit authorization."
    ],
    syntax: "Scan workflow: identify version/plugins -> match against known vulnerabilities -> prioritize by severity -> remediate",
    example: "# Illustrative — checking SYNTHETIC plugin version data against a known-vulnerable list:\ninstalled_plugins = {\"contact-form-pro\": \"2.1.0\", \"seo-booster\": \"4.5.2\"}\nknown_vulnerable = {\"contact-form-pro\": \"2.1.0\"}\nfor name, version in installed_plugins.items():\n    if known_vulnerable.get(name) == version:\n        print(f\"Review: {name} v{version} matches a known vulnerable version\")",
    commonMistakes: [
      "Deactivating a vulnerable plugin instead of fully removing it — deactivated plugin files can sometimes still be reached directly.",
      "Assuming WordPress core vulnerabilities are the main risk, when plugins/themes are the far more common source.",
      "Running any scanning tool against a live site without explicit written authorization."
    ],
    practice: {
      prompt: "Using the sample installed_plugins and known_vulnerable dicts, write code that prints every plugin whose installed version matches a known-vulnerable version.",
      starter: 'installed_plugins = {"contact-form-pro": "2.1.0", "seo-booster": "4.5.2"}\nknown_vulnerable = {"contact-form-pro": "2.1.0"}\n# your code here',
      hint: "Loop through installed_plugins and compare each version against known_vulnerable.get(name)."
    },
    challenge: {
      prompt: "Explain why removing an unused plugin entirely is safer than simply deactivating it."
    },
    knowledgeCheck: [
      {
        q: "What is the most common source of real-world WordPress security compromises?",
        options: ["WordPress core itself", "Outdated or poorly coded plugins/themes", "The hosting provider always", "There is no common pattern"],
        answer: 1,
        explain: "WordPress core is generally well-maintained; the plugin/theme ecosystem is where most real vulnerabilities are found in practice."
      }
    ]
  },
  {
    id: "hk-vuln-reporting",
    levelId: "hk-lvl21",
    title: "Generating Reports",
    difficulty: "Hard",
    minutes: 16,
    prereq: ["hk-wordpress"],
    concept: "A vulnerability assessment is only as useful as its report — clearly communicating severity, impact, and remediation is what turns a scan into actual security improvement.",
    analogy: "Raw scanner output is like a doctor's lab results printout; a good report is the doctor's actual diagnosis and treatment plan — the data alone doesn't help anyone act.",
    whyItMatters: "Professional security work is judged heavily on communication — a brilliant finding that's poorly reported often gets ignored, while a clear one gets fixed.",
    explanation: [
      "A vulnerability scanner produces findings, each typically tied to a CVE (a unique public vulnerability identifier) and a CVSS score (0.0–10.0, indicating severity) — but raw findings need triage before they're useful.",
      "False positives are common in automated scanning — a good report distinguishes verified findings from ones that need manual confirmation, to avoid wasting remediation effort.",
      "A solid finding write-up includes: what was found, where (affected component/URL), how severe (with justification, not just the raw score), how to reproduce it safely, and a specific, actionable remediation step — not just 'fix this'.",
      "Reports for different audiences differ: an executive summary focuses on business risk and priority in plain language; the technical findings section gives engineers exactly what they need to reproduce and fix each issue.",
      "Retesting after remediation is a standard, often-skipped step — a finding isn't actually closed until it's been verified fixed."
    ],
    syntax: "Finding = what + where + severity (CVSS) + reproduction steps + remediation",
    example: '# Illustrative — turning a SYNTHETIC finding into a structured report entry:\nfinding = {\n    "title": "Outdated plugin with known SQL injection",\n    "component": "contact-form-pro v2.1.0",\n    "cvss": 8.6,\n    "remediation": "Update to v2.3.1 or later, which patches this issue.",\n}\nprint(f"[{finding[\'cvss\']}] {finding[\'title\']} — {finding[\'component\']}")\nprint(f"Fix: {finding[\'remediation\']}")',
    commonMistakes: [
      "Reporting a raw scanner finding without triage, burying real, actionable issues among false positives.",
      "Writing a remediation recommendation too vague to act on ('improve security') instead of a specific step.",
      "Skipping retesting after a fix is applied, leaving the finding's actual status unverified."
    ],
    practice: {
      prompt: "Given the sample finding dict in the example, write a function format_finding(finding) that returns a one-line formatted summary string combining severity, title, and component.",
      starter: 'finding = {\n    "title": "Outdated plugin with known SQL injection",\n    "component": "contact-form-pro v2.1.0",\n    "cvss": 8.6,\n}\n\ndef format_finding(finding):\n    # your code here\n    pass\n\nprint(format_finding(finding))',
      hint: "An f-string combining finding['cvss'], finding['title'], and finding['component'] is all you need."
    },
    challenge: {
      prompt: "Write a short, professional finding write-up (a few sentences) for a fictional, clearly synthetic vulnerability, including severity reasoning and a specific remediation step."
    },
    knowledgeCheck: [
      {
        q: "Why does a good vulnerability report distinguish verified findings from potential false positives?",
        options: ["It doesn't matter either way", "Treating unverified findings as confirmed wastes remediation effort and erodes trust in the report", "False positives should never be mentioned", "Scanners never produce false positives"],
        answer: 1,
        explain: "Confirming findings before reporting them as issues keeps the report credible and focuses remediation effort where it's actually needed."
      }
    ]
  },
  {
    id: "hk-interview-prep",
    levelId: "hk-lvl22",
    title: "General Hacking Based",
    difficulty: "Hard",
    minutes: 18,
    prereq: ["hk-vuln-reporting"],
    concept: "Security interviews test whether you understand the reasoning behind concepts — what's happening, why, how it's detected, and how it's prevented — not just definitions.",
    analogy: "A good interview answer is less like reciting a dictionary definition and more like explaining a case to a colleague: the mechanism, the risk, and the fix, in your own words.",
    whyItMatters: "This is a direct capstone on everything covered across the Ethical Hacking track — consolidating it into interview-ready explanations is genuinely useful, whether or not you're interviewing soon.",
    explanation: [
      "General/conceptual questions often probe the CIA triad, the difference between authentication and authorization, and vulnerability vs. risk — foundational vocabulary covered early in this track.",
      "Vulnerability assessment and penetration testing questions probe methodology: recon, scanning, identifying findings, reporting, and the ethical/legal boundary of authorization.",
      "Networking questions commonly cover TCP vs UDP, the purpose of common ports, and how MITM/ARP poisoning work conceptually.",
      "Social engineering questions probe recognizing manipulation tactics and explaining why technical controls alone aren't sufficient.",
      "Web security questions commonly focus on SQL injection and XSS: what they are, why they happen, and the structural fix for each — not just the vulnerability name.",
      "A strong general strategy for any scenario question: name the concept, explain the mechanism briefly, then always close with detection and remediation — interviewers are listening for that last part specifically."
    ],
    syntax: "Answer structure: concept -> mechanism -> detection -> remediation",
    example: "# Example strong answer structure for \"What is SQL injection?\":\n# 1. Concept: untrusted input treated as executable query code instead of data\n# 2. Mechanism: string concatenation lets input alter the query's structure\n# 3. Detection: code review for string-built queries; automated scanning\n# 4. Remediation: parameterized queries / prepared statements",
    commonMistakes: [
      "Giving a one-line dictionary definition without explaining the mechanism or the fix.",
      "Mixing up related concepts (e.g. authentication vs authorization, encoding vs encryption) under interview pressure.",
      "Forgetting to mention detection and remediation, which is often exactly what the interviewer is listening for."
    ],
    practice: {
      prompt: "Using the four-part structure (concept -> mechanism -> detection -> remediation), write a strong interview answer for the question: 'What is Cross-Site Scripting?'",
      starter: "# Concept:\n# Mechanism:\n# Detection:\n# Remediation:",
      hint: "Reuse what you learned in the XSS lesson: untrusted input rendered as executable HTML/JS, fixed by output encoding and CSP."
    },
    challenge: {
      prompt: "Write a strong interview-style answer to the scenario question: 'A colleague asks why a strong Wi-Fi password isn't enough if WPS is still enabled on the router. What do you tell them?'"
    },
    knowledgeCheck: [
      {
        q: "In a security interview, what's typically most valuable to include beyond a correct definition?",
        options: ["Nothing else is needed", "An explanation of the mechanism plus how it's detected and remediated", "The exact CVE number of a related vulnerability", "A joke to lighten the mood"],
        answer: 1,
        explain: "Interviewers are usually testing depth of understanding — mechanism, detection, and remediation demonstrate that far better than a definition alone."
      },
      {
        q: "What's the key difference between a vulnerability assessment and authorized penetration testing?",
        options: ["They are exactly the same thing", "A vulnerability assessment identifies and catalogs weaknesses; penetration testing goes further to safely demonstrate exploitability within an authorized scope", "Penetration testing never requires authorization", "Vulnerability assessments are illegal"],
        answer: 1,
        explain: "Assessment focuses on finding and cataloging issues; authorized pentesting validates real-world exploitability, both strictly within a defined, authorized scope."
      },
      {
        q: "Why do interviewers often ask about the difference between encoding, encryption, and hashing?",
        options: ["It's trivia with no practical purpose", "Confusing them is a common real mistake that leads to actual security failures (e.g. using encoding for confidentiality)", "They're actually identical concepts", "Only hashing is ever asked about"],
        answer: 1,
        explain: "This confusion shows up in real vulnerabilities — like assuming Base64 encoding provides confidentiality, which it doesn't."
      }
    ]
  }
];

const EXERCISES = [
  {
    id: "ex-variables-1",
    topicId: "l-variables",
    title: "Store and Print",
    difficulty: "Easy",
    problem: "Create a variable named `city` set to the name of a city, then print it.",
    requirements: ["Variable must be named exactly `city`", "Value must be a string", "Must print the variable"],
    example: { input: "—", output: "Lagos" },
    starter: 'city = ""\n# print it below',
    concept: "l-variables",
    variantOf: null
  },
  {
    id: "ex-variables-1b",
    topicId: "l-variables",
    title: "Store and Print (Retry)",
    difficulty: "Easy",
    problem: "Create a variable named `product` set to the name of a product, then print a sentence that includes it using an f-string.",
    requirements: ["Variable must be named exactly `product`", "Use an f-string in the print statement"],
    example: { input: "—", output: "This product is: Notebook" },
    starter: 'product = ""\n# print an f-string below',
    concept: "l-variables",
    variantOf: "ex-variables-1"
  },
  {
    id: "ex-datatypes-1",
    topicId: "l-datatypes",
    title: "Fix the Type Mismatch",
    difficulty: "Easy",
    problem: "You are given `quantity = \"3\"` and `price = 4.5`. Write code that prints the total cost (quantity * price) without raising a TypeError.",
    requirements: ["Convert quantity to a number before multiplying", "Print the total"],
    example: { input: 'quantity = "3", price = 4.5', output: "13.5" },
    starter: 'quantity = "3"\nprice = 4.5\n# your code here',
    concept: "l-datatypes",
    variantOf: null
  },
  {
    id: "ex-datatypes-1b",
    topicId: "l-datatypes",
    title: "Fix the Type Mismatch (Retry)",
    difficulty: "Easy",
    problem: "You are given `age_text = \"17\"`. Convert it to an integer, add 1, and print a sentence stating the next age using an f-string.",
    requirements: ["Convert age_text to int", "Use an f-string to print the result"],
    example: { input: 'age_text = "17"', output: "Next year you will be 18." },
    starter: 'age_text = "17"\n# your code here',
    concept: "l-datatypes",
    variantOf: "ex-datatypes-1"
  },
  {
    id: "ex-conditionals-1",
    topicId: "l-conditionals",
    title: "Even or Odd",
    difficulty: "Easy",
    problem: "Given a variable `number`, print \"Even\" if it's divisible by 2, otherwise print \"Odd\".",
    requirements: ["Use the % operator", "Use if/else"],
    example: { input: "number = 7", output: "Odd" },
    starter: "number = 7\n# your code here",
    concept: "l-conditionals",
    variantOf: null
  },
  {
    id: "ex-conditionals-1b",
    topicId: "l-conditionals",
    title: "Even or Odd (Retry)",
    difficulty: "Easy",
    problem: "Given a variable `year`, print \"Leap Year\" if it's divisible by 4, otherwise print \"Not a Leap Year\".",
    requirements: ["Use the % operator", "Use if/else"],
    example: { input: "year = 2024", output: "Leap Year" },
    starter: "year = 2024\n# your code here",
    concept: "l-conditionals",
    variantOf: "ex-conditionals-1"
  },
  {
    id: "ex-loops-1",
    topicId: "l-loops",
    title: "Sum a Range",
    difficulty: "Medium",
    problem: "Use a for loop to add up all numbers from 1 to 10 (inclusive), storing the running total in a variable called `total`, then print it.",
    requirements: ["Use range()", "Print the final total (should be 55)"],
    example: { input: "—", output: "55" },
    starter: "total = 0\n# your loop here\nprint(total)",
    concept: "l-loops",
    variantOf: null,
    tests: [
      { name: "Prints correct total", input: "no input", expected: "55" }
    ],
    hiddenTestCount: 1
  },
  {
    id: "ex-loops-1b",
    topicId: "l-loops",
    title: "Sum a Range (Retry)",
    difficulty: "Medium",
    problem: "Use a for loop to add up only the even numbers from 1 to 20 (inclusive), and print the total.",
    requirements: ["Use range() and an if check inside the loop", "Print the final total (should be 110)"],
    example: { input: "—", output: "110" },
    starter: "total = 0\n# your loop here\nprint(total)",
    concept: "l-loops",
    variantOf: "ex-loops-1"
  },
  {
    id: "ex-lists-1",
    topicId: "l-lists",
    title: "Filter a List",
    difficulty: "Medium",
    problem: "Given `scores = [45, 82, 91, 58, 76]`, build a new list called `passing` containing only scores of 60 or above, then print it.",
    requirements: ["Use a loop or list comprehension", "Print `passing`"],
    example: { input: "scores = [45, 82, 91, 58, 76]", output: "[82, 91, 76]" },
    starter: "scores = [45, 82, 91, 58, 76]\n# your code here",
    concept: "l-lists",
    variantOf: null,
    tests: [
      { name: "Filters scores >= 60", input: "scores = [45, 82, 91, 58, 76]", expected: "[82, 91, 76]" }
    ],
    hiddenTestCount: 2
  },
  {
    id: "ex-lists-1b",
    topicId: "l-lists",
    title: "Filter a List (Retry)",
    difficulty: "Medium",
    problem: "Given `words = [\"hi\", \"hello\", \"hey\", \"greetings\"]`, build a new list called `long_words` containing only words with more than 3 letters, then print it.",
    requirements: ["Use len() inside your filter", "Print `long_words`"],
    example: { input: 'words = ["hi", "hello", "hey", "greetings"]', output: "['hello', 'greetings']" },
    starter: 'words = ["hi", "hello", "hey", "greetings"]\n# your code here',
    concept: "l-lists",
    variantOf: "ex-lists-1"
  },
  {
    id: "ex-dicts-1",
    topicId: "l-dicts",
    title: "Safe Lookup",
    difficulty: "Medium",
    problem: "Given `inventory = {\"pens\": 12, \"pencils\": 30}`, print the quantity of \"erasers\" without crashing, showing 0 if the key doesn't exist.",
    requirements: ["Use .get() with a default value"],
    example: { input: 'inventory = {"pens": 12, "pencils": 30}', output: "0" },
    starter: 'inventory = {"pens": 12, "pencils": 30}\n# your code here',
    concept: "l-dicts",
    variantOf: null
  },
  {
    id: "ex-functions-1",
    topicId: "l-functions",
    title: "Reusable Converter",
    difficulty: "Medium",
    functionSignature: "def celsius_to_fahrenheit(c):",
    problem: "Write a function `celsius_to_fahrenheit(c)` that returns the Fahrenheit equivalent (formula: c * 9/5 + 32). Call it with 20 and print the result.",
    requirements: ["Function must return, not print, the value", "Call it and print the result separately"],
    example: { input: "c = 20", output: "68.0" },
    starter: "def celsius_to_fahrenheit(c):\n    # your code here\n\nprint(celsius_to_fahrenheit(20))",
    concept: "l-functions",
    variantOf: null,
    tests: [
      { name: "celsius_to_fahrenheit(20) == 68.0", input: "c = 20", expected: "68.0" },
      { name: "celsius_to_fahrenheit(0) == 32.0", input: "c = 0", expected: "32.0" }
    ],
    hiddenTestCount: 2
  },

  /* ---- non-write-code exercise types, spread across topics ---- */
  {
    id: "ex-mc-datatypes",
    topicId: "l-datatypes",
    title: "Spot the Type",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "What is the type of the value produced by `input(\"Enter age: \")`, no matter what the user types?",
    options: ["int", "float", "str", "bool"],
    correctIndex: 2,
    hint: "input() always returns the exact same type, regardless of what's typed.",
    xp: 10
  },
  {
    id: "ex-tf-loops",
    topicId: "l-loops",
    title: "True or False: range()",
    difficulty: "Easy",
    type: "true_false",
    problem: "True or False: `range(1, 5)` produces the numbers 1, 2, 3, 4, 5.",
    correctAnswer: false,
    hint: "range()'s stop value is exclusive — it stops before reaching that number.",
    xp: 10
  },
  {
    id: "ex-predict-conditionals",
    topicId: "l-conditionals",
    title: "Predict the Output",
    difficulty: "Medium",
    type: "predict_output",
    problem: 'What does this code print?\n\nx = 7\nif x > 10:\n    print("big")\nelif x > 5:\n    print("medium")\nelse:\n    print("small")',
    options: ["big", "medium", "small", "Nothing — it raises an error"],
    correctIndex: 1,
    hint: "Walk through each condition in order — x is 7, so the first check fails but the second one doesn't.",
    xp: 10
  },
  {
    id: "ex-fillblank-functions",
    topicId: "l-functions",
    title: "Fill in the Blank",
    difficulty: "Easy",
    type: "fill_blank",
    problem: "Complete the function so it correctly returns the sum of a and b:",
    codeTemplate: "def add(a, b):\n    ____ a + b",
    correctAnswer: "return",
    acceptableAnswers: ["return"],
    hint: "You need the keyword that sends a value back to the caller.",
    xp: 10
  },
  {
    id: "ex-debug-lists",
    topicId: "l-lists",
    title: "Debug the Code",
    difficulty: "Medium",
    type: "debug",
    problem: "This code is supposed to print the last item of the list, but it crashes. Find and fix the bug.",
    requirements: ["Fix the IndexError", "Still print the last item using indexing"],
    starter: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[3])  # this crashes — fix it',
    example: { input: 'fruits = ["apple", "banana", "cherry"]', output: "cherry" },
    hint: "The list has 3 items, so valid indexes are 0, 1, and 2 — or use -1 for 'the last one'.",
    concept: "l-lists",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-shortanswer-dicts",
    topicId: "l-dicts",
    title: "Explain It",
    difficulty: "Easy",
    type: "short_answer",
    problem: "In one or two sentences: why is `.get()` often safer than square-bracket access (`dictionary[key]`) when reading from a dictionary?",
    acceptableAnswers: ["get", "keyerror", "default", "missing", "doesn't exist", "crash"],
    hint: "Think about what happens with each approach when the key isn't actually in the dictionary.",
    xp: 10
  },
  {
    id: "ex-errors-1",
    topicId: "l-errors",
    title: "Handle the Crash",
    difficulty: "Medium",
    problem: "Write code that asks for a number with input(), converts it with int() inside a try block, and prints \"Invalid input\" if it fails, instead of crashing.",
    requirements: ["Use try/except", "Catch ValueError specifically, not a bare except"],
    example: { input: "user types 'abc'", output: "Invalid input" },
    starter: "# your code here",
    concept: "l-errors",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-errors-1b",
    topicId: "l-errors",
    title: "Handle the Crash (Retry)",
    difficulty: "Medium",
    problem: "Write a function `safe_divide(a, b)` that returns the result of a / b, or the string \"Cannot divide by zero\" if b is 0 — using try/except rather than an if check.",
    requirements: ["Use try/except", "Catch ZeroDivisionError specifically"],
    example: { input: "safe_divide(10, 0)", output: "Cannot divide by zero" },
    starter: "def safe_divide(a, b):\n    # your code here\n\nprint(safe_divide(10, 0))",
    concept: "l-errors",
    variantOf: "ex-errors-1",
    xp: 15
  },
  {
    id: "ex-files-1",
    topicId: "l-files",
    title: "Save Some JSON",
    difficulty: "Medium",
    problem: "Write code that saves the dictionary {\"status\": \"ok\", \"count\": 3} to a file called data.json using the json module.",
    requirements: ["Use json.dump()", "Open the file in write mode with with open(...)"],
    example: { input: "—", output: "data.json is created with the JSON content" },
    starter: "import json\n# your code here",
    concept: "l-files",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-regex-1",
    topicId: "l-regex",
    title: "Extract the Numbers",
    difficulty: "Hard",
    problem: "Use re.findall() to extract every number from the string \"Item A: 12, Item B: 45, Item C: 7\" into a list.",
    requirements: ["Use the re module", "Use a raw string pattern"],
    example: { input: '"Item A: 12, Item B: 45, Item C: 7"', output: "['12', '45', '7']" },
    starter: 'import re\ntext = "Item A: 12, Item B: 45, Item C: 7"\n# your code here',
    concept: "l-regex",
    variantOf: null,
    xp: 20
  },
  {
    id: "ex-mc-modules",
    topicId: "l-modules",
    title: "Import Basics",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "Which statement brings the `sqrt` function directly into your namespace, so you can call it as just `sqrt(9)` instead of `math.sqrt(9)`?",
    options: ["import math", "import math.sqrt", "from math import sqrt", "require math.sqrt"],
    correctIndex: 2,
    hint: "You need the 'from ... import ...' form to pull a name in directly.",
    xp: 10
  },
  {
    id: "ex-oop-1",
    topicId: "l-oop",
    title: "Build a Class",
    difficulty: "Hard",
    problem: "Create a class `Rectangle` with __init__ storing width and height, and a method `area(self)` that returns width * height. Create one instance and print its area.",
    requirements: ["Use __init__ with self, width, height", "Implement an area() method", "Print the result of calling area()"],
    example: { input: "Rectangle(4, 5)", output: "20" },
    starter: "class Rectangle:\n    # your code here\n\nr = Rectangle(4, 5)\nprint(r.area())",
    concept: "l-oop",
    variantOf: null,
    xp: 20
  },
  {
    id: "ex-shortanswer-workflow",
    topicId: "l-workflow",
    title: "Why Isolate Environments?",
    difficulty: "Medium",
    type: "short_answer",
    problem: "In one or two sentences: why should each Python project use its own virtual environment instead of installing packages globally?",
    acceptableAnswers: ["conflict", "isolat", "version", "dependen", "separate", "clash"],
    hint: "Think about what happens when two different projects need two different versions of the same package.",
    xp: 15
  },

  /* ---- Cybersecurity track exercises ---- */
  {
    id: "ex-cy-mc-cia",
    topicId: "cy-cia",
    title: "Which Part of the Triad?",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "An attacker doesn't read or steal any data, but floods a server with traffic so real users can't reach it. Which part of the CIA triad is being attacked?",
    options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
    correctIndex: 2,
    hint: "Think about what's actually being denied to legitimate users here.",
    xp: 10
  },
  {
    id: "ex-cy-tf-auth",
    topicId: "cy-cia",
    title: "True or False: Authentication vs Authorization",
    difficulty: "Easy",
    type: "true_false",
    problem: "True or False: Once a user is authenticated, they are automatically authorized to perform any action in the system.",
    correctAnswer: false,
    hint: "Authentication proves identity; authorization is a separate check for what that identity is allowed to do.",
    xp: 10
  },
  {
    id: "ex-cy-mc-ports",
    topicId: "cy-networking",
    title: "Well-Known Ports",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "Which port is conventionally used for HTTPS traffic?",
    options: ["21", "80", "443", "22"],
    correctIndex: 2,
    hint: "HTTP and HTTPS use different, both well-known, ports.",
    xp: 10
  },
  {
    id: "ex-cy-sockets-1",
    topicId: "cy-sockets",
    title: "Check a Local Port",
    difficulty: "Hard",
    problem: "Write a function `check_port(host, port)` using the socket module that returns True if a TCP connection succeeds within 2 seconds, False otherwise. Only ever test 'localhost' or systems you own.",
    requirements: ["Use socket.socket() and settimeout()", "Catch connection errors instead of crashing", "Return True/False, don't print"],
    example: { input: 'check_port("localhost", 80)', output: "True or False depending on what's running locally" },
    starter: "import socket\n\ndef check_port(host, port):\n    # your code here\n    pass",
    concept: "cy-sockets",
    variantOf: null,
    xp: 20
  },
  {
    id: "ex-cy-logs-1",
    topicId: "cy-logs",
    title: "Extract IP and Status",
    difficulty: "Hard",
    problem: 'Given the log line \'2026-01-01 FAILED login user=root ip=10.0.0.5\', use regex to extract the ip address into a variable and print it.',
    requirements: ["Use the re module", "Extract only the IP address, not the whole line"],
    example: { input: "log line with ip=10.0.0.5", output: "10.0.0.5" },
    starter: 'import re\nline = "2026-01-01 FAILED login user=root ip=10.0.0.5"\n# your code here',
    concept: "cy-logs",
    variantOf: null,
    xp: 20
  },
  {
    id: "ex-cy-mc-crypto",
    topicId: "cy-crypto",
    title: "Hashing vs Encryption",
    difficulty: "Medium",
    type: "multiple_choice",
    problem: "You need to verify a downloaded file hasn't been corrupted or tampered with. Which technique fits best?",
    options: ["Base64 encoding", "Symmetric encryption", "Hashing (comparing fingerprints)", "Asymmetric encryption"],
    correctIndex: 2,
    hint: "You need a way to detect changes, not to hide or reverse the content.",
    xp: 10
  },
  {
    id: "ex-cy-secure-1",
    topicId: "cy-secure-python",
    title: "Fix the Hardcoded Secret",
    difficulty: "Medium",
    type: "debug",
    problem: "This code hardcodes an API key directly in source. Rewrite it to read the key from an environment variable, raising a clear error if it's missing.",
    requirements: ["Use os.environ.get()", "Raise a clear error if the key is missing", "Never hardcode the actual key value"],
    starter: 'API_KEY = "sk-12345"  # fix this\n\ndef call_api():\n    print(f"Using key: {API_KEY}")',
    example: { input: "—", output: "Reads from environment instead of hardcoding" },
    concept: "cy-secure-python",
    variantOf: null,
    xp: 15
  },

  /* ---- Data / AI / ML track exercises ---- */
  {
    id: "ex-da-mc-missing",
    topicId: "da-fundamentals",
    title: "Handling Missing Data",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "A student's test score wasn't recorded and is stored as None. What's the best way to treat it when computing the class average?",
    options: ["Treat it as 0", "Exclude it from the average calculation", "Treat it as the maximum score", "It doesn't matter either way"],
    correctIndex: 1,
    hint: "A missing score isn't the same as a score of zero — including it as 0 would distort the average.",
    xp: 10
  },
  {
    id: "ex-da-numpy-1",
    topicId: "da-numpy",
    title: "Vectorized Discount",
    difficulty: "Medium",
    problem: "Given a NumPy array `prices = np.array([10, 20, 30])`, compute and print an array with a 10% discount applied to every price, without using a loop.",
    requirements: ["Use a vectorized operation, not a for loop", "Print the resulting array"],
    example: { input: "prices = [10, 20, 30]", output: "[9. 18. 27.]" },
    starter: "import numpy as np\nprices = np.array([10, 20, 30])\n# your code here",
    concept: "da-numpy",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-da-pandas-1",
    topicId: "da-pandas",
    title: "Filter a DataFrame",
    difficulty: "Medium",
    problem: 'Given a DataFrame df with a "score" column, write code that prints only the rows where score is 60 or above.',
    requirements: ["Use boolean indexing", "Print the filtered DataFrame"],
    example: { input: 'df["score"] = [92, 55, 78]', output: "rows with score >= 60" },
    starter: 'import pandas as pd\ndf = pd.DataFrame({"name": ["Ada", "Sam", "Lee"], "score": [92, 55, 78]})\n# your code here',
    concept: "da-pandas",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-da-mc-chart",
    topicId: "da-viz",
    title: "Choose the Right Chart",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "You want to show how a company's monthly revenue changed over the past year. Which chart type fits best?",
    options: ["Scatter plot", "Line chart", "Pie chart", "Histogram"],
    correctIndex: 1,
    hint: "You're showing change over a continuous variable — time.",
    xp: 10
  },
  {
    id: "ex-da-stats-1",
    topicId: "da-stats",
    title: "Mean vs Median",
    difficulty: "Medium",
    type: "short_answer",
    problem: "Given the scores [55, 60, 62, 58, 95], the mean is noticeably higher than the median. In one or two sentences, explain why, and which one better represents a 'typical' score here.",
    acceptableAnswers: ["outlier", "95", "skew", "median", "pulled"],
    hint: "One unusually high value can pull the mean away from where most of the data actually sits.",
    xp: 15
  },
  {
    id: "ex-da-mc-overfit",
    topicId: "da-ml-foundations",
    title: "Spot the Overfitting",
    difficulty: "Hard",
    type: "multiple_choice",
    problem: "A model scores 99% accuracy on training data but only 62% on new test data. What does this most likely indicate?",
    options: ["The model is underfitting", "The model is overfitting to the training data", "The test data is too easy", "The model has too few parameters"],
    correctIndex: 1,
    hint: "A huge gap between training and test performance is the classic signature of one specific problem.",
    xp: 15
  },
  {
    id: "ex-da-mc-nn",
    topicId: "da-neural-networks",
    title: "Why Activation Functions?",
    difficulty: "Hard",
    type: "multiple_choice",
    problem: "Why can't you just stack linear layers without any activation function and expect a more powerful model?",
    options: ["You can — activation functions are purely optional decoration", "Without non-linearity, stacked linear layers mathematically collapse into a single linear layer", "Activation functions only affect training speed, not capability", "Activation functions are only used in the first layer"],
    correctIndex: 1,
    hint: "Non-linearity is what lets deep networks represent more than a single straight-line relationship.",
    xp: 15
  },

  /* ---- Ethical Hacking track exercises ---- */
  {
    id: "ex-hk-linux-1",
    topicId: "hk-linux-commands",
    title: "Navigate the Filesystem",
    difficulty: "Easy",
    problem: "Write the three commands, one per line, to: print your current directory, list its contents in long format, and print the contents of a file called notes.txt.",
    requirements: ["Use pwd, ls -l, and cat in that order", "One command per line, as comments"],
    example: { input: "—", output: "pwd\nls -l\ncat notes.txt" },
    starter: "# 1.\n# 2.\n# 3.",
    concept: "hk-linux-commands",
    variantOf: null,
    xp: 10
  },
  {
    id: "ex-hk-tf-mac",
    topicId: "hk-mac",
    title: "True or False: MAC Spoofing",
    difficulty: "Easy",
    type: "true_false",
    problem: "True or False: Changing your own device's MAC address for privacy on public Wi-Fi is inherently unethical.",
    correctAnswer: false,
    hint: "What makes MAC spoofing unethical isn't the technique — it's using it to impersonate a device you don't have authorization to impersonate.",
    xp: 10
  },
  {
    id: "ex-hk-mc-recon",
    topicId: "hk-recon",
    title: "Passive or Active?",
    difficulty: "Medium",
    type: "multiple_choice",
    problem: "Looking up an organization's public DNS records is an example of which kind of reconnaissance?",
    options: ["Active reconnaissance", "Passive reconnaissance", "Neither — it's not reconnaissance", "Exploitation"],
    correctIndex: 1,
    hint: "Does looking up public DNS records require directly interacting with the organization's live systems, or just querying public infrastructure?",
    xp: 10
  },
  {
    id: "ex-hk-mc-vpn",
    topicId: "hk-vpn",
    title: "What Does a VPN Actually Hide?",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "You connect to a VPN, then log into your personal email account. Which statement is accurate?",
    options: ["You are now completely anonymous online", "Your local network can't see your traffic contents, but logging in still identifies you to that email service", "The VPN provider can never see any of your traffic", "VPNs only work on mobile devices"],
    correctIndex: 1,
    hint: "A VPN shifts who can see your traffic — it doesn't erase the fact that logging into a personal account identifies you.",
    xp: 10
  },
  {
    id: "ex-hk-tf-stego",
    topicId: "hk-steganography",
    title: "True or False: Steganography vs Encryption",
    difficulty: "Medium",
    type: "true_false",
    problem: "True or False: The main goal of steganography is to make a hidden message unreadable, the same way encryption does.",
    correctAnswer: false,
    hint: "Encryption hides CONTENT. Steganography hides the fact that a message EXISTS at all — a different goal.",
    xp: 10
  },
  {
    id: "ex-hk-mc-mitm",
    topicId: "hk-mitm",
    title: "MITM Defense",
    difficulty: "Hard",
    type: "multiple_choice",
    problem: "A user's browser shows a certificate warning when connecting to their bank's website. What's the safest response?",
    options: ["Click through — certificate warnings are usually false alarms", "Treat it as a potential red flag and not proceed until it's resolved", "Disable HTTPS to avoid the warning", "Only worry about it on public Wi-Fi"],
    correctIndex: 1,
    hint: "Certificate warnings exist specifically to flag situations that could indicate a MITM attempt.",
    xp: 15
  },
  {
    id: "ex-hk-sqli-1",
    topicId: "hk-sqli",
    title: "Fix the SQL Injection",
    difficulty: "Hard",
    type: "debug",
    problem: "This code builds a SQL query by directly inserting user input into the string. Rewrite it to use a parameterized query instead.",
    requirements: ["Use a parameterized query (%s placeholder with a tuple of params)", "Never concatenate user input directly into the query string"],
    starter: 'def get_user(cursor, username):\n    query = f"SELECT * FROM users WHERE username = \'{username}\'"\n    cursor.execute(query)\n    return cursor.fetchone()',
    example: { input: "—", output: "Query built safely with parameters instead of string interpolation" },
    concept: "hk-sqli",
    variantOf: null,
    xp: 20
  },
  {
    id: "ex-hk-xss-1",
    topicId: "hk-xss",
    title: "Escape the Output",
    difficulty: "Hard",
    problem: "Given user_comment = '<img src=x onerror=alert(1)>', use Python's html module to escape it before it would be rendered, and print the result.",
    requirements: ["Use html.escape()", "Print the escaped, safe version"],
    example: { input: "<img src=x onerror=alert(1)>", output: "&lt;img src=x onerror=alert(1)&gt;" },
    starter: 'import html\nuser_comment = "<img src=x onerror=alert(1)>"\n# your code here',
    concept: "hk-xss",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-hk-caesar-1",
    topicId: "hk-caesar",
    title: "Encrypt with Caesar Cipher",
    difficulty: "Medium",
    functionSignature: "def caesar_encrypt(text, key):",
    problem: "Write caesar_encrypt(text, key) that shifts every letter forward by key positions, leaving non-letters unchanged. Call it with ('hello', 3) and print the result.",
    requirements: ["Handle wraparound at the end of the alphabet", "Leave non-letter characters unchanged", "Print the result of calling it"],
    example: { input: 'caesar_encrypt("hello", 3)', output: "khoor" },
    starter: "def caesar_encrypt(text, key):\n    # your code here\n    pass\n\nprint(caesar_encrypt(\"hello\", 3))",
    concept: "hk-caesar",
    variantOf: null,
    xp: 20
  },
  {
    id: "ex-hk-password-1",
    topicId: "hk-password-strength",
    title: "Password Strength Check",
    difficulty: "Medium",
    problem: "Write is_strong(password) that returns True only if the password is at least 12 characters AND contains at least 3 of: lowercase, uppercase, digit, punctuation.",
    requirements: ["Check length >= 12", "Check at least 3 of the 4 character categories are present"],
    example: { input: 'is_strong("Str0ng!Passphrase")', output: "True" },
    starter: "import string\n\ndef is_strong(password):\n    # your code here\n    pass\n\nprint(is_strong(\"Str0ng!Passphrase\"))",
    concept: "hk-password-strength",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-hk-ai-mc",
    topicId: "hk-ai-cybersecurity",
    title: "AI Output: Trust but Verify",
    difficulty: "Medium",
    type: "multiple_choice",
    problem: "An AI assistant confidently states a specific CVE number as the cause of a bug in your code. What should you do before acting on it?",
    options: ["Trust it immediately since AI tools are always accurate", "Independently verify the CVE actually exists and applies before acting", "Ignore all AI output permanently", "Ask the same AI tool to confirm itself"],
    correctIndex: 1,
    hint: "Hallucination means an AI can state something specific and wrong with full confidence — independent verification is the safeguard.",
    xp: 10
  },
  {
    id: "ex-hk-prompt-1",
    topicId: "hk-ai-prompts",
    title: "Rewrite a Weak Prompt",
    difficulty: "Medium",
    type: "short_answer",
    problem: "Rewrite the vague prompt 'is this code secure?' into a structured prompt that specifies what to check and asks for reasoning. Write your improved prompt.",
    acceptableAnswers: ["input validation", "injection", "secrets", "explain", "reasoning", "specific"],
    hint: "Name specific categories to check (input validation, injection risks, secrets handling) and ask the model to explain its reasoning.",
    xp: 15
  },
  {
    id: "ex-hk-phishing-1",
    topicId: "hk-phishing",
    title: "Detect the Domain Mismatch",
    difficulty: "Medium",
    problem: "Given link_text and actual_link strings, write code that prints a warning if the domain shown in link_text doesn't appear inside actual_link.",
    requirements: ["Extract or compare the domain portion", "Print a clear warning when they mismatch"],
    example: { input: 'link_text="paypal.com/login", actual_link="http://paypa1-secure-verify.net/login"', output: "Warning printed" },
    starter: 'link_text = "paypal.com/login"\nactual_link = "http://paypa1-secure-verify.net/login"\n# your code here',
    concept: "hk-phishing",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-hk-se-tf",
    topicId: "hk-social-engineering",
    title: "True or False: Verifying Claims",
    difficulty: "Easy",
    type: "true_false",
    problem: "True or False: If a suspicious message provides a phone number to 'verify' a claim, calling that number is a safe way to confirm it's legitimate.",
    correctAnswer: false,
    hint: "If the attacker supplied that contact info, calling it just reaches the attacker again.",
    xp: 10
  },
  {
    id: "ex-hk-keylogger-mc",
    topicId: "hk-keylogger",
    title: "Why MFA Still Helps",
    difficulty: "Medium",
    type: "multiple_choice",
    problem: "A keylogger successfully captures a user's password. Why does having MFA enabled still meaningfully limit the damage?",
    options: ["MFA prevents keyloggers from being installed", "The attacker still lacks the second factor needed to complete login, even with the captured password", "MFA makes passwords unnecessary", "It doesn't help at all"],
    correctIndex: 1,
    hint: "A captured password alone isn't enough to log in if a second factor is required.",
    xp: 10
  },
  {
    id: "ex-hk-wep-tf",
    topicId: "hk-wifi-wep",
    title: "True or False: WEP's Flaw",
    difficulty: "Medium",
    type: "true_false",
    problem: "True or False: A longer, more complex WEP key would have fixed WEP's core security weakness.",
    correctAnswer: false,
    hint: "WEP's flaw was in how it reused initialization vectors alongside the key — a protocol design issue, not key length.",
    xp: 10
  },
  {
    id: "ex-hk-wpa-1",
    topicId: "hk-wifi-wpa",
    title: "Passphrase Strength Check",
    difficulty: "Medium",
    problem: "Write is_strong_wifi_passphrase(passphrase) returning True only if it's at least 16 characters long.",
    requirements: ["Check length >= 16"],
    example: { input: '"correcthorsebatterystaple123"', output: "True" },
    starter: "def is_strong_wifi_passphrase(passphrase):\n    # your code here\n    pass\n\nprint(is_strong_wifi_passphrase(\"correcthorsebatterystaple123\"))",
    concept: "hk-wifi-wpa",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-hk-https-1",
    topicId: "hk-https-defense",
    title: "Check for HTTPS",
    difficulty: "Easy",
    problem: "Write looks_safe_to_submit(url) returning True only if the URL starts with 'https://'.",
    requirements: ["Use str.startswith()"],
    example: { input: '"http://example.com/login"', output: "False" },
    starter: 'def looks_safe_to_submit(url):\n    # your code here\n    pass\n\nprint(looks_safe_to_submit("http://example.com/login"))',
    concept: "hk-https-defense",
    variantOf: null,
    xp: 10
  },
  {
    id: "ex-hk-android-mc",
    topicId: "hk-android",
    title: "Spot the Red Flag",
    difficulty: "Easy",
    type: "multiple_choice",
    problem: "A simple flashlight app requests permission to read your SMS messages and contacts. What does this most likely indicate?",
    options: ["This is completely normal for any app", "An excessive, unrelated permission request — a classic red flag for a malicious app", "Flashlight apps always need this", "It means the app is more secure"],
    correctIndex: 1,
    hint: "Ask whether the requested permission actually relates to the app's stated function.",
    xp: 10
  },
  {
    id: "ex-hk-dos-1",
    topicId: "hk-dos",
    title: "Flag Abnormal Traffic",
    difficulty: "Medium",
    problem: "Given a dict of IP to requests-per-minute, write code that lists IPs exceeding 1000 requests/min, sorted highest first.",
    requirements: ["Filter by threshold", "Sort results descending by request count"],
    example: { input: '{"203.0.113.5": 4200, "192.168.1.10": 12}', output: "[('203.0.113.5', 4200)]" },
    starter: 'requests_per_minute_by_ip = {"203.0.113.5": 4200, "192.168.1.10": 12, "198.51.100.9": 1500}\n# your code here',
    concept: "hk-dos",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-hk-wordpress-1",
    topicId: "hk-wordpress",
    title: "Match Known Vulnerable Versions",
    difficulty: "Medium",
    problem: "Given installed_plugins and known_vulnerable dicts, print every plugin whose installed version matches a known-vulnerable entry.",
    requirements: ["Compare each installed version against known_vulnerable", "Print matches clearly"],
    example: { input: 'installed={"contact-form-pro":"2.1.0"}, known={"contact-form-pro":"2.1.0"}', output: "contact-form-pro flagged" },
    starter: 'installed_plugins = {"contact-form-pro": "2.1.0", "seo-booster": "4.5.2"}\nknown_vulnerable = {"contact-form-pro": "2.1.0"}\n# your code here',
    concept: "hk-wordpress",
    variantOf: null,
    xp: 15
  },
  {
    id: "ex-hk-report-1",
    topicId: "hk-vuln-reporting",
    title: "Format a Finding",
    difficulty: "Hard",
    functionSignature: "def format_finding(finding):",
    problem: "Write format_finding(finding) that returns a one-line string combining the CVSS score, title, and component from a finding dict.",
    requirements: ["Return a formatted string, don't just print inside the function", "Include cvss, title, and component"],
    example: { input: '{"title": "...", "component": "...", "cvss": 8.6}', output: "[8.6] Title — Component" },
    starter: 'finding = {\n    "title": "Outdated plugin with known SQL injection",\n    "component": "contact-form-pro v2.1.0",\n    "cvss": 8.6,\n}\n\ndef format_finding(finding):\n    # your code here\n    pass\n\nprint(format_finding(finding))',
    concept: "hk-vuln-reporting",
    variantOf: null,
    xp: 20
  }
];

const REFERENCE = [
  { id: "ref-variable", category: "Variables", term: "Variable", definition: "A named container that stores a value.", explanation: "Variables let you save a value under a name and reuse it anywhere later in your code.", syntax: "name = value", example: 'score = 100', mistakes: "Reassigning without meaning to; typos in variable names.", related: ["Data Types", "Scope"] },
  { id: "ref-str", category: "Data Types", term: "str (String)", definition: "A sequence of text characters.", explanation: "Strings represent any text — words, sentences, or symbols — always wrapped in quotes.", syntax: '"text" or \'text\'', example: 'greeting = "Hello"', mistakes: "Forgetting quotes; mixing up + concatenation with commas in print().", related: ["f-strings", "Lists"] },
  { id: "ref-list", category: "Lists", term: "List", definition: "An ordered, changeable collection of values.", explanation: "Lists hold multiple items in a specific order, accessible by index.", syntax: "my_list = [a, b, c]", example: 'nums = [1, 2, 3]\nnums.append(4)', mistakes: "Index out of range; modifying a list while iterating over it.", related: ["Dictionaries", "Loops"] },
  { id: "ref-dict", category: "Dictionaries", term: "Dictionary", definition: "A collection of key/value pairs.", explanation: "Dictionaries map unique keys to values, like a real-world lookup table.", syntax: '{"key": "value"}', example: 'user = {"name": "Ada"}\nuser.get("name")', mistakes: "KeyError from missing keys; forgetting .items() when looping over both keys and values.", related: ["Lists", "JSON"] },
  { id: "ref-forloop", category: "Loops", term: "for loop", definition: "Repeats a block once per item in a collection.", explanation: "Use a for loop when you know what you're iterating over — a list, string, or range.", syntax: "for item in collection:\n    ...", example: "for i in range(3):\n    print(i)", mistakes: "Off-by-one errors with range(); shadowing an outer variable with the loop variable.", related: ["while loop", "range()"] },
  { id: "ref-whileloop", category: "Loops", term: "while loop", definition: "Repeats a block as long as a condition stays True.", explanation: "Use a while loop when you don't know in advance how many times you'll repeat.", syntax: "while condition:\n    ...", example: "n = 3\nwhile n > 0:\n    n -= 1", mistakes: "Forgetting to update the condition variable, causing an infinite loop.", related: ["for loop", "break"] },
  { id: "ref-function", category: "Functions", term: "Function", definition: "A reusable, named block of code that can take inputs and return a value.", explanation: "Functions break code into smaller, testable pieces you can call by name.", syntax: "def name(params):\n    return value", example: "def add(a, b):\n    return a + b", mistakes: "Forgetting return; confusing print with return.", related: ["Parameters", "Scope"] },
  { id: "ref-exception", category: "Exceptions", term: "try / except", definition: "Catches and handles errors without crashing the program.", explanation: "Code inside try runs normally; if it raises an error, the matching except block runs instead.", syntax: "try:\n    ...\nexcept ValueError:\n    ...", example: 'try:\n    n = int(input())\nexcept ValueError:\n    print("Not a number")', mistakes: "Using a bare `except:` that hides real bugs; catching errors you don't actually handle.", related: ["raise", "finally"] },
  { id: "ref-fstring", category: "Strings", term: "f-string", definition: "A string with variables embedded directly inside it.", explanation: "f-strings make building text from variables far more readable than concatenation.", syntax: 'f"text {variable} text"', example: 'name = "Ada"\nprint(f"Hi {name}")', mistakes: "Forgetting the f prefix, so {variable} prints literally instead of substituting.", related: ["str", "print()"] },
  { id: "ref-slicing", category: "Strings", term: "Slicing", definition: "Extracts a sub-section of a string or list using [start:stop].", explanation: "Slicing lets you grab a range of items without a loop.", syntax: "sequence[start:stop]", example: '"hello"[1:4]  # "ell"', mistakes: "Forgetting that stop is exclusive — [1:4] does not include index 4.", related: ["List", "str"] },
  { id: "ref-class", category: "OOP", term: "Class", definition: "A blueprint for creating objects that bundle data and behavior.", explanation: "A class defines attributes (data) and methods (functions) shared by every object made from it.", syntax: "class Name:\n    def __init__(self):\n        ...", example: 'class Dog:\n    def __init__(self, name):\n        self.name = name', mistakes: "Forgetting `self` as the first parameter of a method.", related: ["Object", "Inheritance"] },
  { id: "ref-venv", category: "Environments", term: "Virtual Environment", definition: "An isolated Python installation for a single project's dependencies.", explanation: "Keeps one project's packages from conflicting with another's.", syntax: "python -m venv .venv", example: "python -m venv .venv\nsource .venv/bin/activate", mistakes: "Forgetting to activate the environment before installing packages.", related: ["pip", "requirements.txt"] },
  { id: "ref-pip", category: "Environments", term: "pip", definition: "Python's package installer.", explanation: "pip downloads and installs third-party libraries from the Python Package Index.", syntax: "pip install package_name", example: "pip install requests", mistakes: "Installing globally instead of inside an activated virtual environment.", related: ["Virtual Environment", "requirements.txt"] },
  { id: "ref-json", category: "Files & Data", term: "JSON", definition: "A lightweight text format for structured data, built from objects and arrays.", explanation: "Python's json module converts between JSON text and Python dictionaries/lists.", syntax: "json.loads(text)\njson.dumps(data)", example: 'import json\ndata = json.loads(\'{"a": 1}\')', mistakes: "Forgetting to import json; mixing up loads (from text) with load (from a file).", related: ["Dictionary", "Files"] },
  { id: "ref-regex", category: "Regex", term: "Regular Expression", definition: "A pattern language for matching and extracting text.", explanation: "Regex is used to validate formats (like emails) or pull structured data out of unstructured text (like logs).", syntax: "re.search(pattern, text)", example: 'import re\nre.findall(r"\\d+", "room 42")', mistakes: "Overly greedy patterns matching more than intended; forgetting raw strings (r\"...\").", related: ["str", "Log Analysis"] },
  { id: "ref-git", category: "Git", term: "git commit", definition: "Saves a snapshot of your staged changes to the project's history.", explanation: "Commits are the building blocks of a project's version history.", syntax: "git add .\ngit commit -m \"message\"", example: "git add .\ngit commit -m \"Add scoring logic\"", mistakes: "Vague commit messages; committing files that shouldn't be tracked (use .gitignore).", related: ["Branch", "GitHub"], whenToUse: "Any time you've reached a working, meaningful checkpoint in your code." },

  /* ---- Built-in functions ---- */
  { id: "ref-len", category: "Built-in Functions", term: "len()", definition: "Returns the number of items in a collection or characters in a string.", explanation: "Works on strings, lists, tuples, dictionaries, and sets.", syntax: "len(sequence)", example: 'len("hello")   # 5\nlen([1, 2, 3])   # 3', mistakes: "Calling len() on an int or other non-sized value, which raises a TypeError.", related: ["str", "List"], whenToUse: "Whenever you need the size of a collection before looping or validating input." },
  { id: "ref-range", category: "Built-in Functions", term: "range()", definition: "Generates a sequence of numbers, most often used to control a for loop.", explanation: "range(stop), range(start, stop), or range(start, stop, step).", syntax: "range(start, stop, step)", example: "list(range(2, 10, 2))   # [2, 4, 6, 8]", mistakes: "Forgetting stop is exclusive.", related: ["for loop"], whenToUse: "When you need to repeat something a specific number of times or generate a numeric sequence." },
  { id: "ref-sorted", category: "Built-in Functions", term: "sorted()", definition: "Returns a new, sorted list from any iterable, without changing the original.", explanation: "Accepts a key= function to control sort order, and reverse=True for descending order.", syntax: "sorted(iterable, key=None, reverse=False)", example: 'sorted([3, 1, 2])                     # [1, 2, 3]\nsorted(words, key=len, reverse=True)  # longest first', mistakes: "Confusing sorted() (returns a new list) with .sort() (sorts a list in place and returns None).", related: ["List"], whenToUse: "When you need an ordered view of data without mutating the original collection." },
  { id: "ref-enumerate", category: "Built-in Functions", term: "enumerate()", definition: "Loops over a collection while also tracking the index of each item.", explanation: "Avoids manually managing a counter variable in a loop.", syntax: "for index, value in enumerate(collection):", example: 'for i, fruit in enumerate(["apple", "banana"]):\n    print(i, fruit)', mistakes: "Using range(len(collection)) instead, which is more error-prone and less readable.", related: ["for loop", "List"], whenToUse: "Whenever a loop needs both the position and the value of each item." },
  { id: "ref-zip", category: "Built-in Functions", term: "zip()", definition: "Pairs up items from two or more iterables, position by position.", explanation: "Stops as soon as the shortest iterable runs out.", syntax: "zip(iterable1, iterable2)", example: 'names = ["Ada", "Grace"]\nages = [30, 45]\nlist(zip(names, ages))  # [("Ada", 30), ("Grace", 45)]', mistakes: "Expecting zip() to pad shorter iterables — it silently truncates instead.", related: ["List", "Tuples"], whenToUse: "When you need to iterate over two related lists together, like names and scores." },

  /* ---- String methods ---- */
  { id: "ref-str-split", category: "String Methods", term: ".split()", definition: "Breaks a string into a list of substrings based on a separator.", explanation: "With no argument, splits on any whitespace.", syntax: 'text.split(separator)', example: '"a,b,c".split(",")   # [\'a\', \'b\', \'c\']', mistakes: "Forgetting that consecutive separators create empty strings unless you split on whitespace.", related: [".join()", "List"], whenToUse: "Parsing simple delimited text like CSV lines or user input." },
  { id: "ref-str-join", category: "String Methods", term: ".join()", definition: "Combines a list of strings into one string, using the calling string as the separator.", explanation: "The reverse operation of .split().", syntax: 'separator.join(list_of_strings)', example: '", ".join(["apple", "banana"])   # "apple, banana"', mistakes: "Calling .join() on a list containing non-string items, which raises a TypeError.", related: [".split()"], whenToUse: "Building a single readable string out of a list of pieces." },
  { id: "ref-str-strip", category: "String Methods", term: ".strip()", definition: "Removes leading and trailing whitespace (or specified characters) from a string.", explanation: ".lstrip() and .rstrip() do the same from only one side.", syntax: 'text.strip()', example: '"  hello  ".strip()   # "hello"', mistakes: "Assuming it removes whitespace in the middle of the string too — it only trims the ends.", related: ["str"], whenToUse: "Cleaning up user input or text read from a file before comparing or storing it." },
  { id: "ref-str-format", category: "String Methods", term: ".format() / f-strings", definition: "Inserts values into a string template.", explanation: "f-strings (f\"{x}\") are the modern, more readable alternative to .format().", syntax: '"{}".format(value)\nf"{value}"', example: '"{} is {}".format("Ada", 30)\nf"{name} is {age}"', mistakes: "Mixing .format() placeholder styles inconsistently across a project.", related: ["f-string"], whenToUse: "Any time you're building a string from variables." },
  { id: "ref-str-case", category: "String Methods", term: ".upper() / .lower()", definition: "Returns a copy of a string converted to all uppercase or all lowercase.", explanation: "Useful for case-insensitive comparisons.", syntax: "text.upper()\ntext.lower()", example: '"Python".upper()   # "PYTHON"', mistakes: "Forgetting these return a new string rather than modifying the original (strings are immutable).", related: ["str"], whenToUse: "Comparing user input without worrying about how they capitalized it." },

  /* ---- List / Set / Dict methods ---- */
  { id: "ref-list-methods", category: "List Methods", term: ".append() / .extend() / .insert()", definition: "Add items to a list.", explanation: ".append() adds one item to the end, .extend() adds every item from another iterable, .insert() adds at a specific index.", syntax: "lst.append(x)\nlst.extend(iterable)\nlst.insert(i, x)", example: 'nums = [1, 2]\nnums.append(3)      # [1, 2, 3]\nnums.extend([4, 5]) # [1, 2, 3, 4, 5]', mistakes: "Using .append() with a list argument when .extend() was intended — it nests the list instead of merging it.", related: ["List"], whenToUse: "Building up a list incrementally as you process data." },
  { id: "ref-list-comprehension", category: "List Methods", term: "List comprehension", definition: "A compact way to build a new list by transforming or filtering another iterable.", explanation: "Combines a loop and a condition into a single readable expression.", syntax: "[expression for item in iterable if condition]", example: "evens = [n for n in range(10) if n % 2 == 0]", mistakes: "Writing comprehensions so complex they become harder to read than a plain loop.", related: ["for loop", "List"], whenToUse: "Transforming or filtering a collection in one clear line, when the logic stays simple." },
  { id: "ref-set-methods", category: "Set Methods", term: ".union() / .intersection() / .difference()", definition: "Combine or compare two sets.", explanation: "union() = everything in either set, intersection() = only shared items, difference() = items in the first but not the second.", syntax: "a.union(b)\na.intersection(b)\na.difference(b)", example: '{1,2,3}.intersection({2,3,4})   # {2, 3}', mistakes: "Expecting sets to preserve insertion order — they don't.", related: ["Sets"], whenToUse: "Comparing two collections of unique items, like tags or permissions." },
  { id: "ref-dict-methods", category: "Dictionary Methods", term: ".update() / .pop() / .setdefault()", definition: "Modify a dictionary's contents safely.", explanation: ".update() merges another dictionary in, .pop() removes and returns a key's value, .setdefault() gets a key or sets it if missing.", syntax: "d.update(other)\nd.pop(key, default)\nd.setdefault(key, default)", example: 'counts = {}\ncounts.setdefault("a", 0)\ncounts["a"] += 1', mistakes: "Using .pop() on a missing key without a default, which raises a KeyError.", related: ["Dictionary"], whenToUse: "Safely merging, removing, or initializing dictionary entries without manual key checks." },

  /* ---- Files / data ---- */
  { id: "ref-pathlib", category: "File Handling", term: "pathlib.Path", definition: "An object-oriented way to work with filesystem paths.", explanation: "Replaces manual string concatenation of file paths with clean, cross-platform operations.", syntax: "from pathlib import Path\np = Path(\"data\") / \"file.txt\"", example: 'from pathlib import Path\np = Path("notes.txt")\nprint(p.exists())', mistakes: "Manually joining paths with '+' or '/' as strings, which breaks across operating systems.", related: ["Files"], whenToUse: "Any time your code reads, writes, or checks for files and folders." },
  { id: "ref-csv", category: "File Handling", term: "csv module", definition: "Reads and writes CSV (comma-separated values) files.", explanation: "csv.reader() and csv.writer() handle quoting and delimiters correctly, which manual string splitting often gets wrong.", syntax: "import csv\ncsv.reader(f)\ncsv.writer(f)", example: 'import csv\nwith open("data.csv") as f:\n    for row in csv.reader(f):\n        print(row)', mistakes: "Splitting CSV lines on commas manually — this breaks on quoted fields containing commas.", related: ["JSON", "File Handling"], whenToUse: "Reading or writing simple tabular data files." },
  { id: "ref-with", category: "File Handling", term: "with statement", definition: "Ensures a resource (like a file) is properly cleaned up, even if an error occurs.", explanation: "Called a context manager — it wraps setup and teardown around a block of code.", syntax: "with open(path) as f:\n    ...", example: 'with open("log.txt") as f:\n    lines = f.readlines()', mistakes: "Manually calling open()/close() and forgetting close() when an error occurs partway through.", related: ["Files"], whenToUse: "Any time you open a file, a network connection, or another resource that needs closing." },

  /* ---- Modules & Packages ---- */
  { id: "ref-module", category: "Modules", term: "Module", definition: "A single .py file containing reusable Python code.", explanation: "Any Python file can be imported as a module from another file.", syntax: "import module_name\nfrom module_name import thing", example: "import math\nfrom math import sqrt", mistakes: "Naming your own file the same as a standard library module.", related: ["Packages", "Standard Library"], whenToUse: "Splitting related functions/classes out of a growing single-file script." },
  { id: "ref-package", category: "Packages", term: "Package", definition: "A folder of related modules, importable as a single namespace.", explanation: "Identified by containing an __init__.py file (even an empty one, in most setups).", syntax: "my_package/\n  __init__.py\n  module_a.py\n  module_b.py", example: "from my_package import module_a", mistakes: "Forgetting __init__.py in older Python tooling, or circular imports between modules in the same package.", related: ["Module"], whenToUse: "Organizing a project once it grows beyond a handful of files." },

  /* ---- Testing ---- */
  { id: "ref-assert", category: "Testing", term: "assert", definition: "Checks that a condition is true, raising an AssertionError if not.", explanation: "A lightweight way to state an assumption directly in code, used heavily in tests.", syntax: "assert condition, \"message\"", example: 'assert add(2, 2) == 4, "addition is broken"', mistakes: "Relying on assert for production input validation — it can be disabled with the -O flag.", related: ["pytest"], whenToUse: "Verifying an assumption while developing, or writing a quick test." },
  { id: "ref-pytest", category: "Testing", term: "pytest", definition: "A popular third-party framework for writing and running Python tests.", explanation: "Test functions are just functions starting with test_; pytest discovers and runs them automatically.", syntax: "def test_add():\n    assert add(2, 2) == 4", example: "# in test_calculator.py\ndef test_add():\n    assert add(2, 3) == 5", mistakes: "Writing tests that depend on execution order, or that don't reset state between runs.", related: ["assert"], whenToUse: "Any real project — tests catch regressions before they reach users." },

  /* ---- Professional workflow ---- */
  { id: "ref-requirements", category: "Environments", term: "requirements.txt", definition: "A plain-text list of a project's Python package dependencies and versions.", explanation: "Lets anyone recreate your exact environment with one command.", syntax: "pip install -r requirements.txt", example: "requests==2.31.0\npandas==2.2.0", mistakes: "Forgetting to update it after installing a new package (pip freeze > requirements.txt helps).", related: ["pip", "Virtual Environment"], whenToUse: "Any shared or deployed Python project." },
  { id: "ref-typehints", category: "Clean Code", term: "Type hints", definition: "Optional annotations that document the expected types of variables and function signatures.", explanation: "Python doesn't enforce them at runtime, but editors and tools use them to catch mistakes early.", syntax: "def add(a: int, b: int) -> int:", example: 'def greet(name: str) -> str:\n    return f"Hi, {name}"', mistakes: "Treating type hints as runtime enforcement — they're not checked unless you use a separate tool like mypy.", related: ["Function", "PEP 8"], whenToUse: "Public functions, or any code you or others will revisit later." },
  { id: "ref-pep8", category: "Clean Code", term: "PEP 8", definition: "Python's official style guide for formatting readable code.", explanation: "Covers naming conventions, indentation, line length, and spacing.", syntax: "snake_case for variables/functions\nPascalCase for classes\n4 spaces per indent level", example: "def calculate_total(price, quantity):\n    return price * quantity", mistakes: "Inconsistent naming styles within the same project.", related: ["Clean code"], whenToUse: "All the time — consistent style makes code easier for you and others to read later." },
  { id: "ref-docstring", category: "Clean Code", term: "Docstring", definition: "A string literal placed right after a function/class definition, documenting what it does.", explanation: "Accessible at runtime via help() or .__doc__, and read by most IDEs automatically.", syntax: '"""One-line summary.\n\nLonger description if needed."""', example: 'def add(a, b):\n    """Return the sum of a and b."""\n    return a + b', mistakes: "Writing a docstring that just repeats the function name instead of explaining behavior.", related: ["Function", "Type hints"], whenToUse: "Any function whose purpose isn't obvious from its name and signature alone." },

  /* ---- Git & GitHub ---- */
  { id: "ref-git-repo", category: "Git", term: "Repository", definition: "A folder tracked by Git, containing your project's full history of changes.", explanation: "Created with git init, or obtained with git clone.", syntax: "git init\ngit clone <url>", example: "git clone https://github.com/user/project.git", mistakes: "Initializing a repo inside another repo by accident.", related: ["Clone", "GitHub"], whenToUse: "The first thing you do when starting to track a project's history." },
  { id: "ref-git-status", category: "Git", term: "git status / git add", definition: "See what's changed, then stage the changes you want to include in your next commit.", explanation: "git status shows modified/untracked files; git add moves them into the 'staged' area.", syntax: "git status\ngit add file.py\ngit add .", example: "git status\ngit add app.py", mistakes: "Running git add . without checking git status first, accidentally staging files that shouldn't be tracked.", related: ["git commit", ".gitignore"], whenToUse: "Before every commit, to review and select exactly what you're saving." },
  { id: "ref-git-pushpull", category: "Git", term: "git push / git pull", definition: "Sync your local commits with a remote repository (like GitHub).", explanation: "push sends your commits up; pull brings down commits made elsewhere.", syntax: "git push origin main\ngit pull origin main", example: "git push origin main", mistakes: "Pushing without pulling first when working with others, causing conflicts.", related: ["GitHub", "Branch"], whenToUse: "push after committing to back up/share work; pull before starting new work to stay in sync." },
  { id: "ref-git-branch", category: "Git", term: "Branches & merging", definition: "A branch is an independent line of development; merging combines changes from one branch into another.", explanation: "Branches let you work on a feature without affecting the main codebase until it's ready.", syntax: "git branch feature-x\ngit checkout feature-x\ngit merge feature-x", example: "git checkout -b add-scoring\n# ...make changes, commit...\ngit checkout main\ngit merge add-scoring", mistakes: "Working directly on main for every change, making it hard to isolate or discard experiments.", related: ["Repository"], whenToUse: "Any nontrivial feature or fix, to keep main always in a working state." },
  { id: "ref-gitignore", category: "Git", term: ".gitignore", definition: "A file listing paths Git should never track.", explanation: "Keeps virtual environments, cache files, and secrets out of your repository.", syntax: ".venv/\n__pycache__/\n.env", example: ".venv/\n*.pyc\n.env", mistakes: "Adding .gitignore after already committing the files you meant to ignore — they need to be untracked separately.", related: ["Repository"], whenToUse: "Set this up in every new project, before your first commit." },
  { id: "ref-readme", category: "Git", term: "README.md", definition: "The landing-page document for a repository, written in Markdown.", explanation: "Usually explains what the project does, how to install it, and how to run it.", syntax: "# Project Title\n\nDescription...\n\n## Setup\n...", example: "# Expense Tracker\n\nA CLI tool to log and total expenses.\n\n## Setup\npip install -r requirements.txt", mistakes: "Leaving it as the default placeholder text, or letting it go stale as the project changes.", related: ["Repository"], whenToUse: "Every public or shared repository, so others (including future you) know what it does." },

  /* ---- Cybersecurity ---- */
  { id: "ref-cia", category: "Cybersecurity", term: "CIA Triad", definition: "The three core goals of information security: Confidentiality, Integrity, Availability.", explanation: "Nearly every security control maps back to protecting one or more of these.", syntax: "Confidentiality · Integrity · Availability", example: "Encryption → confidentiality. Checksums → integrity. Redundancy → availability.", mistakes: "Treating security as only about secrecy, ignoring integrity and availability.", related: ["Authentication", "Risk"], whenToUse: "As a mental checklist any time you're evaluating a security decision." },
  { id: "ref-authn-authz", category: "Cybersecurity", term: "Authentication vs Authorization", definition: "Authentication proves who you are; authorization determines what you're allowed to do.", explanation: "They're separate steps, often implemented separately, and both are needed for access control.", syntax: "authenticate(user) → identity\nauthorize(identity, action) → allowed?", example: "Logging in = authentication. Being blocked from an admin page as a regular user = authorization.", mistakes: "Assuming a logged-in (authenticated) user is automatically allowed to do anything.", related: ["CIA Triad", "Access control"], whenToUse: "Designing or reviewing any login/permissions system." },
  { id: "ref-vuln-risk", category: "Cybersecurity", term: "Vulnerability vs Risk", definition: "A vulnerability is a weakness; risk is the likelihood of it being exploited times the impact if it is.", explanation: "Not every vulnerability is equally urgent — risk assessment prioritizes them.", syntax: "risk ≈ likelihood × impact", example: "An unpatched server exposed to the internet = high risk. The same flaw on an air-gapped machine = much lower risk.", mistakes: "Treating every vulnerability as equally urgent regardless of actual exploitability or exposure.", related: ["Attack surface"], whenToUse: "Prioritizing which security issues to fix first." },
  { id: "ref-attack-surface", category: "Cybersecurity", term: "Attack Surface", definition: "The complete set of points where an attacker could try to enter or extract data from a system.", explanation: "More exposed services, open ports, and input fields mean a larger attack surface.", syntax: "attack surface = every entry point an attacker could target", example: "Closing unused ports and removing unused features reduces attack surface.", mistakes: "Only thinking about the 'front door' (login page) and ignoring APIs, open ports, and third-party integrations.", related: ["Vulnerability vs Risk"], whenToUse: "Reviewing a system's overall exposure, not just individual bugs." },

  /* ---- Networking ---- */
  { id: "ref-tcp-udp", category: "Networking", term: "TCP vs UDP", definition: "Two core transport protocols: TCP is reliable and connection-oriented; UDP is faster but doesn't guarantee delivery.", explanation: "The choice is a deliberate reliability-vs-speed tradeoff, not one being objectively 'better'.", syntax: "socket.SOCK_STREAM  # TCP\nsocket.SOCK_DGRAM   # UDP", example: "Web pages and file transfers use TCP. Live video/voice often use UDP.", mistakes: "Assuming UDP is inferior rather than a deliberate design choice for specific use cases.", related: ["Sockets", "Ports"], whenToUse: "Choosing a protocol when building any networked tool." },
  { id: "ref-dns", category: "Networking", term: "DNS", definition: "The system that translates human-readable domain names into IP addresses.", explanation: "Without DNS, you'd have to remember raw IP addresses for every website.", syntax: "example.com → 93.184.216.34 (illustrative)", example: "socket.gethostbyname(\"example.com\")", mistakes: "Trusting a domain name as inherently safe without considering DNS spoofing/poisoning risks.", related: ["HTTP/HTTPS"], whenToUse: "Any time your code connects to a service by name rather than raw IP." },
  { id: "ref-http-https", category: "Networking", term: "HTTP vs HTTPS", definition: "HTTP is the protocol behind the web; HTTPS is HTTP layered over encrypted TLS.", explanation: "HTTPS protects data in transit from eavesdropping and tampering; plain HTTP does not.", syntax: "http://example.com   (unencrypted)\nhttps://example.com  (encrypted)", example: "Login forms and payment pages should always use HTTPS.", mistakes: "Sending sensitive data (passwords, tokens) over plain HTTP.", related: ["TCP vs UDP", "Encryption"], whenToUse: "Any web request that carries sensitive or authenticated data." },
  { id: "ref-sockets-ref", category: "Networking", term: "socket module", definition: "Python's low-level interface for network communication.", explanation: "Underlies most higher-level networking libraries in Python.", syntax: "s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.connect((host, port))", example: 's = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.settimeout(2)\ns.connect(("localhost", 80))', mistakes: "Forgetting timeouts, leaving a program hanging on an unresponsive host.", related: ["TCP vs UDP"], whenToUse: "Building any tool that connects to or listens for network traffic." },

  /* ---- Cryptography ---- */
  { id: "ref-hashing", category: "Cryptography", term: "Hashing", definition: "A one-way function that converts data into a fixed-size fingerprint.", explanation: "The same input always hashes to the same output, but you can't reverse a hash back into the original data.", syntax: "import hashlib\nhashlib.sha256(data.encode()).hexdigest()", example: 'hashlib.sha256(b"hello").hexdigest()', mistakes: "Using a fast general-purpose hash (like raw MD5/SHA-256) directly for passwords instead of a purpose-built, slow, salted algorithm.", related: ["Encryption", "Secure password storage"], whenToUse: "Verifying data integrity, or as the basis of proper password storage schemes." },
  { id: "ref-encoding-vs-encryption", category: "Cryptography", term: "Encoding vs Encryption", definition: "Encoding is a reversible format change with no secret involved; encryption requires a key and provides real confidentiality.", explanation: "Base64 is encoding, not encryption — anyone can decode it with no key needed.", syntax: "base64.b64encode(data)   # NOT secure\ncipher.encrypt(data, key) # actually secure", example: 'import base64\nbase64.b64encode(b"secret")  # trivially reversible, provides no security', mistakes: "Believing Base64-encoded data is 'encrypted' or hidden from anyone.", related: ["Hashing", "Symmetric/Asymmetric encryption"], whenToUse: "Never rely on encoding alone for confidentiality." },
  { id: "ref-sym-asym", category: "Cryptography", term: "Symmetric vs Asymmetric Encryption", definition: "Symmetric uses one shared key for both encrypting and decrypting; asymmetric uses a public/private key pair.", explanation: "Symmetric is fast but requires securely sharing a key beforehand; asymmetric solves that at the cost of speed.", syntax: "symmetric: encrypt(data, key) / decrypt(data, key)\nasymmetric: encrypt(data, public_key) / decrypt(data, private_key)", example: "HTTPS uses asymmetric encryption to safely exchange a symmetric session key, then switches to fast symmetric encryption for the rest of the connection.", mistakes: "Assuming one approach is universally better — real systems often combine both.", related: ["Hashing", "Digital signatures"], whenToUse: "Understanding how secure connections and encrypted storage actually work." },
  { id: "ref-digital-signature", category: "Cryptography", term: "Digital Signature", definition: "Cryptographic proof that a message came from a specific sender and wasn't altered.", explanation: "Created with the sender's private key, verified with their public key.", syntax: "sign(message, private_key) → signature\nverify(message, signature, public_key) → valid?", example: "Software updates are often signed so your computer can verify they really came from the vendor.", mistakes: "Confusing a digital signature (proves authenticity/integrity) with encryption (provides confidentiality) — they solve different problems.", related: ["Symmetric/Asymmetric encryption", "Certificates"], whenToUse: "Verifying the authenticity and integrity of a message or file." },

  /* ---- Operating Systems ---- */
  { id: "ref-os-module", category: "Operating Systems", term: "os module", definition: "Python's interface to operating-system-level functionality — environment variables, paths, processes.", explanation: "Commonly used for reading environment variables and interacting with the filesystem.", syntax: "import os\nos.environ.get(\"VAR\")\nos.listdir(path)", example: 'import os\napi_key = os.environ.get("API_KEY")', mistakes: "Hardcoding paths instead of building them safely with pathlib or os.path.", related: ["pathlib", "subprocess"], whenToUse: "Reading environment config, or working with files/directories directly." },
  { id: "ref-subprocess", category: "Operating Systems", term: "subprocess module", definition: "Runs external system commands from within a Python program.", explanation: "Lets Python launch and interact with other programs on the system.", syntax: "import subprocess\nsubprocess.run([\"ls\", \"-la\"], capture_output=True)", example: 'result = subprocess.run(["echo", "hi"], capture_output=True, text=True)\nprint(result.stdout)', mistakes: "Passing untrusted user input directly into a shell command — a classic command-injection risk. Avoid shell=True with unsanitized input.", related: ["os module"], whenToUse: "When your Python program needs to run another program or system command." },
  { id: "ref-permissions", category: "Operating Systems", term: "File Permissions", definition: "Rules that determine who can read, write, or execute a file.", explanation: "Following the principle of least privilege means granting only the access actually needed.", syntax: "chmod 644 file.txt   # rw-r--r--", example: "A config file containing secrets should not be world-readable.", mistakes: "Granting overly broad permissions (like 777) out of convenience instead of setting the minimum needed.", related: ["Secrets management"], whenToUse: "Any time you create files that shouldn't be accessible to every user on a system." },

  /* ---- NumPy / pandas / Matplotlib ---- */
  { id: "ref-numpy-array", category: "NumPy", term: "np.array()", definition: "Creates a fixed-type, multi-dimensional numeric array.", explanation: "The foundational data structure of the NumPy/pandas/scikit-learn ecosystem.", syntax: "import numpy as np\narr = np.array([1, 2, 3])", example: "arr = np.array([[1, 2], [3, 4]])\nprint(arr.shape)  # (2, 2)", mistakes: "Looping over elements manually instead of using vectorized operations.", related: ["Vectorized operations"], whenToUse: "Any numeric computation involving more than a handful of values." },
  { id: "ref-numpy-vectorized", category: "NumPy", term: "Vectorized operations", definition: "Applying an operation to an entire array at once, without an explicit loop.", explanation: "Both more concise and dramatically faster than looping in plain Python for large arrays.", syntax: "arr * 2\narr + arr2\nnp.mean(arr)", example: "prices = np.array([10, 20, 30])\ndiscounted = prices * 0.9", mistakes: "Writing a Python for loop over a NumPy array when a vectorized call would do the same work faster.", related: ["np.array()"], whenToUse: "Nearly always, when working with NumPy arrays." },
  { id: "ref-pandas-dataframe", category: "pandas", term: "DataFrame", definition: "A two-dimensional labeled table — pandas' core data structure.", explanation: "Think of it as a programmable spreadsheet with rows and named columns.", syntax: "df = pd.DataFrame(dict_or_data)\npd.read_csv(\"file.csv\")", example: 'df = pd.DataFrame({"name": ["Ada"], "score": [92]})', mistakes: "Forgetting most operations return a new DataFrame rather than modifying in place.", related: ["Series", "Filtering"], whenToUse: "Any tabular data analysis task." },
  { id: "ref-pandas-groupby", category: "pandas", term: ".groupby()", definition: "Splits a DataFrame into groups based on a column's values, so you can aggregate each group separately.", explanation: "One of the most common patterns for summarizing data by category.", syntax: "df.groupby(\"category\").mean()", example: 'df.groupby("department")["salary"].mean()', mistakes: "Forgetting to select a specific column or aggregation before expecting a usable result.", related: ["DataFrame", "Aggregation"], whenToUse: "Summarizing data by category — totals, averages, counts per group." },
  { id: "ref-matplotlib-basics", category: "Matplotlib", term: "Basic plots", definition: "The core chart types: line, bar, histogram, scatter.", explanation: "Choosing the right chart type for the data shape is as important as the code itself.", syntax: "plt.plot(x, y)\nplt.bar(categories, values)\nplt.hist(data)\nplt.scatter(x, y)\nplt.show()", example: 'plt.bar(["A", "B"], [10, 20])\nplt.title("Example")\nplt.show()', mistakes: "Skipping axis labels and titles, leaving the chart's meaning ambiguous.", related: ["List"], whenToUse: "Visualizing any dataset before or after analysis." },

  /* ---- Statistics ---- */
  { id: "ref-mean-median-mode", category: "Statistics", term: "Mean, Median, Mode", definition: "Three different measures of 'typical' value in a dataset.", explanation: "Mean is the average, median is the middle value, mode is the most frequent value — each can tell a different story.", syntax: "statistics.mean(data)\nstatistics.median(data)\nstatistics.mode(data)", example: "scores = [55, 60, 95]\n# mean is pulled up by the outlier; median isn't", mistakes: "Defaulting to the mean even when data has extreme outliers that skew it.", related: ["Standard deviation"], whenToUse: "Summarizing a dataset's central tendency." },
  { id: "ref-stddev", category: "Statistics", term: "Standard Deviation", definition: "A measure of how spread out values are from the mean, in the same units as the data.", explanation: "A low standard deviation means data clusters tightly around the mean; a high one means it's spread widely.", syntax: "statistics.stdev(data)", example: "Two classes with the same average score can have very different standard deviations — one consistent, one wildly varied.", mistakes: "Confusing variance (squared units) with standard deviation (original units) when interpreting results.", related: ["Mean, Median, Mode"], whenToUse: "Understanding how consistent or variable a dataset is, not just its average." },
  { id: "ref-correlation", category: "Statistics", term: "Correlation", definition: "A measure from -1 to 1 of how strongly two variables move together.", explanation: "0 means no linear relationship; closer to 1 or -1 means a stronger relationship.", syntax: "df[\"a\"].corr(df[\"b\"])", example: "Ice cream sales and drowning incidents may correlate — both are driven by hot weather, not one causing the other.", mistakes: "Treating correlation as proof of causation.", related: ["Sampling"], whenToUse: "Exploring whether two variables tend to move together before assuming a causal link." },

  /* ---- Machine Learning / scikit-learn ---- */
  { id: "ref-supervised-unsupervised", category: "Machine Learning", term: "Supervised vs Unsupervised Learning", definition: "Supervised learning uses labeled examples; unsupervised learning finds structure in unlabeled data.", explanation: "The presence or absence of a 'correct answer' in training data determines which category a technique falls into.", syntax: "supervised: model.fit(X, y)\nunsupervised: model.fit(X)  # no y", example: "Predicting house prices from labeled sales data = supervised. Grouping customers by behavior with no predefined categories = unsupervised.", mistakes: "Trying to evaluate an unsupervised model with metrics designed for labeled data (like accuracy).", related: ["Regression", "Clustering"], whenToUse: "Deciding what kind of ML approach fits a problem." },
  { id: "ref-overfitting", category: "Machine Learning", term: "Overfitting vs Underfitting", definition: "Overfitting: the model memorized training data noise. Underfitting: the model is too simple to capture the real pattern.", explanation: "Both hurt real-world (generalization) performance, in opposite ways.", syntax: "compare: training score vs test score", example: "99% training accuracy but 60% test accuracy → overfitting.", mistakes: "Only checking training performance, never validating on unseen data.", related: ["Supervised vs Unsupervised"], whenToUse: "Diagnosing why a model performs well in development but poorly in the real world." },
  { id: "ref-eval-metrics", category: "Machine Learning", term: "Precision, Recall, F1", definition: "Metrics for evaluating classification models beyond simple accuracy.", explanation: "Precision: of predicted positives, how many were right. Recall: of actual positives, how many were found. F1 balances both.", syntax: "precision = TP / (TP + FP)\nrecall = TP / (TP + FN)\nf1 = 2 * (precision*recall)/(precision+recall)", example: "A spam filter that rarely flags real spam (low recall) but is never wrong when it does (high precision) — F1 shows the tradeoff.", mistakes: "Using accuracy alone on imbalanced data, where a model can score high by ignoring the minority class entirely.", related: ["Overfitting vs Underfitting"], whenToUse: "Evaluating any classification model, especially on imbalanced data." },
  { id: "ref-sklearn", category: "scikit-learn", term: "scikit-learn basics", definition: "Python's standard library for classical machine learning algorithms.", explanation: "Nearly every scikit-learn model shares the same .fit() / .predict() interface.", syntax: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\nmodel.predict(X_test)", example: "from sklearn.tree import DecisionTreeClassifier\nclf = DecisionTreeClassifier()\nclf.fit(X_train, y_train)", mistakes: "Evaluating a model on the same data used to train it.", related: ["Supervised vs Unsupervised"], whenToUse: "Building a classical ML model (regression, classification, clustering) without deep learning." },

  /* ---- Neural Networks / NLP / AI concepts ---- */
  { id: "ref-neuron", category: "Neural Networks", term: "Neuron, Weights & Bias", definition: "A neuron combines weighted inputs plus a bias, then applies an activation function.", explanation: "The basic computational unit that neural networks are built from, layered by the thousands or millions.", syntax: "output = activation(w1*x1 + w2*x2 + ... + bias)", example: "# Conceptual: each connection has a weight; training adjusts these weights.", mistakes: "Thinking of a single neuron as 'intelligent' — the intelligence emerges from many neurons combined and trained, not any one unit.", related: ["Activation function", "Gradient descent"], whenToUse: "Understanding what's actually happening inside a neural network." },
  { id: "ref-gradient-descent", category: "Neural Networks", term: "Gradient Descent", definition: "The optimization algorithm that adjusts a model's weights to reduce error, step by step.", explanation: "Backpropagation calculates how much each weight contributed to the error; gradient descent uses that to update weights.", syntax: "weight = weight - learning_rate * gradient", example: "Training 'epochs' repeat this update process many times over the full dataset.", mistakes: "Setting a learning rate too high (overshoots the minimum) or too low (trains extremely slowly).", related: ["Neuron, Weights & Bias"], whenToUse: "Understanding how any neural network actually learns from data." },
  { id: "ref-nlp", category: "NLP", term: "NLP Basics", definition: "Natural Language Processing — techniques for having computers work with human language.", explanation: "Text must be converted into numbers (via embeddings) before most models can process it.", syntax: "text → tokens → embeddings → model", example: "Sentiment analysis, translation, and chatbots are all NLP applications.", mistakes: "Assuming a fluent-sounding output means the model 'understood' the meaning the way a human would.", related: ["Embeddings", "Transformers"], whenToUse: "Any task involving processing or generating human language with code." },
  { id: "ref-embeddings", category: "NLP", term: "Embeddings", definition: "Numeric vector representations of words or concepts, positioned so similar meanings end up close together.", explanation: "Embeddings are how text becomes something a neural network can actually compute with.", syntax: "embed(\"king\") ≈ vector close to embed(\"queen\")", example: "Famously, embedding arithmetic can approximate: king - man + woman ≈ queen.", mistakes: "Treating embeddings as understanding meaning perfectly — they capture statistical patterns in training data, including its biases.", related: ["NLP Basics", "Transformers"], whenToUse: "Understanding how text-based ML models represent language internally." },
  { id: "ref-transformers", category: "Transformers", term: "Attention & Transformers", definition: "A neural network architecture that uses 'attention' to weigh which parts of the input matter most for each part of the output.", explanation: "Transformers are the architecture behind most modern language models.", syntax: "attention(query, key, value) → weighted focus across the input", example: "In translation, attention lets the model focus on the relevant source word(s) while generating each output word.", mistakes: "Assuming transformer size alone determines quality — training data and technique matter enormously too.", related: ["Embeddings", "LLM concepts"], whenToUse: "Understanding the architecture behind modern NLP and large language models." },
  { id: "ref-llm-concepts", category: "AI Concepts", term: "LLM Concepts", definition: "Large Language Models are transformers trained on huge amounts of text to predict and generate language.", explanation: "They generate statistically plausible text — not guaranteed factual, reasoned, or 'understood' output.", syntax: "prompt → tokens → model → next-token predictions → generated text", example: "An LLM can write fluent, confident-sounding text that is still factually wrong — always verify important claims.", mistakes: "Treating an LLM's fluent output as automatically correct or as evidence of true understanding.", related: ["Attention & Transformers"], whenToUse: "Any time you're evaluating what an AI-generated answer actually is (and isn't) reliable for." },

  /* ---- Ethical Hacking track references ---- */
  { id: "ref-linux-basics", category: "Linux", term: "Core Linux Commands", definition: "The small set of commands (pwd, ls, cd, cat, man) that cover most day-to-day terminal navigation.", explanation: "Nearly all security tooling assumes comfort in a Linux terminal.", syntax: "pwd\nls -l\ncd path/\ncat file\nman command", example: "$ ls -l /home/student", mistakes: "Running commands with sudo out of habit instead of checking whether elevation is actually needed.", related: ["File Permissions"], whenToUse: "Any time you're working in a Linux/Kali environment." },
  { id: "ref-osint", category: "Reconnaissance", term: "Passive vs Active Recon", definition: "Passive recon gathers public information without touching target systems; active recon interacts with them directly and needs authorization.", explanation: "DNS records, WHOIS data, and public job postings are common passive sources.", syntax: "whois domain.com\nnslookup domain.com", example: "Reviewing a company's own job postings can reveal their tech stack without ever touching their servers.", mistakes: "Treating 'passive' as a license to do anything — some data collection is still regulated.", related: ["DNS"], whenToUse: "The first phase of any authorized security assessment." },
  { id: "ref-owasp-sqli", category: "Web Security", term: "SQL Injection & Parameterized Queries", definition: "SQLi happens when untrusted input is inserted into a query as code instead of data — parameterized queries are the structural fix.", explanation: "One of the OWASP Top 10 vulnerabilities, and one of the most common causes of real data breaches.", syntax: "cursor.execute(\"SELECT * FROM t WHERE id = %s\", (id,))", example: '# Never: f"SELECT * FROM t WHERE id = {id}"', mistakes: "Trying to filter 'bad' characters manually instead of using parameterized queries.", related: ["Secure Python"], whenToUse: "Any code that builds a database query from user input." },
  { id: "ref-owasp-xss", category: "Web Security", term: "XSS & Output Encoding", definition: "Cross-Site Scripting happens when untrusted input is rendered as executable code in another user's browser.", explanation: "Reflected XSS comes from the current request; stored XSS is saved and served to other users later.", syntax: "import html\nhtml.escape(user_input)", example: 'html.escape("<script>alert(1)</script>")', mistakes: "Escaping on input but forgetting to escape again on output/render.", related: ["SQL Injection & Parameterized Queries"], whenToUse: "Any code that renders user-supplied content as HTML." },
  { id: "ref-mitm-arp", category: "Network Security", term: "MITM & ARP Poisoning", definition: "A Man-in-the-Middle attack positions an attacker between two parties; ARP poisoning is a common local-network technique to achieve that positioning.", explanation: "HTTPS certificate validation is the primary real-world defense against MITM.", syntax: "Normal: A <-> B\nMITM:   A <-> Attacker <-> B", example: "A dismissed certificate warning is a classic MITM red flag — never click through it.", mistakes: "Assuming a 'private' Wi-Fi network makes MITM impossible.", related: ["TCP vs UDP", "HTTP vs HTTPS"], whenToUse: "Evaluating network trust and certificate-related warnings." },
  { id: "ref-wireless-security", category: "Wireless Security", term: "WEP vs WPA/WPA2", definition: "WEP is an obsolete, cryptographically broken Wi-Fi encryption standard; WPA/WPA2 replaced it with much stronger protections.", explanation: "Understanding why WEP failed (weak key scheduling) is why it was deprecated industry-wide.", syntax: "Wi-Fi security generations: WEP (broken) -> WPA -> WPA2 -> WPA3", example: "Any network still using WEP today should be treated as effectively unencrypted.", mistakes: "Assuming any password-protected Wi-Fi is equally secure regardless of which protocol it uses.", related: ["Symmetric/Asymmetric encryption"], whenToUse: "Assessing or recommending Wi-Fi network security configuration." },
  { id: "ref-password-cracking", category: "Authentication", term: "Password Cracking Concepts", definition: "Brute-force tries every possible password; dictionary attacks try known common passwords/leaked lists first.", explanation: "Defenses include slow salted hashing (bcrypt/Argon2), rate limiting, account lockout, and MFA.", syntax: "attempts ≈ key_space (brute force)\nattempts ≈ wordlist_size (dictionary)", example: "A 6-character numeric PIN has only 1,000,000 possibilities — trivial to brute force without rate limiting.", mistakes: "Relying on password complexity rules alone instead of length, MFA, and proper hashing.", related: ["Secure password storage"], whenToUse: "Designing or evaluating authentication security." },
  { id: "ref-vuln-mgmt", category: "Vulnerability Management", term: "CVE & CVSS", definition: "A CVE is a unique public identifier for a known vulnerability; CVSS is a standardized score (0-10) rating its severity.", explanation: "Vulnerability scanners match discovered software versions against CVE databases to flag known issues.", syntax: "CVE-YYYY-NNNNN\nCVSS score: 0.0 (none) – 10.0 (critical)", example: "A vulnerability scan report typically lists each finding's CVE ID, CVSS score, and recommended remediation.", mistakes: "Treating every finding as equally urgent instead of prioritizing by CVSS score and actual exposure.", related: ["Vulnerability vs Risk"], whenToUse: "Reading, prioritizing, or writing a vulnerability assessment report." },
  { id: "ref-dos-ddos", category: "Network Security", term: "DoS & DDoS Concepts", definition: "A Denial-of-Service attack overwhelms a system so legitimate users can't access it; a DDoS does so from many sources at once.", explanation: "Defenses include rate limiting, load balancing, CDNs/WAFs, and traffic monitoring.", syntax: "availability = can legitimate users reach the service?", example: "A sudden, massive spike in traffic from thousands of distinct IPs is a classic DDoS signature.", mistakes: "Assuming DoS is only about traffic volume — application-layer DoS can exhaust server resources with relatively little bandwidth.", related: ["CIA Triad"], whenToUse: "Understanding availability threats and how to defend against them." },
  { id: "ref-incident-response", category: "Incident Response", term: "Incident Response Basics", definition: "A structured process for handling a security incident: identify, contain, eradicate, recover, and document lessons learned.", explanation: "Having a plan before an incident happens is what separates a contained problem from a prolonged crisis.", syntax: "Identify → Contain → Eradicate → Recover → Lessons Learned", example: "Isolating an infected machine from the network (containment) before trying to clean it (eradication).", mistakes: "Skipping documentation/lessons-learned, which means the same incident type can recur unaddressed.", related: ["Vulnerability vs Risk"], whenToUse: "Responding to any confirmed or suspected security incident." },
  { id: "ref-owasp-top10", category: "Web Security", term: "OWASP Top 10 (concept)", definition: "A regularly updated, widely referenced list of the most critical web application security risks.", explanation: "SQL Injection and XSS (both covered in this library) are longtime fixtures of the list.", syntax: "owasp.org/www-project-top-ten/", example: "Broken access control, injection, and security misconfiguration are perennial top entries.", mistakes: "Treating the Top 10 as exhaustive — it's a prioritized starting point, not a complete checklist.", related: ["SQL Injection & Parameterized Queries", "XSS & Output Encoding"], whenToUse: "As a starting checklist when reviewing a web application's security." },
  { id: "ref-phishing", category: "Social Engineering", term: "Phishing Indicators", definition: "The common warning signs of a phishing attempt: urgency, sender mismatch, generic greetings, and suspicious link destinations.", explanation: "Detection tools automate exactly these checks — domain reputation, link-text vs actual-URL mismatches, and known phishing fingerprints.", syntax: "check: sender domain, link destination vs link text, urgency language", example: 'link_text = "paypal.com/login"\nactual_link = "http://paypa1-secure-verify.net/login"  # mismatch', mistakes: "Judging legitimacy by visual polish alone — modern phishing pages can be pixel-identical to the real thing.", related: ["Social Engineering Tactics"], whenToUse: "Evaluating any unsolicited message asking for credentials or urgent action." },
  { id: "ref-social-eng", category: "Social Engineering", term: "Social Engineering Tactics", definition: "Manipulating human psychology — authority, urgency, fear, helpfulness — to bypass technical security controls.", explanation: "The safest defense is independently verifying unexpected requests using contact info you already trust, never info the request itself provides.", syntax: "red flags: unsolicited contact + urgency + request for sensitive info + pressure not to verify", example: "A fake 'IT support' call asking for your password bypasses every technical control if you simply hand it over.", mistakes: "Verifying a claim using contact details supplied by the suspicious source itself.", related: ["Phishing Indicators"], whenToUse: "Any unexpected request for sensitive information, money, or system access." },
  { id: "ref-security-headers", category: "Web Security", term: "Security Headers", definition: "HTTP response headers that instruct the browser to enforce additional protections for a page.", explanation: "Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, and X-Content-Type-Options are common, high-value examples.", syntax: "Content-Security-Policy: default-src 'self'\nStrict-Transport-Security: max-age=31536000", example: "HSTS tells the browser to never connect over plain HTTP again, closing a downgrade-attack window.", mistakes: "Assuming HTTPS alone is sufficient without these additional defense-in-depth headers.", related: ["HTTP vs HTTPS", "XSS & Output Encoding"], whenToUse: "Reviewing or hardening any web application's HTTP responses." },
  { id: "ref-mobile-security", category: "Mobile Security", term: "App Sandboxing & Permissions", definition: "Each mobile app runs isolated by default; permissions are explicit, revocable grants of access to sensitive resources.", explanation: "A malicious app typically requests permissions unrelated to its stated function — a classic detection signal.", syntax: "app runs sandboxed -> requests permission -> user grants/denies -> access scoped to that grant", example: "A flashlight app requesting SMS and contacts access is requesting permissions unrelated to its function.", mistakes: "Granting every requested permission without checking relevance to the app's purpose.", related: ["Authentication vs Authorization"], whenToUse: "Reviewing app permissions before installing, or assessing mobile app security." },
];

const BEGINNER_PROJECTS = [
  {
    id: "proj-calculator",
    title: "Calculator",
    difficulty: "Beginner",
    guidance: "Highly guided",
    minutes: 60,
    skills: ["Variables", "Operators", "Functions", "Conditionals", "Input/Output"],
    prereq: ["l-functions"],
    objective: "Build a command-line calculator that takes two numbers and an operator, then prints the result.",
    requirements: [
      "Ask the user for two numbers and an operator (+, -, *, /)",
      "Support at least the four basic operators",
      "Handle division by zero without crashing",
      "Print the result clearly"
    ],
    structure: "calculator.py\n  main()\n  calculate(a, b, operator)",
    milestones: [
      "Get two numbers and an operator from the user",
      "Write a calculate() function that returns the right result for each operator",
      "Handle invalid operators and division by zero gracefully",
      "Loop so the user can perform multiple calculations, with an option to quit"
    ],
    hints: [
      "Structure your logic as if/elif on the operator string.",
      "Wrap the division case in a check for zero before dividing.",
      "A while True loop with a 'quit' input works well for repeated use."
    ],
    starter: 'def calculate(a, b, operator):\n    if operator == "+":\n        return a + b\n    elif operator == "-":\n        return a - b\n    elif operator == "*":\n        return a * b\n    elif operator == "/":\n        if b == 0:\n            return "Error: division by zero"\n        return a / b\n    else:\n        return "Unknown operator"\n\ndef main():\n    # your loop goes here\n    pass\n\nif __name__ == "__main__":\n    main()',
    checklist: ["Runs without crashing on bad input", "Supports + - * /", "Handles divide-by-zero", "Lets the user repeat or quit"],
    extensions: ["Add support for exponents (**) and modulo (%)", "Add a running history of calculations", "Round results to 2 decimal places"],
    xpReward: 75
  },
  {
    id: "proj-guessing",
    title: "Number Guessing Game",
    difficulty: "Beginner",
    guidance: "Highly guided",
    minutes: 45,
    skills: ["Loops", "Conditionals", "random module"],
    prereq: ["l-loops"],
    objective: "The computer picks a random number; the player guesses until they get it right, with higher/lower hints.",
    requirements: [
      "Pick a random number in a fixed range (e.g. 1–100)",
      "Loop until the player guesses correctly",
      "Tell the player 'higher' or 'lower' after each wrong guess",
      "Count and display the number of attempts at the end"
    ],
    structure: "guessing_game.py\n  play_game(lower, upper)",
    milestones: [
      "Generate a random target number with random.randint()",
      "Build a while loop that keeps asking for guesses",
      "Compare the guess and print a hint",
      "Track attempts and congratulate the player on a win"
    ],
    hints: [
      "import random, then random.randint(1, 100).",
      "A while True loop with a break on the correct guess is a clean pattern.",
      "Remember to convert input() to int() before comparing."
    ],
    starter: 'import random\n\ndef play_game(lower=1, upper=100):\n    target = random.randint(lower, upper)\n    attempts = 0\n    # your loop goes here\n\nif __name__ == "__main__":\n    play_game()',
    checklist: ["Random target generated each run", "Gives higher/lower feedback", "Counts attempts", "Ends cleanly on a correct guess"],
    extensions: ["Add a maximum number of attempts", "Add difficulty levels that change the range", "Track the player's best score across rounds"],
    xpReward: 60
  },
  {
    id: "proj-todo",
    title: "To-Do List CLI",
    difficulty: "Beginner",
    guidance: "Highly guided",
    minutes: 90,
    skills: ["Lists", "Dictionaries", "Functions", "Files"],
    prereq: ["l-dicts", "l-functions"],
    objective: "A command-line to-do list that lets the user add, view, complete, and remove tasks, saved between runs.",
    requirements: [
      "Support add, view, complete, and remove actions from a menu",
      "Store each task as a dictionary with a description and a completed flag",
      "Persist tasks to a JSON file between runs",
      "Show a clear menu each time the program starts"
    ],
    structure: "todo.py\n  load_tasks()\n  save_tasks(tasks)\n  add_task(tasks, description)\n  main()",
    milestones: [
      "Build the in-memory task list as a list of dictionaries",
      "Implement add, view, and complete actions",
      "Add saving/loading with the json module",
      "Wrap everything in a menu loop"
    ],
    hints: [
      "Each task can look like {'text': '...', 'done': False}.",
      "Use json.dump()/json.load() with an open('tasks.json') file.",
      "Wrap file reads in a try/except in case the file doesn't exist yet."
    ],
    starter: 'import json\n\nTASKS_FILE = "tasks.json"\n\ndef load_tasks():\n    try:\n        with open(TASKS_FILE) as f:\n            return json.load(f)\n    except FileNotFoundError:\n        return []\n\ndef save_tasks(tasks):\n    with open(TASKS_FILE, "w") as f:\n        json.dump(tasks, f)\n\ndef main():\n    tasks = load_tasks()\n    # your menu loop goes here\n\nif __name__ == "__main__":\n    main()',
    checklist: ["Add/view/complete/remove all work", "Tasks persist between runs", "No crash on missing file", "Menu is easy to follow"],
    extensions: ["Add due dates and sort by them", "Add priority levels", "Add a search/filter option"],
    xpReward: 90
  },
  {
    id: "proj-unitconverter",
    title: "Unit Converter",
    difficulty: "Beginner",
    guidance: "Highly guided",
    minutes: 50,
    skills: ["Functions", "Conditionals", "Input/Output"],
    prereq: ["l-functions"],
    objective: "A CLI tool that converts between common units — length, weight, and temperature — based on user choice.",
    requirements: [
      "Show a menu of conversion categories (length, weight, temperature)",
      "Support at least 2 conversions per category",
      "Validate numeric input",
      "Let the user perform multiple conversions before quitting"
    ],
    structure: "unit_converter.py\n  convert_length(value, from_unit, to_unit)\n  convert_temperature(value, from_unit, to_unit)\n  main()",
    milestones: [
      "Build one working conversion function (e.g. km to miles)",
      "Add a menu that lets the user pick a category",
      "Add the remaining conversions",
      "Wrap it all in a loop with input validation"
    ],
    hints: [
      "Keep each conversion as its own small function — easy to test individually.",
      "For temperature, remember Celsius/Fahrenheit use a formula, not a simple multiplier.",
      "Wrap float(input(...)) in try/except to handle bad input gracefully."
    ],
    starter: 'def celsius_to_fahrenheit(c):\n    return c * 9/5 + 32\n\ndef km_to_miles(km):\n    return km * 0.621371\n\ndef main():\n    # your menu loop goes here\n    pass\n\nif __name__ == "__main__":\n    main()',
    checklist: ["At least 2 categories supported", "Handles bad input without crashing", "Menu is clear", "Loops until user quits"],
    extensions: ["Add weight and volume categories", "Round output to 2 decimal places", "Let the user reverse a conversion instantly"],
    xpReward: 65
  },
  {
    id: "proj-quizgame",
    title: "Quiz Game",
    difficulty: "Beginner",
    guidance: "Highly guided",
    minutes: 70,
    skills: ["Lists", "Dictionaries", "Loops", "Functions"],
    prereq: ["l-dicts", "l-functions"],
    objective: "A multiple-choice quiz that asks a series of questions, tracks the score, and shows a summary at the end.",
    requirements: [
      "Store questions as a list of dictionaries (question, options, answer)",
      "Loop through every question, showing options and reading an answer",
      "Track and display the final score",
      "Handle invalid option choices without crashing"
    ],
    structure: "quiz_game.py\n  QUESTIONS = [...]\n  ask_question(question)\n  run_quiz(questions)",
    milestones: [
      "Define at least 5 questions as a list of dictionaries",
      "Write ask_question() to show one question and return whether it was answered correctly",
      "Loop over all questions, accumulating a score",
      "Print a final summary with score out of total"
    ],
    hints: [
      "Each question dict can look like {'q': '...', 'options': [...], 'answer': 'B'}.",
      "Compare the user's input case-insensitively (e.g. .upper()).",
      "Keep ask_question() focused on just one question — the loop handles the rest."
    ],
    starter: 'QUESTIONS = [\n    {"q": "What data type does input() return?", "options": ["int", "str", "bool"], "answer": "str"},\n]\n\ndef ask_question(question):\n    # show the question and options, return True/False\n    pass\n\ndef run_quiz(questions):\n    score = 0\n    # your loop goes here\n    return score\n\nif __name__ == "__main__":\n    run_quiz(QUESTIONS)',
    checklist: ["At least 5 questions", "Score tracked accurately", "Invalid input handled", "Clear final summary"],
    extensions: ["Add a timer per question", "Shuffle question order each run", "Save high scores to a file"],
    xpReward: 70
  },
  {
    id: "proj-expensetracker",
    title: "Expense Tracker",
    difficulty: "Beginner",
    guidance: "Partially guided",
    minutes: 90,
    skills: ["Lists", "Dictionaries", "Files", "Functions"],
    prereq: ["l-files"],
    objective: "A CLI tool for logging expenses, viewing totals by category, and saving records between runs.",
    requirements: [
      "Add an expense with an amount, category, and description",
      "View all expenses and a running total",
      "View totals grouped by category",
      "Persist expenses to a JSON file between runs"
    ],
    structure: "expense_tracker.py\n  load_expenses() / save_expenses(expenses)\n  add_expense(expenses, amount, category, description)\n  totals_by_category(expenses)",
    milestones: [
      "Model an expense as a dictionary and store a list of them",
      "Implement add and view actions",
      "Implement category totals using a dictionary accumulator",
      "Add JSON persistence and a menu loop"
    ],
    hints: [
      "A dictionary like totals.get(category, 0) + amount builds category sums cleanly.",
      "Validate that amount can be converted to a float before accepting it.",
      "Reuse the same JSON load/save pattern as the To-Do project."
    ],
    starter: 'import json\n\nFILE = "expenses.json"\n\ndef load_expenses():\n    try:\n        with open(FILE) as f:\n            return json.load(f)\n    except FileNotFoundError:\n        return []\n\ndef totals_by_category(expenses):\n    totals = {}\n    for e in expenses:\n        totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]\n    return totals\n\ndef main():\n    expenses = load_expenses()\n    # your menu loop goes here\n\nif __name__ == "__main__":\n    main()',
    checklist: ["Add/view expenses works", "Category totals are correct", "Data persists between runs", "Handles invalid amounts gracefully"],
    extensions: ["Add monthly filtering", "Export a summary to CSV", "Add a spending limit warning"],
    xpReward: 85
  },
  {
    id: "proj-contactmanager",
    title: "Contact Manager",
    difficulty: "Beginner",
    guidance: "Partially guided",
    minutes: 85,
    skills: ["Dictionaries", "Lists", "Files", "Functions"],
    prereq: ["l-files"],
    objective: "A CLI address book supporting add, search, update, and delete of contacts, saved between runs.",
    requirements: [
      "Store contacts as dictionaries with at least name, phone, and email",
      "Support add, search by name, update, and delete",
      "Persist contacts to a JSON file",
      "Handle searching for a contact that doesn't exist gracefully"
    ],
    structure: "contact_manager.py\n  load_contacts() / save_contacts(contacts)\n  find_contact(contacts, name)\n  main()",
    milestones: [
      "Build the contact data model and in-memory list",
      "Implement add and search",
      "Implement update and delete",
      "Add JSON persistence and a menu"
    ],
    hints: [
      "A simple linear search with a loop is fine at this scale — no need for anything fancier.",
      "Match names case-insensitively so 'ada' finds 'Ada'.",
      "Confirm before deleting, so a typo doesn't wipe a contact by accident."
    ],
    starter: 'import json\n\nFILE = "contacts.json"\n\ndef load_contacts():\n    try:\n        with open(FILE) as f:\n            return json.load(f)\n    except FileNotFoundError:\n        return []\n\ndef find_contact(contacts, name):\n    for c in contacts:\n        if c["name"].lower() == name.lower():\n            return c\n    return None\n\ndef main():\n    contacts = load_contacts()\n    # your menu loop goes here\n\nif __name__ == "__main__":\n    main()',
    checklist: ["Add/search/update/delete all work", "Search is case-insensitive", "Data persists between runs", "Missing contact handled gracefully"],
    extensions: ["Add duplicate-detection on add", "Support multiple phone numbers per contact", "Add alphabetical sorting on view"],
    xpReward: 85
  },
  {
    id: "proj-passwordchecker",
    title: "Password-Strength Checker",
    difficulty: "Beginner",
    guidance: "Partially guided",
    minutes: 55,
    skills: ["Strings", "Conditionals", "Functions"],
    prereq: ["l-conditionals"],
    objective: "A tool that scores a password's strength based on length and character variety, with feedback on how to improve it.",
    requirements: [
      "Check for minimum length (e.g. 8+ characters)",
      "Check for at least one uppercase letter, one lowercase letter, one digit, and one symbol",
      "Return a strength rating (Weak / Medium / Strong)",
      "Give specific feedback on what's missing"
    ],
    structure: "password_checker.py\n  check_strength(password)\n  main()",
    milestones: [
      "Write the length check",
      "Add checks for uppercase, lowercase, digits, and symbols",
      "Combine checks into an overall rating",
      "Print specific, actionable feedback for anything missing"
    ],
    hints: [
      "Python strings have .isupper(), .islower(), .isdigit() you can use per-character.",
      "You can also use the string module's string.punctuation to check for symbols.",
      "Base the rating on how many of the 4 criteria are met, plus the length check."
    ],
    starter: 'import string\n\ndef check_strength(password):\n    has_upper = any(c.isupper() for c in password)\n    has_lower = any(c.islower() for c in password)\n    has_digit = any(c.isdigit() for c in password)\n    has_symbol = any(c in string.punctuation for c in password)\n    # combine these into a rating and feedback\n\nif __name__ == "__main__":\n    pw = input("Enter a password to check: ")\n    print(check_strength(pw))',
    checklist: ["Checks length and all 4 character types", "Returns a clear rating", "Gives specific feedback", "Doesn't crash on empty input"],
    extensions: ["Check against a small list of common passwords", "Estimate crack time (educational, not exact)", "Add a CLI loop to check multiple passwords"],
    xpReward: 70
  },
  {
    id: "proj-textanalyzer",
    title: "Text Analyzer",
    difficulty: "Beginner",
    guidance: "Partially guided",
    minutes: 65,
    skills: ["Strings", "Dictionaries", "Files"],
    prereq: ["l-dicts"],
    objective: "A tool that reads a block of text and reports word count, character count, and the most frequent words.",
    requirements: [
      "Count total words and characters",
      "Count frequency of each word, ignoring case and punctuation",
      "Report the top 5 most frequent words",
      "Work on text typed in or loaded from a .txt file"
    ],
    structure: "text_analyzer.py\n  clean_word(word)\n  analyze(text)",
    milestones: [
      "Split text into words and count them",
      "Normalize words (lowercase, strip punctuation) before counting frequency",
      "Build a frequency dictionary",
      "Sort and print the top 5 words"
    ],
    hints: [
      "text.split() is a simple starting point for word counting.",
      "str.strip(string.punctuation) removes leading/trailing punctuation from a word.",
      "sorted(dict.items(), key=lambda x: x[1], reverse=True) sorts by frequency."
    ],
    starter: 'import string\n\ndef clean_word(word):\n    return word.strip(string.punctuation).lower()\n\ndef analyze(text):\n    words = [clean_word(w) for w in text.split()]\n    # build a frequency dictionary and return the summary\n\nif __name__ == "__main__":\n    sample = "The quick brown fox jumps over the lazy dog. The dog barks."\n    print(analyze(sample))',
    checklist: ["Word and character counts correct", "Punctuation ignored in frequency count", "Top 5 words reported", "Works on typed or file input"],
    extensions: ["Ignore common stop words (the, a, is...)", "Report average word length", "Support reading from an uploaded .txt file"],
    xpReward: 70
  },
  {
    id: "proj-loganalyzer",
    title: "Log Analyzer",
    difficulty: "Beginner",
    guidance: "Mostly independent",
    minutes: 80,
    skills: ["Strings", "Regex", "Dictionaries", "Files"],
    prereq: ["l-regex"],
    objective: "Parse a plain-text server log and report failed login attempts, grouped by IP address.",
    requirements: [
      "Read a log file line by line",
      "Use regex to extract the IP address and status from each relevant line",
      "Count failed attempts per IP address",
      "Report the IPs with the most failed attempts, most first"
    ],
    structure: "log_analyzer.py\n  parse_line(line)\n  analyze_log(lines)",
    milestones: [
      "Write a regex pattern that extracts the IP and status from one sample line",
      "Loop through every line, applying the pattern",
      "Accumulate failed-attempt counts per IP in a dictionary",
      "Sort and print the IPs with the most failures first"
    ],
    hints: [
      "Start by writing one regex pattern that reliably extracts an IP address from a sample line.",
      "A dictionary keyed by IP, accumulating a failure count, is enough — no need for anything more complex.",
      "Sort your final results by count, descending, before printing."
    ],
    starter: 'import re\n\nSAMPLE_LOG = """\n2026-01-01 10:02:03 FAILED login from 192.168.1.14\n2026-01-01 10:02:05 SUCCESS login from 192.168.1.9\n2026-01-01 10:02:09 FAILED login from 192.168.1.14\n""".strip().splitlines()\n\ndef parse_line(line):\n    # extract (status, ip) from a log line, or return None if it doesn\'t match\n    pass\n\ndef analyze_log(lines):\n    # count FAILED attempts per ip and return sorted results\n    pass\n\nif __name__ == "__main__":\n    print(analyze_log(SAMPLE_LOG))',
    checklist: ["Regex reliably extracts IP + status", "Failed attempts counted per IP", "Results sorted by count", "Handles lines that don't match the pattern"],
    extensions: ["Flag any IP with 3+ failures as suspicious", "Support multiple log formats", "Write the report to a summary file"],
    xpReward: 95
  }
];

/* =========================================================================
   CYBERSECURITY PROJECTS
   ========================================================================= */

const CYBER_PROJECTS = [
  {
    id: "proj-cy-fim",
    title: "File Integrity Monitor",
    curriculum: "cyber",
    difficulty: "Intermediate",
    guidance: "Highly guided",
    minutes: 70,
    skills: ["Hashing", "File Handling", "OS module", "Functions"],
    prereq: ["cy-crypto"],
    objective: "A tool that hashes a set of files, saves a baseline, and later detects if any of them have changed — a simplified, defensive security monitoring concept.",
    requirements: [
      "Compute a SHA-256 hash for each file in a chosen folder (your own test folder only)",
      "Save the baseline of filename → hash to a JSON file",
      "On a later run, recompute hashes and compare against the saved baseline",
      "Report which files are unchanged, modified, or newly added"
    ],
    structure: "file_integrity_monitor.py\n  hash_file(path)\n  build_baseline(folder)\n  check_against_baseline(folder, baseline)",
    milestones: [
      "Write hash_file() to return a SHA-256 hex digest for one file",
      "Write build_baseline() to hash every file in a folder and save to JSON",
      "Write check_against_baseline() to recompute and compare hashes",
      "Report modified, unchanged, and newly-added files clearly"
    ],
    hints: [
      "Read files in binary mode ('rb') when hashing, not text mode.",
      "For large files, hash in chunks rather than loading the whole file into memory at once.",
      "Only ever monitor folders you own or have explicit authorization to test — this is a defensive tool, not a scanning tool for other systems."
    ],
    starter: 'import hashlib\nimport json\nfrom pathlib import Path\n\nBASELINE_FILE = "baseline.json"\n\ndef hash_file(path):\n    h = hashlib.sha256()\n    with open(path, "rb") as f:\n        h.update(f.read())\n    return h.hexdigest()\n\ndef build_baseline(folder):\n    # your code here\n    pass\n\ndef check_against_baseline(folder, baseline):\n    # your code here\n    pass\n\nif __name__ == "__main__":\n    print("Set up a test folder of your own before running this.")',
    checklist: ["Hashes computed correctly for each file", "Baseline saved as JSON", "Later run detects modified/new/unchanged files correctly", "Only ever run against your own authorized test folder"],
    extensions: ["Detect deleted files too, not just modified/added", "Add a timestamp to each baseline entry", "Generate a simple text report summarizing changes"],
    xpReward: 90
  },
  {
    id: "proj-cy-netinfo",
    title: "Network Information Tool",
    curriculum: "cyber",
    difficulty: "Intermediate",
    guidance: "Semi-guided",
    minutes: 55,
    skills: ["socket", "Functions", "Error handling"],
    prereq: ["cy-sockets"],
    objective: "A CLI tool that reports basic network information about your own machine and checks whether specific local ports are open — for learning, on systems you own only.",
    requirements: [
      "Report the local machine's hostname and local IP address",
      "Accept a list of ports and report which are open on localhost",
      "Handle unreachable/closed ports without crashing",
      "Never target hosts other than localhost/127.0.0.1 or systems you explicitly own"
    ],
    structure: "network_info.py\n  get_local_info()\n  scan_local_ports(ports)",
    milestones: [
      "Use socket.gethostname() and socket.gethostbyname() to report basic local info",
      "Write scan_local_ports() using the check_port() pattern from the sockets lesson",
      "Handle timeouts and connection errors gracefully",
      "Present results in a clear, readable summary"
    ],
    hints: [
      "socket.gethostname() and socket.gethostbyname(socket.gethostname()) give you basic local info.",
      "Reuse the settimeout()/connect()/except pattern from the Python Networking lesson.",
      "Keep the scope strictly to localhost — this is an educational tool, not a network scanner for other systems."
    ],
    starter: 'import socket\n\ndef get_local_info():\n    hostname = socket.gethostname()\n    # your code here\n\ndef scan_local_ports(ports):\n    # your code here\n    pass\n\nif __name__ == "__main__":\n    get_local_info()\n    scan_local_ports([80, 443, 22, 8080])',
    checklist: ["Reports hostname and local IP", "Correctly identifies open vs closed local ports", "No crashes on closed/unreachable ports", "Scope limited to localhost"],
    extensions: ["Add a timeout as a configurable parameter", "Report which common service each open port likely belongs to", "Export results as JSON"],
    xpReward: 70
  },
  {
    id: "proj-cy-authlog",
    title: "Authentication Log Analyzer",
    curriculum: "cyber",
    difficulty: "Intermediate",
    guidance: "Semi-guided",
    minutes: 75,
    skills: ["Regex", "Dictionaries", "File Handling"],
    prereq: ["cy-logs"],
    objective: "Parse a sample authentication log and flag IP addresses with repeated failed login attempts — a simplified version of real security monitoring.",
    requirements: [
      "Parse each log line to extract timestamp, status (SUCCESS/FAILED), and IP address",
      "Count failed attempts per IP address",
      "Flag any IP with 3 or more failed attempts as suspicious",
      "Print a clear summary report, most-failed IP first"
    ],
    structure: "auth_log_analyzer.py\n  parse_line(line)\n  analyze(lines, threshold=3)",
    milestones: [
      "Write parse_line() to extract status and IP with regex",
      "Build a per-IP failure counter across all lines",
      "Flag IPs at or above the suspicious threshold",
      "Print a sorted, readable report"
    ],
    hints: [
      "Reuse and extend the regex pattern from the Logs & Security Analytics lesson.",
      "A dictionary of ip -> failure_count is all the state you need.",
      "Keep the suspicious threshold as a parameter, not a hardcoded magic number."
    ],
    starter: 'import re\n\nSAMPLE_LOG = """\n2026-02-01 09:00:01 SUCCESS login user=ada ip=192.168.1.5\n2026-02-01 09:00:05 FAILED login user=admin ip=203.0.113.9\n2026-02-01 09:00:07 FAILED login user=admin ip=203.0.113.9\n2026-02-01 09:00:09 FAILED login user=admin ip=203.0.113.9\n""".strip().splitlines()\n\ndef parse_line(line):\n    # return (status, ip) or None\n    pass\n\ndef analyze(lines, threshold=3):\n    # your code here\n    pass\n\nif __name__ == "__main__":\n    print(analyze(SAMPLE_LOG))',
    checklist: ["Parses status and IP correctly", "Failure counts per IP are accurate", "Suspicious IPs flagged at the right threshold", "Report is sorted and readable"],
    extensions: ["Also track successful logins per IP for context", "Add a time-window requirement (e.g. 3 failures within 5 minutes)", "Write the report to a text file"],
    xpReward: 95
  },
  {
    id: "proj-cy-report",
    title: "Basic Security Report Generator",
    curriculum: "cyber",
    difficulty: "Advanced",
    guidance: "Mostly independent",
    minutes: 80,
    skills: ["File Handling", "Dictionaries", "Functions", "OS module"],
    prereq: ["cy-secure-python"],
    objective: "Combine system information and a basic security checklist into a single readable report about your own machine.",
    requirements: [
      "Report basic system info (OS, Python version) using the platform/os modules",
      "Check a small set of basic security hygiene items you define yourself (e.g. is a specific config file world-readable)",
      "Summarize findings into one clear, readable report",
      "Save the report to a text file"
    ],
    structure: "security_report.py\n  gather_system_info()\n  run_checks()\n  generate_report(info, checks)",
    milestones: [
      "Write gather_system_info() using the platform module",
      "Define at least 3 simple security checks as small functions",
      "Combine everything into a readable formatted report string",
      "Save the report to a text file"
    ],
    hints: [
      "The platform module (platform.system(), platform.python_version()) is a quick source of system info.",
      "Keep each 'check' as a small function returning a pass/fail plus a short explanation.",
      "A report is just formatted text — build it up as a list of lines, then join and write it."
    ],
    starter: 'import platform\n\ndef gather_system_info():\n    return {\n        "os": platform.system(),\n        "python_version": platform.python_version(),\n    }\n\ndef run_checks():\n    # return a list of {"name":..., "passed": bool, "note": ...}\n    pass\n\ndef generate_report(info, checks):\n    # build and return a formatted report string\n    pass\n\nif __name__ == "__main__":\n    info = gather_system_info()\n    checks = run_checks()\n    report = generate_report(info, checks)\n    print(report)',
    checklist: ["System info gathered correctly", "At least 3 real checks implemented", "Report is clearly formatted", "Report saved to a file"],
    extensions: ["Add a pass/fail summary count at the top of the report", "Color-code or clearly flag failed checks", "Support running the same checks on a schedule"],
    xpReward: 100
  }
];

/* =========================================================================
   ETHICAL HACKING PROJECTS
   The track intentionally reuses existing Cybersecurity/Python Core
   projects where they already cover the same ground (Security Log
   Analyzer -> Authentication Log Analyzer, Password Strength Analyzer,
   File Integrity Monitor, Security Report Generator) rather than
   duplicating them — see TRACKS_META below. Only the one genuinely new
   project lives here.
   ========================================================================= */

const HACKING_PROJECTS = [
  {
    id: "proj-hk-http-headers",
    title: "HTTP Header Analyzer",
    curriculum: "hacking",
    difficulty: "Beginner",
    guidance: "Highly guided",
    minutes: 50,
    skills: ["HTTP", "Dictionaries", "Functions", "Secure Web Development"],
    prereq: ["hk-xss"],
    objective: "A tool that inspects a set of HTTP response headers and reports which important security headers are present or missing — the same kind of check real security scanners perform.",
    requirements: [
      "Check for the presence of at least 4 security-relevant headers (e.g. Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, X-Content-Type-Options)",
      "Report each header as present or missing, with a one-line explanation of what it protects against",
      "Work on a headers dictionary — either sample data or headers fetched from a local server you control (e.g. via the requests library against localhost)",
      "Summarize overall risk (e.g. how many important headers are missing)"
    ],
    structure: "http_header_analyzer.py\n  SECURITY_HEADERS = {...}\n  analyze_headers(headers)\n  print_report(results)",
    milestones: [
      "Define a dictionary of important security headers and what each protects against",
      "Write analyze_headers() to check a headers dict against that reference list",
      "Print a clear present/missing report with explanations",
      "Add a summary line (e.g. '3 of 5 important headers missing')"
    ],
    hints: [
      "A sample headers dict (not a live request) is a perfectly good starting point — this is about the analysis logic, not the fetching.",
      "If you do fetch real headers, only ever point requests.get() at localhost or a server you control.",
      "Keep the reference list of headers and their purpose as a simple dictionary — easy to extend later."
    ],
    starter: 'SECURITY_HEADERS = {\n    "Content-Security-Policy": "Restricts which scripts/resources a page can load, mitigating XSS impact.",\n    "X-Frame-Options": "Prevents the page from being embedded in a hidden iframe (clickjacking protection).",\n    "Strict-Transport-Security": "Forces browsers to only use HTTPS for this site going forward.",\n    "X-Content-Type-Options": "Stops browsers from guessing content types in ways that can enable attacks.",\n}\n\nSAMPLE_HEADERS = {\n    "Content-Type": "text/html",\n    "X-Frame-Options": "DENY",\n}\n\ndef analyze_headers(headers):\n    # your code here — check SAMPLE_HEADERS/headers against SECURITY_HEADERS\n    pass\n\nif __name__ == "__main__":\n    analyze_headers(SAMPLE_HEADERS)',
    checklist: ["Checks at least 4 security headers", "Reports present/missing clearly with explanations", "Includes a summary line", "Works on sample data or your own localhost server only"],
    extensions: ["Add a numeric risk score based on how many headers are missing", "Support checking multiple header sets and comparing them", "Write the report to a file"],
    xpReward: 65
  }
];

/* =========================================================================
   CROSS-TRACK PROJECTS — explicitly combine skills from multiple tracks
   ========================================================================= */

const CROSS_TRACK_PROJECTS = [
  {
    id: "proj-cross-seclog",
    title: "Security Log Analytics",
    curriculum: "cross",
    difficulty: "Advanced",
    guidance: "Semi-guided",
    minutes: 110,
    skills: ["Regex", "Dictionaries", "pandas", "Matplotlib", "Classification concepts"],
    skillsByDomain: {
      python: ["File handling", "Regex", "Data structures"],
      cyber: ["Authentication events", "Security indicators"],
      data: ["pandas", "Cleaning", "Aggregation", "Matplotlib"],
      ml: ["Classification / anomaly detection concepts"],
    },
    prereq: ["cy-logs", "da-pandas"],
    objective: "Turn a raw authentication log into a small analytics pipeline: parse it, load it into pandas, summarize it, visualize it, and flag likely-suspicious activity.",
    requirements: [
      "Parse raw log lines into structured records (timestamp, status, ip, user)",
      "Load the records into a pandas DataFrame",
      "Use pandas to compute failed-login counts per IP",
      "Visualize the top offending IPs with a bar chart",
      "Apply a simple rule-based classification (e.g. failures >= threshold => 'suspicious') as a stand-in for a real ML classifier"
    ],
    structure: "security_log_analytics.py\n  parse_logs(lines) -> list[dict]\n  to_dataframe(records)\n  summarize(df)\n  classify_suspicious(df, threshold)\n  plot_top_ips(df)",
    milestones: [
      "Parse raw log lines into a list of dictionaries using regex",
      "Convert that list into a pandas DataFrame",
      "Group by IP and count failures with .groupby()",
      "Plot the top 5 IPs by failure count with Matplotlib",
      "Add a 'suspicious' column using a simple threshold rule"
    ],
    hints: [
      "This project deliberately reuses your regex skills from Cybersecurity and your pandas skills from Data Science — that combination is the point.",
      "pd.DataFrame(list_of_dicts) is the fastest way to get parsed records into a DataFrame.",
      "A real anomaly-detection model would replace the threshold rule eventually — for now, the rule-based version teaches the same shape of problem."
    ],
    starter: 'import re\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\nSAMPLE_LOG = """\n2026-02-01 09:00:05 FAILED login user=admin ip=203.0.113.9\n2026-02-01 09:00:07 FAILED login user=admin ip=203.0.113.9\n2026-02-01 09:00:09 FAILED login user=admin ip=203.0.113.9\n2026-02-01 09:01:00 SUCCESS login user=ada ip=192.168.1.5\n""".strip().splitlines()\n\ndef parse_logs(lines):\n    # return a list of dicts: {"status":..., "ip":..., "user":...}\n    pass\n\ndef summarize(df):\n    # return failed-login counts per ip\n    pass\n\ndef classify_suspicious(df, threshold=3):\n    # add a boolean "suspicious" column\n    pass\n\nif __name__ == "__main__":\n    records = parse_logs(SAMPLE_LOG)\n    df = pd.DataFrame(records)\n    print(df)',
    checklist: ["Logs parsed into structured records", "DataFrame built correctly", "Failure counts per IP computed with pandas", "Bar chart of top offending IPs produced", "Suspicious classification column added"],
    extensions: ["Replace the threshold rule with a scikit-learn Isolation Forest for real anomaly detection", "Add a time-series chart of failures over time", "Export the final summary as a CSV report"],
    xpReward: 130
  }
];

/* =========================================================================
   DATASETS — bundled sample data for Data/AI/ML projects & exercises.
   These are small, fabricated sample datasets for learning purposes only —
   not claims about any real-world dataset or its provenance.
   ========================================================================= */

const DATASETS = [
  {
    id: "ds-student-scores",
    name: "Student Scores (sample)",
    description: "A small bundled sample of student names and test scores, used to practice filtering, sorting, and averaging.",
    source: "Synthetic sample data generated for this platform — not real student records.",
    features: ["name", "score", "hours_studied"],
    target: "score",
    size: "12 rows",
    difficulty: "Beginner",
    objective: "Practice pandas filtering, sorting, and basic descriptive statistics."
  },
  {
    id: "ds-auth-log",
    name: "Sample Authentication Log",
    description: "A short synthetic authentication log with SUCCESS/FAILED login lines, timestamps, users, and IPs.",
    source: "Synthetic sample data generated for this platform, in a realistic but simplified format.",
    features: ["timestamp", "status", "user", "ip"],
    target: "status (for classification practice)",
    size: "~20 lines",
    difficulty: "Intermediate",
    objective: "Practice regex parsing, pandas aggregation, and rule-based/ML classification of security events."
  },
  {
    id: "ds-house-prices",
    name: "Simplified House Prices (sample)",
    description: "A tiny synthetic dataset relating square footage to price, used to introduce linear regression concepts.",
    source: "Fabricated illustrative numbers for teaching regression — not real market data.",
    features: ["square_feet", "bedrooms"],
    target: "price",
    size: "10 rows",
    difficulty: "Beginner",
    objective: "Practice fitting and interpreting a simple linear regression model."
  },
  {
    id: "ds-emails",
    name: "Toy Spam/Not-Spam Examples",
    description: "A handful of short, obviously-labeled example messages used only to illustrate the shape of a text classification problem.",
    source: "Hand-written illustrative examples — far too small and simplistic for a real spam filter.",
    features: ["message_text"],
    target: "is_spam",
    size: "10 examples",
    difficulty: "Intermediate",
    objective: "Understand the shape of a text classification problem before using real datasets and libraries."
  }
];

const AI_CYBER_PROJECT_ROADMAP = [
  "Security Log Classification", "Suspicious Event Detection", "Anomaly Detection",
  "Network Behavior Analysis", "Security Alert Prioritization", "Phishing Detection Concepts",
  "Security Data Visualization", "AI-Assisted Defensive Analysis"
];

const ACHIEVEMENTS_CATALOG = [
  { id: "ach-first-lesson", title: "First Lesson", desc: "Complete your first lesson", icon: "sparkles" },
  { id: "ach-first-exercise", title: "First Exercise", desc: "Solve your first exercise", icon: "code" },
  { id: "ach-first-perfect", title: "First Perfect Exercise", desc: "Solve an exercise correctly on the first try with no hints", icon: "star" },
  { id: "ach-10-exercises", title: "10 Exercises", desc: "Solve 10 exercises", icon: "code" },
  { id: "ach-50-exercises", title: "50 Exercises", desc: "Solve 50 exercises", icon: "code" },
  { id: "ach-100-exercises", title: "100 Exercises", desc: "Solve 100 exercises", icon: "code" },
  { id: "ach-streak-3", title: "3-Day Streak", desc: "Study 3 days in a row", icon: "flame" },
  { id: "ach-streak-7", title: "7-Day Streak", desc: "Study 7 days in a row", icon: "flame" },
  { id: "ach-first-project", title: "First Project", desc: "Complete your first project", icon: "trophy" },
  { id: "ach-revision-master", title: "Revision Master", desc: "Clear 5 topics from your revision queue", icon: "badge" },
  { id: "ach-core-complete", title: "Python Fundamentals Complete", desc: "Complete every Python Core lesson", icon: "zap" },
  { id: "ach-cyber-unlocked", title: "Into the Cyber Range", desc: "Unlock the Cybersecurity track", icon: "shield" },
  { id: "ach-data-unlocked", title: "Into the Data Lab", desc: "Unlock the Data / AI / ML track", icon: "brain" },
  { id: "ach-cross-track", title: "Skills Combined", desc: "Complete a cross-track project", icon: "sparkles" },
  { id: "ach-ai-cyber-unlocked", title: "Advanced Specialist", desc: "Unlock the AI + Cybersecurity advanced track", icon: "flask" },
  { id: "ach-hacking-unlocked", title: "Into the Range", desc: "Unlock the Ethical Hacking track", icon: "key" },
  { id: "ach-first-security-lab", title: "First Security Lab", desc: "Complete your first Ethical Hacking project", icon: "trophy" },
  { id: "ach-recon-ready", title: "Recon Ready", desc: "Complete the reconnaissance lesson", icon: "key" },
  { id: "ach-network-defender", title: "Network Defender", desc: "Complete the MITM/network security lesson", icon: "shield" },
  { id: "ach-web-security-explorer", title: "Web Security Explorer", desc: "Complete both the SQL Injection and XSS lessons", icon: "code" },
  { id: "ach-crypto-foundations", title: "Cryptography Foundations", desc: "Complete the Caesar Cipher lesson", icon: "key" },
  { id: "ach-vulnerability-analyst", title: "Vulnerability Analyst", desc: "Complete a security reporting project", icon: "badge" },
  { id: "ach-security-automation", title: "Security Automation", desc: "Complete the HTTP Header Analyzer project", icon: "zap" },
  { id: "ach-ethical-hacker", title: "Ethical Hacker", desc: "Complete every available Ethical Hacking lesson", icon: "key" },
];

/* =========================================================================
   CROSS-CURRICULUM HELPERS — let lessons/projects/exercises from any track
   be looked up and reasoned about uniformly (state.lessonStatus etc. are
   already flat dictionaries keyed by id, so this needs no state changes).
   ========================================================================= */

const ALL_LESSONS = [...LESSONS, ...CYBER_LESSONS, ...DATA_LESSONS, ...HACKING_LESSONS];
const ALL_LEVELS = [...LEVELS, ...CYBER_LEVELS, ...DATA_LEVELS, ...HACKING_LEVELS];
const ALL_PROJECTS = [...BEGINNER_PROJECTS, ...CYBER_PROJECTS, ...CROSS_TRACK_PROJECTS, ...HACKING_PROJECTS];

// Ethical Hacking reuses existing projects that already cover the same
// ground (see the note above HACKING_PROJECTS) rather than duplicating them.
const HACKING_TRACK_PROJECTS = [
  ...HACKING_PROJECTS,
  ...[BEGINNER_PROJECTS.find((p) => p.id === "proj-passwordchecker")].filter(Boolean),
  ...[CYBER_PROJECTS.find((p) => p.id === "proj-cy-authlog")].filter(Boolean),
  ...[CYBER_PROJECTS.find((p) => p.id === "proj-cy-netinfo")].filter(Boolean),
  ...[CYBER_PROJECTS.find((p) => p.id === "proj-cy-fim")].filter(Boolean),
  ...[CYBER_PROJECTS.find((p) => p.id === "proj-cy-report")].filter(Boolean),
];

const TRACKS_META = {
  python: { id: "python", label: "Python Core", levels: LEVELS, lessons: LESSONS, projects: BEGINNER_PROJECTS },
  cyber: { id: "cyber", label: "Cybersecurity", levels: CYBER_LEVELS, lessons: CYBER_LESSONS, projects: CYBER_PROJECTS },
  hacking: { id: "hacking", label: "Ethical Hacking", levels: HACKING_LEVELS, lessons: HACKING_LESSONS, projects: HACKING_TRACK_PROJECTS },
  data: { id: "data", label: "Data / AI / ML", levels: DATA_LEVELS, lessons: DATA_LESSONS, projects: [] },
  aiCyber: { id: "aiCyber", label: "AI + Cybersecurity", levels: [], lessons: [], projects: CROSS_TRACK_PROJECTS },
};

const TRACK_UNLOCK_THRESHOLD = 0.5;    // fraction of Python Core needed to unlock cyber/data
const HACKING_UNLOCK_THRESHOLD = 0.4;  // fraction of Cybersecurity needed to unlock Ethical Hacking
const AI_CYBER_UNLOCK_THRESHOLD = 0.4; // fraction of BOTH cyber and data needed for the advanced track

function curriculumProgress(state, lessons) {
  if (!lessons.length) return 0;
  const done = lessons.filter((l) => state.lessonStatus[l.id] === "completed").length;
  return done / lessons.length;
}

function lessonsArrayFor(lesson) {
  if (CYBER_LESSONS.some((l) => l.id === lesson.id)) return CYBER_LESSONS;
  if (DATA_LESSONS.some((l) => l.id === lesson.id)) return DATA_LESSONS;
  if (HACKING_LESSONS.some((l) => l.id === lesson.id)) return HACKING_LESSONS;
  return LESSONS;
}

function trackIdForLesson(lessonId) {
  if (CYBER_LESSONS.some((l) => l.id === lessonId)) return "cyber";
  if (DATA_LESSONS.some((l) => l.id === lessonId)) return "data";
  if (HACKING_LESSONS.some((l) => l.id === lessonId)) return "hacking";
  return "python";
}

// Returns { status: 'locked'|'available'|'in_progress'|'completed', reason }
function getTrackStatus(state, trackId) {
  const pythonPct = curriculumProgress(state, LESSONS);
  const cyberPct = curriculumProgress(state, CYBER_LESSONS);
  const dataPct = curriculumProgress(state, DATA_LESSONS);
  const hackingPct = curriculumProgress(state, HACKING_LESSONS);

  if (trackId === "python") {
    if (pythonPct >= 1) return { status: "completed", reason: "You've completed every Python Core lesson." };
    if (pythonPct > 0) return { status: "in_progress", reason: "In progress." };
    return { status: "available", reason: "Your foundation track — always available." };
  }

  if (trackId === "cyber" || trackId === "data") {
    const label = trackId === "cyber" ? "Cybersecurity" : "Data / AI / ML";
    if (pythonPct < TRACK_UNLOCK_THRESHOLD) {
      const pct = Math.round(pythonPct * 100);
      const need = Math.round(TRACK_UNLOCK_THRESHOLD * 100);
      return { status: "locked", reason: `Unlocks at ${need}% Python Core progress (you're at ${pct}%). Keep building the foundation first.` };
    }
    const trackPct = trackId === "cyber" ? cyberPct : dataPct;
    if (trackPct >= 1) return { status: "completed", reason: `You've completed every ${label} lesson currently available.` };
    if (trackPct > 0) return { status: "in_progress", reason: "In progress." };
    return { status: "available", reason: `Unlocked — Python Core is strong enough to start ${label}.` };
  }

  if (trackId === "hacking") {
    if (cyberPct < HACKING_UNLOCK_THRESHOLD) {
      const pct = Math.round(cyberPct * 100);
      const need = Math.round(HACKING_UNLOCK_THRESHOLD * 100);
      return { status: "locked", reason: `Unlocks at ${need}% Cybersecurity progress (you're at ${pct}%). Ethical Hacking builds directly on those foundations.` };
    }
    if (hackingPct >= 1) return { status: "completed", reason: "You've completed every Ethical Hacking lesson currently available." };
    if (hackingPct > 0) return { status: "in_progress", reason: "In progress." };
    return { status: "available", reason: "Unlocked — your Cybersecurity foundations are strong enough to start applying them practically." };
  }

  if (trackId === "aiCyber") {
    const cyberOk = cyberPct >= AI_CYBER_UNLOCK_THRESHOLD;
    const dataOk = dataPct >= AI_CYBER_UNLOCK_THRESHOLD;
    if (!cyberOk || !dataOk) {
      const need = Math.round(AI_CYBER_UNLOCK_THRESHOLD * 100);
      const missing = [];
      if (!cyberOk) missing.push(`Cybersecurity (${Math.round(cyberPct * 100)}%)`);
      if (!dataOk) missing.push(`Data / AI / ML (${Math.round(dataPct * 100)}%)`);
      return { status: "locked", reason: `Requires at least ${need}% progress in both Cybersecurity and Data/AI/ML. Still needed: ${missing.join(" and ")}.` };
    }
    const crossDone = CROSS_TRACK_PROJECTS.some((p) => state.projectStatus[p.id] === "completed");
    if (crossDone) return { status: "completed", reason: "You've completed a combined AI + Cybersecurity project." };
    return { status: "available", reason: "Unlocked — you have substantial progress in both prerequisite tracks." };
  }

  return { status: "locked", reason: "" };
}

/* =========================================================================
   STORAGE HELPERS
   ========================================================================= */

const STORAGE_KEY = "pycademy-state-v1";

function freshState() {
  return {
    onboarded: false,
    profile: { name: "", email: "", experience: "", goals: [], pace: "", studyTime: "", ide: "", tracks: [], difficultyPref: "standard" },
    xp: 0,
    streak: 0,
    lastStudyDay: null,
    weeklyMinutes: 0,
    totalMinutes: 0,
    weeklyGoalMinutes: 150,
    lessonStatus: {},        // lessonId -> "in_progress" | "completed"
    exerciseAttempts: {},    // exerciseId -> { attempts, hintsUsed, solved, difficulty, topicId, type, xpEarned, timeSpentSec }
    weakAreas: {},           // topicId -> { fails, lastFail, label }
    revisionQueue: [],       // topicId[]
    masteredTopics: [],      // topicId[]
    revisionMasteredCount: 0,// total revision items successfully cleared, all-time
    topicDifficulty: {},     // topicId -> "easier" | "standard" | "harder"
    projectStatus: {},       // projectId -> "not_started" | "in_progress" | "completed"
    projectChecklist: {},    // projectId -> { [item]: bool }
    projectStage: {},        // projectId -> "guided" | "semiGuided" | "independent"
    projectStageStatus: {},  // projectId -> { guided: bool, semiGuided: bool, independent: bool }
    projectMilestoneProgress: {}, // projectId -> bool[] matching project.milestones
    projectExtensionsDone: {},    // projectId -> { [extensionText]: bool }
    projectCode: {},         // projectId -> string (workspace code, persisted per project)
    gitChecklist: {},        // item -> bool
    achievements: [],        // achievement id[]
    codeReviewHistory: [],
    activityLog: [],         // { at, label, kind }
    settings: {
      theme: "dark",
      difficulty: "auto",
      hintBehavior: "progressive",
      ide: "pycharm",
      notifRevision: true,
      notifGoals: true,
      notifAchievements: true,
    },
  };
}

function logActivity(s, label, kind = "info") {
  const entry = { at: Date.now(), label, kind };
  return { ...s, activityLog: [entry, ...s.activityLog].slice(0, 20) };
}

function xpToLevel(xp) {
  let level = 1, remaining = xp, threshold = 100;
  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = 100 + (level - 1) * 40;
  }
  return { level, into: remaining, span: threshold };
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* =========================================================================
   SMALL UI PRIMITIVES
   ========================================================================= */

function Bar({ pct, colorClass = "bg-cyan-400", trackClass = "bg-slate-800", height = "h-2" }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={`w-full ${height} ${trackClass} rounded-full overflow-hidden`}>
      <div className={`${height} ${colorClass} rounded-full transition-all duration-500`} style={{ width: `${clamped}%` }} />
    </div>
  );
}

function Pill({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-800 text-slate-300 border-slate-700",
    cyan: "bg-cyan-950 text-cyan-300 border-cyan-800",
    violet: "bg-violet-950 text-violet-300 border-violet-800",
    amber: "bg-amber-950 text-amber-300 border-amber-800",
    emerald: "bg-emerald-950 text-emerald-300 border-emerald-800",
    rose: "bg-rose-950 text-rose-300 border-rose-800",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${tones[tone] || tones.slate}`}>
      {children}
    </span>
  );
}

function difficultyTone(d) {
  if (d === "Easy") return "emerald";
  if (d === "Medium") return "amber";
  if (d === "Hard" || d === "Challenge") return "rose";
  return "slate";
}

function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900 border border-slate-800 rounded-xl ${onClick ? "cursor-pointer hover:border-slate-700 transition-colors" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, variant = "primary", size = "md", className = "", disabled, type = "button" }) {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
    ghost: "hover:bg-slate-800 text-slate-300",
    danger: "bg-rose-600 hover:bg-rose-500 text-white",
    ai: "bg-violet-500 hover:bg-violet-400 text-slate-950 font-medium",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function CodeBlock({ code, onCopy }) {
  const [copied, setCopied] = useState(false);
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy && onCopy();
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };
  return (
    <div className="relative group">
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono text-slate-200">
        <code>{code}</code>
      </pre>
      <button
        onClick={doCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy code"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="text-xs font-medium text-slate-500 mb-2">{children}</div>;
}

function EmptyHint({ children }) {
  return <div className="text-sm text-slate-500 italic">{children}</div>;
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* =========================================================================
   AI HELPERS (calls Claude via the in-artifact completion endpoint)
   ========================================================================= */

async function callClaude(system, userText, { json = false } = {}) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userText }],
    }),
  });
  if (!res.ok) throw new Error("API error " + res.status);
  const data = await res.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");
  let text = textBlock ? textBlock.text : "";
  if (json) {
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(text);
  }
  return text;
}

function heuristicExerciseCheck(code, exercise) {
  const lower = code.toLowerCase();
  const issues = [];
  if (!code || code.trim().length < 3) {
    return { verdict: "incomplete", feedback: "There's no real code here yet — give it a try, even a rough attempt helps me give you a useful hint." };
  }
  if (exercise.requirements.some((r) => /f-string/i.test(r)) && !/f["']/.test(code)) {
    issues.push("This exercise asks for an f-string, but I don't see one (look for f\"...\" ).");
  }
  if (exercise.requirements.some((r) => /\.get\(/i.test(r)) && !/\.get\(/.test(code)) {
    issues.push("Try using .get() for a safe dictionary lookup instead of square brackets.");
  }
  if (exercise.requirements.some((r) => /convert/i.test(r)) && !/(int\(|float\()/.test(code)) {
    issues.push("This exercise involves a type conversion — check whether you need int() or float() somewhere.");
  }
  if (!/print\(/.test(code) && !/return /.test(code)) {
    issues.push("I don't see a print() or return — how will the result be shown?");
  }
  if (issues.length === 0) {
    return { verdict: "likely_correct", feedback: "This looks reasonable at a glance — structurally it matches what the exercise is asking for. Double-check your output against the example before moving on." };
  }
  return { verdict: "needs_work", feedback: issues.join(" ") };
}

function heuristicCodeReview(code) {
  const findings = [];
  if (/except\s*:/.test(code)) findings.push({ cat: "bug", severity: "high", concept: "Exception handling", text: "A bare `except:` catches every error, including ones you didn't anticipate.", nextStep: "Catch a specific exception type instead, like `except ValueError:`." });
  if (/def \w+\([^)]*=\s*\[\]/.test(code) || /def \w+\([^)]*=\s*\{\}/.test(code)) findings.push({ cat: "bug", severity: "high", concept: "Mutable default arguments", text: "A mutable default argument (like `=[]` or `={}`) is shared across every call — it can quietly leak state between calls.", nextStep: "Use `None` as the default and create the list/dict inside the function body instead." });
  if (/==\s*None|!=\s*None/.test(code)) findings.push({ cat: "improvement", severity: "low", concept: "Identity vs equality", text: "Comparing to None with `==`/`!=` works but isn't idiomatic.", nextStep: "Prefer `is None` / `is not None` — it's the conventional, slightly safer comparison." });
  if (/password|secret|api_key/i.test(code) && /=\s*["']/.test(code)) findings.push({ cat: "security", severity: "high", concept: "Secrets management", text: "A credential-looking value appears to be hardcoded directly in the source.", nextStep: "Load secrets from environment variables (e.g. os.environ) instead of embedding them in code." });
  if (/input\(/.test(code) && !/(try|int\(|float\()/.test(code)) findings.push({ cat: "improvement", severity: "medium", concept: "Input validation", text: "You're reading input() but there's no conversion or validation visible.", nextStep: "Consider what happens if the user types something unexpected, and wrap the conversion in try/except." });
  if (!/def /.test(code) && code.split("\n").length > 12) findings.push({ cat: "suggestion", severity: "low", concept: "Function decomposition", text: "This is a fairly long block with no functions.", nextStep: "Consider breaking it into smaller, named pieces — each easier to test and reread later." });
  if (/for .+ in .+:\s*\n.+\.append/.test(code) === false && /for \w+ in range\(len\(/.test(code)) findings.push({ cat: "suggestion", severity: "low", concept: "Iteration style", text: "Looping with range(len(...)) to index into a collection is usually more verbose than needed.", nextStep: "Consider iterating directly over the collection, or using enumerate() if you need the index too." });
  if (findings.length === 0) findings.push({ cat: "correct", severity: "info", concept: null, text: "No obvious issues jumped out from a structural read — nice and clean.", nextStep: null });
  return findings;
}

/* =========================================================================
   TEST RUNNER — mock/simulated execution architecture.
   NOTE ON SECURITY: this never executes learner code anywhere. It asks the
   AI model to reason about what the code would do, as a stand-in for a
   future sandboxed execution service (isolated container, timeouts,
   resource limits, real stdout/stderr/exit-code capture). This keeps the
   UI honest about what is and isn't real execution.
   ========================================================================= */

const TEST_STATUS_META = {
  passed: { label: "Passed", tone: "emerald", icon: CheckCircle2 },
  failed: { label: "Failed", tone: "rose", icon: X },
  runtime_error: { label: "Runtime Error", tone: "rose", icon: Bug },
  syntax_error: { label: "Syntax Error", tone: "amber", icon: AlertTriangle },
  timeout: { label: "Timeout", tone: "amber", icon: Clock },
};

async function simulateTestRun(code, tests, hiddenTestCount) {
  try {
    const parsed = await callClaude(
      "You are simulating a Python test runner for a learning platform (there is no real sandboxed executor yet). Mentally trace through the learner's code for each visible test case and determine what would actually happen. Respond ONLY with JSON: {\"results\": [{\"name\": string, \"status\": one of [\"passed\",\"failed\",\"runtime_error\",\"syntax_error\",\"timeout\"], \"explanation\": one beginner-friendly sentence}]}. Use \"syntax_error\" if the code wouldn't even parse, \"runtime_error\" if it would crash while running (name the likely exception), \"failed\" if it runs but produces the wrong output, \"passed\" if the output would match. Never invent a timeout unless there's an obvious infinite loop.",
      `Visible tests:\n${tests.map((t) => `- ${t.name}: input(${t.input}) expected output: ${t.expected}`).join("\n")}\n\nLearner's code:\n${code}`,
      { json: true }
    );
    return { results: parsed.results || [], simulated: true, hiddenTestCount };
  } catch (e) {
    return {
      results: tests.map((t) => {
        const h = heuristicExerciseCheck(code, { requirements: [], example: { output: t.expected } });
        return { name: t.name, status: h.verdict === "likely_correct" ? "passed" : "failed", explanation: h.feedback };
      }),
      simulated: true,
      degraded: true,
      hiddenTestCount,
    };
  }
}

function TestRunnerPanel({ code, tests, hiddenTestCount }) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    setRunning(true);
    const r = await simulateTestRun(code, tests, hiddenTestCount || 0);
    setResult(r);
    setRunning(false);
  };

  const passCount = result ? result.results.filter((r) => r.status === "passed").length : 0;

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <SectionLabel>Tests</SectionLabel>
        {hiddenTestCount > 0 && <Pill><Lock size={11} /> +{hiddenTestCount} hidden test{hiddenTestCount === 1 ? "" : "s"}</Pill>}
      </div>
      <div className="flex items-start gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2.5 mb-3">
        <FlaskConical size={13} className="text-slate-500 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-500">Simulated by AI reasoning about your code — not a live sandboxed execution environment yet. A production version would run this in an isolated container with timeouts and resource limits.</p>
      </div>
      <Button variant="secondary" size="sm" onClick={run} disabled={running}>
        {running ? <RefreshCw size={13} className="animate-spin" /> : <PlayCircle size={13} />} Run tests
      </Button>

      {result && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-slate-500">{passCount}/{result.results.length} visible tests passed{hiddenTestCount > 0 ? ` · ${hiddenTestCount} hidden test${hiddenTestCount === 1 ? "" : "s"} run on submission` : ""}</p>
          {result.results.map((r, i) => {
            const meta = TEST_STATUS_META[r.status] || TEST_STATUS_META.failed;
            const Icon = meta.icon;
            return (
              <div key={i} className="flex items-start gap-2 text-sm">
                <Icon size={14} className={`mt-0.5 shrink-0 ${meta.tone === "emerald" ? "text-emerald-400" : meta.tone === "amber" ? "text-amber-400" : "text-rose-400"}`} />
                <div>
                  <p className="text-slate-200">{r.name} — <Pill tone={meta.tone}>{meta.label}</Pill></p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

/* =========================================================================
   AUTHENTICATION (frontend-only — structured so a real auth backend can
   replace AUTH_KEY/SESSION_KEY storage calls without touching the UI)
   ========================================================================= */

const AUTH_KEY = "pycademy-account-v1";
const SESSION_KEY = "pycademy-session-v1";

// TEMP: real storage-backed login isn't reliable in this environment yet, so
// this bypasses credential checking entirely and logs in with whatever name/
// email/password is typed — useful for testing signup as different users.
// Flip AUTH_BYPASS_AUTO_LOGIN to false to restore the original, fully
// validated signup/login/forgot-password flow that's still underneath this.
const AUTH_BYPASS_AUTO_LOGIN = true;

// Guards against window.storage calls that hang instead of resolving/rejecting,
// which would otherwise leave the loading spinner stuck forever. Resolves to
// `fallback` if the real call doesn't finish in time.
function withTimeout(promise, ms = 3000, fallback = null) {
  return Promise.race([
    Promise.resolve(promise).catch(() => fallback),
    new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function PasswordField({ value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        autoComplete={autoComplete}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState("login"); // login | signup | forgot | forgot_sent
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedExisting, setCheckedExisting] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    if (AUTH_BYPASS_AUTO_LOGIN) {
      // Skip the storage round-trip entirely — nothing to block on.
      setMode("signup");
      setCheckedExisting(true);
      return;
    }
    (async () => {
      const res = await withTimeout(window.storage.get(AUTH_KEY, false));
      if (res && res.value) {
        setHasAccount(true);
        setMode("login");
      } else {
        setMode("signup");
      }
      setCheckedExisting(true);
    })();
  }, []);

  const validate = () => {
    if (!isValidEmail(email)) return "Enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (mode === "signup") {
      if (!name.trim()) return "Enter your name.";
      if (password !== confirmPassword) return "Passwords don't match.";
    }
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();

    if (AUTH_BYPASS_AUTO_LOGIN) {
      setError("");
      setLoading(true);
      const fallbackName = name.trim() || "Learner";
      const fallbackEmail = (email.trim() || "learner@example.com").toLowerCase();
      // Best-effort persistence in the background — doesn't block or fail the login.
      try {
        const account = { name: fallbackName, email: fallbackEmail, password: password || "temp", createdAt: Date.now() };
        window.storage.set(AUTH_KEY, JSON.stringify(account), false).catch(() => {});
        window.storage.set(SESSION_KEY, JSON.stringify({ email: fallbackEmail }), false).catch(() => {});
      } catch (e) {}
      onAuthed({ name: fallbackName, email: fallbackEmail, isNewAccount: mode === "signup" });
      setLoading(false);
      return;
    }

    const v = validate();
    if (v) { setError(v); return; }
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const account = { name: name.trim(), email: email.trim().toLowerCase(), password, createdAt: Date.now() };
        await window.storage.set(AUTH_KEY, JSON.stringify(account), false);
        await window.storage.set(SESSION_KEY, JSON.stringify({ email: account.email }), false);
        onAuthed({ name: account.name, email: account.email, isNewAccount: true });
      } else {
        const res = await window.storage.get(AUTH_KEY, false);
        const account = res && res.value ? JSON.parse(res.value) : null;
        if (!account || account.email !== email.trim().toLowerCase() || account.password !== password) {
          setError("Incorrect email or password.");
          setLoading(false);
          return;
        }
        await window.storage.set(SESSION_KEY, JSON.stringify({ email: account.email }), false);
        onAuthed({ name: account.name, email: account.email, isNewAccount: false });
      }
    } catch (e) {
      setError("Something went wrong saving your session — please try again.");
    }
    setLoading(false);
  };

  if (!checkedExisting) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <RefreshCw className="text-cyan-500 animate-spin" size={22} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center">
            <Terminal className="text-cyan-400" size={18} />
          </div>
          <span className="font-semibold text-lg tracking-tight">Pycademy</span>
        </div>

        <Card className="p-6">
          {mode === "forgot_sent" ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-emerald-400" size={20} />
              </div>
              <h2 className="font-semibold mb-1.5">Check your email</h2>
              <p className="text-sm text-slate-400 mb-5">If an account exists for {email}, a reset link is on its way.</p>
              <Button variant="secondary" className="w-full" onClick={() => setMode("login")}>Back to log in</Button>
            </div>
          ) : mode === "forgot" ? (
            <form onSubmit={(e) => { e.preventDefault(); if (!isValidEmail(email)) { setError("Enter a valid email address."); return; } setError(""); setMode("forgot_sent"); }}>
              <h2 className="font-semibold mb-1">Reset your password</h2>
              <p className="text-sm text-slate-500 mb-4">Enter the email on your account and we'll send reset instructions.</p>
              <div className="relative mb-3">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
              </div>
              {error && <p className="text-xs text-rose-400 mb-3">{error}</p>}
              <Button type="submit" className="w-full mb-2">Send reset link</Button>
              <button type="button" onClick={() => { setMode("login"); setError(""); }} className="w-full text-center text-xs text-slate-500 hover:text-slate-300">Back to log in</button>
            </form>
          ) : (
            <form onSubmit={submit}>
              <h2 className="font-semibold mb-1">{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
              <p className="text-sm text-slate-500 mb-4">{mode === "signup" ? "Start learning Python, free." : "Log in to continue your progress."}</p>

              <div className="space-y-3 mb-3">
                {mode === "signup" && (
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                )}
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                </div>
                <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
                {mode === "signup" && (
                  <PasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" autoComplete="new-password" />
                )}
              </div>

              {mode === "login" && (
                <button type="button" onClick={() => { setMode("forgot"); setError(""); }} className="text-xs text-cyan-400 hover:underline mb-3 inline-block">Forgot password?</button>
              )}

              {error && <p className="text-xs text-rose-400 mb-3">{error}</p>}

              <Button type="submit" className="w-full mb-3" disabled={loading}>
                {loading ? <RefreshCw size={14} className="animate-spin" /> : mode === "signup" ? <Sparkles size={14} /> : <ArrowRight size={14} />}
                {mode === "signup" ? "Create account" : "Log in"}
              </Button>

              <p className="text-center text-xs text-slate-500">
                {mode === "signup" ? "Already have an account?" : "New to Pycademy?"}{" "}
                <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }} className="text-cyan-400 hover:underline">
                  {mode === "signup" ? "Log in" : "Sign up"}
                </button>
              </p>
            </form>
          )}
        </Card>
        {hasAccount && mode === "signup" && (
          <p className="text-center text-xs text-slate-600 mt-4">Note: this device already has an account saved — signing up again will replace it.</p>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   ONBOARDING
   ========================================================================= */

function Onboarding({ onComplete, initialName }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: initialName || "", experience: "", goals: [], difficultyPref: "standard", studyTime: "", weeklyGoalMinutes: 150, ide: "" });

  const steps = ["Welcome", "Experience", "Goals", "Difficulty", "Weekly goal", "IDE", "Ready"];

  const toggleGoal = (g) => {
    setForm((f) => ({ ...f, goals: f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-2 mb-8 justify-center">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-cyan-400" : i < step ? "w-4 bg-cyan-800" : "w-4 bg-slate-800"}`} />
          ))}
        </div>

        <Card className="p-8">
          {step === 0 && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center mx-auto mb-5">
                <Terminal className="text-cyan-400" size={26} />
              </div>
              <h1 className="text-2xl font-semibold mb-2">Welcome to Pycademy</h1>
              <p className="text-slate-400 mb-5 leading-relaxed">A learning system that adapts to you. Pycademy is built around four tracks:</p>
              <div className="grid grid-cols-2 gap-2 mb-6 text-left">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"><Code2 size={15} className="text-cyan-400 shrink-0" /><span className="text-xs">Python Core</span></div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"><ShieldCheck size={15} className="text-violet-400 shrink-0" /><span className="text-xs">Cybersecurity</span></div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"><Brain size={15} className="text-emerald-400 shrink-0" /><span className="text-xs">Data / AI / ML</span></div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"><FlaskConical size={15} className="text-amber-400 shrink-0" /><span className="text-xs">AI + Cybersecurity</span></div>
              </div>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="What should we call you?"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm mb-6 focus:outline-none focus:border-cyan-500"
              />
              <Button onClick={() => setStep(1)} disabled={!form.name.trim()} className="w-full" size="lg">
                Get started <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-1">What's your programming experience?</h2>
              <p className="text-slate-500 text-sm mb-5">This decides your starting point — not a ceiling. Nothing here locks you out of anything.</p>
              <div className="grid grid-cols-1 gap-2">
                {["Complete beginner", "Beginner", "Some programming experience", "Intermediate Python"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setForm((f) => ({ ...f, experience: opt }))}
                    className={`text-left px-4 py-3 rounded-lg border transition-colors ${form.experience === opt ? "border-cyan-500 bg-cyan-950/40" : "border-slate-700 hover:border-slate-600"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setStep(0)}><ChevronLeft size={16} /> Back</Button>
                <Button onClick={() => setStep(2)} disabled={!form.experience}>Continue <ChevronRight size={16} /></Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-1">Where do you want Python to take you?</h2>
              <p className="text-slate-500 text-sm mb-5">Pick as many as fit — Python Core stays shared across all of them, and you can change this later in Tracks.</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "general", label: "General Python development", icon: Code2 },
                  { id: "cyber", label: "Cybersecurity", icon: ShieldCheck },
                  { id: "hacking", label: "Ethical Hacking", icon: KeyRound },
                  { id: "data", label: "Data Science", icon: Database },
                  { id: "ai", label: "AI / Machine Learning", icon: Brain },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => toggleGoal(id)}
                    className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg border transition-colors ${form.goals.includes(id) ? "border-cyan-500 bg-cyan-950/40" : "border-slate-700 hover:border-slate-600"}`}
                  >
                    <Icon size={18} className={form.goals.includes(id) ? "text-cyan-400" : "text-slate-500"} />
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</Button>
                <Button onClick={() => setStep(3)} disabled={form.goals.length === 0}>Continue <ChevronRight size={16} /></Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-1">Preferred learning difficulty?</h2>
              <p className="text-slate-500 text-sm mb-5">Exercises adapt automatically from here regardless — this just sets your starting point.</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "easier", label: "Easier — more scaffolding and hints" },
                  { id: "standard", label: "Standard — balanced pace" },
                  { id: "harder", label: "Harder — fewer hints, more challenge" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setForm((f) => ({ ...f, difficultyPref: opt.id }))}
                    className={`text-left px-4 py-3 rounded-lg border transition-colors ${form.difficultyPref === opt.id ? "border-cyan-500 bg-cyan-950/40" : "border-slate-700 hover:border-slate-600"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setStep(2)}><ChevronLeft size={16} /> Back</Button>
                <Button onClick={() => setStep(4)}>Continue <ChevronRight size={16} /></Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold mb-1">How much time can you study?</h2>
              <p className="text-slate-500 text-sm mb-5">This sets your weekly goal — you can change it later in Settings.</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "15 min/day (light)", mins: 105 },
                  { label: "30 min/day (steady)", mins: 210 },
                  { label: "1 hr/day (focused)", mins: 420 },
                  { label: "2+ hrs/day (intensive)", mins: 840 },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setForm((f) => ({ ...f, studyTime: opt.label, weeklyGoalMinutes: opt.mins }))}
                    className={`text-left px-4 py-3 rounded-lg border transition-colors ${form.studyTime === opt.label ? "border-cyan-500 bg-cyan-950/40" : "border-slate-700 hover:border-slate-600"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setStep(3)}><ChevronLeft size={16} /> Back</Button>
                <Button onClick={() => setStep(5)} disabled={!form.studyTime}>Continue <ChevronRight size={16} /></Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-lg font-semibold mb-1">Which editor do you use?</h2>
              <p className="text-slate-500 text-sm mb-5">We'll tailor IDE setup instructions to this.</p>
              <div className="grid grid-cols-1 gap-2">
                {["PyCharm", "VS Code", "Both", "Not sure yet"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setForm((f) => ({ ...f, ide: opt }))}
                    className={`text-left px-4 py-3 rounded-lg border transition-colors ${form.ide === opt ? "border-cyan-500 bg-cyan-950/40" : "border-slate-700 hover:border-slate-600"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setStep(4)}><ChevronLeft size={16} /> Back</Button>
                <Button onClick={() => setStep(6)} disabled={!form.ide}>Continue <ChevronRight size={16} /></Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mx-auto mb-5">
                <Check className="text-emerald-400" size={26} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your path is ready, {form.name}</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Starting at <span className="text-slate-200">{form.experience}</span>, with a goal of about{" "}
                <span className="text-slate-200">{form.studyTime.split(" (")[0]}</span> and {form.difficultyPref} difficulty. Python Core comes first — your specializations stay unlocked to explore any time, and adapt in depth as you build the fundamentals.
              </p>
              <Button size="lg" className="w-full" onClick={() => onComplete(form)}>
                Enter Pycademy <Sparkles size={16} />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* =========================================================================
   NAVIGATION
   ========================================================================= */

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "exercises", label: "Exercises", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "revision", label: "Revision", icon: RotateCcw },
  { id: "tracks", label: "Tracks", icon: Cpu },
  { id: "reference", label: "Reference", icon: Library },
  { id: "progress", label: "Progress", icon: TrendingUp },
];
const NAV_SECONDARY = [
  { id: "reviewer", label: "AI Code Reviewer", icon: Sparkles },
  { id: "ide", label: "IDE Setup", icon: Terminal },
  { id: "git", label: "Git & GitHub", icon: GitBranch },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];
const MOBILE_NAV = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "exercises", label: "Practice", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "profile", label: "You", icon: User },
];

function Sidebar({ view, go }) {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-slate-800 bg-slate-950 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center">
          <Terminal className="text-cyan-400" size={16} />
        </div>
        <span className="font-semibold tracking-tight">Pycademy</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => go(id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${view === id ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
        <div className="h-px bg-slate-800 my-3" />
        {NAV_SECONDARY.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => go(id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${view === id ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function BottomNav({ view, go }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur border-t border-slate-800 flex z-40">
      {MOBILE_NAV.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => go(id)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 ${view === id ? "text-cyan-400" : "text-slate-500"}`}
        >
          <Icon size={20} />
          <span className="text-[10px]">{label}</span>
        </button>
      ))}
    </nav>
  );
}

function TopBar({ state, onSearch, go }) {
  const { level } = xpToLevel(state.xp);
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 h-16 px-4 md:px-6 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="flex-1 relative max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          onKeyDown={(e) => { if (e.key === "Enter") onSearch(e.currentTarget.value); }}
          placeholder="Search lessons, exercises, reference..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-cyan-600"
        />
      </div>
      <button onClick={() => go("progress")} className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-sm">
        <Flame size={14} className="text-amber-400" />
        <span className="text-slate-300">{state.streak}</span>
      </button>
      <button onClick={() => go("progress")} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-sm">
        <Zap size={14} className="text-cyan-400" />
        <span className="text-slate-300">{state.xp} XP</span>
      </button>
      <button onClick={() => go("profile")} className="w-8 h-8 rounded-full bg-violet-950 border border-violet-800 flex items-center justify-center text-xs font-medium text-violet-300">
        L{level}
      </button>
    </header>
  );
}

/* =========================================================================
   DASHBOARD
   ========================================================================= */

function findStrongTopic(state, excludeId) {
  const candidates = ALL_LESSONS.filter((l) => l.id !== excludeId && state.lessonStatus[l.id] === "completed" && !state.weakAreas[l.id]);
  return candidates[candidates.length - 1] || null;
}

function findNextLessonAcrossTracks(state) {
  const pythonNext = LESSONS.find((l) => state.lessonStatus[l.id] !== "completed" && l.prereq.every((p) => state.lessonStatus[p] === "completed"));
  if (pythonNext) return pythonNext;
  if (getTrackStatus(state, "cyber").status !== "locked") {
    const cyberNext = CYBER_LESSONS.find((l) => state.lessonStatus[l.id] !== "completed" && l.prereq.every((p) => state.lessonStatus[p] === "completed"));
    if (cyberNext) return cyberNext;
  }
  if (getTrackStatus(state, "data").status !== "locked") {
    const dataNext = DATA_LESSONS.find((l) => state.lessonStatus[l.id] !== "completed" && l.prereq.every((p) => state.lessonStatus[p] === "completed"));
    if (dataNext) return dataNext;
  }
  return null;
}

function findCrossTrackOpportunity(state) {
  return CROSS_TRACK_PROJECTS.find((p) =>
    state.projectStatus[p.id] !== "completed" &&
    p.prereq.every((pr) => state.lessonStatus[pr] === "completed")
  );
}

function computeRecommendation(state) {
  const weakEntries = Object.entries(state.weakAreas);
  if (weakEntries.length > 0) {
    const [topicId, info] = weakEntries.sort((a, b) => b[1].fails - a[1].fails)[0];
    const lesson = ALL_LESSONS.find((l) => l.id === topicId);
    if (lesson) {
      const strong = findStrongTopic(state, topicId);
      const reason = strong
        ? `You're doing well with ${strong.title}, but you've struggled with ${lesson.title} ${info.fails} time${info.fails === 1 ? "" : "s"}. Let's practice that before moving on.`
        : `You've missed exercises on ${lesson.title} ${info.fails} time${info.fails === 1 ? "" : "s"} recently — worth a quick revisit before continuing.`;
      return { kind: "revision", title: `Review: ${lesson.title}`, reason };
    }
  }

  const crossTrack = findCrossTrackOpportunity(state);
  if (crossTrack) {
    const domains = Object.keys(crossTrack.skillsByDomain || {});
    const reason = `You've built skills in ${domains.slice(0, -1).join(", ")}${domains.length > 1 ? " and " : ""}${domains[domains.length - 1] || ""} separately. You're ready for a project combining them.`;
    return { kind: "project", id: crossTrack.id, title: `Combine skills: ${crossTrack.title}`, reason };
  }

  const nextLesson = findNextLessonAcrossTracks(state);
  if (nextLesson) {
    const inProgressExercises = Object.entries(state.exerciseAttempts).filter(([id, a]) => a.topicId === nextLesson.id);
    const strugglingHere = inProgressExercises.some(([, a]) => !a.solved && a.attempts >= 1);
    const reason = strugglingHere
      ? `You've started ${nextLesson.title} but haven't quite cracked it yet — a bit more practice here should get you there.`
      : "This is the next unlocked topic in your path, building directly on what you've already mastered.";
    return { kind: "lesson", id: nextLesson.id, title: `Continue: ${nextLesson.title}`, reason };
  }
  const nextProject = ALL_PROJECTS.find((p) => (state.projectStatus[p.id] || "not_started") !== "completed" && p.prereq.every((pr) => state.lessonStatus[pr] === "completed"));
  if (nextProject) {
    return { kind: "project", id: nextProject.id, title: `Build: ${nextProject.title}`, reason: "You've mastered the prerequisite topics for this project — time to apply them." };
  }
  return { kind: "done", title: "You're caught up!", reason: "Explore the Cybersecurity or Data/AI tracks next." };
}

function activityIcon(kind) {
  if (kind === "lesson") return BookOpen;
  if (kind === "exercise") return Code2;
  if (kind === "project") return FolderKanban;
  if (kind === "revision") return RotateCcw;
  if (kind === "achievement") return Award;
  return CircleDot;
}

function Dashboard({ state, go, openLesson, openProject }) {
  const { level, into, span } = xpToLevel(state.xp);
  const coreDone = LESSONS.filter((l) => state.lessonStatus[l.id] === "completed").length;
  const corePct = Math.round((coreDone / LESSONS.length) * 100);
  const cyberPct = Math.round(curriculumProgress(state, CYBER_LESSONS) * 100);
  const dataPct = Math.round(curriculumProgress(state, DATA_LESSONS) * 100);
  const cyberInfo = getTrackStatus(state, "cyber");
  const dataInfo = getTrackStatus(state, "data");
  const rec = useMemo(() => computeRecommendation(state), [state]);
  const weakList = Object.entries(state.weakAreas).sort((a, b) => b[1].fails - a[1].fails).slice(0, 3);

  const currentLesson = LESSONS.find((l) => state.lessonStatus[l.id] === "in_progress") ||
    LESSONS.find((l) => state.lessonStatus[l.id] !== "completed" && l.prereq.every((p) => state.lessonStatus[p] === "completed"));
  const currentLevel = currentLesson ? LEVELS.find((lv) => lv.id === currentLesson.levelId) : null;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back{state.profile.name ? `, ${state.profile.name}` : ""}</h1>
        <p className="text-slate-500 text-sm mt-1">Here's where you left off, and what to do next.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 border-cyan-900/60 bg-gradient-to-br from-cyan-950/30 to-slate-900">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300">Recommended next</span>
          </div>
          <h2 className="text-lg font-medium mb-1">{rec.title}</h2>
          <p className="text-sm text-slate-400 mb-4">{rec.reason}</p>
          <div className="flex gap-2 flex-wrap">
            {rec.kind === "lesson" && <Button onClick={() => openLesson(rec.id)}>Start lesson <ArrowRight size={15} /></Button>}
            {rec.kind === "project" && <Button onClick={() => openProject(rec.id)}>Open project <ArrowRight size={15} /></Button>}
            {rec.kind === "revision" && <Button onClick={() => go("revision")}>Go to revision <ArrowRight size={15} /></Button>}
            {rec.kind === "done" && <Button onClick={() => go("tracks")}>View tracks <ArrowRight size={15} /></Button>}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <PlayCircle size={16} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-400">Continue learning</span>
          </div>
          {currentLesson ? (
            <>
              <p className="text-xs text-slate-500 mb-1">{currentLevel ? `Level ${currentLevel.num} — ${currentLevel.title}` : ""}</p>
              <h2 className="text-lg font-medium mb-4">{currentLesson.title}</h2>
              <Button variant="secondary" onClick={() => openLesson(currentLesson.id)}>Resume <ArrowRight size={15} /></Button>
            </>
          ) : (
            <EmptyHint>Python Core is complete — head to Tracks to keep going.</EmptyHint>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2"><Zap size={13} /> Level {level}</div>
          <Bar pct={(into / span) * 100} colorClass="bg-cyan-400" />
          <div className="text-xs text-slate-500 mt-1.5">{into}/{span} XP</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2"><Flame size={13} /> Streak</div>
          <div className="text-xl font-semibold">{state.streak} <span className="text-sm font-normal text-slate-500">days</span></div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2"><Clock size={13} /> This week</div>
          <div className="text-xl font-semibold">{state.weeklyMinutes} <span className="text-sm font-normal text-slate-500">/ {state.weeklyGoalMinutes} min</span></div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2"><RotateCcw size={13} /> Revision queue</div>
          <div className="text-xl font-semibold">{state.revisionQueue.length} <span className="text-sm font-normal text-slate-500">topics</span></div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Track progress</h3>
            <button onClick={() => go("progress")} className="text-xs text-cyan-400 hover:underline">Full analytics</button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5"><span>Python Core</span><span className="text-slate-500">{corePct}%</span></div>
              <Bar pct={corePct} colorClass="bg-cyan-400" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5 text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Cybersecurity</span>
                <span>{cyberInfo.status === "locked" ? "Locked" : `${cyberPct}%`}</span>
              </div>
              <Bar pct={cyberInfo.status === "locked" ? 0 : cyberPct} colorClass="bg-violet-400" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5 text-slate-500">
                <span className="flex items-center gap-1.5"><Brain size={13} /> Data / AI / ML</span>
                <span>{dataInfo.status === "locked" ? "Locked" : `${dataPct}%`}</span>
              </div>
              <Bar pct={dataInfo.status === "locked" ? 0 : dataPct} colorClass="bg-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Weak areas</h3>
            <button onClick={() => go("revision")} className="text-xs text-cyan-400 hover:underline">View all</button>
          </div>
          {weakList.length === 0 ? (
            <EmptyHint>Nothing flagged yet — keep going!</EmptyHint>
          ) : (
            <div className="space-y-2.5">
              {weakList.map(([id, info]) => {
                const lesson = LESSONS.find((l) => l.id === id);
                return (
                  <div key={id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{lesson ? lesson.title : id}</span>
                    <Pill tone="rose">{info.fails}x missed</Pill>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-medium mb-4">Recent activity</h3>
        {state.activityLog.length === 0 ? (
          <EmptyHint>Your recent lessons, exercises, and projects will show up here.</EmptyHint>
        ) : (
          <div className="space-y-3">
            {state.activityLog.slice(0, 6).map((a, i) => {
              const Icon = activityIcon(a.kind);
              return (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-slate-400" />
                  </div>
                  <span className="text-slate-300 flex-1">{a.label}</span>
                  <span className="text-xs text-slate-600 shrink-0">{timeAgo(a.at)}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

/* =========================================================================
   LEARN — level list, lesson list, lesson detail
   ========================================================================= */

function isLessonUnlocked(lesson, state) {
  return lesson.prereq.every((p) => state.lessonStatus[p] === "completed");
}

function LearnHome({ state, openLesson }) {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Learn</h1>
        <p className="text-slate-500 text-sm mt-1">Python Core — shared by every specialization.</p>
      </div>
      {LEVELS.map((level) => {
        const lessons = LESSONS.filter((l) => l.levelId === level.id);
        if (lessons.length === 0) return null;
        const doneCount = lessons.filter((l) => state.lessonStatus[l.id] === "completed").length;
        return (
          <div key={level.id}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-400">Level {level.num} — {level.title}</h2>
              <span className="text-xs text-slate-600">{doneCount}/{lessons.length} complete</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {lessons.map((lesson) => {
                const unlocked = isLessonUnlocked(lesson, state);
                const status = state.lessonStatus[lesson.id];
                return (
                  <Card
                    key={lesson.id}
                    onClick={unlocked ? () => openLesson(lesson.id) : undefined}
                    className={`p-4 ${!unlocked ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {status === "completed" ? <CheckCircle2 size={15} className="text-emerald-400" /> : unlocked ? <CircleDot size={15} className="text-cyan-400" /> : <Lock size={14} className="text-slate-600" />}
                          <h3 className="font-medium text-sm">{lesson.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{lesson.concept}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Pill tone={difficultyTone(lesson.difficulty)}>{lesson.difficulty}</Pill>
                      <Pill><Clock size={11} /> {lesson.minutes} min</Pill>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KnowledgeCheck({ questions, onDone }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <div key={i} className="space-y-2">
          <p className="text-sm font-medium">{q.q}</p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const chosen = answers[i] === oi;
              const showCorrect = submitted && oi === q.answer;
              const showWrong = submitted && chosen && oi !== q.answer;
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    showCorrect ? "border-emerald-600 bg-emerald-950/40" :
                    showWrong ? "border-rose-600 bg-rose-950/40" :
                    chosen ? "border-cyan-500 bg-cyan-950/30" : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && <p className="text-xs text-slate-500">{q.explain}</p>}
        </div>
      ))}
      {!submitted ? (
        <Button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}>Check answers</Button>
      ) : (
        <div className="flex items-center gap-3">
          <Pill tone={score === questions.length ? "emerald" : "amber"}>{score}/{questions.length} correct</Pill>
          <Button variant="secondary" size="sm" onClick={onDone}>Continue</Button>
        </div>
      )}
    </div>
  );
}

function LessonPage({ lesson, state, updateState, go, openLesson }) {
  const curriculumLessons = lessonsArrayFor(lesson);
  const idx = curriculumLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = curriculumLessons[idx - 1];
  const nextLesson = curriculumLessons[idx + 1];
  const backTarget = trackIdForLesson(lesson.id);
  const [practiceCode, setPracticeCode] = useState(lesson.practice.starter);
  const [showHint, setShowHint] = useState(false);
  const [checkDone, setCheckDone] = useState(false);
  const [showRevisionToast, setShowRevisionToast] = useState(false);

  useEffect(() => {
    updateState((s) => {
      if (s.lessonStatus[lesson.id] === "completed") return s;
      return { ...s, lessonStatus: { ...s.lessonStatus, [lesson.id]: "in_progress" } };
    });
    setPracticeCode(lesson.practice.starter);
    setShowHint(false);
    setCheckDone(false);
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line
  }, [lesson.id]);

  const markComplete = () => {
    updateState((s) => {
      const already = s.lessonStatus[lesson.id] === "completed";
      let next = {
        ...s,
        lessonStatus: { ...s.lessonStatus, [lesson.id]: "completed" },
        xp: already ? s.xp : s.xp + 25,
      };
      if (!already) next = logActivity(next, `Completed lesson: ${lesson.title}`, "lesson");
      return next;
    });
  };

  const addToRevision = () => {
    updateState((s) => ({
      ...s,
      revisionQueue: s.revisionQueue.includes(lesson.id) ? s.revisionQueue : [...s.revisionQueue, lesson.id],
    }));
    setShowRevisionToast(true);
    setTimeout(() => setShowRevisionToast(false), 2500);
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <button
        onClick={() => (backTarget === "python" ? go("learn") : go("trackHome", { track: backTarget }))}
        className="text-xs text-slate-500 hover:text-slate-300 mb-4 flex items-center gap-1"
      >
        <ChevronLeft size={14} /> {backTarget === "python" ? "Learn" : TRACKS_META[backTarget].label}
      </button>

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Pill tone={difficultyTone(lesson.difficulty)}>{lesson.difficulty}</Pill>
        <Pill><Clock size={11} /> {lesson.minutes} min</Pill>
        {state.lessonStatus[lesson.id] === "completed" && <Pill tone="emerald"><Check size={11} /> Completed</Pill>}
      </div>
      <h1 className="text-2xl font-semibold mb-6">{lesson.title}</h1>

      <div className="space-y-8">
        <section>
          <SectionLabel>Concept</SectionLabel>
          <p className="text-slate-200 leading-relaxed">{lesson.concept}</p>
        </section>

        <section className="bg-violet-950/20 border border-violet-900/40 rounded-xl p-4">
          <SectionLabel>Think of it like this</SectionLabel>
          <p className="text-slate-300 leading-relaxed text-sm">{lesson.analogy}</p>
        </section>

        <section>
          <SectionLabel>Why it matters</SectionLabel>
          <p className="text-slate-300 leading-relaxed text-sm">{lesson.whyItMatters}</p>
        </section>

        <section className="space-y-3">
          <SectionLabel>Explanation</SectionLabel>
          {lesson.explanation.map((p, i) => (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">{p}</p>
          ))}
        </section>

        <section>
          <SectionLabel>Syntax</SectionLabel>
          <CodeBlock code={lesson.syntax} />
        </section>

        <section>
          <SectionLabel>Example</SectionLabel>
          <CodeBlock code={lesson.example} />
        </section>

        <section>
          <SectionLabel>Common mistakes</SectionLabel>
          <ul className="space-y-2">
            {lesson.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <SectionLabel>Practice</SectionLabel>
          <p className="text-sm text-slate-300 mb-3">{lesson.practice.prompt}</p>
          <textarea
            value={practiceCode}
            onChange={(e) => setPracticeCode(e.target.value)}
            rows={5}
            spellCheck={false}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-cyan-600 mb-3"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" size="sm" onClick={() => setShowHint((v) => !v)}>
              <Lightbulb size={14} /> {showHint ? "Hide hint" : "Show hint"}
            </Button>
          </div>
          {showHint && <p className="text-xs text-amber-300 mt-2">{lesson.practice.hint}</p>}
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <SectionLabel>Short challenge</SectionLabel>
          <p className="text-sm text-slate-300">{lesson.challenge.prompt}</p>
        </section>

        <section>
          <SectionLabel>Knowledge check</SectionLabel>
          <KnowledgeCheck questions={lesson.knowledgeCheck} onDone={() => setCheckDone(true)} />
        </section>
      </div>

      <div className="flex items-center gap-2 mt-8 flex-wrap">
        <Button onClick={markComplete}><Check size={15} /> {state.lessonStatus[lesson.id] === "completed" ? "Marked complete" : "Mark complete"}</Button>
        <Button variant="secondary" onClick={addToRevision}><RotateCcw size={15} /> Add to revision</Button>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
        <button
          disabled={!prevLesson}
          onClick={() => prevLesson && openLesson(prevLesson.id)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> {prevLesson ? prevLesson.title : "Start"}
        </button>
        <button
          disabled={!nextLesson}
          onClick={() => nextLesson && openLesson(nextLesson.id)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {nextLesson ? nextLesson.title : "End of path"} <ChevronRight size={16} />
        </button>
      </div>

      {showRevisionToast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900 border border-emerald-800 text-slate-100 text-sm px-4 py-3 rounded-lg shadow-lg">
          <CheckCircle2 size={16} className="text-emerald-400" />
          Added to revision queue
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   EXERCISES — list + adaptive exercise page
   ========================================================================= */

const EXERCISE_TYPE_LABEL = {
  write_code: "Write Code",
  debug: "Debug the Code",
  multiple_choice: "Multiple Choice",
  true_false: "True / False",
  predict_output: "Predict the Output",
  fill_blank: "Fill in the Blank",
  short_answer: "Short Answer",
};

function currentDifficultyLabel(state, topicId) {
  return state.topicDifficulty?.[topicId] || "standard";
}

const TRACK_FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "python", label: "Python Core" },
  { id: "cyber", label: "Cybersecurity" },
  { id: "hacking", label: "Ethical Hacking" },
  { id: "data", label: "Data / AI / ML" },
];

function ExercisesHome({ state, openExercise }) {
  const [trackFilter, setTrackFilter] = useState("all");

  const grouped = ALL_LESSONS
    .filter((l) => trackFilter === "all" || trackIdForLesson(l.id) === trackFilter)
    .map((l) => ({
      lesson: l,
      exercises: EXERCISES.filter((e) => e.topicId === l.id && !e.variantOf),
    })).filter((g) => g.exercises.length > 0);

  const totalSolved = Object.values(state.exerciseAttempts).filter((a) => a.solved).length;
  const totalDone = Object.keys(state.exerciseAttempts).length;
  const accuracy = totalDone > 0 ? Math.round((totalSolved / totalDone) * 100) : 0;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Exercises</h1>
          <p className="text-slate-500 text-sm mt-1">Short, focused problems across seven question types. Hints first, answers last.</p>
        </div>
        <div className="flex gap-2">
          <Pill tone="cyan"><Target size={11} /> {accuracy}% accuracy</Pill>
          <Pill tone="emerald"><CheckCircle2 size={11} /> {totalSolved} solved</Pill>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {TRACK_FILTER_OPTIONS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTrackFilter(t.id)}
            className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${trackFilter === t.id ? "border-cyan-500 bg-cyan-950/40 text-cyan-300" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {grouped.length === 0 && <EmptyHint>No exercises in this track yet.</EmptyHint>}

      {grouped.map(({ lesson, exercises }) => (
        <div key={lesson.id}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-slate-400">{lesson.title}</h2>
            <Pill tone={currentDifficultyLabel(state, lesson.id) === "harder" ? "rose" : currentDifficultyLabel(state, lesson.id) === "easier" ? "amber" : "slate"}>
              <Zap size={11} /> {currentDifficultyLabel(state, lesson.id)} difficulty
            </Pill>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {exercises.map((ex) => {
              const attempt = state.exerciseAttempts[ex.id];
              return (
                <Card key={ex.id} onClick={() => openExercise(ex.id)} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-sm">{ex.title}</h3>
                    {attempt?.solved && <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{ex.problem}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Pill tone={difficultyTone(ex.difficulty)}>{ex.difficulty}</Pill>
                    <Pill>{EXERCISE_TYPE_LABEL[ex.type || "write_code"]}</Pill>
                    {attempt && !attempt.solved && <Pill tone="amber">{attempt.attempts} attempt{attempt.attempts === 1 ? "" : "s"}</Pill>}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExercisePage({ exercise, state, updateState, go }) {
  const type = exercise.type || "write_code";
  const isCodeType = type === "write_code" || type === "debug";

  const [code, setCode] = useState(exercise.starter || "");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [boolAnswer, setBoolAnswer] = useState(null);
  const [blankAnswer, setBlankAnswer] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [hint, setHint] = useState(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [stage, setStage] = useState("working"); // working | wrong_once | explained | weak
  const [redirectVariant, setRedirectVariant] = useState(null);
  const startedAt = useRef(Date.now());

  const attempt = state.exerciseAttempts[exercise.id] || { attempts: 0, hintsUsed: 0, solved: false, timeSpentSec: 0 };

  useEffect(() => {
    setCode(exercise.starter || "");
    setSelectedIndex(null);
    setBoolAnswer(null);
    setBlankAnswer("");
    setShortAnswer("");
    setHint(null);
    setReview(null);
    setStage("working");
    setRedirectVariant(null);
    startedAt.current = Date.now();
    window.scrollTo({ top: 0 });
  }, [exercise.id]);

  const recordAttempt = (patch) => {
    updateState((s) => ({
      ...s,
      exerciseAttempts: {
        ...s.exerciseAttempts,
        [exercise.id]: {
          ...(s.exerciseAttempts[exercise.id] || { attempts: 0, hintsUsed: 0, solved: false, timeSpentSec: 0 }),
          topicId: exercise.topicId,
          difficulty: exercise.difficulty,
          type,
          ...patch,
        },
      },
    }));
  };

  const bumpDifficulty = (direction) => {
    updateState((s) => {
      const cur = s.topicDifficulty[exercise.topicId] || "standard";
      let next = cur;
      if (direction === "up") next = cur === "easier" ? "standard" : cur === "standard" ? "harder" : "harder";
      if (direction === "down") next = cur === "harder" ? "standard" : "easier";
      if (next === cur) return s;
      return { ...s, topicDifficulty: { ...s.topicDifficulty, [exercise.topicId]: next } };
    });
  };

  const markWeak = () => {
    updateState((s) => {
      const prev = s.weakAreas[exercise.topicId] || { fails: 0 };
      return {
        ...s,
        weakAreas: { ...s.weakAreas, [exercise.topicId]: { fails: prev.fails + 1, lastFail: Date.now(), label: (LESSONS.find((l) => l.id === exercise.topicId) || {}).title } },
        revisionQueue: s.revisionQueue.includes(exercise.topicId) ? s.revisionQueue : [...s.revisionQueue, exercise.topicId],
      };
    });
    bumpDifficulty("down");
  };

  const getHint = async () => {
    setHintLoading(true);
    recordAttempt({ hintsUsed: attempt.hintsUsed + 1 });
    if (!isCodeType && exercise.hint) {
      setHint(exercise.hint);
      setHintLoading(false);
      return;
    }
    try {
      const res = await callClaude(
        "You are a patient Python tutor. The learner is stuck on an exercise. Give ONE short, Socratic hint (max 2 sentences) that points toward their likely mistake WITHOUT giving the answer or writing code for them. Never reveal the full solution.",
        `Exercise: ${exercise.problem}\nRequirements: ${(exercise.requirements || []).join("; ")}\nLearner's current code:\n${code}`
      );
      setHint(res.trim());
    } catch (e) {
      setHint(exercise.hint || "Think about what each requirement is asking for, one at a time — which one does your code not yet satisfy?");
    }
    setHintLoading(false);
  };

  const timeSpentSec = () => Math.round((Date.now() - startedAt.current) / 1000) + (attempt.timeSpentSec || 0);

  const handleResult = (correct, feedback) => {
    setReview({ correct, feedback });
    const newAttempts = attempt.attempts + 1;
    if (correct) {
      const alreadySolved = attempt.solved;
      recordAttempt({ attempts: newAttempts, solved: true, timeSpentSec: timeSpentSec(), xpEarned: alreadySolved ? (attempt.xpEarned || 0) : (exercise.xp || 15) });
      if (!alreadySolved) {
        updateState((s) => logActivity({ ...s, xp: s.xp + (exercise.xp || 15) }, `Solved exercise: ${exercise.title}`, "exercise"));
        if (newAttempts === 1 && attempt.hintsUsed === 0) bumpDifficulty("up");
      }
      setStage("working");
    } else {
      recordAttempt({ attempts: newAttempts, solved: false, timeSpentSec: timeSpentSec() });
      if (stage === "working") {
        setStage("wrong_once");
      } else if (stage === "wrong_once") {
        const variant = EXERCISES.find((e) => e.variantOf === exercise.id);
        if (variant) {
          setStage("explained");
          setRedirectVariant(variant.id);
        } else {
          setStage("weak");
          markWeak();
        }
      } else {
        setStage("weak");
        markWeak();
      }
    }
  };

  const submitCode = async () => {
    setReviewLoading(true);
    try {
      const parsed = await callClaude(
        "You are an exercise grader for a Python learning platform. Respond ONLY with JSON: {\"correct\": boolean, \"feedback\": string}. feedback should be 1-3 sentences. If incorrect, explain the concept and WHY the approach fails, but do not provide corrected code or the full solution — that comes later if they keep struggling.",
        `Exercise: ${exercise.problem}\nRequirements: ${(exercise.requirements || []).join("; ")}\nExpected output for the example: ${exercise.example ? exercise.example.output : "n/a"}\nLearner's code:\n${code}`,
        { json: true }
      );
      handleResult(parsed.correct, parsed.feedback);
    } catch (e) {
      const h = heuristicExerciseCheck(code, exercise);
      handleResult(h.verdict === "likely_correct", h.feedback);
    }
    setReviewLoading(false);
  };

  const submitChoice = () => {
    const correct = selectedIndex === exercise.correctIndex;
    const feedback = correct
      ? "Correct — nice work."
      : stage === "working"
      ? (exercise.hint || "Not quite — reconsider each option carefully.")
      : `Correct answer: "${exercise.options[exercise.correctIndex]}". ${exercise.hint || ""}`;
    handleResult(correct, feedback);
  };

  const submitBool = () => {
    const correct = boolAnswer === exercise.correctAnswer;
    const feedback = correct
      ? "Correct — nice work."
      : stage === "working"
      ? (exercise.hint || "Not quite — reread the statement carefully.")
      : `The statement is actually ${exercise.correctAnswer ? "True" : "False"}. ${exercise.hint || ""}`;
    handleResult(correct, feedback);
  };

  const submitBlank = () => {
    const norm = blankAnswer.trim().toLowerCase();
    const correct = (exercise.acceptableAnswers || [exercise.correctAnswer]).some((a) => a.toLowerCase() === norm);
    const feedback = correct
      ? "Correct — nice work."
      : stage === "working"
      ? (exercise.hint || "Not quite — think about what keyword belongs there.")
      : `The missing word is "${exercise.correctAnswer}". ${exercise.hint || ""}`;
    handleResult(correct, feedback);
  };

  const submitShortAnswer = async () => {
    setReviewLoading(true);
    const norm = shortAnswer.trim().toLowerCase();
    const keywordHit = (exercise.acceptableAnswers || []).some((k) => norm.includes(k.toLowerCase()));
    try {
      const parsed = await callClaude(
        "You are grading a short conceptual answer on a Python learning platform. Respond ONLY with JSON: {\"correct\": boolean, \"feedback\": string}. Be lenient about exact wording — accept any answer that demonstrates real understanding of the underlying concept.",
        `Question: ${exercise.problem}\nLearner's answer: ${shortAnswer}`,
        { json: true }
      );
      handleResult(parsed.correct, parsed.feedback);
    } catch (e) {
      handleResult(keywordHit, keywordHit ? "That captures the key idea — nice work." : (exercise.hint || "Try to mention what specifically goes wrong or works differently."));
    }
    setReviewLoading(false);
  };

  const submit = () => {
    if (type === "multiple_choice" || type === "predict_output") return submitChoice();
    if (type === "true_false") return submitBool();
    if (type === "fill_blank") return submitBlank();
    if (type === "short_answer") return submitShortAnswer();
    return submitCode();
  };

  const canSubmit =
    (type === "multiple_choice" || type === "predict_output") ? selectedIndex !== null :
    type === "true_false" ? boolAnswer !== null :
    type === "fill_blank" ? blankAnswer.trim().length > 0 :
    type === "short_answer" ? shortAnswer.trim().length > 0 :
    code.trim().length > 0;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <button onClick={() => go("exercises")} className="text-xs text-slate-500 hover:text-slate-300 mb-4 flex items-center gap-1">
        <ChevronLeft size={14} /> Exercises
      </button>

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Pill tone={difficultyTone(exercise.difficulty)}>{exercise.difficulty}</Pill>
        <Pill>{EXERCISE_TYPE_LABEL[type]}</Pill>
        <Pill tone="cyan"><Zap size={11} /> {exercise.xp || 15} XP</Pill>
        {attempt.solved && <Pill tone="emerald"><Check size={11} /> Solved</Pill>}
        {exercise.variantOf && <Pill tone="amber">Adaptive retry</Pill>}
      </div>
      <h1 className="text-2xl font-semibold mb-4">{exercise.title}</h1>

      <Card className="p-4 mb-4">
        <SectionLabel>Problem</SectionLabel>
        <p className="text-sm text-slate-200 whitespace-pre-wrap mb-4">{exercise.problem}</p>
        {exercise.requirements && (
          <>
            <SectionLabel>Requirements</SectionLabel>
            <ul className="space-y-1 mb-4">
              {exercise.requirements.map((r, i) => <li key={i} className="text-sm text-slate-400 flex gap-2"><span className="text-cyan-500">•</span>{r}</li>)}
            </ul>
          </>
        )}
        {exercise.example && (
          <>
            <SectionLabel>Example</SectionLabel>
            <div className="grid grid-cols-2 gap-3 text-sm font-mono">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5"><div className="text-[10px] text-slate-500 mb-1 font-sans">INPUT</div>{exercise.example.input}</div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5"><div className="text-[10px] text-slate-500 mb-1 font-sans">OUTPUT</div>{exercise.example.output}</div>
            </div>
          </>
        )}
        {exercise.functionSignature && (
          <>
            <SectionLabel>Function signature</SectionLabel>
            <CodeBlock code={exercise.functionSignature} />
          </>
        )}
      </Card>

      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>Your answer</SectionLabel>
          {isCodeType && (
            <div className="flex gap-1.5">
              <button title="Copy starter code" onClick={() => navigator.clipboard.writeText(exercise.starter)} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><Copy size={13} /></button>
              <button title="Download exercise" onClick={() => downloadTextFile(`${exercise.id}.py`, `# ${exercise.title}\n# ${exercise.problem}\n\n${exercise.starter}`)} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><Download size={13} /></button>
            </div>
          )}
        </div>

        {isCodeType && (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            spellCheck={false}
            aria-label="Your code"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-cyan-600"
          />
        )}

        {(type === "multiple_choice" || type === "predict_output") && (
          <div className="grid gap-2" role="radiogroup" aria-label="Answer options">
            {exercise.options.map((opt, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={selectedIndex === i}
                onClick={() => !review && setSelectedIndex(i)}
                disabled={!!review}
                className={`text-left px-3 py-2.5 rounded-lg border text-sm font-mono transition-colors ${selectedIndex === i ? "border-cyan-500 bg-cyan-950/30" : "border-slate-700 hover:border-slate-600"} disabled:cursor-not-allowed`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {type === "true_false" && (
          <div className="flex gap-3" role="radiogroup" aria-label="True or false">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => !review && setBoolAnswer(v)}
                disabled={!!review}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${boolAnswer === v ? "border-cyan-500 bg-cyan-950/30" : "border-slate-700 hover:border-slate-600"} disabled:cursor-not-allowed`}
              >
                {v ? "True" : "False"}
              </button>
            ))}
          </div>
        )}

        {type === "fill_blank" && (
          <div className="space-y-3">
            <CodeBlock code={exercise.codeTemplate} />
            <input
              value={blankAnswer}
              onChange={(e) => setBlankAnswer(e.target.value)}
              disabled={!!review}
              placeholder="Type the missing keyword..."
              aria-label="Fill in the blank"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-cyan-600 disabled:opacity-60"
            />
          </div>
        )}

        {type === "short_answer" && (
          <textarea
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            disabled={!!review}
            rows={3}
            aria-label="Your answer"
            placeholder="Explain in your own words..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-600 disabled:opacity-60"
          />
        )}

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Button onClick={submit} disabled={reviewLoading || !canSubmit || !!review}>
            {reviewLoading ? <RefreshCw size={14} className="animate-spin" /> : <PlayCircle size={15} />} Check my answer
          </Button>
          <Button variant="secondary" onClick={getHint} disabled={hintLoading || !!review}>
            {hintLoading ? <RefreshCw size={14} className="animate-spin" /> : <Lightbulb size={15} />} Get a hint
          </Button>
        </div>
        {hint && (
          <div className="mt-3 flex gap-2 items-start bg-amber-950/30 border border-amber-900/50 rounded-lg p-3">
            <Lightbulb size={15} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-200">{hint}</p>
          </div>
        )}
      </Card>

      {isCodeType && exercise.tests && (
        <TestRunnerPanel code={code} tests={exercise.tests} hiddenTestCount={exercise.hiddenTestCount} />
      )}

      {review && (
        <Card className={`p-4 mb-4 ${review.correct ? "border-emerald-800 bg-emerald-950/20" : "border-rose-900/60 bg-rose-950/10"}`}>
          <div className="flex items-start gap-2">
            {review.correct ? <CheckCircle2 size={17} className="text-emerald-400 mt-0.5 shrink-0" /> : <X size={17} className="text-rose-400 mt-0.5 shrink-0" />}
            <div>
              <p className="text-sm font-medium mb-1">{review.correct ? "Correct" : "Not quite yet"}</p>
              <p className="text-sm text-slate-300">{review.feedback}</p>
            </div>
          </div>

          {!review.correct && stage === "wrong_once" && (
            <div className="mt-4">
              <Button size="sm" variant="secondary" onClick={() => setReview(null)}>
                <RefreshCw size={13} /> Try again
              </Button>
            </div>
          )}

          {!review.correct && stage === "explained" && redirectVariant && (
            <div className="mt-4 pt-4 border-t border-rose-900/40">
              <p className="text-sm text-slate-300 mb-3">Let's rebuild this with a fresh, similar exercise testing the same idea.</p>
              <Button variant="secondary" size="sm" onClick={() => go("exercise", { id: redirectVariant })}>
                Try the similar exercise <ArrowRight size={14} />
              </Button>
            </div>
          )}

          {!review.correct && stage === "weak" && (
            <div className="mt-4 pt-4 border-t border-rose-900/40">
              <p className="text-sm text-slate-300">
                This concept has been added to your <span className="text-amber-300">Revision Queue</span> — no penalty, just a flag to revisit it with fresh explanations soon.
              </p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={() => go("revision")}>Go to revision queue</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

/* =========================================================================
   PROJECTS
   ========================================================================= */

function ProjectsHome({ state, openProject, go }) {
  const completedCount = Object.values(state.projectStatus).filter((s) => s === "completed").length;
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Guidance fades as you advance — beginner projects hold your hand, advanced ones don't.</p>
        </div>
        <Pill tone="emerald"><Trophy size={11} /> {completedCount}/{BEGINNER_PROJECTS.length} completed</Pill>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {BEGINNER_PROJECTS.map((p) => {
          const unlocked = p.prereq.every((pr) => state.lessonStatus[pr] === "completed");
          const status = state.projectStatus[p.id] || "not_started";
          const stageStatus = getStageStatus(state, p.id);
          const stagesDone = PROJECT_STAGES.filter((s) => stageStatus[s]).length;
          return (
            <Card key={p.id} onClick={unlocked ? () => openProject(p.id) : undefined} className={`p-4 ${!unlocked ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-medium text-sm">{p.title}</h3>
                {status === "completed" ? <CheckCircle2 size={15} className="text-emerald-400" /> : !unlocked ? <Lock size={14} className="text-slate-600" /> : null}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{p.objective}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Pill tone="cyan">{p.guidance}</Pill>
                <Pill><Clock size={11} /> ~{p.minutes} min</Pill>
                <Pill tone="amber"><Zap size={11} /> {p.xpReward || 75} XP</Pill>
                {status === "in_progress" && <Pill tone="amber">In progress</Pill>}
                {stagesDone > 0 && <Pill tone="emerald">{stagesDone}/3 stages</Pill>}
                {!unlocked && <Pill><Lock size={11} /> Needs {p.prereq.map((pr) => (LESSONS.find((l) => l.id === pr) || {}).title).join(", ")}</Pill>}
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="p-5 border-violet-900/50 bg-violet-950/10">
        <div className="flex items-center gap-2 mb-1"><FlaskConical size={14} className="text-violet-400" /><h3 className="font-medium text-sm">Cybersecurity & Data/AI/ML projects</h3></div>
        <p className="text-sm text-slate-400 mb-3">Track-specific projects (log analysis, file integrity monitoring, security analytics, and more) live inside their own specialization tracks, alongside the lessons that build up to them.</p>
        {go && <Button variant="secondary" size="sm" onClick={() => go("tracks")}>View tracks <ArrowRight size={14} /></Button>}
      </Card>
    </div>
  );
}

const PROJECT_STAGES = ["guided", "semiGuided", "independent"];
const STAGE_META = {
  guided: { label: "Guided", desc: "Full instructions, milestones, hints, and starter code.", xpMultiplier: 1 },
  semiGuided: { label: "Semi-Guided", desc: "Requirements instead of exact steps — hints and a skeleton only if you ask.", xpMultiplier: 1.25 },
  independent: { label: "Independent", desc: "Just the spec and acceptance criteria. You design the implementation.", xpMultiplier: 1.5 },
};

function getStageStatus(state, projectId) {
  return state.projectStageStatus[projectId] || { guided: false, semiGuided: false, independent: false };
}
function isStageUnlocked(stageStatus, stage) {
  if (stage === "guided") return true;
  if (stage === "semiGuided") return stageStatus.guided;
  return stageStatus.semiGuided;
}

function ProjectPage({ project, state, updateState, go }) {
  const status = state.projectStatus[project.id] || "not_started";
  const checklist = state.projectChecklist[project.id] || {};
  const stageStatus = getStageStatus(state, project.id);
  const stage = state.projectStage[project.id] || "guided";
  const milestoneProgress = state.projectMilestoneProgress[project.id] || project.milestones.map(() => false);
  const extensionsDone = state.projectExtensionsDone[project.id] || {};
  const workspaceCode = state.projectCode[project.id] !== undefined ? state.projectCode[project.id] : (stage === "guided" ? project.starter : "");
  const [revealMilestones, setRevealMilestones] = useState(stage === "guided");
  const [revealSkeleton, setRevealSkeleton] = useState(false);

  useEffect(() => {
    if (status === "not_started") {
      updateState((s) => logActivity({ ...s, projectStatus: { ...s.projectStatus, [project.id]: "in_progress" }, xp: s.xp + 5 }, `Started project: ${project.title}`, "project"));
    }
    setRevealMilestones(stage === "guided");
    setRevealSkeleton(false);
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line
  }, [project.id]);

  const setStage = (s) => {
    if (!isStageUnlocked(stageStatus, s)) return;
    updateState((prev) => ({ ...prev, projectStage: { ...prev.projectStage, [project.id]: s } }));
    setRevealMilestones(s === "guided");
    setRevealSkeleton(false);
  };

  const toggleCheck = (item) => {
    updateState((s) => ({
      ...s,
      projectChecklist: { ...s.projectChecklist, [project.id]: { ...(s.projectChecklist[project.id] || {}), [item]: !(s.projectChecklist[project.id] || {})[item] } },
    }));
  };

  const completeMilestone = (i) => {
    updateState((s) => {
      const cur = s.projectMilestoneProgress[project.id] || project.milestones.map(() => false);
      if (cur[i]) return s; // already awarded — one-way, prevents XP farming via toggling
      const next = [...cur];
      next[i] = true;
      return { ...s, projectMilestoneProgress: { ...s.projectMilestoneProgress, [project.id]: next }, xp: s.xp + 5 };
    });
  };

  const completeExtension = (ext) => {
    updateState((s) => {
      const cur = s.projectExtensionsDone[project.id] || {};
      if (cur[ext]) return s; // already awarded — one-way
      const updated = { ...s, projectExtensionsDone: { ...s.projectExtensionsDone, [project.id]: { ...cur, [ext]: true } }, xp: s.xp + 10 };
      return logActivity(updated, `Completed extension challenge: ${ext.slice(0, 40)}`, "project");
    });
  };

  const setWorkspaceCode = (val) => {
    updateState((s) => ({ ...s, projectCode: { ...s.projectCode, [project.id]: val } }));
  };

  const allChecked = project.checklist.every((c) => checklist[c]);

  const completeStage = () => {
    updateState((s) => {
      const already = (s.projectStageStatus[project.id] || {})[stage];
      const mult = STAGE_META[stage].xpMultiplier;
      const xpGain = already ? 0 : Math.round((project.xpReward || 75) * mult);
      let next = {
        ...s,
        projectStageStatus: { ...s.projectStageStatus, [project.id]: { ...getStageStatus(s, project.id), [stage]: true } },
        projectStatus: { ...s.projectStatus, [project.id]: "completed" },
        xp: s.xp + xpGain,
      };
      if (!already) next = logActivity(next, `Completed ${STAGE_META[stage].label} stage: ${project.title}`, "project");
      return next;
    });
  };

  const referenceMatches = REFERENCE.filter((r) => project.skills.some((sk) => r.term.toLowerCase().includes(sk.toLowerCase()) || r.category.toLowerCase().includes(sk.toLowerCase())));
  const skeleton = project.starter.split("\n").slice(0, 3).join("\n") + "\n    pass  # your implementation";

  const zipNote = `# ${project.title} — starter (${STAGE_META[stage].label} stage)\n# Objective: ${project.objective}\n\n${stage === "guided" ? project.starter : stage === "semiGuided" ? skeleton : "# Independent stage — design your own structure.\n# " + project.objective}\n`;

  const reviewThisProject = () => {
    go("reviewer", { context: `${project.title} (${STAGE_META[stage].label})`, code: workspaceCode });
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <button onClick={() => go("projects")} className="text-xs text-slate-500 hover:text-slate-300 mb-4 flex items-center gap-1">
        <ChevronLeft size={14} /> Projects
      </button>

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Pill tone="cyan">{project.guidance}</Pill>
        <Pill><Clock size={11} /> ~{project.minutes} min</Pill>
        <Pill tone="amber"><Zap size={11} /> {Math.round((project.xpReward || 75) * STAGE_META[stage].xpMultiplier)} XP this stage</Pill>
        {status === "completed" && <Pill tone="emerald"><Check size={11} /> Completed</Pill>}
      </div>
      <h1 className="text-2xl font-semibold mb-1">{project.title}</h1>
      <p className="text-slate-400 text-sm mb-4">{project.objective}</p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.skills.map((s) => <Pill key={s}>{s}</Pill>)}
      </div>

      {/* Stage selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {PROJECT_STAGES.map((s) => {
          const unlocked = isStageUnlocked(stageStatus, s);
          const done = stageStatus[s];
          return (
            <button
              key={s}
              onClick={() => setStage(s)}
              disabled={!unlocked}
              className={`text-left p-3 rounded-lg border transition-colors ${stage === s ? "border-cyan-500 bg-cyan-950/30" : unlocked ? "border-slate-700 hover:border-slate-600" : "border-slate-800 opacity-50 cursor-not-allowed"}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {done ? <CheckCircle2 size={13} className="text-emerald-400" /> : unlocked ? <CircleDot size={13} className="text-cyan-400" /> : <Lock size={12} className="text-slate-600" />}
                <span className="text-xs font-medium">{STAGE_META[s].label}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug hidden sm:block">{STAGE_META[s].desc}</p>
            </button>
          );
        })}
      </div>

      <div className="space-y-8">
        <section>
          <SectionLabel>{stage === "independent" ? "Acceptance Criteria" : "Requirements"}</SectionLabel>
          <ul className="space-y-1.5">
            {project.requirements.map((r, i) => <li key={i} className="text-sm text-slate-300 flex gap-2"><span className="text-cyan-500">•</span>{r}</li>)}
          </ul>
        </section>

        {stage === "guided" && (
          <section>
            <SectionLabel>Suggested structure</SectionLabel>
            <CodeBlock code={project.structure} />
          </section>
        )}

        {stage !== "independent" && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Current milestone</SectionLabel>
              {stage === "semiGuided" && (
                <button onClick={() => setRevealMilestones((v) => !v)} className="text-xs text-cyan-400 hover:underline">{revealMilestones ? "Hide milestones" : "Reveal milestones"}</button>
              )}
            </div>
            {revealMilestones ? (
              <ol className="space-y-2">
                {project.milestones.map((m, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <button onClick={() => completeMilestone(i)} disabled={milestoneProgress[i]} className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 border transition-colors ${milestoneProgress[i] ? "bg-emerald-500 border-emerald-500 text-slate-950 cursor-default" : "bg-slate-800 border-slate-700 text-slate-400 hover:border-cyan-600"}`}>
                      {milestoneProgress[i] ? <Check size={11} /> : i + 1}
                    </button>
                    <span className={milestoneProgress[i] ? "text-slate-500 line-through" : "text-slate-300"}>{m}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyHint>Milestones hidden at this stage — work from requirements, and reveal them if you get stuck.</EmptyHint>
            )}
          </section>
        )}

        {stage !== "independent" && (
          <section>
            <SectionLabel>Hints</SectionLabel>
            <ul className="space-y-2">
              {project.hints.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" /> {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {stage === "independent" && (
          <section>
            <SectionLabel>Reference material</SectionLabel>
            {referenceMatches.length === 0 ? (
              <EmptyHint>Check the Reference Library for anything related to: {project.skills.join(", ")}.</EmptyHint>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {referenceMatches.slice(0, 6).map((r) => <Pill key={r.id}>{r.term}</Pill>)}
              </div>
            )}
          </section>
        )}

        {stage === "guided" && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Starter code</SectionLabel>
              <div className="flex gap-1.5">
                <button title="Copy" onClick={() => navigator.clipboard.writeText(project.starter)} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><Copy size={13} /></button>
                <button title="Download project" onClick={() => downloadTextFile(`${project.id}.py`, zipNote)} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><Download size={13} /></button>
              </div>
            </div>
            <CodeBlock code={project.starter} />
          </section>
        )}

        {stage === "semiGuided" && (
          <section>
            <SectionLabel>Starter code</SectionLabel>
            {revealSkeleton ? (
              <CodeBlock code={skeleton} />
            ) : (
              <Card className="p-3 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">Starter code is withheld at this stage — you're working from requirements.</p>
                <Button size="sm" variant="secondary" onClick={() => setRevealSkeleton(true)}>I'm stuck — show a skeleton</Button>
              </Card>
            )}
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-2">
            <SectionLabel>Your workspace</SectionLabel>
            <div className="flex gap-1.5">
              <button title="Copy" onClick={() => navigator.clipboard.writeText(workspaceCode)} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><Copy size={13} /></button>
              <button title="Download" onClick={() => downloadTextFile(`${project.id}.py`, workspaceCode)} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><Download size={13} /></button>
            </div>
          </div>
          <textarea
            value={workspaceCode}
            onChange={(e) => setWorkspaceCode(e.target.value)}
            rows={12}
            spellCheck={false}
            aria-label="Project workspace code"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-cyan-600"
          />
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button variant="ai" size="sm" onClick={reviewThisProject}><Sparkles size={14} /> AI review this code</Button>
            <Button variant="secondary" size="sm" onClick={() => go("ide")}><Terminal size={14} /> Open in IDE guide</Button>
            <Button variant="secondary" size="sm" onClick={() => go("git")}><ListChecks size={14} /> Git checklist</Button>
            <Button variant="secondary" size="sm" onClick={() => downloadTextFile(`${project.id}.py`, workspaceCode)}><Download size={14} /> Download</Button>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <SectionLabel>Completion checklist</SectionLabel>
          <div className="space-y-2">
            {project.checklist.map((item) => (
              <label key={item} className="flex items-center gap-2.5 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" checked={!!checklist[item]} onChange={() => toggleCheck(item)} className="w-4 h-4 rounded accent-cyan-500" />
                {item}
              </label>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Extension challenges <span className="text-slate-600 font-normal">(+10 XP each)</span></SectionLabel>
          <div className="space-y-2">
            {project.extensions.map((e, i) => (
              <label key={i} className="flex items-start gap-2.5 text-sm cursor-pointer">
                <input type="checkbox" checked={!!extensionsDone[e]} disabled={!!extensionsDone[e]} onChange={() => completeExtension(e)} className="w-4 h-4 rounded accent-violet-500 mt-0.5" />
                <span className={extensionsDone[e] ? "text-slate-500 line-through" : "text-slate-400"}>{e}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 flex items-center gap-3 flex-wrap">
        <Button onClick={completeStage} disabled={!allChecked && !stageStatus[stage]}>
          <Trophy size={15} /> {stageStatus[stage] ? `${STAGE_META[stage].label} completed` : `Mark ${STAGE_META[stage].label} stage complete`}
        </Button>
        {!allChecked && !stageStatus[stage] && <span className="text-xs text-slate-500">Check off every completion item first</span>}
      </div>
    </div>
  );
}

/* =========================================================================
   REVISION QUEUE
   ========================================================================= */

function timeAgo(ts) {
  if (!ts) return "recently";
  const diffMin = Math.round((Date.now() - ts) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.round(diffHr / 24)}d ago`;
}

function RevisionHome({ state, updateState, go }) {
  const items = state.revisionQueue.map((id) => {
    const lesson = LESSONS.find((l) => l.id === id);
    const weak = state.weakAreas[id];
    const fails = weak ? weak.fails : 0;
    const status = fails >= 2 ? "Weak" : fails === 1 ? "Needs review" : "Almost mastered";
    const mastery = Math.max(5, 60 - fails * 20);
    const reason = fails >= 2
      ? `Missed ${fails} exercises in a row on this topic.`
      : fails === 1
      ? "Missed a recent exercise on this topic."
      : "Added manually for extra review.";
    const recommendedAction = fails >= 2 ? "Full revision session recommended" : "Quick refresher recommended";
    const difficulty = state.topicDifficulty[id] || "standard";
    return { id, lesson, fails, status, mastery, reason, recommendedAction, difficulty };
  }).sort((a, b) => b.fails - a.fails);

  const clearItem = (id) => {
    updateState((s) => {
      let next = {
        ...s,
        revisionQueue: s.revisionQueue.filter((x) => x !== id),
        weakAreas: Object.fromEntries(Object.entries(s.weakAreas).filter(([k]) => k !== id)),
        masteredTopics: s.masteredTopics.includes(id) ? s.masteredTopics : [...s.masteredTopics, id],
        xp: s.xp + 20,
        revisionMasteredCount: (s.revisionMasteredCount || 0) + 1,
      };
      const lesson = LESSONS.find((l) => l.id === id);
      next = logActivity(next, `Mastered revision topic: ${lesson ? lesson.title : id}`, "revision");
      return next;
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Revision Queue</h1>
        <p className="text-slate-500 text-sm mt-1">Prioritized by failures, recency, and prerequisite importance.</p>
      </div>

      {items.length === 0 ? (
        <Card className="p-8 text-center">
          <RotateCcw size={28} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Nothing to revise right now — your queue clears itself as you build mastery.</p>
          {(state.revisionMasteredCount || 0) > 0 && (
            <p className="text-xs text-emerald-400 mt-2">You've cleared {state.revisionMasteredCount} topic{state.revisionMasteredCount === 1 ? "" : "s"} from revision so far.</p>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map(({ id, lesson, status, mastery, reason, recommendedAction, difficulty }) => (
            <Card key={id} className="p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Pill tone={status === "Weak" ? "rose" : status === "Needs review" ? "amber" : "emerald"}>{status}</Pill>
                    <Pill>{difficulty} difficulty</Pill>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{lesson ? lesson.title : id}</h3>
                  <p className="text-xs text-slate-500 mb-2">{reason}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-500 w-20 shrink-0">Mastery</span>
                    <div className="flex-1 max-w-[140px]"><Bar pct={mastery} colorClass={mastery > 40 ? "bg-amber-400" : "bg-rose-400"} height="h-1.5" /></div>
                    <span className="text-xs text-slate-500">{mastery}%</span>
                  </div>
                  <p className="text-xs text-cyan-400">{recommendedAction}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="secondary" onClick={() => clearItem(id)}>Mark mastered</Button>
                  <Button size="sm" onClick={() => go("revisionSession", { id })}>Start revision</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function RevisionSession({ topicId, state, updateState, go }) {
  const lesson = LESSONS.find((l) => l.id === topicId);
  const easy = EXERCISES.find((e) => e.topicId === topicId && e.difficulty === "Easy" && !e.variantOf) || EXERCISES.find((e) => e.topicId === topicId);
  const medium = EXERCISES.find((e) => e.topicId === topicId && e.variantOf) || easy;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ easy: "", medium: "" });
  const [results, setResults] = useState({});

  if (!lesson) return null;

  const check = async (key, exercise) => {
    const h = heuristicExerciseCheck(answers[key], exercise);
    setResults((r) => ({ ...r, [key]: h }));
  };

  const finish = () => {
    updateState((s) => logActivity({ ...s, xp: s.xp + 30 }, `Ran a revision session: ${lesson.title}`, "revision"));
    go("revision");
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto pb-24">
      <button onClick={() => go("revision")} className="text-xs text-slate-500 hover:text-slate-300 mb-4 flex items-center gap-1">
        <ChevronLeft size={14} /> Revision Queue
      </button>
      <h1 className="text-2xl font-semibold mb-1">Revision: {lesson.title}</h1>
      <p className="text-slate-500 text-sm mb-6">Quick explanation → easy question → medium question → challenge.</p>

      <Card className="p-4 mb-4">
        <SectionLabel>Quick refresher</SectionLabel>
        <p className="text-sm text-slate-300">{lesson.concept}</p>
        <p className="text-sm text-slate-400 mt-2">{lesson.analogy}</p>
      </Card>

      {easy && (
        <Card className="p-4 mb-4">
          <SectionLabel>Easy question</SectionLabel>
          <p className="text-sm text-slate-200 mb-3">{easy.problem}</p>
          <textarea rows={4} value={answers.easy} onChange={(e) => setAnswers((a) => ({ ...a, easy: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm mb-2" />
          <Button size="sm" variant="secondary" onClick={() => check("easy", easy)}>Check</Button>
          {results.easy && <p className={`text-xs mt-2 ${results.easy.verdict === "likely_correct" ? "text-emerald-400" : "text-amber-300"}`}>{results.easy.feedback}</p>}
        </Card>
      )}

      {medium && (
        <Card className="p-4 mb-4">
          <SectionLabel>Medium question</SectionLabel>
          <p className="text-sm text-slate-200 mb-3">{medium.problem}</p>
          <textarea rows={4} value={answers.medium} onChange={(e) => setAnswers((a) => ({ ...a, medium: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm mb-2" />
          <Button size="sm" variant="secondary" onClick={() => check("medium", medium)}>Check</Button>
          {results.medium && <p className={`text-xs mt-2 ${results.medium.verdict === "likely_correct" ? "text-emerald-400" : "text-amber-300"}`}>{results.medium.feedback}</p>}
        </Card>
      )}

      <Card className="p-4 mb-4">
        <SectionLabel>Challenge question</SectionLabel>
        <p className="text-sm text-slate-300">{lesson.challenge.prompt}</p>
      </Card>

      <Button onClick={finish}><Check size={15} /> Finish revision session</Button>
    </div>
  );
}

/* =========================================================================
   REFERENCE LIBRARY
   ========================================================================= */

function ReferenceHome({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const allCategories = ["All", ...new Set(REFERENCE.map((r) => r.category))];

  const filtered = REFERENCE.filter((r) =>
    (activeCategory === "All" || r.category === activeCategory) &&
    (!query.trim() ||
      r.term.toLowerCase().includes(query.toLowerCase()) ||
      r.category.toLowerCase().includes(query.toLowerCase()) ||
      r.definition.toLowerCase().includes(query.toLowerCase()))
  );

  const categories = [...new Set(filtered.map((r) => r.category))];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reference Library</h1>
        <p className="text-slate-500 text-sm mt-1">Quick lookups — not another course. {REFERENCE.length} entries across {allCategories.length - 1} categories.</p>
      </div>
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms — dictionary, for loop, JSON, regex, pytest, git..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-cyan-600"
        />
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${activeCategory === cat ? "border-cyan-500 bg-cyan-950/40 text-cyan-300" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <EmptyHint>No matches. Try a different term or category.</EmptyHint>}

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="text-xs font-medium text-slate-500 mb-2">{cat}</h2>
          <div className="space-y-2">
            {filtered.filter((r) => r.category === cat).map((r) => {
              const open = openId === r.id;
              return (
                <Card key={r.id} className="p-4">
                  <button onClick={() => setOpenId(open ? null : r.id)} className="w-full flex items-center justify-between text-left">
                    <div>
                      <h3 className="font-medium text-sm">{r.term}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{r.definition}</p>
                    </div>
                    <ChevronDown size={16} className={`text-slate-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="mt-4 space-y-3 border-t border-slate-800 pt-4">
                      <p className="text-sm text-slate-300">{r.explanation}</p>
                      {r.whenToUse && (
                        <div className="flex items-start gap-2 bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-2.5">
                          <Target size={13} className="text-cyan-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-cyan-200"><span className="font-medium">When to use it: </span>{r.whenToUse}</p>
                        </div>
                      )}
                      <div>
                        <SectionLabel>Syntax</SectionLabel>
                        <CodeBlock code={r.syntax} />
                      </div>
                      <div>
                        <SectionLabel>Example</SectionLabel>
                        <CodeBlock code={r.example} />
                      </div>
                      <div>
                        <SectionLabel>Common mistakes</SectionLabel>
                        <p className="text-sm text-slate-400">{r.mistakes}</p>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {r.related.map((rl) => <Pill key={rl}>{rl}</Pill>)}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   PROGRESS ANALYTICS
   ========================================================================= */

function TrackMasterySection({ title, icon: Icon, tone, lessons, state, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  if (lessons.length === 0) return null;
  const doneCount = lessons.filter((l) => state.lessonStatus[l.id] === "completed").length;
  const pct = Math.round((doneCount / lessons.length) * 100);
  return (
    <Card className="p-5">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <Icon size={15} className={tone} />
          <h3 className="font-medium">{title}</h3>
          <Pill>{doneCount}/{lessons.length}</Pill>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{pct}%</span>
          <ChevronDown size={16} className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-800">
          {lessons.map((l) => {
            const status = state.lessonStatus[l.id];
            const weak = state.weakAreas[l.id];
            let label = "Not started", labelTone = "slate", pctVal = 0;
            if (weak) { label = "Weak area"; labelTone = "rose"; pctVal = 30; }
            else if (status === "completed") { label = "Completed"; labelTone = "emerald"; pctVal = 100; }
            else if (status === "in_progress") { label = "In progress"; labelTone = "amber"; pctVal = 50; }
            return (
              <div key={l.id} className="flex items-center gap-3">
                <span className="text-sm text-slate-300 w-40 shrink-0 truncate">{l.title}</span>
                <div className="flex-1"><Bar pct={pctVal} colorClass={labelTone === "rose" ? "bg-rose-400" : labelTone === "emerald" ? "bg-emerald-400" : labelTone === "amber" ? "bg-amber-400" : "bg-slate-700"} height="h-1.5" /></div>
                <Pill tone={labelTone}>{label}</Pill>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function ProgressHome({ state }) {
  const coreDone = LESSONS.filter((l) => state.lessonStatus[l.id] === "completed").length;
  const corePct = Math.round((coreDone / LESSONS.length) * 100);
  const cyberPct = Math.round(curriculumProgress(state, CYBER_LESSONS) * 100);
  const hackingPct = Math.round(curriculumProgress(state, HACKING_LESSONS) * 100);
  const dataPct = Math.round(curriculumProgress(state, DATA_LESSONS) * 100);
  const cyberStatus = getTrackStatus(state, "cyber").status;
  const hackingStatus = getTrackStatus(state, "hacking").status;
  const dataStatus = getTrackStatus(state, "data").status;
  const aiCyberStatus = getTrackStatus(state, "aiCyber").status;
  const totalAttempts = Object.values(state.exerciseAttempts).reduce((a, b) => a + b.attempts, 0);
  const solvedCount = Object.values(state.exerciseAttempts).filter((a) => a.solved).length;
  const accuracy = totalAttempts > 0 ? Math.round((solvedCount / Math.max(1, Object.keys(state.exerciseAttempts).length)) * 100) : 0;
  const projectsDone = Object.values(state.projectStatus).filter((s) => s === "completed").length;
  const recentAchievements = ACHIEVEMENTS_CATALOG.filter((a) => state.achievements.includes(a.id)).slice(-4);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Progress</h1>
        <p className="text-slate-500 text-sm mt-1">Competency-based — not just time spent.</p>
      </div>

      <Card className="p-5 space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1.5"><span className="flex items-center gap-1.5"><Code2 size={14} /> Python Core</span><span className="text-slate-500">{corePct}%</span></div>
          <Bar pct={corePct} colorClass="bg-cyan-400" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5 text-slate-500"><span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Cybersecurity</span><span>{cyberStatus === "locked" ? "Locked" : `${cyberPct}%`}</span></div>
          <Bar pct={cyberStatus === "locked" ? 0 : cyberPct} colorClass="bg-violet-400" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5 text-slate-500"><span className="flex items-center gap-1.5"><KeyRound size={14} /> Ethical Hacking</span><span>{hackingStatus === "locked" ? "Locked" : `${hackingPct}%`}</span></div>
          <Bar pct={hackingStatus === "locked" ? 0 : hackingPct} colorClass="bg-rose-400" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5 text-slate-500"><span className="flex items-center gap-1.5"><Brain size={14} /> Data / AI / ML</span><span>{dataStatus === "locked" ? "Locked" : `${dataPct}%`}</span></div>
          <Bar pct={dataStatus === "locked" ? 0 : dataPct} colorClass="bg-emerald-400" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5 text-slate-500"><span className="flex items-center gap-1.5"><FlaskConical size={14} /> AI + Cybersecurity</span><span>{aiCyberStatus === "locked" ? "Locked" : aiCyberStatus === "completed" ? "Completed" : "Available"}</span></div>
          <Bar pct={aiCyberStatus === "locked" ? 0 : aiCyberStatus === "completed" ? 100 : 20} colorClass="bg-amber-400" />
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4"><div className="text-xs text-slate-500 mb-1">Exercise accuracy</div><div className="text-xl font-semibold">{accuracy}%</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500 mb-1">Projects done</div><div className="text-xl font-semibold">{projectsDone}/{ALL_PROJECTS.length}</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500 mb-1">Total study time</div><div className="text-xl font-semibold">{state.totalMinutes}m</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500 mb-1">Topics mastered</div><div className="text-xl font-semibold">{state.masteredTopics.length}</div></Card>
      </div>

      <div>
        <h2 className="text-sm font-medium text-slate-400 mb-3">Topic mastery by track</h2>
        <div className="space-y-3">
          <TrackMasterySection title="Python Core" icon={Code2} tone="text-cyan-400" lessons={LESSONS} state={state} defaultOpen />
          <TrackMasterySection title="Cybersecurity" icon={ShieldCheck} tone="text-violet-400" lessons={CYBER_LESSONS} state={state} />
          <TrackMasterySection title="Ethical Hacking" icon={KeyRound} tone="text-rose-400" lessons={HACKING_LESSONS} state={state} />
          <TrackMasterySection title="Data / AI / ML" icon={Brain} tone="text-emerald-400" lessons={DATA_LESSONS} state={state} />
        </div>
      </div>

      {recentAchievements.length > 0 && (
        <Card className="p-5">
          <h3 className="font-medium mb-4">Recent milestones</h3>
          <div className="flex flex-wrap gap-2">
            {recentAchievements.map((a) => <Pill key={a.id} tone="amber"><Award size={11} /> {a.title}</Pill>)}
          </div>
        </Card>
      )}

      <Card className="p-5">
        <h3 className="font-medium mb-4">Weekly goal</h3>
        <div className="flex justify-between text-sm mb-1.5"><span>{state.weeklyMinutes} min this week</span><span className="text-slate-500">goal {state.weeklyGoalMinutes} min</span></div>
        <Bar pct={(state.weeklyMinutes / state.weeklyGoalMinutes) * 100} colorClass="bg-cyan-400" />
      </Card>
    </div>
  );
}

/* =========================================================================
   AI CODE REVIEWER
   ========================================================================= */

const REVIEW_ICONS = {
  correct: { icon: Check, tone: "emerald", label: "Correct" },
  improvement: { icon: AlertTriangle, tone: "amber", label: "Improvement" },
  bug: { icon: Bug, tone: "rose", label: "Bug" },
  security: { icon: ShieldAlert, tone: "violet", label: "Security concern" },
  suggestion: { icon: Lightbulb, tone: "cyan", label: "Suggestion" },
};

const SEVERITY_TONE = { high: "rose", medium: "amber", low: "slate", info: "emerald" };

function countCategories(findings) {
  const counts = { correct: 0, improvement: 0, bug: 0, security: 0, suggestion: 0 };
  (findings || []).forEach((f) => { if (counts[f.category] !== undefined) counts[f.category] += 1; });
  return counts;
}

function ReviewerHome({ state, updateState, contextLabel, contextCode, onReviewComplete }) {
  const [code, setCode] = useState(contextCode || 'def calculate_discount(price, percent=10):\n    total = price - (price * percent / 100)\n    return total\n\ntry:\n    print(calculate_discount(100))\nexcept:\n    pass');
  const [findings, setFindings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compareId, setCompareId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const history = state.codeReviewHistory || [];
  const priorForContext = contextLabel ? history.filter((h) => h.context === contextLabel) : [];
  const previousReview = priorForContext[priorForContext.length - 1];

  const review = async () => {
    setLoading(true);
    setFindings(null);
    let resultFindings;
    try {
      const parsed = await callClaude(
        "You are an AI code reviewer inside a Python learning platform. Review the learner's code like a thoughtful senior engineer teaching a junior. Evaluate correctness, bugs, logic problems, code quality, readability, structure, Python best practices (PEP 8), security concerns, potential edge cases, maintainability, appropriate type hints, and performance where relevant. Respond ONLY with JSON: {\"findings\": [{\"category\": one of [\"correct\",\"improvement\",\"bug\",\"security\",\"suggestion\"], \"severity\": one of [\"high\",\"medium\",\"low\",\"info\"], \"concept\": short concept name or null, \"text\": what was noticed and why it matters (1-2 sentences), \"nextStep\": a hint or suggested next step, never a full rewrite (1 sentence, or null for 'correct' findings)}]}. Do NOT rewrite their whole program or hand them corrected code — only show a tiny inline example when genuinely necessary to explain a concept, never the fix itself. Give 3-6 findings ordered by severity (high first). Always include at least one 'correct' finding if something is done well.",
        `${contextLabel ? `Context: ${contextLabel}\n` : ""}Learner's code:\n${code}`,
        { json: true }
      );
      resultFindings = parsed.findings || [];
    } catch (e) {
      resultFindings = heuristicCodeReview(code).map((f) => ({ category: f.cat, severity: f.severity, concept: f.concept, text: f.text, nextStep: f.nextStep }));
    }
    setFindings(resultFindings);
    const entry = {
      id: `rev-${Date.now()}`,
      at: Date.now(),
      context: contextLabel || "Free-form review",
      snippet: code.slice(0, 80),
      findings: resultFindings,
      categories: countCategories(resultFindings),
    };
    updateState((s) => ({ ...s, codeReviewHistory: [...s.codeReviewHistory.slice(-19), entry] }));
    if (onReviewComplete) onReviewComplete(resultFindings);
    setLoading(false);
  };

  const bugSecurityDelta = () => {
    if (!previousReview || !findings) return null;
    const prevBad = previousReview.categories.bug + previousReview.categories.security;
    const curCounts = countCategories(findings);
    const curBad = curCounts.bug + curCounts.security;
    return prevBad - curBad;
  };
  const delta = bugSecurityDelta();

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24 space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-violet-400" />
            <h1 className="text-2xl font-semibold">AI Code Reviewer</h1>
          </div>
          <p className="text-slate-500 text-sm">{contextLabel ? `Reviewing: ${contextLabel}` : "Paste any Python code. You'll get a tutor's read, not a rewrite."}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setShowHistory((v) => !v)}>
          <ListChecks size={14} /> History ({history.length})
        </Button>
      </div>

      {showHistory && (
        <Card className="p-4">
          <SectionLabel>Review history</SectionLabel>
          {history.length === 0 ? (
            <EmptyHint>Your past reviews will appear here.</EmptyHint>
          ) : (
            <div className="space-y-2">
              {[...history].reverse().map((h) => (
                <button key={h.id} onClick={() => setCompareId(compareId === h.id ? null : h.id)} className="w-full text-left px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm text-slate-200">{h.context}</span>
                    <span className="text-xs text-slate-600">{timeAgo(h.at)}</span>
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {h.categories.bug > 0 && <Pill tone="rose">{h.categories.bug} bug</Pill>}
                    {h.categories.security > 0 && <Pill tone="violet">{h.categories.security} security</Pill>}
                    {h.categories.improvement > 0 && <Pill tone="amber">{h.categories.improvement} improvement</Pill>}
                    {h.categories.suggestion > 0 && <Pill tone="cyan">{h.categories.suggestion} suggestion</Pill>}
                    {h.categories.correct > 0 && <Pill tone="emerald">{h.categories.correct} correct</Pill>}
                  </div>
                  {compareId === h.id && (
                    <div className="mt-2 pt-2 border-t border-slate-800 space-y-1.5">
                      {h.findings.map((f, i) => (
                        <p key={i} className="text-xs text-slate-400">• {f.text}</p>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card className="p-4">
        <SectionLabel>Your code</SectionLabel>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={12}
          spellCheck={false}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-violet-600"
        />
        <Button variant="ai" className="mt-3" onClick={review} disabled={loading || !code.trim()}>
          {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />} Review my code
        </Button>
      </Card>

      {findings && (
        <>
          {delta !== null && delta !== 0 && (
            <Card className={`p-3 flex items-center gap-2 ${delta > 0 ? "border-emerald-800 bg-emerald-950/20" : "border-amber-800 bg-amber-950/20"}`}>
              {delta > 0 ? <TrendingUp size={15} className="text-emerald-400" /> : <AlertTriangle size={15} className="text-amber-400" />}
              <p className="text-sm text-slate-300">
                {delta > 0 ? `Improved — ${delta} fewer bug/security finding${delta === 1 ? "" : "s"} than your last review of this.` : `${Math.abs(delta)} more bug/security finding${Math.abs(delta) === 1 ? "" : "s"} than last time — worth a closer look.`}
              </p>
            </Card>
          )}
          <div className="space-y-2.5">
            {findings.map((f, i) => {
              const meta = REVIEW_ICONS[f.category] || REVIEW_ICONS.suggestion;
              const Icon = meta.icon;
              return (
                <Card key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      meta.tone === "emerald" ? "bg-emerald-950 text-emerald-400" :
                      meta.tone === "amber" ? "bg-amber-950 text-amber-400" :
                      meta.tone === "rose" ? "bg-rose-950 text-rose-400" :
                      meta.tone === "violet" ? "bg-violet-950 text-violet-400" : "bg-cyan-950 text-cyan-400"
                    }`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Pill tone={meta.tone}>{meta.label}</Pill>
                        {f.severity && f.severity !== "info" && <Pill tone={SEVERITY_TONE[f.severity]}>{f.severity} severity</Pill>}
                        {f.concept && <Pill>{f.concept}</Pill>}
                      </div>
                      <p className="text-sm text-slate-300 mt-1.5">{f.text}</p>
                      {f.nextStep && (
                        <div className="flex items-start gap-1.5 mt-2">
                          <ArrowRight size={12} className="text-slate-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-slate-400">{f.nextStep}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================================================
   TRACKS
   ========================================================================= */

const TRACK_STATUS_META = {
  locked: { label: "Locked", tone: "slate", icon: Lock },
  available: { label: "Available", tone: "cyan", icon: CircleDot },
  in_progress: { label: "In Progress", tone: "amber", icon: CircleDot },
  completed: { label: "Completed", tone: "emerald", icon: CheckCircle2 },
};

function TracksHome({ state, go }) {
  const pythonPct = Math.round(curriculumProgress(state, LESSONS) * 100);
  const cyberPct = Math.round(curriculumProgress(state, CYBER_LESSONS) * 100);
  const hackingPct = Math.round(curriculumProgress(state, HACKING_LESSONS) * 100);
  const dataPct = Math.round(curriculumProgress(state, DATA_LESSONS) * 100);

  const pythonInfo = getTrackStatus(state, "python");
  const cyberInfo = getTrackStatus(state, "cyber");
  const hackingInfo = getTrackStatus(state, "hacking");
  const dataInfo = getTrackStatus(state, "data");
  const aiCyberInfo = getTrackStatus(state, "aiCyber");

  const cards = [
    { id: "python", title: "Python Core", icon: Code2, color: "cyan", pct: pythonPct, info: pythonInfo, desc: "The shared foundation — every other track builds on this." },
    { id: "cyber", title: "Cybersecurity", icon: ShieldCheck, color: "violet", pct: cyberPct, info: cyberInfo, desc: "Networking, sockets, log analysis, cryptography, and secure coding." },
    { id: "hacking", title: "Ethical Hacking", icon: KeyRound, color: "rose", pct: hackingPct, info: hackingInfo, desc: "Applying Cybersecurity foundations practically — recon, web security, wireless and network concepts, always concept-and-defense first." },
    { id: "data", title: "Data / AI / ML", icon: Brain, color: "emerald", pct: dataPct, info: dataInfo, desc: "NumPy, pandas, visualization, statistics, ML foundations, and neural networks." },
    { id: "aiCyber", title: "AI + Cybersecurity", icon: FlaskConical, color: "amber", pct: null, info: aiCyberInfo, desc: "The advanced combined specialization — defensive AI-assisted security analysis." },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Specialization Tracks</h1>
        <p className="text-slate-500 text-sm mt-1">Python Core stays shared underneath everything. Nothing here is ever permanently blocked — tracks unlock as you build the prerequisites.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          const statusMeta = TRACK_STATUS_META[c.info.status];
          const StatusIcon = statusMeta.icon;
          const locked = c.info.status === "locked";
          return (
            <Card key={c.id} className={`p-5 ${locked ? "opacity-80" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className={
                  c.color === "cyan" ? "text-cyan-400" :
                  c.color === "violet" ? "text-violet-400" :
                  c.color === "emerald" ? "text-emerald-400" :
                  c.color === "rose" ? "text-rose-400" : "text-amber-400"
                } />
                <h3 className="font-medium">{c.title}</h3>
                <span className="ml-auto">
                  <Pill tone={statusMeta.tone}><StatusIcon size={11} /> {statusMeta.label}</Pill>
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{c.desc}</p>
              {c.pct !== null && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Progress</span><span>{c.pct}%</span></div>
                  <Bar pct={c.pct} colorClass={locked ? "bg-slate-600" : "bg-cyan-400"} />
                </div>
              )}
              <p className="text-xs text-slate-500 mb-4">{c.info.reason}</p>
              <Button
                size="sm"
                variant={locked ? "secondary" : "primary"}
                disabled={locked}
                onClick={() => go("trackHome", { track: c.id })}
              >
                {locked ? <Lock size={13} /> : <ArrowRight size={13} />} {locked ? "Locked" : "Enter track"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function TrackHome({ state, track, go, openLesson, openProject }) {
  const meta = TRACKS_META[track];
  const info = getTrackStatus(state, track);
  const pct = meta.lessons.length ? Math.round(curriculumProgress(state, meta.lessons) * 100) : null;

  if (info.status === "locked") {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <button onClick={() => go("tracks")} className="text-xs text-slate-500 hover:text-slate-300 mb-4 flex items-center gap-1">
          <ChevronLeft size={14} /> Tracks
        </button>
        <Card className="p-8 text-center">
          <Lock size={28} className="text-slate-700 mx-auto mb-3" />
          <h1 className="text-xl font-semibold mb-2">{meta.label} is locked</h1>
          <p className="text-slate-400 text-sm mb-4">{info.reason}</p>
          <Button onClick={() => go("learn")}>Continue Python Core <ArrowRight size={14} /></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <button onClick={() => go("tracks")} className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
        <ChevronLeft size={14} /> Tracks
      </button>

      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">{meta.label}</h1>
          <p className="text-slate-500 text-sm mt-1">{info.reason}</p>
        </div>
        {pct !== null && <Pill tone={TRACK_STATUS_META[info.status].tone}>{pct}% complete</Pill>}
      </div>

      {track === "aiCyber" ? (
        <>
          <Card className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Cybersecurity</span><span>{Math.round(curriculumProgress(state, CYBER_LESSONS) * 100)}%</span></div>
                <Bar pct={curriculumProgress(state, CYBER_LESSONS) * 100} colorClass="bg-violet-400" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Data / AI / ML</span><span>{Math.round(curriculumProgress(state, DATA_LESSONS) * 100)}%</span></div>
                <Bar pct={curriculumProgress(state, DATA_LESSONS) * 100} colorClass="bg-emerald-400" />
              </div>
            </div>
          </Card>
          <div>
            <h2 className="text-sm font-medium text-slate-400 mb-3">Combined projects</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {CROSS_TRACK_PROJECTS.map((p) => {
                const unlocked = p.prereq.every((pr) => state.lessonStatus[pr] === "completed");
                const status = state.projectStatus[p.id] || "not_started";
                return (
                  <Card key={p.id} onClick={unlocked ? () => openProject(p.id) : undefined} className={`p-4 ${!unlocked ? "opacity-50" : ""}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-sm">{p.title}</h3>
                      {status === "completed" ? <CheckCircle2 size={15} className="text-emerald-400" /> : !unlocked ? <Lock size={14} className="text-slate-600" /> : null}
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{p.objective}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(p.skillsByDomain || {}).map(([domain, skills]) => (
                        <Pill key={domain} tone={domain === "cyber" ? "violet" : domain === "data" || domain === "ml" ? "emerald" : "cyan"}>{domain}: {skills.length}</Pill>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          <Card className="p-5 border-amber-900/50 bg-amber-950/10">
            <h3 className="font-medium text-sm mb-2">Project roadmap</h3>
            <div className="flex flex-wrap gap-2">
              {AI_CYBER_PROJECT_ROADMAP.map((name) => <Pill key={name}>{name}</Pill>)}
            </div>
          </Card>
        </>
      ) : (
        <>
          {meta.levels.map((level) => {
            const lessons = meta.lessons.filter((l) => l.levelId === level.id);
            const doneCount = lessons.filter((l) => state.lessonStatus[l.id] === "completed").length;
            return (
              <div key={level.id}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-slate-400">{meta.label} Level {level.num} — {level.title}</h2>
                  {lessons.length > 0 && <span className="text-xs text-slate-600">{doneCount}/{lessons.length} complete</span>}
                </div>
                {lessons.length === 0 ? (
                  <Card className="p-4 mb-2">
                    <p className="text-xs text-slate-500 mb-2">Full lessons for this level are still being built. Topics covered here:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {level.topics.map((t) => <Pill key={t}>{t}</Pill>)}
                    </div>
                  </Card>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lessons.map((lesson) => {
                      const unlocked = isLessonUnlocked(lesson, state);
                      const status = state.lessonStatus[lesson.id];
                      return (
                        <Card key={lesson.id} onClick={unlocked ? () => openLesson(lesson.id) : undefined} className={`p-4 ${!unlocked ? "opacity-50" : ""}`}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {status === "completed" ? <CheckCircle2 size={15} className="text-emerald-400" /> : unlocked ? <CircleDot size={15} className="text-cyan-400" /> : <Lock size={14} className="text-slate-600" />}
                                <h3 className="font-medium text-sm">{lesson.title}</h3>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2">{lesson.concept}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Pill tone={difficultyTone(lesson.difficulty)}>{lesson.difficulty}</Pill>
                            <Pill><Clock size={11} /> {lesson.minutes} min</Pill>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {meta.projects.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-slate-400 mb-3">{meta.label} projects</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {meta.projects.map((p) => {
                  const unlocked = p.prereq.every((pr) => state.lessonStatus[pr] === "completed");
                  const status = state.projectStatus[p.id] || "not_started";
                  return (
                    <Card key={p.id} onClick={unlocked ? () => openProject(p.id) : undefined} className={`p-4 ${!unlocked ? "opacity-50" : ""}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-sm">{p.title}</h3>
                        {status === "completed" ? <CheckCircle2 size={15} className="text-emerald-400" /> : !unlocked ? <Lock size={14} className="text-slate-600" /> : null}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">{p.objective}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Pill tone="cyan">{p.guidance}</Pill>
                        <Pill><Clock size={11} /> ~{p.minutes} min</Pill>
                        <Pill tone="amber"><Zap size={11} /> {p.xpReward || 75} XP</Pill>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {track === "data" && (
            <div>
              <h2 className="text-sm font-medium text-slate-400 mb-3">Sample datasets</h2>
              <p className="text-xs text-slate-600 mb-3">Small bundled datasets for learning — not claims about real-world data.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {DATASETS.map((d) => (
                  <Card key={d.id} className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-medium text-sm">{d.name}</h3>
                      <Pill tone={difficultyTone(d.difficulty)}>{d.difficulty}</Pill>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{d.description}</p>
                    <div className="space-y-1 text-xs text-slate-500">
                      <p><span className="text-slate-600">Source:</span> {d.source}</p>
                      <p><span className="text-slate-600">Features:</span> {d.features.join(", ")}</p>
                      <p><span className="text-slate-600">Target:</span> {d.target}</p>
                      <p><span className="text-slate-600">Size:</span> {d.size}</p>
                      <p><span className="text-slate-600">Objective:</span> {d.objective}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* =========================================================================
   IDE SETUP
   ========================================================================= */

function IDESetup({ go }) {
  const [ideTab, setIdeTab] = useState("pycharm");

  const sharedSteps = [
    { title: "Download the exercise or project", desc: "Use the Download button on any exercise or project page to get a starter .py file onto your machine." },
    { title: "Create a virtual environment", desc: "Open a terminal in your project folder and run: python -m venv .venv — this keeps dependencies isolated per project." },
    { title: "Activate it", desc: "macOS/Linux: source .venv/bin/activate — Windows: .venv\\Scripts\\activate" },
    { title: "Install dependencies", desc: "If a project has a requirements.txt, run: pip install -r requirements.txt" },
  ];

  const pycharmSteps = [
    { title: "Open the project in PyCharm", desc: "File → Open, then select the downloaded folder." },
    { title: "Set the interpreter", desc: "Settings → Project → Python Interpreter → Add Interpreter → select your .venv folder." },
    { title: "Run the program", desc: "Right-click the file in the Project panel → Run, or use the green ▷ button in the toolbar." },
    { title: "Test it", desc: "Try edge cases and bad input manually, or set up pytest for automated tests (see Reference Library)." },
  ];

  const vscodeSteps = [
    { title: "Open the project in VS Code", desc: "File → Open Folder, then select the downloaded folder." },
    { title: "Select the interpreter", desc: "Install the Python extension, then Cmd/Ctrl+Shift+P → \"Python: Select Interpreter\" → choose your .venv." },
    { title: "Run the program", desc: "Use the ▷ Run button top-right, or press F5 to run with the debugger attached." },
    { title: "Test it", desc: "Use the built-in terminal to run pytest, or step through with breakpoints via the Run and Debug panel." },
  ];

  const finalSteps = [
    { title: "Submit for review", desc: "Paste your finished code into the exercise, project workspace, or AI Code Reviewer here for feedback." },
    { title: "Push to GitHub", desc: "Once it's working, commit and push it — see the Git & GitHub guide for the exact commands." },
  ];

  const activeSteps = ideTab === "pycharm" ? pycharmSteps : vscodeSteps;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1"><Terminal size={18} className="text-cyan-400" /><h1 className="text-2xl font-semibold">IDE Setup</h1></div>
        <p className="text-slate-500 text-sm">This platform doesn't run Python in the browser, and can't reach into your local PyCharm or VS Code installation directly — you write and run code there, and bring it back here for review. (A future desktop companion or editor extension could close that loop — this workflow is the bridge until then.)</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: FileCode2, title: "PyCharm", desc: "Full-featured Python IDE with a built-in debugger and virtual env manager." },
          { icon: Code2, title: "VS Code", desc: "Lightweight editor — install the Python extension for linting, running, and debugging." },
          { icon: Github, title: "GitHub", desc: "Push finished projects to a repo to build a portfolio as you learn." },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="p-4">
            <Icon size={18} className="text-slate-400 mb-2" />
            <h3 className="font-medium text-sm mb-1">{title}</h3>
            <p className="text-xs text-slate-500">{desc}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="font-medium mb-4">Steps 1–4: get set up (same for either editor)</h3>
        <ol className="space-y-4">
          {sharedSteps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center text-xs shrink-0">{i + 1}</span>
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Steps 5–8: open, run, test</h3>
          <div className="flex gap-1.5">
            <button onClick={() => setIdeTab("pycharm")} className={`px-2.5 py-1 rounded-lg text-xs border ${ideTab === "pycharm" ? "border-cyan-500 bg-cyan-950/40 text-cyan-300" : "border-slate-700 text-slate-400"}`}>PyCharm</button>
            <button onClick={() => setIdeTab("vscode")} className={`px-2.5 py-1 rounded-lg text-xs border ${ideTab === "vscode" ? "border-cyan-500 bg-cyan-950/40 text-cyan-300" : "border-slate-700 text-slate-400"}`}>VS Code</button>
          </div>
        </div>
        <ol className="space-y-4">
          {activeSteps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center text-xs shrink-0">{i + 5}</span>
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-5">
        <h3 className="font-medium mb-4">Steps 8–9: submit and share</h3>
        <ol className="space-y-4">
          {finalSteps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-950 border border-violet-800 text-violet-300 flex items-center justify-center text-xs shrink-0">{i + 8}</span>
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        {go && <Button variant="secondary" size="sm" className="mt-4" onClick={() => go("git")}><GitBranch size={14} /> Open Git & GitHub guide</Button>}
      </Card>

      <Card className="p-5">
        <h3 className="font-medium mb-3">Common commands</h3>
        <CodeBlock code={"python -m venv .venv\nsource .venv/bin/activate      # macOS/Linux\n.venv\\Scripts\\activate         # Windows\npip install -r requirements.txt\npython main.py"} />
      </Card>

      <Card className="p-5 border-amber-900/50 bg-amber-950/10">
        <div className="flex items-center gap-2 mb-1"><FlaskConical size={14} className="text-amber-400" /><h3 className="font-medium text-sm">Future: real execution architecture</h3></div>
        <p className="text-sm text-slate-400">Today, code review and test results here are simulated by AI reasoning about your code, not run. A production version would execute submitted code inside an isolated container or sandboxed execution service — never directly on the main server — capturing stdout, stderr, and exit status, with timeouts and resource limits, and support for hidden tests. Until that exists, this IDE workflow is the real, working way to actually run your code.</p>
      </Card>
    </div>
  );
}

/* =========================================================================
   GIT & GITHUB
   ========================================================================= */

const GIT_CONCEPTS = [
  { term: "Git", def: "A version control system that tracks changes to your files over time, so you can see history and undo mistakes.", cmd: null },
  { term: "GitHub", def: "A website that hosts Git repositories online, so you can back up and share your code.", cmd: null },
  { term: "Repository", def: "A folder tracked by Git, containing your project and its full history.", cmd: "git init" },
  { term: "Clone", def: "Download a copy of a remote repository (e.g. from GitHub) to your machine.", cmd: "git clone https://github.com/user/project.git" },
  { term: "Status", def: "Shows which files are changed, staged, or untracked.", cmd: "git status" },
  { term: "Add", def: "Stages changes, marking them to be included in your next commit.", cmd: "git add app.py\ngit add ." },
  { term: "Commit", def: "Saves a snapshot of your staged changes, with a message describing what changed.", cmd: 'git commit -m "Add scoring logic"' },
  { term: "Push", def: "Uploads your local commits to a remote repository like GitHub.", cmd: "git push origin main" },
  { term: "Pull", def: "Downloads and merges commits from a remote repository into your local copy.", cmd: "git pull origin main" },
  { term: "Branches", def: "Independent lines of development, so you can build a feature without touching the main codebase.", cmd: "git checkout -b add-scoring" },
  { term: "Merge", def: "Combines the changes from one branch into another.", cmd: "git checkout main\ngit merge add-scoring" },
  { term: ".gitignore", def: "A file listing paths Git should never track — virtual environments, cache files, secrets.", cmd: ".venv/\n__pycache__/\n.env" },
  { term: "README.md", def: "The landing-page document for a repository, explaining what the project does and how to run it.", cmd: "# Project Title\n\nDescription and setup instructions..." },
];

const GIT_CHECKLIST_ITEMS = [
  "Repository initialized (git init)",
  ".gitignore added before the first commit",
  "First commit made with a clear message",
  "README.md written",
  "Pushed to a GitHub repository",
];

function GitGitHubPage({ state, updateState }) {
  const checklist = state.gitChecklist || {};
  const toggle = (item) => {
    updateState((s) => ({ ...s, gitChecklist: { ...s.gitChecklist, [item]: !s.gitChecklist[item] } }));
  };
  const doneCount = GIT_CHECKLIST_ITEMS.filter((i) => checklist[i]).length;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1"><GitBranch size={18} className="text-cyan-400" /><h1 className="text-2xl font-semibold">Git & GitHub</h1></div>
        <p className="text-slate-500 text-sm">A beginner-friendly walkthrough of the commands you'll use on every real project. GitHub connectivity here is informational only — nothing on this page pushes anything on your behalf.</p>
      </div>

      <div className="space-y-3">
        {GIT_CONCEPTS.map((c) => (
          <Card key={c.term} className="p-4">
            <h3 className="font-medium text-sm mb-1">{c.term}</h3>
            <p className="text-sm text-slate-400 mb-2">{c.def}</p>
            {c.cmd && <CodeBlock code={c.cmd} />}
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Project Git checklist</h3>
          <Pill tone={doneCount === GIT_CHECKLIST_ITEMS.length ? "emerald" : "slate"}>{doneCount}/{GIT_CHECKLIST_ITEMS.length}</Pill>
        </div>
        <div className="space-y-2">
          {GIT_CHECKLIST_ITEMS.map((item) => (
            <label key={item} className="flex items-center gap-2.5 text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" checked={!!checklist[item]} onChange={() => toggle(item)} className="w-4 h-4 rounded accent-cyan-500" />
              {item}
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-5 border-violet-900/50 bg-violet-950/10">
        <div className="flex items-center gap-2 mb-1"><GitPullRequest size={14} className="text-violet-400" /><h3 className="font-medium text-sm">On real GitHub integration</h3></div>
        <p className="text-sm text-slate-400">This page won't claim to connect to your GitHub account or push commits for you — that would require a real OAuth + API integration on a backend, which doesn't exist here yet. When it does, this is where it will plug in.</p>
      </Card>
    </div>
  );
}

/* =========================================================================
   PROFILE + SETTINGS
   ========================================================================= */

function ProfileHome({ state, go, onLogout }) {
  const { level } = xpToLevel(state.xp);
  const earned = ACHIEVEMENTS_CATALOG.filter((a) => state.achievements.includes(a.id));
  const locked = ACHIEVEMENTS_CATALOG.filter((a) => !state.achievements.includes(a.id));

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <Card className="p-5 flex items-center gap-4 flex-wrap">
        <div className="w-14 h-14 rounded-full bg-violet-950 border border-violet-800 flex items-center justify-center font-semibold text-violet-300">
          {(state.profile.name || "?").charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-[140px]">
          <h1 className="text-lg font-semibold">{state.profile.name || "Learner"}</h1>
          <p className="text-xs text-slate-500">{state.profile.email ? `${state.profile.email} · ` : ""}{state.profile.experience} · Level {level} · {state.xp} XP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => go("settings")}><SettingsIcon size={14} /> Settings</Button>
          <Button variant="ghost" size="sm" onClick={onLogout}><LogOut size={14} /> Log out</Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4"><div className="text-xs text-slate-500 mb-1">Streak</div><div className="text-xl font-semibold flex items-center gap-1.5"><Flame size={16} className="text-amber-400" />{state.streak}d</div></Card>
        <Card className="p-4"><div className="text-xs text-slate-500 mb-1">Topics mastered</div><div className="text-xl font-semibold">{state.masteredTopics.length}</div></Card>
      </div>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-3">Selected tracks</h3>
        <div className="flex gap-2 flex-wrap">
          {state.profile.tracks.length === 0 && <EmptyHint>No tracks selected yet.</EmptyHint>}
          {state.profile.tracks.map((t) => (
            <Pill key={t} tone="cyan">{t === "general" ? "General Python" : t === "cyber" ? "Cybersecurity" : t === "data" ? "Data Science" : "AI/ML"}</Pill>
          ))}
        </div>
        <button onClick={() => go("tracks")} className="text-xs text-cyan-400 hover:underline mt-3">Change specialization</button>
      </Card>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-4">Achievements</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {earned.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40">
              <Award size={16} className="text-amber-400 shrink-0" />
              <div><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-slate-500">{a.desc}</p></div>
            </div>
          ))}
          {locked.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 opacity-50">
              <Lock size={16} className="text-slate-600 shrink-0" />
              <div><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-slate-600">{a.desc}</p></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="text-sm text-slate-200">{label}</p>
        {desc && <p className="text-xs text-slate-500">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${checked ? "bg-cyan-500" : "bg-slate-700"}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? "left-5" : "left-1"}`} />
      </button>
    </div>
  );
}

function SettingsHome({ state, updateState, onLogout }) {
  const set = (patch) => updateState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  const [resetConfirm, setResetConfirm] = useState(false);

  const doReset = async () => {
    try { await window.storage.delete(STORAGE_KEY, false); } catch (e) {}
    window.location.reload();
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-3">Appearance</h3>
        <div className="flex gap-2">
          {["dark", "light", "system"].map((t) => (
            <button key={t} onClick={() => set({ theme: t })} className={`px-3 py-1.5 rounded-lg text-sm border capitalize ${state.settings.theme === t ? "border-cyan-500 bg-cyan-950/30 text-cyan-300" : "border-slate-700 text-slate-400"}`}>{t}</button>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-2">This preview is optimized for dark mode.</p>
      </Card>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-1">Learning</h3>
        <div className="divide-y divide-slate-800">
          <div className="py-2.5">
            <p className="text-sm text-slate-200 mb-2">Difficulty preference</p>
            <div className="flex gap-2 flex-wrap">
              {["auto", "easier", "standard", "harder"].map((d) => (
                <button key={d} onClick={() => set({ difficulty: d })} className={`px-3 py-1 rounded-lg text-xs border capitalize ${state.settings.difficulty === d ? "border-cyan-500 bg-cyan-950/30 text-cyan-300" : "border-slate-700 text-slate-400"}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="py-2.5">
            <p className="text-sm text-slate-200 mb-2">Hint behavior</p>
            <div className="flex gap-2 flex-wrap">
              {["progressive", "minimal", "generous"].map((d) => (
                <button key={d} onClick={() => set({ hintBehavior: d })} className={`px-3 py-1 rounded-lg text-xs border capitalize ${state.settings.hintBehavior === d ? "border-cyan-500 bg-cyan-950/30 text-cyan-300" : "border-slate-700 text-slate-400"}`}>{d}</button>
              ))}
            </div>
          </div>
          <ToggleRow label="Weekly goal reminders" checked={state.settings.notifGoals} onChange={(v) => set({ notifGoals: v })} />
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-1">IDE</h3>
        <div className="flex gap-2 mt-2">
          {["pycharm", "vscode", "both"].map((d) => (
            <button key={d} onClick={() => set({ ide: d })} className={`px-3 py-1.5 rounded-lg text-sm border capitalize ${state.settings.ide === d ? "border-cyan-500 bg-cyan-950/30 text-cyan-300" : "border-slate-700 text-slate-400"}`}>{d === "vscode" ? "VS Code" : d}</button>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-1">Notifications</h3>
        <div className="divide-y divide-slate-800">
          <ToggleRow label="Revision reminders" checked={state.settings.notifRevision} onChange={(v) => set({ notifRevision: v })} />
          <ToggleRow label="Achievement notifications" checked={state.settings.notifAchievements} onChange={(v) => set({ notifAchievements: v })} />
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-medium text-sm mb-1">Account</h3>
        <p className="text-xs text-slate-500 mb-3">{state.profile.email || "No email on file"}</p>
        <Button variant="secondary" size="sm" onClick={onLogout}><LogOut size={14} /> Log out</Button>
      </Card>

      <Card className="p-5 border-rose-900/50">
        <h3 className="font-medium text-sm mb-1 text-rose-300">Reset progress</h3>
        <p className="text-xs text-slate-500 mb-3">Clears all saved progress on this device and restarts onboarding.</p>
        {!resetConfirm ? (
          <Button variant="danger" size="sm" onClick={() => setResetConfirm(true)}>Reset all progress</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="danger" size="sm" onClick={doReset}>Confirm reset</Button>
            <Button variant="secondary" size="sm" onClick={() => setResetConfirm(false)}>Cancel</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

/* =========================================================================
   APP ROOT
   ========================================================================= */

function applyDailyActivity(s) {
  const today = todayStr();
  if (s.lastStudyDay === today) return s;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = s.lastStudyDay === yesterday ? s.streak + 1 : 1;
  return { ...s, lastStudyDay: today, streak: newStreak, weeklyMinutes: s.weeklyMinutes + 10, totalMinutes: s.totalMinutes + 10 };
}

function checkAchievements(s) {
  const unlocked = new Set(s.achievements);
  const solvedList = Object.values(s.exerciseAttempts).filter((a) => a.solved);
  const solvedCount = solvedList.length;
  const perfectCount = solvedList.filter((a) => a.attempts === 1 && (a.hintsUsed || 0) === 0).length;

  if (Object.values(s.lessonStatus).some((v) => v === "completed")) unlocked.add("ach-first-lesson");
  if (solvedCount >= 1) unlocked.add("ach-first-exercise");
  if (perfectCount >= 1) unlocked.add("ach-first-perfect");
  if (solvedCount >= 10) unlocked.add("ach-10-exercises");
  if (solvedCount >= 50) unlocked.add("ach-50-exercises");
  if (solvedCount >= 100) unlocked.add("ach-100-exercises");
  if (s.streak >= 3) unlocked.add("ach-streak-3");
  if (s.streak >= 7) unlocked.add("ach-streak-7");
  if (Object.values(s.projectStatus).some((v) => v === "completed")) unlocked.add("ach-first-project");
  if ((s.revisionMasteredCount || 0) >= 5) unlocked.add("ach-revision-master");
  if (LESSONS.every((l) => s.lessonStatus[l.id] === "completed")) unlocked.add("ach-core-complete");
  if (getTrackStatus(s, "cyber").status !== "locked") unlocked.add("ach-cyber-unlocked");
  if (getTrackStatus(s, "data").status !== "locked") unlocked.add("ach-data-unlocked");
  if (getTrackStatus(s, "aiCyber").status !== "locked") unlocked.add("ach-ai-cyber-unlocked");
  if (CROSS_TRACK_PROJECTS.some((p) => s.projectStatus[p.id] === "completed")) unlocked.add("ach-cross-track");
  if (getTrackStatus(s, "hacking").status !== "locked") unlocked.add("ach-hacking-unlocked");
  if (HACKING_TRACK_PROJECTS.some((p) => s.projectStatus[p.id] === "completed")) unlocked.add("ach-first-security-lab");
  if (s.lessonStatus["hk-recon"] === "completed") unlocked.add("ach-recon-ready");
  if (s.lessonStatus["hk-mitm"] === "completed") unlocked.add("ach-network-defender");
  if (s.lessonStatus["hk-sqli"] === "completed" && s.lessonStatus["hk-xss"] === "completed") unlocked.add("ach-web-security-explorer");
  if (s.lessonStatus["hk-caesar"] === "completed") unlocked.add("ach-crypto-foundations");
  if (s.projectStatus["proj-cy-report"] === "completed") unlocked.add("ach-vulnerability-analyst");
  if (s.projectStatus["proj-hk-http-headers"] === "completed") unlocked.add("ach-security-automation");
  if (HACKING_LESSONS.every((l) => s.lessonStatus[l.id] === "completed")) unlocked.add("ach-ethical-hacker");

  if (unlocked.size === s.achievements.length) return s;
  const gained = [...unlocked].filter((id) => !s.achievements.includes(id));
  let next = { ...s, achievements: [...unlocked] };
  gained.forEach((id) => {
    const a = ACHIEVEMENTS_CATALOG.find((x) => x.id === id);
    if (a) next = logActivity(next, `Achievement unlocked: ${a.title}`, "achievement");
  });
  return next;
}

export default function App() {
  const [state, setState] = useState(freshState());
  const [loaded, setLoaded] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [view, setView] = useState({ name: "dashboard", params: {} });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await withTimeout(window.storage.get(STORAGE_KEY, false));
      if (res && res.value) {
        try {
          const parsed = JSON.parse(res.value);
          setState({ ...freshState(), ...parsed });
        } catch (e) {
          // corrupted saved state — fall back to fresh
        }
      }
      setLoaded(true);

      if (!AUTH_BYPASS_AUTO_LOGIN) {
        const [accountRes, sessionRes] = await withTimeout(
          Promise.all([
            window.storage.get(AUTH_KEY, false).catch(() => null),
            window.storage.get(SESSION_KEY, false).catch(() => null),
          ]),
          3000,
          [null, null]
        );
        try {
          const account = accountRes && accountRes.value ? JSON.parse(accountRes.value) : null;
          const session = sessionRes && sessionRes.value ? JSON.parse(sessionRes.value) : null;
          if (account && session && account.email === session.email) {
            setAuthed(true);
          }
        } catch (e) {
          // no valid session yet — user will see the auth screen
        }
      }
      setAuthChecked(true);
    })();
  }, []);

  const updateState = useCallback((updater) => {
    setState((prev) => {
      let next = typeof updater === "function" ? updater(prev) : updater;
      if (next.xp > prev.xp) next = applyDailyActivity(next);
      next = checkAchievements(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(state), false); } catch (e) {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [state, loaded]);

  const go = useCallback((name, params = {}) => {
    setView({ name, params });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const openLesson = (id) => go("lesson", { id });
  const openExercise = (id) => go("exercise", { id });
  const openProject = (id) => go("project", { id });

  const handleSearch = (q) => go("reference", { q });

  const handleAuthed = ({ name, email }) => {
    setAuthed(true);
    // Onboarding (the "Where do you want Python to take you?" flow) now runs
    // normally for any account that hasn't completed it yet — this just
    // carries the name/email from the auth form into the profile so
    // onboarding can greet them by name.
    updateState((s) => ({ ...s, profile: { ...s.profile, name: s.profile.name || name, email } }));
  };

  const handleLogout = async () => {
    try { await window.storage.delete(SESSION_KEY, false); } catch (e) {}
    setAuthed(false);
    setView({ name: "dashboard", params: {} });
  };

  const completeOnboarding = (form) => {
    updateState((s) => ({
      ...s,
      onboarded: true,
      profile: {
        ...s.profile,
        name: form.name,
        experience: form.experience,
        goals: form.goals,
        pace: "",
        studyTime: form.studyTime,
        ide: form.ide,
        tracks: form.goals,
        difficultyPref: form.difficultyPref,
      },
      weeklyGoalMinutes: form.weeklyGoalMinutes || s.weeklyGoalMinutes,
      settings: { ...s.settings, ide: form.ide === "VS Code" ? "vscode" : form.ide === "Both" ? "both" : "pycharm", difficulty: form.difficultyPref },
    }));
  };

  if (!loaded || !authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <RefreshCw className="text-cyan-500 animate-spin" size={22} />
      </div>
    );
  }

  if (!authed) {
    return <AuthScreen onAuthed={handleAuthed} />;
  }

  if (!state.onboarded) {
    return <Onboarding onComplete={completeOnboarding} initialName={state.profile.name} />;
  }

  let content = null;
  switch (view.name) {
    case "dashboard":
      content = <Dashboard state={state} go={go} openLesson={openLesson} openProject={openProject} />;
      break;
    case "learn":
      content = <LearnHome state={state} openLesson={openLesson} />;
      break;
    case "lesson": {
      const lesson = ALL_LESSONS.find((l) => l.id === view.params.id) || LESSONS[0];
      content = <LessonPage lesson={lesson} state={state} updateState={updateState} go={go} openLesson={openLesson} />;
      break;
    }
    case "exercises":
      content = <ExercisesHome state={state} openExercise={openExercise} />;
      break;
    case "exercise": {
      const exercise = EXERCISES.find((e) => e.id === view.params.id) || EXERCISES[0];
      content = <ExercisePage exercise={exercise} state={state} updateState={updateState} go={go} />;
      break;
    }
    case "projects":
      content = <ProjectsHome state={state} openProject={openProject} go={go} />;
      break;
    case "project": {
      const project = ALL_PROJECTS.find((p) => p.id === view.params.id) || BEGINNER_PROJECTS[0];
      content = <ProjectPage project={project} state={state} updateState={updateState} go={go} />;
      break;
    }
    case "revision":
      content = <RevisionHome state={state} updateState={updateState} go={go} />;
      break;
    case "revisionSession":
      content = <RevisionSession topicId={view.params.id} state={state} updateState={updateState} go={go} />;
      break;
    case "tracks":
      content = <TracksHome state={state} go={go} />;
      break;
    case "trackHome":
      content = <TrackHome state={state} track={view.params.track || "cyber"} go={go} openLesson={openLesson} openProject={openProject} />;
      break;
    case "reference":
      content = <ReferenceHome initialQuery={view.params.q} />;
      break;
    case "progress":
      content = <ProgressHome state={state} />;
      break;
    case "reviewer":
      content = <ReviewerHome state={state} updateState={updateState} contextLabel={view.params.context} contextCode={view.params.code} />;
      break;
    case "ide":
      content = <IDESetup go={go} />;
      break;
    case "git":
      content = <GitGitHubPage state={state} updateState={updateState} />;
      break;
    case "profile":
      content = <ProfileHome state={state} go={go} onLogout={handleLogout} />;
      break;
    case "settings":
      content = <SettingsHome state={state} updateState={updateState} onLogout={handleLogout} />;
      break;
    default:
      content = <Dashboard state={state} go={go} openLesson={openLesson} openProject={openProject} />;
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex font-sans" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { font-family: inherit; }
        pre, code, textarea { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 8px; }
      `}</style>
      <Sidebar view={view.name} go={go} />
      <div className="flex-1 min-w-0">
        <TopBar state={state} onSearch={handleSearch} go={go} />
        <main className="pb-16 md:pb-0">{content}</main>
      </div>
      <BottomNav view={view.name} go={go} />
    </div>
  );
}
