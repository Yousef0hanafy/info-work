#!/usr/bin/env python3
"""
Infeworks Brand & Business Audit — 4-Pillar Report
"""
import os, sys, hashlib
import platform
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm, cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Image, HRFlowable, ListFlowable, ListItem
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import SimpleDocTemplate
from pypdf import PdfReader, PdfWriter

# ━━ Font Setup ━━
_IS_MAC = platform.system() == 'Darwin'
FONT_DIR = os.path.expanduser('~/.openclaw/workspace/fonts') if _IS_MAC else '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                    italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ━━ Cascade Palette ━━
PAGE_BG       = colors.HexColor('#0d0d0c')
SECTION_BG    = colors.HexColor('#22211f')
CARD_BG       = colors.HexColor('#292722')
TABLE_STRIPE  = colors.HexColor('#201f1b')
HEADER_FILL   = colors.HexColor('#463f28')
COVER_BLOCK   = colors.HexColor('#433c28')
BORDER        = colors.HexColor('#554e39')
ICON          = colors.HexColor('#c6b581')
ACCENT        = colors.HexColor('#e0be58')
ACCENT_2      = colors.HexColor('#8b73d5')
TEXT_PRIMARY   = colors.HexColor('#e2e2df')
TEXT_MUTED     = colors.HexColor('#8e8b84')
SEM_SUCCESS   = colors.HexColor('#84c098')
SEM_WARNING   = colors.HexColor('#bea36d')
SEM_ERROR     = colors.HexColor('#bc7069')
SEM_INFO      = colors.HexColor('#7195b9')

# ━━ Styles ━━
W, H = A4

def make_styles():
    s = {}
    s['h1'] = ParagraphStyle('H1', fontName='FreeSerif-Bold', fontSize=24, leading=32,
        textColor=ACCENT, spaceAfter=12, spaceBefore=24, alignment=TA_LEFT)
    s['h2'] = ParagraphStyle('H2', fontName='FreeSerif-Bold', fontSize=16, leading=22,
        textColor=TEXT_PRIMARY, spaceAfter=8, spaceBefore=18, alignment=TA_LEFT)
    s['h3'] = ParagraphStyle('H3', fontName='FreeSerif-Bold', fontSize=12, leading=17,
        textColor=ICON, spaceAfter=6, spaceBefore=12, alignment=TA_LEFT)
    s['body'] = ParagraphStyle('Body', fontName='FreeSerif', fontSize=10.5, leading=17,
        textColor=TEXT_PRIMARY, spaceAfter=6, alignment=TA_JUSTIFY, firstLineIndent=0)
    s['body_indent'] = ParagraphStyle('BodyIndent', parent=s['body'], leftIndent=18)
    s['quote'] = ParagraphStyle('Quote', fontName='FreeSerif-Italic', fontSize=11, leading=18,
        textColor=ACCENT, leftIndent=24, rightIndent=24, spaceBefore=10, spaceAfter=10,
        borderLeftWidth=3, borderLeftColor=ACCENT, borderPadding=8)
    s['callout'] = ParagraphStyle('Callout', fontName='FreeSerif-Bold', fontSize=13, leading=20,
        textColor=ACCENT, alignment=TA_CENTER, spaceBefore=12, spaceAfter=12)
    s['muted'] = ParagraphStyle('Muted', fontName='FreeSerif-Italic', fontSize=9, leading=13,
        textColor=TEXT_MUTED, alignment=TA_LEFT, spaceAfter=4)
    s['kicker'] = ParagraphStyle('Kicker', fontName='FreeSerif', fontSize=8, leading=11,
        textColor=TEXT_MUTED, alignment=TA_LEFT, spaceAfter=2, spaceBefore=6)
    s['toc0'] = ParagraphStyle('TOC0', fontName='FreeSerif-Bold', fontSize=13, leading=22,
        textColor=TEXT_PRIMARY, leftIndent=0, spaceBefore=8)
    s['toc1'] = ParagraphStyle('TOC1', fontName='FreeSerif', fontSize=11, leading=18,
        textColor=TEXT_MUTED, leftIndent=24, spaceBefore=3)
    s['table_header'] = ParagraphStyle('TH', fontName='FreeSerif-Bold', fontSize=9, leading=13,
        textColor=colors.white, alignment=TA_LEFT)
    s['table_cell'] = ParagraphStyle('TC', fontName='FreeSerif', fontSize=9, leading=13,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT)
    s['table_cell_bold'] = ParagraphStyle('TCB', fontName='FreeSerif-Bold', fontSize=9, leading=13,
        textColor=ACCENT, alignment=TA_LEFT)
    s['error_cell'] = ParagraphStyle('EC', fontName='FreeSerif-Bold', fontSize=9, leading=13,
        textColor=SEM_ERROR, alignment=TA_CENTER)
    s['warn_cell'] = ParagraphStyle('WC', fontName='FreeSerif-Bold', fontSize=9, leading=13,
        textColor=SEM_WARNING, alignment=TA_CENTER)
    s['success_cell'] = ParagraphStyle('SC', fontName='FreeSerif-Bold', fontSize=9, leading=13,
        textColor=SEM_SUCCESS, alignment=TA_CENTER)
    return s

