"""Downscale + compress generated art for the web. Needs Pillow (pip install pillow)."""
import os, glob
from PIL import Image

IMG = os.path.join(os.path.dirname(__file__), "..", "img")
# max width per image kind (square characters/emblems vs wide scenes/panels)
MAXW = 720

for path in sorted(glob.glob(os.path.join(IMG, "*.png"))):
    im = Image.open(path).convert("RGBA")
    if im.width > MAXW:
        h = round(im.height * MAXW / im.width)
        im = im.resize((MAXW, h), Image.LANCZOS)
    # quantize to a smaller palette to shrink file size while staying crisp
    out = im.convert("RGB").quantize(colors=128, method=Image.FASTOCTREE).convert("RGBA")
    out.save(path, optimize=True)
    kb = os.path.getsize(path) / 1024
    print(f"{os.path.basename(path):20s} {im.width}px  {kb:.0f} KB")
print("done")
