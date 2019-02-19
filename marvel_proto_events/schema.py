from os import path, walk
import json


base = path.dirname(path.dirname(path.abspath(__file__)))


def load_json_file(fname):
    fpath = path.join(base, fname)
    with open(fpath) as f:
        return json.loads(f.read())


def walk_directory_files(dir_path):
    dirpath, dirnames, fnames = next(walk(dir_path))
    for fname in fnames:
        yield path.join(dirpath, fname)


def load_json_files(directory_path):
    files = {}
    for fpath in walk_directory_files(directory_path):
        if not fpath.endswith('.json'):
            continue

        type_key = path.basename(fpath).split('.', 1)[0]
        files[type_key] = load_json_file(fpath)
    return files


event = load_json_file(path.join(base, 'event.json'))
triggers = load_json_files(path.join(base, 'triggers'))
objects = load_json_files(path.join(base, 'objects'))
outcomes = load_json_files(path.join(base, 'outcomes'))