# ━━ TocDocTemplate ━━
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def add_heading(text, style, level=0, styles=None):
    key = f'h_{hashlib.md5(text.encode()).hexdigest()[:8]}'
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text.replace('<b>', '').replace('</b>', '')
    p.bookmark_key = key
    return p

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=8, spaceAfter=8)

def callout_box(text, styles):
    data = [[Paragraph(text, styles['callout'])]]
    t = Table(data, colWidths=[W - 2*inch - 12])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, ACCENT),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 18),
        ('RIGHTPADDING', (0,0), (-1,-1), 18),
    ]))
    return t

def make_table(headers, rows, col_widths, styles):
    hdr = [Paragraph(h, styles['table_header']) for h in headers]
    data = [hdr]
    for row in rows:
        data.append([Paragraph(str(c), styles['table_cell']) for c in row])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0,0), (-1,0), HEADER_FILL),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]
    for i in range(1, len(data)):
        bg = TABLE_STRIPE if i % 2 == 0 else PAGE_BG
        style_cmds.append(('BACKGROUND', (0,i), (-1,i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('FreeSerif', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawCentredString(W/2, 30, f'Infeworks Brand & Business Audit  |  Page {doc.page}')
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(inch, 42, W - inch, 42)
    canvas.restoreState()

def page_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAGE_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.restoreState()
    page_footer(canvas, doc)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CONTENT SECTIONS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def exec_summary(st):
    story = []
    story.append(add_heading('<b>Executive Summary</b>', st['h1'], 0, st))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'This audit was commissioned to examine the alignment between Infeworks\' visual identity system and its underlying business reality. '
        'The findings reveal a profound cognitive disconnect that, if left unaddressed, will continue to undermine trust, credibility, and conversion '
        'at every touchpoint where the brand meets its actual market. This is not a cosmetic issue; it is a structural one that affects revenue.', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'Infeworks.com presents itself through a sleek, tech-forward visual identity: gradient blue logos, lowercase sans-serif typography, '
        'the tagline "Clear, Controlled, Reliable," and a brand language that signals SaaS, data platforms, or digital infrastructure. However, '
        'the actual business behind infeworks.com is the <b>International for Engineering Works</b>, a traditional Egyptian EPC (Engineering, '
        'Procurement, Construction) company specializing in water and wastewater treatment, HVAC systems, fire fighting systems, electromechanical '
        'works, and civil construction. The legal name, the services, the client testimonials, and the market positioning all point to a heavy-industry '
        'engineering firm operating in the Egyptian and broader Middle Eastern water infrastructure market.', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'The gap between these two identities creates a <b>cognitive dissonance</b> for every stakeholder who encounters the brand. A government '
        'procurement officer evaluating bids for a sewage treatment plant in Cairo sees a logo that belongs on a productivity app. A potential '
        'industrial client looking for water treatment expertise encounters a tagline that promises software-like precision rather than engineering '
        'excellence. This dissonance erodes trust before the first conversation even begins, and it represents one of the most significant '
        'conversion killers in the company\'s current brand architecture.', st['body']))
    story.append(Spacer(1, 12))
    story.append(callout_box('The brand identity signals a tech/SaaS company. The business reality is a traditional Egyptian EPC engineering firm. This disconnect is the single largest strategic risk to Infeworks\' growth.', st))
    story.append(Spacer(1, 12))
    return story


def pillar_one(st):
    story = []
    story.append(add_heading('<b>Pillar I: The Cognitive Disconnect</b>', st['h1'], 0, st))
    story.append(Spacer(1, 4))
    story.append(Paragraph('Where Visual Identity Collides with Business Reality', st['muted']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>1.1 The Identity Split: What the World Sees vs. What the Business Is</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'Every brand exists at the intersection of two narratives: the story it tells visually, and the story it tells operationally. When these '
        'narratives align, the brand generates compounding trust. When they diverge, the brand generates confusion. Infeworks is a textbook case of '
        'the latter. The visual identity was clearly designed with a different business model in mind, or perhaps by a designer who was briefed '
        'inconsistently. The result is a brand system that works against the company it represents.', st['body']))
    story.append(Spacer(1, 6))

    # Identity split table
    headers = ['Dimension', 'Visual Identity Says', 'Business Reality Says']
    rows = [
        ['Industry', 'Technology / SaaS / Digital Platform', 'EPC Engineering / Construction / Water Treatment'],
        ['Company Name', '"Infeworks" (info + works = data/tech)', '"International for Engineering Works" (heavy industry)'],
        ['Tagline', '"Clear, Controlled, Reliable" (software values)', 'Engineering precision, durability, compliance'],
        ['Logo Style', 'Abstract 3D teardrop, blue gradient, lowercase', 'No water-treatment or engineering symbolism'],
        ['Typography', 'Modern sans-serif (Nunito on web)', 'Clean but generic; no industrial authority'],
        ['Color Palette', 'Navy + Teal (tech trust + innovation)', 'Appropriate for tech, not distinctive for engineering'],
        ['Website Feel', 'Minimal, modern, template-based', 'Lacks project showcase depth, case studies, technical specs'],
        ['Client Expectation', 'Software platform, digital tools', 'Physical infrastructure, on-site construction, industrial equipment'],
    ]
    cw = [1.2*inch, 2.3*inch, 2.5*inch]
    story.append(make_table(headers, rows, cw, st))
    story.append(Spacer(1, 12))

    story.append(add_heading('<b>1.2 Asset-by-Asset VLM Analysis</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'Every brand asset in the Infeworks identity system was analyzed using AI-powered visual intelligence (VLM) to determine how each '
        'element reads to an external observer. The results are unambiguous: <b>100% of analyzed assets read as "tech/digital company" rather '
        'than "engineering/construction firm."</b> Below is the detailed scoring across all major touchpoints.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>1.2.1 Logo and Favicon</b>', st['h3'], 1, st))
    story.append(Paragraph(
        'The logo features an abstract 3D looped/teardrop shape with a monochromatic blue gradient transitioning from a darker navy to a lighter '
        'cyan. The brand name "Infeworks" is rendered in a modern, lowercase sans-serif typeface with a subtle rounded aesthetic. Below it, '
        'the tagline "Clear, Controlled, Reliable" appears in a smaller, lighter-weight version of the same font. The VLM analysis rated the '
        'logo at 8/10 for professional quality, noting it as "well-executed, with smooth gradients and balanced symmetry." However, the analysis '
        'also stated definitively that the logo "strongly leans toward a tech/digital brand" and "does not have the rugged, mechanical, or '
        'industrial cues typical of industrial brands." The favicon, a stylized water droplet with the same blue gradient, was similarly classified '
        'as "strongly aligning with a modern tech brand, not a traditional business."', st['body']))
    story.append(Spacer(1, 6))

    story.append(add_heading('<b>1.2.2 Invoice and Quotation Design</b>', st['h3'], 1, st))
    story.append(Paragraph(
        'The invoice/quotation system uses a clean two-column grid layout with a deep navy header (#0A2B4A) and teal accents (#00A8CC). The VLM '
        'analysis rated these at 8/10, noting "clean, modern layout with clear hierarchy" and "cohesive color palette and typography." '
        'However, it concluded that the design "leans heavily toward a tech/SaaS company rather than a traditional engineering firm," citing the '
        '"modern Aesthetic: sans-serif fonts, minimalistic layout, and teal accents" as indicators. The invoice format is optimized for digital '
        'use (email attachments, PDFs), which is typical for SaaS companies, but it lacks the detailed line-item specifications, engineering '
        'references, and project codes that characterize EPC industry invoicing.', st['body']))
    story.append(Spacer(1, 6))

    story.append(add_heading('<b>1.2.3 Letterhead and Business Card</b>', st['h3'], 1, st))
    story.append(Paragraph(
        'The letterhead employs a sophisticated color scheme of deep navy blue (#0A2647) with bright cyan/turquoise (#00B4D8) accents, featuring '
        'water droplet motifs in both header and footer. The VLM rated it 8/10 and noted it "clearly leans toward tech/SaaS rather than traditional '
        'engineering," citing "modern sans-serif typography" and "bright cyan accent color (common in tech)." The business card was analyzed as '
        '"70% tech/digital rather than 30% engineering/construction," with the VLM noting that "the design leans more toward tech/digital with '
        'its modern aesthetic." Notably, the business card lists the holder\'s title as "Business Development Manager" with contact details but '
        'is missing social media handles, QR code, company registration number, and VAT number, all of which are expected in B2B industrial contexts.', st['body']))
    story.append(Spacer(1, 6))

    story.append(add_heading('<b>1.2.4 Stamp, Proposal, and Roll-Up Banner</b>', st['h3'], 1, st))
    story.append(Paragraph(
        'The stamp system (corporate, approved, received stamps) uses a monochromatic navy blue design with the water droplet logo centrally '
        'featured. VLM rated it 8/10 and noted "clean, legible, and brand-aligned" while observing that "the design lacks subtle differentiation '
        'between the stamps." The proposal template cover uses a dark navy background with teal accents, which VLM described as "clearly reading '
        'as tech/digital rather than engineering/construction." The roll-up banner was similarly classified as "leaning toward tech/digital due '
        'to teal accent color (associated with innovation and digital brands), modern sans-serif typography, and abstract teardrop logo."', st['body']))
    story.append(Spacer(1, 8))

    # Perception scoring table
    story.append(add_heading('<b>1.3 Perception Scoring Summary</b>', st['h2'], 1, st))
    headers2 = ['Asset', 'Quality (1-10)', 'Reads As Tech/SaaS', 'Reads As Engineering']
    rows2 = [
        ['Logo', '8', 'Strong (90%)', 'Weak (10%)'],
        ['Favicon', '8', 'Strong (85%)', 'Weak (15%)'],
        ['Invoice/Quotation', '8', 'Strong (80%)', 'Weak (20%)'],
        ['Letterhead', '8', 'Strong (80%)', 'Weak (20%)'],
        ['Business Card', '8', 'Moderate (70%)', 'Weak (30%)'],
        ['Stamp System', '8', 'Moderate (65%)', 'Moderate (35%)'],
        ['Proposal Template', '8', 'Strong (85%)', 'Weak (15%)'],
        ['Roll-Up Banner', '8', 'Strong (80%)', 'Weak (20%)'],
        ['Website (infeworks.com)', '5', 'Moderate (50%)', 'Moderate (50%)'],
    ]
    cw2 = [1.5*inch, 1*inch, 1.6*inch, 1.9*inch]
    story.append(make_table(headers2, rows2, cw2, st))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        'The perception scoring reveals a consistent pattern: every single offline brand asset reads predominantly as a technology company. '
        'The website, ironically, is the only touchpoint that partially bridges the gap, because it actually lists the engineering services. '
        'But even the website undermines itself by using the Astra WordPress theme with the Nunito font, a combination more commonly associated '
        'with tech startups and lifestyle brands than with industrial engineering firms. The net effect is a brand ecosystem that actively '
        'misleads its audience about what the company actually does.', st['body']))
    story.append(Spacer(1, 6))

    story.append(add_heading('<b>1.4 The Name Problem: "Infeworks" vs. "International for Engineering Works"</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The brand name itself is a significant source of confusion. "Infeworks" is a portmanteau of "info" and "works," which in the current '
        'digital landscape immediately suggests information technology, data processing, or software development. The word "info" has overwhelming '
        'associations with the tech sector: InfoSec, Infotech, InfoComm. Meanwhile, the company\'s legal and operational name is "International '
        'for Engineering Works," a name that communicates exactly what the company does, where it operates, and at what scale. The gap between '
        'these two names is not a minor branding nuance; it is a fundamental identity crisis that permeates every interaction with the brand.', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'Consider the practical implications. When a potential client in the water treatment industry receives an invoice from "Infeworks," they '
        'may initially assume it is a software vendor. When a government tender requires companies to submit qualifications under their registered '
        'names, the discrepancy between "Infeworks" (brand) and "International for Engineering Works" (legal entity) creates administrative friction. '
        'When SEO and digital marketing efforts are invested in "infeworks.com," the domain name does not contain any keywords related to water '
        'treatment, engineering, or construction, all of which are critical for organic search visibility in the B2B industrial sector.', st['body']))
    story.append(Spacer(1, 12))
    return story


