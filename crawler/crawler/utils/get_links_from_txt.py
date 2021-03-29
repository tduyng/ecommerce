def get_links_from_txt(file):
    links = []
    with open(file, "r") as f:
        try:
            lines = f.readlines()
            for line in lines:
                if line.rstrip():
                    links.append(line.strip())
        except:
            pass
    return links
