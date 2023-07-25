import os
import re

class DependencyGraph:
    def __init__(self):
        self.dependencies = {}

    def add_dependency(self, source, dependency):
        if source in self.dependencies:
            self.dependencies[source].append(dependency)
        else:
            self.dependencies[source] = [dependency]

    def get_dependencies(self, source):
        if source in self.dependencies:
            return self.dependencies[source]
        else:
            return []

def create_dependency_graph(root_dir):
    graph = DependencyGraph()
    file_regex = re.compile(r'\.py$')

    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if file_regex.search(filename):
                file_path = os.path.join(dirpath, filename)
                process_file(file_path, graph)

    return graph

def process_file(file_path, graph):
    with open(file_path, 'r') as file:
        content = file.read()
        dependencies = find_imports(content)

        for dependency in dependencies:
            graph.add_dependency(file_path, dependency)

def find_imports(content):
    import_regex = re.compile(r'from\s+(\S+)\s+import|\nimport\s+(\S+)')
    imports = []

    matches = import_regex.findall(content)
    for match in matches:
        for imp in match:
            if imp:
                imports.append(imp)

    return imports

# Usage example
root_directory = '/path/to/root/directory'
dependency_graph = create_dependency_graph(root_directory)

# Accessing dependencies for a specific file
file_path = '/path/to/file.py'
dependencies = dependency_graph.get_dependencies(file_path)
print(f"Dependencies for {file_path}:")
for dependency in dependencies:
    print(dependency)
