"""Render the local, silent InnoMama quick tour. Requires Pillow and ffmpeg.

Usage: python tooling/generate-tour.py --ffmpeg /path/to/ffmpeg
Optional: --preview-dir outputs/quick-tour-preview
The animation contains synthetic examples only. No external media is used.
"""
from pathlib import Path
import argparse
import subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H, FPS, SECONDS = 960, 540, 24, 12
NAVY, BLUE, GREEN = '#07152a', '#10458e', '#00b980'
MUTED, LIGHT, WHITE = '#57718b', '#eff5fc', '#ffffff'


def font(size, bold=False):
    candidates = [
        Path('C:/Windows/Fonts') / ('segoeuib.ttf' if bold else 'segoeui.ttf'),
        Path('/usr/share/fonts/truetype/dejavu') / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf'),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    raise RuntimeError('Install Segoe UI or DejaVu Sans to render the tour.')


FONTS = {str(s) + ('b' if b else ''): font(s, b) for s in (18, 20, 22, 24, 26, 30, 34, 42) for b in (False, True)}


def text(draw, xy, value, size=24, fill=NAVY, bold=False, anchor=None):
    draw.text(xy, value, font=FONTS[str(size) + ('b' if bold else '')], fill=fill, anchor=anchor)


def pill(draw, xy, value, bg=LIGHT, fg=BLUE, width=None):
    x, y = xy
    box = draw.textbbox((0, 0), value, font=FONTS['20b'])
    width = width or box[2] + 30
    draw.rounded_rectangle((x, y, x + width, y + 36), radius=18, fill=bg)
    text(draw, (x + width / 2, y + 17), value, 20, fg, True, 'mm')


def ease(t):
    t = min(1, max(0, t))
    return 1 - (1 - t) ** 3


def check(draw, x, y, color=GREEN):
    draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=color)
    draw.line([(x - 7, y), (x - 1, y + 6), (x + 9, y - 7)], fill=WHITE, width=3)


def frame(t):
    stage = min(2, int(t // 4))
    local = t % 4
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, 8), fill=GREEN)
    text(d, (48, 31), 'InnoMama AI', 26, BLUE, True)
    text(d, (912, 48), 'INNOHEALTH TECHNOLOGIES', 18, MUTED, True, 'rm')
    headings = ['Review the queue', 'Check the signals', 'Coordinate a response']
    supporting = ['Find the records that need attention.', 'See missing observations and supplies.', 'Keep the care team and follow-up connected.']
    text(d, (48, 101), f'0{stage + 1}', 24, GREEN, True)
    text(d, (104, 86), headings[stage], 42, NAVY, True)
    text(d, (104, 143), supporting[stage], 26, MUTED)
    offset = round(24 * (1 - ease(local / .7)))
    top = 204 + offset
    if stage == 0:
        rows = [
            ('DEMO-014', 'Urgent', '#fff0ec', '#9f3025'),
            ('DEMO-028', 'Review', '#fff7df', '#7c5500'),
            ('DEMO-031', 'No triggers', '#e3f8ef', '#086945'),
        ]
        for i, (record, status, bg, fg) in enumerate(rows):
            y = top + i * 69
            d.rounded_rectangle((104, y, 858, y + 57), 12, fill=LIGHT)
            if i == 0:
                d.rounded_rectangle((104, y, 111, y + 57), 3, fill='#c54b38')
            text(d, (130, y + 26), record, 24, NAVY, True, 'lm')
            pill(d, (674, y + 10), status, bg, fg, 160)
        # The focus ring settles on the first synthetic record.
        if local > .8:
            d.rounded_rectangle((102, top - 2, 860, top + 59), 14, outline=BLUE, width=3)
    elif stage == 1:
        panels = [
            (104, 'OBSERVATIONS', 'Blood pressure', 'Missing record', '#fff7df', '#7c5500'),
            (494, 'FACILITY SUPPLIES', 'Essential medicine', 'Stock unavailable', '#fff0ec', '#9f3025'),
        ]
        for x, label, title, status, bg, fg in panels:
            d.rounded_rectangle((x, top, x + 364, top + 194), 16, fill=LIGHT)
            text(d, (x + 22, top + 19), label, 18, BLUE, True)
            text(d, (x + 22, top + 70), title, 26, NAVY, True)
            pill(d, (x + 22, top + 120), status, bg, fg)
        if local > .8:
            progress = ease((local - .8) / .8)
            d.line((127, top + 177, 127 + int(317 * progress), top + 177), fill=GREEN, width=4)
            d.line((517, top + 177, 517 + int(317 * progress), top + 177), fill=GREEN, width=4)
    else:
        centers = [222, 480, 738]
        labels = [('Care-team', 'review'), ('SMS', 'simulated'), ('Track', 'follow-up')]
        for i in range(2):
            d.line((centers[i] + 40, top + 57, centers[i + 1] - 40, top + 57), fill='#d7e3ee', width=4)
        active = min(2, int(local / 1.05))
        for i, (x, (line1, line2)) in enumerate(zip(centers, labels)):
            color = BLUE if i <= active else '#9db1c4'
            d.ellipse((x - 36, top + 21, x + 36, top + 93), fill=color)
            text(d, (x, top + 55), str(i + 1), 30, WHITE, True, 'mm')
            text(d, (x, top + 119), line1, 26, NAVY, True, 'mm')
            text(d, (x, top + 153), line2, 26, MUTED, False, 'mm')
            if i < active:
                check(d, x + 28, top + 27)
    # Persistent demonstration status is deliberately readable on every frame.
    d.line((48, 460, 912, 460), fill='#dce6f0', width=1)
    text(d, (48, 484), 'Synthetic demo · No clinical decisions', 22, MUTED)
    for i in range(3):
        d.rounded_rectangle((809 + i * 37, 489, 833 + i * 37, 496), 4, fill=GREEN if i == stage else '#d7e3ee')
    d.rectangle((0, 535, int(W * (t / SECONDS)), 539), fill=GREEN)
    return img


