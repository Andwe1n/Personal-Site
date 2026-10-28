"""Create web-sized copies of portfolio photos; leave originals untouched.
Run with a Python installation containing Pillow. Generated metadata is editable.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageCms
from io import BytesIO
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'public/images/Photography Projects'
OUTPUT = ROOT / 'public/images/portfolio'
OUTPUT.mkdir(parents=True, exist_ok=True)
# Editorial order alternates full scenes, close-ups, and color.
PHOTOS = [
 ('gt3-studio','GT3 RS - Edited.jpeg','After the lights go down','Automotive','A gray Porsche GT3 RS with red wheels beneath a bright rectangular studio light.','A study in light, shadow, and the shape of the GT3 RS.'),
 ('rwb-headlight','RWB Headlight  (1 of 1).png','Color meets character','Details','Close-up of a round Porsche headlight above an orange bumper and pale blue bodywork.','A closer look at contrasting colors, curves, and a single headlight.'),
 ('porsche-pair','x2 Porsche 911 (1 of 1).png','Two ways to stand out','Automotive','A white Porsche in the foreground and a bright blue Porsche behind it in a dark showroom.','White and blue, set against the quiet of the showroom.'),
 ('green-coupe','IMG_20260802_151150.jpg','Green in the city','Automotive','An emerald green sports car photographed from the front quarter on a city street.','Reflections and a vivid green finish, seen from a lower angle.'),
 ('porsche-crest','IMG_20260524_095313.jpg','A mark of identity','Details','A Porsche crest on silver bodywork with a diagonal panel line.','An emblem, a surface, and the line between them.'),
 ('audi-rs6','AUDI RS6 AVANT (1 of 1).png','Face to face','Automotive','Front view of a silver Audi RS6 Avant parked outdoors beside grass.','A direct view of the RS6: symmetry, texture, and presence.'),
 ('bmw-pair','x2 BMW M-2.jpeg','Double take','Automotive','Two green BMW coupes parked beside a modern building, with one in the foreground.','A pair of green coupes and a conversation between their lines.'),
 ('red-street','IMG_20260802_104053.jpg','Street presence','Automotive','A red racing sports car with yellow trim on a sunlit street lined with trees and people.','Bright color and racing details against an everyday street.'),
 ('wheel-detail','IMG-20260524-WA0010.jpg','Precision, up close','Details','A detailed alloy wheel and brake disc against purple car bodywork.','The textures and repeated shapes that reward a closer look.'),
 ('gt3-wheel','GT3 RS #2 (1 of 1).png','Red on gray','Details','A red Porsche GT3 RS wheel with a gray fender and vents above it.','A red accent that changes the whole frame.'),
 ('bmw-m4','M4.png','Understated presence','Automotive','Front view of a dark BMW M4 parked outside a building.','A darker frame, built around the M4’s front profile.'),
 ('lamborghini-evo','lambo evo.png','In the spotlight','Automotive','A white Lamborghini photographed head-on inside a showroom.','A white silhouette, angular details, and a centered point of view.'),
 ('rear-through-leaves','IMG_20250921_152954.jpg','Between the leaves','Automotive','The rear of a black supercar with a large wing, framed by green leaves outdoors.','A different perspective, with the surroundings becoming part of the frame.'),
 ('race-car','IMG_20260617_173850.jpg','Built for the grid','Automotive','A white, black, and red single-seat racing car displayed inside a bright exhibition space.','The nose, the wing, and the geometry of a racing machine.'),
 ('sf90','SF90 (1 of 1).png','Framed in green','Automotive','The rear of a bright green Ferrari SF90 seen through a dark doorway in a showroom.','A glimpse of color, framed by the architecture around it.'),
 ('quiet-encounter','IMG-20260601-WA0004 (2).jpg','A quiet encounter','Moments','A tabby cat with yellow-green eyes resting outdoors beside grass.','Away from the cars, a small moment that deserved a photograph.'),
]
records=[]
for slug, filename, title, category, alt, description in PHOTOS:
    source = SOURCE / filename
    with Image.open(source) as original:
        image=ImageOps.exif_transpose(original)
        icc=original.info.get('icc_profile')
        if icc:
            try:
                image=ImageCms.profileToProfile(image,ImageCms.ImageCmsProfile(BytesIO(icc)),ImageCms.createProfile('sRGB'),outputMode='RGB')
            except (OSError,ValueError,ImageCms.PyCMSError):
                image=image.convert('RGB')
        else:
            image=image.convert('RGB')
        width,height=image.size
        variants={}
        for suffix,limit,quality in [('thumb',480,78),('display',1440,85),('full',2400,89)]:
            copy=image.copy();copy.thumbnail((limit,limit),Image.Resampling.LANCZOS)
            # Metadata is deliberately omitted from public derivatives.
            copy.save(OUTPUT/f'{slug}-{suffix}.webp','WEBP',quality=quality,method=6)
            variants[suffix]=copy.width
        records.append(dict(id=slug,title=title,category=category,alt=alt,description=description,width=width,height=height,thumbnailWidth=variants['thumb'],displayWidth=variants['display'],
            src=f'/images/portfolio/{slug}-display.webp',thumbnail=f'/images/portfolio/{slug}-thumb.webp',full=f'/images/portfolio/{slug}-full.webp'))
        print(f'{slug}: {width}x{height}')
(ROOT/'src/photography-data.js').write_text('// Photographs supplied by the portfolio owner. Edit captions here.\nexport const photographs = '+json.dumps(records,ensure_ascii=False,indent=2)+';\n\nexport const photoCategories = [\'All\', \'Automotive\', \'Details\', \'Moments\'];\n')
print(f'Prepared {len(records)} photographs; original files are unchanged.')
