def readFile(path):
    f = open(path, 'r')
    return f.read()

def readLineAsArray(path):
    return readFile(path).splitlines()