POSTER = '''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">
<title id="title">InnoMama AI quick tour</title><desc id="desc">Review the queue, check the signals, and coordinate a response. Synthetic demo. No clinical decisions. SMS is simulated.</desc>
<rect width="960" height="540" fill="#fff"/><path d="M0 4H960" stroke="#00b980" stroke-width="8"/>
<g font-family="Segoe UI,Arial,sans-serif"><text x="48" y="60" font-size="26" font-weight="700" fill="#10458e">InnoMama AI</text><text x="912" y="55" text-anchor="end" font-size="18" font-weight="600" fill="#57718b">INNOHEALTH TECHNOLOGIES</text>
<text x="48" y="149" font-size="42" font-weight="700" fill="#07152a">See how it works</text><text x="48" y="193" font-size="26" fill="#57718b">A 12-second guide to your next action.</text>
<g fill="#eff5fc"><rect x="48" y="239" width="272" height="168" rx="16"/><rect x="344" y="239" width="272" height="168" rx="16"/><rect x="640" y="239" width="272" height="168" rx="16"/></g>
<g fill="#00b980" font-size="24" font-weight="700"><text x="72" y="278">01</text><text x="368" y="278">02</text><text x="664" y="278">03</text></g>
<g fill="#07152a" font-size="26" font-weight="700"><text x="72" y="326">Review the</text><text x="72" y="361">queue</text><text x="368" y="326">Check the</text><text x="368" y="361">signals</text><text x="664" y="326">Coordinate</text><text x="664" y="361">a response</text></g>
<path d="M48 460H912" stroke="#dce6f0"/><text x="48" y="506" font-size="22" fill="#57718b">Synthetic demo · No clinical decisions · SMS simulated</text></g></svg>
'''

CAPTIONS = '''WEBVTT

00:00.000 --> 00:04.000
Review the queue. Find the synthetic records that need attention.
Synthetic demo. No clinical decisions.

00:04.000 --> 00:08.000
Check the signals. See missing observations and facility supplies.
Synthetic demo. No clinical decisions.

00:08.000 --> 00:12.000
Coordinate a response: care-team review, simulated SMS, and follow-up.
Synthetic demo. No clinical decisions.
'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg', default='ffmpeg')
    parser.add_argument('--preview-dir', type=Path)
    args = parser.parse_args()
    target = ROOT / 'assets' / 'quick-tour.mp4'
    command = [args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
               '-f', 'rawvideo', '-pixel_format', 'rgb24', '-video_size', f'{W}x{H}',
               '-framerate', str(FPS), '-i', '-', '-an', '-c:v', 'libx264',
               '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p',
               '-movflags', '+faststart', str(target)]
    with subprocess.Popen(command, stdin=subprocess.PIPE) as encoder:
        for index in range(FPS * SECONDS):
            encoder.stdin.write(frame(index / FPS).tobytes())
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError('ffmpeg failed to render the tour.')
    (ROOT / 'assets' / 'quick-tour-poster.svg').write_text(POSTER, encoding='utf-8')
    (ROOT / 'assets' / 'quick-tour.vtt').write_text(CAPTIONS, encoding='utf-8')
    if args.preview_dir:
        args.preview_dir.mkdir(parents=True, exist_ok=True)
        for index, timestamp in enumerate((2, 6, 10)):
            frame(timestamp).save(args.preview_dir / f'tour-frame-{index + 1}.png')
    print(f'{target.name}: {SECONDS}s, {W}x{H}, {target.stat().st_size:,} bytes; no audio')


if __name__ == '__main__':
    main()