def pillar_two(st):
    story = []
    story.append(add_heading('<b>Pillar II: What to Preserve</b>', st['h1'], 0, st))
    story.append(Spacer(1, 4))
    story.append(Paragraph('The Brand Elements That Are Working and Should Be Retained', st['muted']))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        'Despite the critical cognitive disconnect documented in Pillar I, the Infeworks brand system is not without significant strengths. '
        'The visual identity, while misaligned with the business sector, demonstrates a level of design sophistication and consistency that is '
        'genuinely impressive for a company at this stage. This section isolates the elements that should be preserved and carried forward '
        'into the repositioned brand, either as-is or with thoughtful adaptation.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>2.1 Design Quality and Execution Level</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'Every analyzed asset scored 8/10 on professional quality from the VLM analysis. This is a remarkably consistent quality level that '
        'indicates either a skilled in-house designer or a competent external design agency was involved. The design execution demonstrates '
        'strong understanding of visual hierarchy, color theory, typography pairing, and information architecture. The clean grid layouts, '
        'consistent color application, and thoughtful spacing throughout the invoice, letterhead, proposal template, and business card all '
        'reflect a cohesive design system. This consistency across multiple touchpoints is a valuable asset that many companies in the EPC '
        'sector, particularly in the Egyptian market, lack entirely. Most competitors in the water treatment space use generic, inconsistent, '
        'or outdated brand materials. The design quality of the Infeworks identity system is a genuine competitive advantage that should be '
        'leveraged, not discarded.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>2.2 Color Palette Foundation</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The navy blue and teal color palette, while currently signaling "tech," is actually well-suited for repositioning toward the '
        'engineering sector with minimal modification. Navy blue is a color that carries dual associations: it simultaneously communicates '
        'technology and trustworthiness, innovation and stability. In the engineering and construction world, navy blue is widely used by '
        'premium firms to convey authority and reliability. The addition of teal as an accent color can be reinterpreted through the lens of '
        'water, sustainability, and environmental responsibility, themes that are directly relevant to water and wastewater treatment. The '
        'palette does not need to be replaced; it needs to be recontextualized. By shifting the design language around these colors from '
        '"digital innovation" to "engineering excellence with environmental consciousness," the same palette can serve a completely different '
        'strategic purpose without any visual discontinuity for existing brand recognition.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>2.3 Brand Consistency Across Assets</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The Infeworks brand system demonstrates strong cross-asset consistency. The logo appears in the same proportions and placement across '
        'the business card, letterhead, invoice, proposal template, roll-up banner, and stamps. The tagline "Clear, Controlled, Reliable" is '
        'repeated consistently. The color palette is applied uniformly. The typography maintains a coherent hierarchy. This systemic consistency '
        'is a rare and valuable trait that should be preserved and strengthened during repositioning. Many companies introduce inconsistency '
        'when they rebrand by updating some assets but not others. Infeworks already has the discipline of a unified visual language, which '
        'means the repositioning can focus on strategic recontextualization rather than starting from scratch.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>2.4 The Tagline Framework (With Modification)</b>', st['h2'], 1, st))
    story.append(Paragraph(
        '"Clear, Controlled, Reliable" is a well-constructed tagline from a rhetorical perspective. It uses the "rule of three," creates '
        'a memorable rhythm, and communicates three distinct value propositions in a compact format. The problem is not the structure but '
        'the interpretation: in a tech context, "clear" suggests transparent data, "controlled" suggests managed access, and "reliable" '
        'suggests uptime. In an engineering context, these same words can be reinterpreted to communicate water clarity, process control, '
        'and structural reliability. The tagline framework should be preserved, but the specific word choices should be evaluated for '
        'engineering-sector resonance. Alternatives could include "Pure. Precise. Proven." (emphasizing water purity, engineering precision, '
        'and track record) or "Engineered Clarity, Built to Last" (bridging the engineering and outcome perspectives).', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>2.5 Water Droplet Motif Potential</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The water droplet motif that appears in the logo, favicon, letterhead footer, and roll-up banner is perhaps the most ironically '
        'valuable asset in the current brand system. While it was likely intended as an abstract tech symbol (representing data flow or '
        'digital fluidity), it is actually a direct visual reference to the company\'s core business: water and wastewater treatment. This '
        'motif can be the bridge between the current tech-forward identity and a repositioned engineering identity. By making the water '
        'reference explicit rather than abstract, and by surrounding it with engineering-specific visual language (industrial textures, '
        'technical line work, structural patterns), the same droplet can transition from "tech symbol" to "water engineering symbol" '
        'without requiring a complete logo redesign.', st['body']))
    story.append(Spacer(1, 12))

    # Preserve vs Retire table
    story.append(add_heading('<b>2.6 Preservation Matrix</b>', st['h2'], 1, st))
    headers3 = ['Element', 'Verdict', 'Action']
    rows3 = [
        ['Design quality (8/10)', 'PRESERVE', 'Maintain execution standard across all future assets'],
        ['Navy blue palette', 'PRESERVE', 'Recontextualize from "tech trust" to "engineering authority"'],
        ['Teal accent color', 'PRESERVE', 'Reframe as "water/environmental" color, not "digital innovation"'],
        ['Cross-asset consistency', 'PRESERVE', 'Apply same discipline to new assets and website redesign'],
        ['Tagline structure (rule of 3)', 'PRESERVE', 'Modify word choices for engineering sector resonance'],
        ['Water droplet motif', 'PRESERVE', 'Make water reference explicit, add engineering visual context'],
        ['Lowercase sans-serif logo text', 'RETIRE', 'Replace with authoritative mixed-case or custom wordmark'],
        ['Abstract 3D logo shape', 'RETIRE', 'Evolve toward water-engineering symbolism'],
        ['"Infeworks" brand name', 'EVALUATE', 'Consider hybrid: keep for digital, use legal name for B2B'],
        ['Astra WP theme on website', 'RETIRE', 'Replace with engineering-appropriate web architecture'],
    ]
    cw3 = [1.6*inch, 1*inch, 3.4*inch]
    story.append(make_table(headers3, rows3, cw3, st))
    story.append(Spacer(1, 12))
    return story


