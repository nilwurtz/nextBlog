from typing import List


def extract_even_num(num_ls: List[int]) -> List[int]:
    even = filter(lambda x: x % 2 == 0, num_ls)
    return [i for i in even]
