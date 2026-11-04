"""Generate og.png (1200x630) and logo-512.png for the tools site. Flat vector look on ink #05070A,
cyan/violet only, no warm hues (same brand lock as the portfolio). Run: python scripts/brand-assets.py"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "apps", "tools", "public")
INK = (5, 7, 10)
CYAN = (34, 211, 238)
VIOLET = (168, 85, 247)
FONT_B = "C:/Windows/Fonts/segoeuib.ttf"
FONT_M = "C:/Windows/Fonts/consolab.ttf"


def gradient(size, c1, c2):
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x + y) / (w + h)
            px[x, y] = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
    return img


def logo(size):
    """Rounded gradient square with two braces and a dot."""
    s = size * 4
    tile = gradient((s, s), (8, 145, 178), (124, 58, 237))
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, s - 1, s - 1), radius=s // 4, fill=255)
    tile.putalpha(mask)
    d = ImageDraw.Draw(tile)
    f = ImageFont.truetype(FONT_M, int(s * 0.78))
    for text, cx in (("{", s * 0.30), ("}", s * 0.70)):
        bb = d.textbbox((0, 0), text, font=f)
        d.text((cx - (bb[0] + bb[2]) / 2, s * 0.5 - (bb[1] + bb[3]) / 2), text, font=f, fill="white")
    r = s * 0.055
    d.ellipse((s / 2 - r, s / 2 - r, s / 2 + r, s / 2 + r), fill="white")
    return tile.resize((size, size), Image.LANCZOS)


def og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), INK)
    glow = Image.new("RGB", (W, H), INK)
    g = ImageDraw.Draw(glow)
    g.ellipse((-250, -300, 700, 400), fill=(10, 60, 72))
    g.ellipse((650, -250, 1450, 450), fill=(60, 28, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    img = Image.blend(img, glow, 0.9)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((36, 36, W - 37, H - 37), radius=28, outline=(31, 42, 58), width=2)

    img.paste(logo(96), (84, 84), logo(96))
    d.text((200, 96), "StreamerOS", font=ImageFont.truetype(FONT_B, 40), fill=(244, 244, 245))
    d.text((200, 142), "Dev Tools", font=ImageFont.truetype(FONT_B, 40), fill=CYAN)

    title = ImageFont.truetype(FONT_B, 84)
    d.text((84, 270), "Developer tools that", font=title, fill=(250, 250, 250))
    d.text((84, 366), "run in your browser", font=title, fill=CYAN)

    mono = ImageFont.truetype(FONT_M, 28)
    x = 84
    for label in ("JSON formatter", "JSON compare", "JSON to CSV", "Base64"):
        w = d.textlength(label, font=mono) + 40
        d.rounded_rectangle((x, 510, x + w, 562), radius=26, outline=(43, 57, 78), width=2, fill=(14, 20, 29))
        d.text((x + 20, 521), label, font=mono, fill=(161, 161, 170))
        x += w + 16
    d.text((W - 84 - d.textlength("tools.streamerosai.com", font=mono), 96), "tools.streamerosai.com", font=mono, fill=(113, 113, 122))
    img.save(os.path.join(OUT, "og.png"), optimize=True)


if __name__ == "__main__":
    logo(512).save(os.path.join(OUT, "logo-512.png"), optimize=True)
    og()
    print("ok")
