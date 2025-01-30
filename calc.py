def calc(array, n1, n2):
    somme = 0
    if n1 < 0 or n2 < n1 or n2 > len(array):
        return -1

    for i in range(n1, n2 + 1):
        somme += array[i]
    return somme

print(calc([1,2,3,5,5],2,4))
