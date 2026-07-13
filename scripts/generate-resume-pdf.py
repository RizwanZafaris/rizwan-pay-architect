#!/usr/bin/env python3
"""Generate the public, ATS-readable Rizwan Zafar resume PDF."""

from pathlib import Path
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


INK = colors.HexColor("#152A2C")
TEAL = colors.HexColor("#0E706B")
MUTED = colors.HexColor("#536365")
RULE = colors.HexColor("#D8DEDC")
PAPER = colors.HexColor("#FCFAF5")


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"- {text}", style)


def section(title: str, styles: dict[str, ParagraphStyle]):
    return [
        Spacer(1, 4 * mm),
        Paragraph(title.upper(), styles["section"]),
        Spacer(1, 1.4 * mm),
    ]


def role(
    title: str,
    company: str,
    meta: str,
    points: list[str],
    styles: dict[str, ParagraphStyle],
):
    rows = [
        Table(
            [[Paragraph(f"<b>{title}</b> | {company}", styles["role"]), Paragraph(meta, styles["meta_right"])]],
            colWidths=[115 * mm, 55 * mm],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ]
            ),
        )
    ]
    rows.extend(bullet(point, styles["bullet"]) for point in points)
    return rows


def draw_page(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 13 * mm, width - doc.rightMargin, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.2)
    canvas.drawString(doc.leftMargin, 8.5 * mm, "RIZWAN ZAFAR  |  RZIFI.COM")
    page = str(canvas.getPageNumber())
    canvas.drawRightString(width - doc.rightMargin, 8.5 * mm, page)
    canvas.restoreState()