def pillar_three(st):
    story = []
    story.append(add_heading('<b>Pillar III: Conversion Killers</b>', st['h1'], 0, st))
    story.append(Spacer(1, 4))
    story.append(Paragraph('The Specific Elements Destroying Trust, Credibility, and Revenue', st['muted']))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        'A conversion killer is any element of a brand\'s presence that actively prevents a potential client from taking the next step in '
        'the sales funnel. Unlike passive weaknesses (which simply fail to help), conversion killers actively harm by creating doubt, confusion, '
        'or mistrust. The Infeworks brand system contains several critical conversion killers that are likely costing the company significant '
        'revenue, particularly in the B2B government and industrial procurement channels where trust signals are paramount.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>3.1 The Identity Trust Gap</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'In the EPC and water treatment industry, trust is established through visual signals of industrial capability, track record, and '
        'technical competence. Procurement decision-makers in this sector, whether in Egyptian government agencies or private industrial clients, '
        'are trained to evaluate companies based on specific visual and informational cues: project photographs, technical specifications, '
        'engineering certifications, equipment partnerships, and team credentials. When they encounter the Infeworks brand, they receive none '
        'of these trust-building signals and instead receive tech-brand signals that trigger a completely different set of expectations.', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'The practical impact is measurable. A potential client visiting infeworks.com expects to find a SaaS product page and instead finds '
        'a list of engineering services. The cognitive effort required to reconcile this mismatch creates friction, and friction reduces '
        'conversion. In B2B procurement, where sales cycles can be 6-18 months and involve multiple decision-makers, any friction at the '
        'initial brand encounter compounds across the entire sales funnel. The trust gap also manifests in competitive evaluations: when '
        'Infeworks is compared side-by-side with competitors like ESWTCO or EnviroTech International, whose brands clearly communicate '
        'engineering and water treatment expertise, the Infeworks brand looks out of place and potentially less credible, regardless of '
        'actual technical capability.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>3.2 Website Conversion Failures</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The website at infeworks.com suffers from multiple conversion-killing issues that go beyond the visual identity mismatch. The site '
        'is built on the Astra WordPress theme, a popular choice for startups and small businesses, but an unusual and potentially '
        'undermining choice for an EPC engineering firm. The Astra theme, combined with the Nunito font, creates a visual impression more '
        'consistent with a tech blog or a creative agency than with a multi-million-dollar engineering contractor. The website content, while '
        'listing the correct services, presents them in a format that lacks the depth and specificity expected in the industry. Service '
        'descriptions are brief and generic. There are no detailed case studies with project specifications, no technical papers, no '
        'certification listings, and no team credentials. The "Our Projects" section appears to use a generic image carousel without '
        'structured project data. The "Testimonial" section features Arabic-language testimonials, which is appropriate for the local market '
        'but creates inconsistency with the English-language brand identity.', st['body']))
    story.append(Spacer(1, 8))

    # Conversion killers table
    story.append(add_heading('<b>3.3 Conversion Killers Inventory</b>', st['h2'], 1, st))
    headers4 = ['Killer', 'Severity', 'Impact', 'Evidence']
    rows4 = [
        ['Brand signals tech, business is engineering', 'CRITICAL', 'Prospects confused at first touch; wrong expectations set', '100% of VLM analyses classify assets as tech/SaaS'],
        ['No engineering credentials on website', 'CRITICAL', 'No ISO, no certifications, no engineering licenses visible', 'Website scan shows zero technical credentials'],
        ['Missing case studies with specs', 'HIGH', 'No proof of capability; no project scale, capacity, or outcomes', 'Website has image carousel, no structured project data'],
        ['Generic service descriptions', 'HIGH', 'Services listed but not differentiated from competitors', 'Website text: brief bullet-point lists without depth'],
        ['Wrong WordPress theme for industry', 'MEDIUM', 'Astra + Nunito = tech startup feel, not industrial authority', 'Theme detection from website source code'],
        ['Bilingual inconsistency', 'MEDIUM', 'Arabic testimonials + English brand = fragmented identity', 'Website mixes Arabic and English without strategy'],
        ['No team/credentials section', 'HIGH', 'B2B buyers need to evaluate team expertise', 'Website lacks engineer profiles, certifications'],
        ['Business card missing B2B fields', 'MEDIUM', 'No VAT, reg. number, QR code for industrial context', 'VLM analysis of business card asset'],
    ]
    cw4 = [1.5*inch, 0.7*inch, 1.9*inch, 1.9*inch]
    story.append(make_table(headers4, rows4, cw4, st))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>3.4 The Procurement Death Spiral</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'In government and large-scale industrial procurement, the brand evaluation is often the first filter. Procurement officers review '
        'company profiles, websites, and submitted materials to create a shortlist. When Infeworks submits a proposal using its current '
        'proposal template (which reads as a tech company document) alongside competitors who present engineering-appropriate materials, '
        'the cognitive dissonance works against Infeworks in two ways. First, the procurement team may question whether Infeworks truly '
        'understands the engineering scope of the project, because their materials do not reflect engineering-sector conventions. Second, '
        'the procurement team may perceive Infeworks as a smaller or less experienced firm, because the brand language lacks the weight '
        'and specificity that signals established engineering capability. This is not a perception problem that can be solved by adding more '
        'text to the proposal; it requires a fundamental realignment of the brand\'s visual and verbal vocabulary.', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'The death spiral is self-reinforcing: a brand that fails to convert at the initial filter stage generates fewer opportunities to '
        'build a track record, which means fewer case studies and testimonials, which further weakens the brand\'s credibility in future '
        'procurement cycles. Breaking this spiral requires a deliberate, comprehensive brand repositioning effort, not incremental tweaks.', st['body']))
    story.append(Spacer(1, 12))
    return story


