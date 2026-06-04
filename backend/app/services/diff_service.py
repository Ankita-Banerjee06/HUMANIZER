import difflib



def generate_diff(original, updated):

    diff = difflib.ndiff(
        original.split(),
        updated.split()
    )

    return list(diff)