def build(output: Path):
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=14 * mm,
        bottomMargin=18 * mm,
        title="Rizwan Zafar - Resume",
        author="Rizwan Zafar",
        subject="Payments Product and Program Executive - Resume",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=23,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12,
            textColor=TEAL,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.5,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10,
            textColor=TEAL,
            borderWidth=0,
            borderPadding=0,
            spaceAfter=0,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.1,
            textColor=INK,
            spaceAfter=2.4,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.9,
            leading=11,
            textColor=INK,
            keepWithNext=True,
        ),
        "meta_right": ParagraphStyle(
            "MetaRight",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.3,
            leading=9.5,
            textColor=MUTED,
            alignment=2,
            keepWithNext=True,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.85,
            leading=10.4,
            textColor=INK,
            leftIndent=3.2 * mm,
            firstLineIndent=-3.2 * mm,
            spaceAfter=1.25,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.6,
            leading=10.2,
            textColor=INK,
            spaceAfter=2,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=9.5,
            textColor=TEAL,
        ),
    }

    story = [
        Paragraph("RIZWAN ZAFAR", styles["name"]),
        Paragraph(
            "Payments Product and Program Executive | Fintech Infrastructure | Emerging Markets",
            styles["headline"],
        ),
        Paragraph(
            'Dubai, UAE | +971 58 968 3970 | '
            '<link href="mailto:rizwanzaffar.pk@gmail.com" color="#536365">rizwanzaffar.pk@gmail.com</link> | '
            '<link href="https://rzifi.com" color="#536365">rzifi.com</link> | '
            '<link href="https://www.linkedin.com/in/rizwanzaffar" color="#536365">linkedin.com/in/rizwanzaffar</link>',
            styles["contact"],
        ),
    ]

    story += section("Professional summary", styles)
    story.append(
        Paragraph(
            "Payments product and program executive working across complex technology and delivery environments since 2009. "
            "Currently Chief Product Officer at Simpaisa, leading product across payment gateway, pay-in, payout, cross-border, "
            "merchant onboarding, settlement, risk and compliance. Simpaisa publicly reports more than $1B in annual GTV, "
            "270M annual transactions, 150+ merchants and formal operations in five markets. Brings product judgment together "
            "with PMO discipline, partner management and regulated delivery.",
            styles["body"],
        )
    )

    story += section("Core competencies", styles)
    competencies = [
        ("Payments infrastructure", "Gateway and orchestration | pay-in and payout APIs | card acquiring | wallets | DCB | IBFT | cross-border and FX | settlement and reconciliation"),
        ("Product leadership", "Strategy and roadmaps | platform operating models | merchant onboarding | pricing and unit economics | partner enablement | product organization design"),
        ("Risk and controls", "KYC and KYB | AML and CFT | sanctions screening | fraud controls | chargebacks | PCI DSS | ISO 27001 | audit readiness"),
        ("Program delivery", "PMO governance | SteerCo and board reporting | OKRs | RAID management | vendor governance | multi-market launches | transformation programs"),
    ]
    comp_rows = [
        [Paragraph(label.upper(), styles["label"]), Paragraph(text, styles["small"])]
        for label, text in competencies
    ]
    story.append(
        Table(
            comp_rows,
            colWidths=[39 * mm, 131 * mm],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                    ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
                    ("LINEBELOW", (0, 0), (-1, -2), 0.35, RULE),
                ]
            ),
        )
    )

    story += section("Professional experience", styles)
    story += role(
        "Chief Product Officer (acting CTO, 2024)",
        "Simpaisa",
        "Dubai | Aug 2020 - Present",
        [
            "Own product strategy and roadmaps across payment gateway, pay-in, payout and cross-border product lines, working with executive, engineering, operations, risk and commercial teams.",
            "Built and scaled card acquiring, mobile-wallet, DCB, IBFT, voucher, bill-payment, QR, tokenization, payout and cross-border capabilities with local and global partners.",
            "Designed merchant onboarding across self-service flows, automated KYC and KYB, risk-tiered approval and category-based pricing for a platform serving 150+ merchants.",
            "Established product controls across fraud prevention, chargebacks, AML and CFT, transaction monitoring, settlement and reconciliation; supported PCI DSS Level 1 and ISO 27001 programs.",
            "Led multi-market expansion and platform delivery through a regulatory transition while carrying dual product and technology leadership responsibilities during 2024.",
            "Built the product organization from 2 to 8 product managers and led cross-functional delivery across product, engineering, operations, risk and compliance.",
        ],
        styles,
    )

    story += role(
        "Project Manager, Payments Operations",
        "Daraz (Alibaba Group)",
        "Karachi | Mar 2020 - Aug 2020",
        [
            "Ran payments operations and delivery governance across Pakistan, Bangladesh, Sri Lanka, Nepal and Myanmar during the COVID-driven volume surge.",
            "Coordinated reconciliation, settlement, payment compliance, fraud-rule management and vendor delivery across country teams.",
        ],
        styles,
    )

    story.append(PageBreak())
    story += role(
        "Senior Product and Program Manager",
        "Tapmad",
        "Karachi | Jul 2017 - Mar 2020",
        [
            "Owned OTT monetization and billing strategy; launched direct carrier billing across Pakistan's four major telecom operators and expanded wallet and card payment options.",
            "Led migration from high-cost carrier billing toward wallet and card rails, improving payment economics and subscription flexibility.",
        ],
        styles,
    )
    story += section("Earlier program and PMO leadership", styles)
    story += role(
        "PMO and Project Manager",
        "Wing Logic",
        "Dubai | Apr 2017 - Oct 2017",
        [
            "Established PMO governance, portfolio reporting, risk tracking and executive cadence for a multi-project technology and engineering portfolio.",
        ],
        styles,
    )
    story += role(
        "Assistant Manager, Projects",
        "CIMKO / Nyumba Ya Akiba",
        "DR Congo | May 2016 - Jan 2017",
        [
            "Managed ERP and IT infrastructure initiatives in a greenfield industrial environment, coordinating vendors, procurement, schedule and operational handover.",
        ],
        styles,
    )
    story += role(
        "Project Manager, PMO",
        "DS Engineering Services",
        "Karachi | Sep 2012 - Feb 2016",
        [
            "Managed engineering-project portfolios and built reporting, controls and delivery governance across utilities and infrastructure programs.",
        ],
        styles,
    )
    story += role(
        "Senior Planning Engineer",
        "PESCO",
        "Karachi | Jun 2009 - Aug 2012",
        [
            "Planned and monitored power-infrastructure work, establishing the reliability and operational discipline that later shaped fintech product leadership.",
        ],
        styles,
    )

    story += section("Education", styles)
    story.append(
        Paragraph(
            "<b>MIT Sloan School of Management</b> - Certificate, Mastering Design Thinking Executive Program (2022)<br/>"
            "<b>University of Karachi</b> - M.Sc. Applied Physics (2012); B.Sc. Physics, Statistics and Mathematics (2009)",
            styles["body"],
        )
    )

    story += section("Certifications", styles)
    story.append(
        Paragraph(
            "Project Management Professional (PMP), PMI | PMI Agile Certified Practitioner (PMI-ACP) | "
            "Certified Scrum Product Owner (CSPO) | Certified ScrumMaster (CSM) | COBIT 5 Foundation | ITIL v3 Foundation",
            styles["body"],
        )
    )

    story += section("Selected professional focus", styles)
    focus = [
        "VP, Head or Director of Product - Payments Infrastructure",
        "Product leadership for payment networks, PSPs, acquiring, cross-border and regulated fintech",
        "Program and transformation leadership where product, controls, partners and delivery must operate as one system",
    ]
    story.extend(bullet(item, styles["bullet"]) for item in focus)

    story += section("Portfolio and contact", styles)
    story.append(
        Paragraph(
            'Selected work and payments writing: <link href="https://rzifi.com" color="#0E706B"><b>rzifi.com</b></link><br/>'
            'Book a 15-minute introduction: <link href="https://cal.com/rizwan-zafar-gws2uk/15min" color="#0E706B"><b>cal.com/rizwan-zafar-gws2uk/15min</b></link>',
            styles["body"],
        )
    )

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)


if __name__ == "__main__":
    destination = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("public/Rizwan_Zafar_Resume.pdf")
    build(destination)
    print(f"Wrote {destination}")