def pillar_four(st):
    story = []
    story.append(add_heading('<b>Pillar IV: The Powerful Transformation</b>', st['h1'], 0, st))
    story.append(Spacer(1, 4))
    story.append(Paragraph('A Phased Roadmap to Align Identity with Business and Dominate the Market', st['muted']))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        'The transformation of Infeworks from its current state of cognitive dissonance to a dominant, seamless, high-converting brand '
        'requires a structured, phased approach. The roadmap below is designed to be executed over a 90-day intensive period, with each phase '
        'building on the previous one. The strategy preserves the significant design quality and consistency documented in Pillar II while '
        'systematically eliminating the conversion killers identified in Pillar III and resolving the cognitive disconnect exposed in Pillar I.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>4.1 Phase 1: Strategic Foundation (Days 1-30)</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The first phase focuses on establishing the strategic framework for the repositioning. This includes defining the brand positioning '
        'statement, conducting a competitive visual audit, establishing the new brand architecture, and making critical decisions about the brand '
        'name strategy. During this phase, no visual changes should be made to live assets. Instead, the focus is on research, strategy, and '
        'alignment among all stakeholders. The key deliverables of this phase are a Brand Positioning Document, a Visual Language Guide, and a '
        'Naming Strategy Decision.', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'The naming strategy decision is the most critical element of Phase 1. There are three viable paths forward. The first is the '
        '"Dual Identity" approach, where "Infeworks" is retained as the digital/tech-facing brand name (domain, social media, email) while '
        '"International for Engineering Works" is used as the legal and B2B procurement name. This approach preserves existing digital equity '
        'while immediately solving the credibility gap in industrial contexts. The second is the "Hybrid Name" approach, where a new brand '
        'name is developed that bridges both identities, such as "InfraWorks Engineering" or "HydroWorks International," which retains the '
        '"works" suffix while adding industry-specific prefixes. The third is the "Full Repositioning" approach, where the brand name is '
        'completely changed to reflect the engineering identity, accepting the loss of the current "infeworks.com" domain equity in exchange '
        'for long-term clarity and market positioning.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>4.2 Phase 2: Visual System Evolution (Days 31-60)</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The second phase translates the strategic foundation into a concrete visual system. The key principle is "evolution, not revolution." '
        'The current design quality is high (8/10 across all assets), so the goal is not to start over but to redirect. The logo should be '
        'evolved to incorporate explicit water-engineering symbolism: the existing water droplet shape can be retained but combined with '
        'engineering elements such as pipe cross-sections, treatment vessel silhouettes, or structural grid patterns. The lowercase sans-serif '
        'wordmark should be replaced with a mixed-case or custom typeface that carries more industrial authority. The color palette should be '
        'adjusted to emphasize the navy blue (authority, engineering) while shifting the teal toward a more saturated cyan-blue that reads as '
        '"water" rather than "digital."', st['body']))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'All existing brand assets should be redesigned simultaneously to maintain the consistency documented in Pillar II. The invoice, '
        'quotation, letterhead, business card, proposal template, roll-up banner, stamps, and envelope should all be updated in a single '
        'production run. The website should be completely redesigned, moving away from the Astra WordPress theme to a custom-built or '
        'professionally designed site that communicates engineering authority. The new website must include: detailed service descriptions '
        'with technical specifications, a project portfolio with case studies (project name, scope, capacity, duration, client, outcomes), '
        'team credentials and engineering certifications, equipment partnerships and supplier relationships, downloadable technical documents, '
        'and a blog or resources section covering water treatment industry topics.', st['body']))
    story.append(Spacer(1, 8))

    story.append(add_heading('<b>4.3 Phase 3: Market Deployment and Conversion Optimization (Days 61-90)</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'The third phase focuses on deploying the repositioned brand into the market and optimizing for conversion. All digital properties '
        '(website, social media profiles, email signatures, Google Business profile) should be updated simultaneously. The existing client '
        'base should be notified of the brand evolution through a professional communication that frames the change as a "natural maturation" '
        'rather than a correction. New business development materials, including updated proposals, capability statements, and company profiles, '
        'should be produced using the new visual system. SEO strategy should be revised to target industry-specific keywords (water treatment '
        'Egypt, EPC contractor Cairo, wastewater treatment Middle East) rather than brand-name-only keywords.', st['body']))
    story.append(Spacer(1, 8))

    # Roadmap table
    story.append(add_heading('<b>4.4 Transformation Roadmap Summary</b>', st['h2'], 1, st))
    headers5 = ['Phase', 'Timeline', 'Key Deliverables', 'Success Metric']
    rows5 = [
        ['1. Strategic Foundation', 'Days 1-30', 'Brand Positioning Doc, Visual Language Guide, Naming Decision', 'Stakeholder alignment on brand direction'],
        ['2. Visual Evolution', 'Days 31-60', 'Updated logo, all brand assets, new website, photography', '100% asset consistency; website launch'],
        ['3. Market Deployment', 'Days 61-90', 'Digital update, client communication, SEO revision, new proposals', 'Measurable increase in inquiry quality'],
    ]
    cw5 = [1.3*inch, 0.9*inch, 2.2*inch, 1.6*inch]
    story.append(make_table(headers5, rows5, cw5, st))
    story.append(Spacer(1, 12))

    story.append(add_heading('<b>4.5 New Tagline Proposals</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'Based on the analysis of the current tagline ("Clear, Controlled, Reliable") and the need to communicate engineering authority '
        'while maintaining the water treatment industry focus, three alternative tagline proposals are presented below. Each preserves the '
        'effective "rule of three" structure while shifting the semantic content toward engineering-sector resonance. The first proposal, '
        '"Pure. Precise. Proven." directly addresses the three core value propositions of a water treatment engineering firm: pure water '
        'outcomes, precise engineering execution, and a proven track record. The second, "Engineering Clarity, Built to Last," bridges the '
        'conceptual gap between engineering and outcomes, using "clarity" as a dual reference to both clear water and clear processes. The '
        'third, "Water Solutions. Engineering Excellence. Trusted Delivery." takes a more explicit approach, directly naming the industry and '
        'the standard, which is particularly effective in B2B procurement contexts where specificity is valued over abstraction.', st['body']))
    story.append(Spacer(1, 8))

    headers6 = ['#', 'Tagline', 'Best For', 'Why It Works']
    rows6 = [
        ['1', 'Pure. Precise. Proven.', 'General brand positioning', 'Short, punchy; "Pure" = water, "Precise" = engineering, "Proven" = track record'],
        ['2', 'Engineering Clarity, Built to Last.', 'Client proposals and tenders', 'Bridges engineering and outcomes; "Built to Last" = infrastructure durability'],
        ['3', 'Water Solutions. Engineering Excellence. Trusted Delivery.', 'Government and B2B procurement', 'Explicitly names industry; specificity builds trust in formal contexts'],
    ]
    cw6 = [0.3*inch, 1.5*inch, 1.5*inch, 2.7*inch]
    story.append(make_table(headers6, rows6, cw6, st))
    story.append(Spacer(1, 12))

    story.append(add_heading('<b>4.6 Missing Digital-First Brand Assets</b>', st['h2'], 1, st))
    story.append(Paragraph(
        'A modern engineering brand competing in the water treatment and infrastructure space requires a complete digital-first brand asset '
        'library that goes well beyond the traditional print-focused assets currently in the Infeworks system. The following assets are '
        'identified as critical gaps that must be addressed as part of the transformation. First, a comprehensive Brand Guidelines Document '
        'is needed, covering logo usage, color codes, typography specifications, photography style, iconography system, and tone of voice. '
        'Second, a Social Media Template Kit is required, with platform-specific templates for LinkedIn (the primary B2B social channel), '
        'Instagram (for project showcases), and Facebook (for local market engagement). Third, an Email Signature System should be developed '
        'with HTML signatures that include consistent branding, promotional banners, and contact information. Fourth, a Presentation Template '
        '(PowerPoint/Keynote) is essential for client meetings, conference presentations, and investor pitches. Fifth, a Video Intro/Outro '
        'animation (5-10 seconds) should be created for corporate videos, project documentation, and social media content.', st['body']))
    story.append(Spacer(1, 8))

    headers7 = ['Asset', 'Priority', 'Purpose', 'Current Status']
    rows7 = [
        ['Brand Guidelines PDF', 'CRITICAL', 'Internal consistency; agency briefings', 'Does not exist'],
        ['LinkedIn Templates', 'HIGH', 'B2B thought leadership; recruitment', 'Does not exist'],
        ['Email Signature System', 'HIGH', 'Daily brand touchpoint; professional consistency', 'Inconsistent or generic'],
        ['Presentation Template', 'HIGH', 'Client meetings; conference talks', 'Does not exist'],
        ['Video Intro/Outro', 'MEDIUM', 'Corporate videos; social media; project docs', 'Does not exist'],
        ['Project Case Study Template', 'CRITICAL', 'Sales enablement; proposal support', 'Does not exist'],
        ['Technical Capability Statement', 'CRITICAL', 'Government tenders; prequalification', 'Does not exist'],
        ['Google Business Profile', 'HIGH', 'Local SEO; maps visibility; reviews', 'Likely unoptimized'],
    ]
    cw7 = [1.4*inch, 0.8*inch, 1.8*inch, 2*inch]
    story.append(make_table(headers7, rows7, cw7, st))
    story.append(Spacer(1, 12))
    return story


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# MAIN BUILD
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def build():
    output_path = '/home/z/my-project/download/Infeworks_Brand_Business_Audit.pdf'
    cover_path = '/home/z/my-project/scripts/cover_audit.pdf'

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    st = make_styles()

    # Build TOC + body
    story = []

    # TOC
    toc = TableOfContents()
    toc.levelStyles = [st['toc0'], st['toc1']]
    story.append(toc)
    story.append(PageBreak())

    # Chapter 1: Executive Summary
    story.extend(exec_summary(st))

    # Chapter 2: Pillar I
    story.extend(pillar_one(st))

    # Chapter 3: Pillar II
    story.extend(pillar_two(st))

    # Chapter 4: Pillar III
    story.extend(pillar_three(st))

    # Chapter 5: Pillar IV
    story.extend(pillar_four(st))

    # Build body PDF
    body_path = '/home/z/my-project/scripts/audit_body.pdf'
    doc = TocDocTemplate(
        body_path,
        pagesize=A4,
        leftMargin=inch, rightMargin=inch,
        topMargin=0.8*inch, bottomMargin=0.8*inch,
        title='Infeworks Brand & Business Audit',
        author='Brand Strategy & CRO Analysis',
        subject='4-Pillar Brand Audit for Infeworks'
    )
    from reportlab.platypus import PageTemplate, Frame
    frame = Frame(inch, 0.8*inch, W - 2*inch, H - 1.6*inch, id='normal')
    template = PageTemplate(id='bg', frames=frame, onPage=page_bg)
    doc.addPageTemplates([template])

    doc.multiBuild(story)
    print(f'Body PDF generated: {body_path}')

    # Merge cover + body
    writer = PdfWriter()
    reader_cover = PdfReader(cover_path)
    reader_body = PdfReader(body_path)

    for page in reader_cover.pages:
        writer.add_page(page)
    for page in reader_body.pages:
        writer.add_page(page)

    with open(output_path, 'wb') as f:
        writer.write(f)

    print(f'Final PDF: {output_path}')
    print(f'Pages: {len(reader_cover.pages) + len(reader_body.pages)}')

if __name__ == '__main__':
    build()