import re
from html import unescape

with open(r'C:\Users\nalie\Documents\trae_projects\写作项目\人的harness\output\slides\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def html_to_md(text):
    text = unescape(text)
    
    # Handle tables first - convert to markdown table rows
    text = re.sub(r'</?thead>', '', text)
    text = re.sub(r'</?tbody>', '', text)
    # Each row becomes a line with | separators
    text = re.sub(r'<tr>\s*', '\n| ', text)
    text = re.sub(r'\s*</tr>', ' |', text)
    text = re.sub(r'<t[hd][^>]*>\s*', ' ', text)
    text = re.sub(r'\s*</t[hd]>', ' |', text)
    # Add separator line after header
    text = re.sub(r'(</table>)', r'\n\1', text)
    text = re.sub(r'(<table[^>]*>)', r'\1\n', text)
    text = re.sub(r'</?table>', '', text)
    
    # Handle inline formatting
    text = re.sub(r'<(strong|b)>(.*?)</\1>', r'**\2**', text)
    text = re.sub(r'<(em|i)>(.*?)</\1>', r'*\2*', text)
    
    # Lists
    text = re.sub(r'\s*<li>', '\n- ', text)
    text = re.sub(r'</li>\s*', '', text)
    text = re.sub(r'</?[ou]l>\s*', '\n', text)
    
    # Paragraphs
    text = re.sub(r'<p[^>]*>', '\n\n', text)
    text = re.sub(r'</p>', '', text)
    text = re.sub(r'<br\s*/?>', '\n', text)
    
    # Remove remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    # Clean up
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'^\s+', '', text)
    return text.strip()

output = []
output.append('# Agent 时代的自我技术')
output.append('')
output.append('> 俏也 · 分享会逐字稿整理')
output.append('')

# Hero
hero_m = re.search(r'<section class="hero">(.*?)</section>', html, re.DOTALL)
if hero_m:
    sub = re.search(r'<p class="hero-sub">(.*?)</p>', hero_m.group(1))
    lead = re.search(r'<p class="hero-lead">(.*?)</p>', hero_m.group(1))
    if sub: output.append(html_to_md(sub.group(1)))
    if lead:
        output.append('')
        output.append(html_to_md(lead.group(1)))
    output.append('')

# Find ALL act sections with their slides
# Pattern: <!-- ===== Act N ===== --> ... </section>
act_blocks = re.findall(
    r'<!-- ===== (Act \d+) ===== -->(.*?)</section>',
    html, re.DOTALL
)

for act_name, act_body in act_blocks:
    act_m = re.search(r'<div class="act-label">(.*?)</div>\s*<h2 class="act-title"[^>]*>(.*?)</h2>', act_body, re.DOTALL)
    if not act_m:
        continue
    
    act_label = re.sub(r'<[^>]+>', '', act_m.group(1)).strip()
    act_title = re.sub(r'<[^>]+>', '', act_m.group(2)).strip().replace('&nbsp;', ' ').strip()
    
    output.append('---')
    output.append('')
    output.append(f'## {act_label}：{act_title}')
    output.append('')
    
    # Extract articles - use simple split approach
    articles = re.findall(r'<article[^>]*>(.*?)</article>', act_body, re.DOTALL)
    
    for art in articles:
        num_m = re.search(r'<div class="slide-num">(.*?)</div>', art)
        title_m = re.search(r'<h3 class="slide-title"[^>]*>(.*?)</h3>', art)
        body_m = re.search(r'<div class="slide-body"[^>]*>(.*?)</div>', art, re.DOTALL)
        
        if not num_m or not title_m:
            continue
        
        num = re.sub(r'<[^>]+>', '', num_m.group(1)).strip()
        title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip().replace('&nbsp;', ' ').strip()
        
        if not body_m:
            continue
            
        body = html_to_md(body_m.group(1))
        
        output.append(f'### {num}. {title}')
        output.append('')
        output.append(body)
        output.append('')
        
        if 'slide-art' in art or '<img' in art:
            output.append('*(配图)*')
            output.append('')

# References
ref_m = re.search(r'<section[^>]*id="references"[^>]*>(.*?)</section>', html, re.DOTALL)
if ref_m:
    ref_body = re.search(r'<div class="slide-body">(.*?)</div>', ref_m.group(1), re.DOTALL)
    if ref_body:
        output.append('---')
        output.append('')
        output.append('## 参考与致谢')
        output.append('')
        output.append(html_to_md(ref_body.group(1)))
        output.append('')

result = '\n'.join(output)

with open(r'C:\Users\nalie\Documents\trae_projects\写作项目\人的harness\output\slides\slides.md', 'w', encoding='utf-8') as f:
    f.write(result)

print(f'Written {len(result)} chars, {result.count("### ")} slides')
