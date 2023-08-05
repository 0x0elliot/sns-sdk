import os

def merge_ts_files_to_txt(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as output_txt:
        for dirpath, _, filenames in os.walk(root_dir):
            # Skip 'node_modules' and 'deprecated' folders
            if 'node_modules' in dirpath or 'deprecated' in dirpath:
                continue
            
            ts_files = [f for f in filenames if f.endswith('.ts')]
            for ts_file in ts_files:
                ts_path = os.path.join(dirpath, ts_file)
                with open(ts_path, 'r', encoding='utf-8') as input_ts:
                    output_txt.write(input_ts.read())
                    output_txt.write('\n')


if __name__ == "__main__":
    # Replace 'path/to/root/directory' with the actual root directory containing the .ts files
    root_directory = '.'
    # Replace 'output_file.txt' with the desired name for the merged .txt file
    output_txt_file = 'output_file.txt'
    merge_ts_files_to_txt(root_directory, output_txt_file)
    print("Merging of .ts files into .txt is complete.")
