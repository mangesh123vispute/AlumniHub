def string_to_list(string):
    """Converts a string representing a list to a Python list."""
    return [eval(item.strip()) for item in string.strip('[]').split(',')]

def list_to_string(lst):
    """Converts a Python list to a string representing a list."""
    return '[' + ', '.join(map(str, lst)) + ']'

# Example usage:
string_list = "[1, 2, 3, 4, 5]"
python_list = string_to_list(string_list)
print(python_list)  # Output: [1, 2, 3, 4, 5]
print(type(python_list)) # Output: <class 'list'>

python_list = [1, 2, 3, 4, 5]
string_list = list_to_string(python_list)
print(string_list) 
print(type(string_list))