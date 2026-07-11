"""Sync slides.md changes back to index.html"""
import re
from html import escape

def md_to_html(text):
    """Convert Markdown back to HTML for slide-body"""
    result = []
    lines = text.split('\n')
    i = 0
    in_list = False
    list_type = None  # 'ul' or 'ol'
    
    while i < len(lines):
        line = lines[i]
        
        # Bold: **text** → <strong>text</strong>
        line = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', line)
        
        # Unordered list
        if re.match(r'^- ', line):
            if not in_list or list_type != 'ul':
                if in_list:
                    result.append(f'</{list_type}>')
                result.append('<ul>')
                in_list = True
                list_type = 'ul'
            result.append(f'<li>{line[2:]}</li>')
        # Check for ordered list or numbered item
        elif re.match(r'^\d+\. ', line) and not in_list:
            result.append(f'<p>{line}</p>')
        elif line.strip() == '':
            if in_list:
                result.append(f'</{list_type}>')
                in_list = False
                list_type = None
            # Don't add empty paragraphs
        elif line.strip() == '*(配图)*':
            pass  # Skip image markers
        else:
            if in_list:
                result.append(f'</{list_type}>')
                in_list = False
                list_type = None
            result.append(f'<p>{line}</p>')
        
        i += 1
    
    if in_list:
        result.append(f'</{list_type}>')
    
    return '\n'.join(result)


def sync():
    # Read markdown
    with open(r'C:\Users\nalie\Documents\trae_projects\写作项目\人的harness\output\slides\slides.md', 'r', encoding='utf-8') as f:
        md = f.read()
    
    # Read HTML
    with open(r'C:\Users\nalie\Documents\trae_projects\写作项目\人的harness\output\slides\index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Parse markdown sections
    sections = re.split(r'\n---\n', md)
    
    changes = 0
    for section in sections:
        # Find slide headers: ### NN. Title
        slide_match = re.search(r'### (\d+)\. (.+?)\n\n(.+)', section, re.DOTALL)
        if not slide_match:
            continue
        
        slide_num = slide_match.group(1)
        slide_title = slide_match.group(2).strip()
        slide_content = slide_match.group(3).strip()
        
        # Clean up content - remove any trailing section separators
        slide_content = re.sub(r'\n---\n.*', '', slide_content, flags=re.DOTALL).strip()
        
        # Convert to HTML
        html_body = md_to_html(slide_content)
        
        # Find matching slide in HTML by title
        # Escape for regex
        title_pattern = re.escape(slide_title)
        
        # Find the slide-body after this title
        pattern = (
            r'(<h3 class="slide-title"[^>]*>' + title_pattern + r'</h3>\s*'
            r'<div class="slide-body">).*?(</div>)'
        )
        
        match = re.search(pattern, html, re.DOTALL)
        if match:
            old_body = match.group(0)
            new_body = match.group(1) + html_body + match.group(2)
            html = html.replace(old_body, new_body, 1)
            changes += 1
            print(f'  ✓ {slide_num}. {slide_title}')
        else:
            print(f'  ✗ {slide_num}. {slide_title} — NOT FOUND')
    
    # Write back
    with open(r'C:\Users\nalie\Documents\trae_projects\写作项目\人的harness\output\slides\index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f'\nSynced {changes} slides.')

if __name__ == '__main__':
    sync()
