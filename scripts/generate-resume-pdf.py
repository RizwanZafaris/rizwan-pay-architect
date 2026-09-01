#!/usr/bin/env python3
"""Generate the public, ATS-readable Rizwan Zafar resume PDF.

This script is the ONLY source of public/Rizwan_Zafar_Resume.pdf. Between
2026-08-10 and 2026-09-01 the shipped PDF was hand-replaced from an external
build and drifted away from this file, which is how five retired metrics stayed
live in the highest-intent download on the site after the site copy was
cleaned. The shipped resume's content has now been folded back in here, so the
PDF and the generator cannot diverge again.

FACT DISCIPLINE. Six metrics were retired on 2026-09-01 (owner ruling) and may
never appear here: $14M/month recovered, 14% authorization uplift, 22%
token-failure reduction, 97% payment success, 99.95% (settlement SLA,
reconciliation accuracy or any platform claim) and 120K+ failed transactions
recovered monthly. `bun run seo:audit` hard-fails on all six, in this file and
in the generated PDF. The publishable set is: $1B+ annual GTV, ~270M annual
transactions, 150+ merchants, 5 markets, 90% straight-through processing,
99.9% platform uptime, fraud loss below 0.1% of GTV, PCI-DSS Level 1 and
ISO 27001, product org grown 2 to 8 PMs, 4 product launches in 2024.

Certifications are reproduced verbatim and are owner-confirmed current as of
2026-09-01. Do not add, remove or reword a status designation on them.
"""

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


INK = colors.HexColor("#171513")
COPPER = colors.HexColor("#A6532B")
MUTED = colors.HexColor("#675F57")
RULE = colors.HexColor("#D5C9BA")
PAPER = colors.HexColor("#F3EEE5")


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
            fontName="Times-Roman",
            fontSize=27,
            leading=27,
            textColor=INK,
            alignment=0,
            spaceAfter=3,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.7,
            leading=11,
            textColor=COPPER,
            alignment=0,
            spaceAfter=2,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.5,
            textColor=MUTED,
            alignment=0,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10,
            textColor=COPPER,
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
            textColor=COPPER,
        ),
        "metric_value": ParagraphStyle(
            "MetricValue",
            parent=base["BodyText"],
            fontName="Times-Roman",
            fontSize=17,
            leading=18,
            textColor=COPPER,
            spaceAfter=1,
        ),
        "metric_label": ParagraphStyle(
            "MetricLabel",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.6,
            leading=8,
            textColor=MUTED,
        ),
    }

    story = [
        Paragraph("RIZWAN ZAFAR", styles["name"]),
        Paragraph(
            "PAYMENTS PRODUCT AND PROGRAM EXECUTIVE | FINTECH INFRASTRUCTURE | "
            "EMERGING AND FRONTIER MARKETS",
            styles["headline"],
        ),
        Paragraph(
            'Dubai, UAE | +971 58 968 3970 | '
            '<link href="mailto:rizwanzaffar.pk@gmail.com" color="#675F57">rizwanzaffar.pk@gmail.com</link> | '
            '<link href="https://rzifi.com" color="#675F57">rzifi.com</link> | '
            '<link href="https://www.linkedin.com/in/rizwanzaffar" color="#675F57">linkedin.com/in/rizwanzaffar</link>',
            styles["contact"],
        ),
    ]

    story += section("Professional summary", styles)
    story.append(
        Paragraph(
            "Chief Product Officer with 17 years building and scaling payment gateway, cross-border and "
            "merchant-acquiring products across emerging and frontier markets. At Simpaisa, scaled the leading "
            "payment-gateway connector for frontier markets from market entry to $1B+ annual GTV, ~270M annual "
            "transactions and 150+ merchants across 5 markets. Owns the end-to-end product stack (pay-in, payouts "
            "and cross-border) plus the program and PMO discipline that delivers it: multi-squad execution, SteerCo "
            "governance and vendor management. Built a product controls environment from scratch (PCI-DSS Level 1 "
            "and ISO 27001), audited without findings across 5 regulatory jurisdictions. Local infrastructure partner "
            "for DLocal, Thunes, Boku, Coda Payments and Tazapay, enabling global platforms (TikTok/ByteDance, "
            "Samsung, Shein, Codashop, Xsolla, Uber, MoneyGram) to land in markets where they have no local rails.",
            styles["body"],
        )
    )

    story += section("Impact snapshot", styles)
    metric_rows = [[
        Paragraph("$1B+<br/><font size='6.6' color='#675F57'><b>ANNUAL GTV</b></font>", styles["metric_value"]),
        Paragraph("270M+<br/><font size='6.6' color='#675F57'><b>PAYMENTS / YEAR</b></font>", styles["metric_value"]),
        Paragraph("5<br/><font size='6.6' color='#675F57'><b>LIVE MARKETS</b></font>", styles["metric_value"]),
        Paragraph("150+<br/><font size='6.6' color='#675F57'><b>MERCHANTS</b></font>", styles["metric_value"]),
    ]]
    story.append(
        Table(
            metric_rows,
            colWidths=[42.5 * mm] * 4,
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
                    ("LINEABOVE", (0, 0), (-1, -1), 0.5, RULE),
                    ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
                    ("LINEAFTER", (0, 0), (-2, -1), 0.35, RULE),
                ]
            ),
        )
    )

    story += section("Core competencies", styles)
    competencies = [
        ("Gateway and orchestration", "Payment gateway | orchestration | pay-in | payouts | cross-border settlement | reconciliation | multi-currency and FX | dynamic corridor pricing"),
        ("Merchant and acquiring", "Merchant acquiring | merchant onboarding (weeks to hours) | self-service flows | automated KYC/KYB | risk-based approval | blended and IC++ pricing | merchant of record"),
        ("Payment methods and rails", "Card acquiring (MPGS/MDES) | tokenization | 3DS2 | mobile wallets | DCB | IBFT | QR | bill payments | BNPL | open banking | stablecoin settlement"),
        ("Risk, compliance and security", "PCI-DSS Level 1 | ISO 27001 | AML and CFT | fraud prevention | chargeback management | multi-jurisdiction regulatory readiness | EMI operations"),
        ("Product and program leadership", "Product strategy and roadmap | P&amp;L ownership | business cases | GTM | PMO governance | SteerCo | OKRs | vendor management | org design (2 to 8 PMs)"),
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
        "Chief Product Officer (and acting CTO, 2024)",
        "Simpaisa",
        "Dubai, UAE | Aug 2020 - Present",
        [
            "Defined and own the multi-year product strategy and roadmap with the CEO and C-suite across pay-in, payout and cross-border product lines; scaled from market entry to $1B+ annual GTV across 5 jurisdictions.",
            "Own the end-to-end pay-in stack (card acquiring MPGS/MDES, mobile wallets, DCB, IBFT, vouchers, bill payments, QR and tokenization) and the payout stack: switch integration, direct wallet payouts, cash-out and B2B vendor disbursements.",
            # Rebuilt 2026-09-01. The original bullet stacked four retired
            # metrics; it now leads with the mechanism and lands on the two
            # source-backed reliability figures.
            "Drove authorization optimization across issuers and acquirers via smart-retry orchestration and token-failure remediation, holding 90% straight-through processing with 99.9% platform uptime.",
            "Designed merchant onboarding end-to-end (self-service flows, automated KYC/KYB, tiered risk-based approval, dynamic pricing by category), cutting onboarding from weeks to hours across 150+ merchants.",
            "Built fraud prevention, chargeback management and AML/CFT infrastructure; held fraud losses below 0.1% of GTV across 5 markets.",
            "Led PCI-DSS Level 1 and ISO 27001 certification programs from scratch, both audited without findings across 5 regulatory jurisdictions.",
            "Scaled the partnership ecosystem as the local infrastructure layer for DLocal, Thunes, Boku, Coda Payments, Tazapay and Eastnets; established blended and IC++ pricing for enterprise merchants.",
            "Shipped 4 product launches in 2024 on time and within budget during a regulatory transition, while serving as dual CPO and acting CTO.",
            "Built and led the product organization from 2 to 8 product managers; chaired weekly steering committees with internal leads and external partners; reported product KPIs (approval rates, GTV, fraud rate, SLA) to the CEO and board monthly.",
        ],
        styles,
    )

    # Page 1 ends after the Simpaisa role. Breaking mid-role left an orphan
    # bullet stranded at the top of page 2 and pushed the document to three
    # pages; the break belongs on a role boundary.
    story.append(PageBreak())
    story += section("Professional experience, continued", styles)
    story += role(
        "Project Manager, Payments Operations",
        "Daraz (Alibaba Group)",
        "Karachi, Pakistan | Mar 2020 - Aug 2020",
        [
            "Ran payments operations and product readiness across 5 markets (Pakistan, Bangladesh, Sri Lanka, Nepal, Myanmar) during the COVID-driven transaction surge; lifted checkout conversion 15%.",
            "Coordinated multi-country reconciliation, payment compliance, fraud-rule tightening and vendor management at Alibaba scale; cut false declines 20% through 3DS2 policy tuning.",
        ],
        styles,
    )
    story += role(
        "Head of Product & Projects",
        "Tapmad (OTT streaming)",
        "Karachi, Pakistan | Jul 2017 - Mar 2020",
        [
            "Owned product strategy and monetization for Pakistan's leading OTT platform; designed and launched direct carrier billing with all four major telcos, scaling from 0 to 5M+ paid subscribers in under three years.",
            "Identified unsustainable unit economics and led the full migration to wallet and card billing; payment cost cut from ~50% to ~1%, ARPU up 70% through pricing and bundle optimization.",
        ],
        styles,
    )
    story += section("Earlier program and PMO leadership", styles)
    story += role(
        "PMO and Project Manager",
        "Wing Logic",
        "Dubai, UAE | Apr 2017 - Oct 2017",
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
        "Karachi, Pakistan | Sep 2012 - Feb 2016",
        [
            "Managed engineering-project portfolios and built reporting, controls and delivery governance across $8M to $15M utilities and infrastructure programs; PMO governance and reporting cut delays and improved delivery efficiency up to 70%.",
        ],
        styles,
    )
    story += role(
        "Senior Planning Engineer",
        "PESCO",
        "Karachi, Pakistan | Jun 2009 - Aug 2012",
        [
            "Planned and monitored power-infrastructure work, establishing the reliability and operational discipline that later shaped fintech product leadership.",
        ],
        styles,
    )

    story += section("Recognition and professional leadership", styles)
    story.append(
        Paragraph(
            "Youngest Project Manager of the Year - PMI Karachi (2015) | "
            "Vice President (2022-23) and Director, Governance (2021-22) - PMI Karachi Chapter",
            styles["body"],
        )
    )

    story += section("Education", styles)
    story.append(
        Paragraph(
            "<b>MIT Sloan School of Management</b> - Executive Program, Mastering Design Thinking (2022)<br/>"
            "<b>University of Karachi</b> - M.Sc. Applied Physics (2009-2012); "
            "B.Sc. Physics, Statistics &amp; Mathematics (2007-2009)",
            styles["body"],
        )
    )

    # Owner-confirmed current, 2026-09-01. Reproduced verbatim from the shipped
    # resume; do not add, remove or reword a status designation here.
    story += section("Certifications", styles)
    story.append(
        Paragraph(
            "Certified Scrum Product Owner (CSPO), Scrum Alliance (2024) | "
            "Certified ScrumMaster (CSM), Scrum Alliance (2024) | "
            "Project Management Professional (PMP), PMI (2016) | "
            "PMI Agile Certified Practitioner (PMI-ACP), PMI (2021) | "
            "COBIT 5 Foundation, ISACA (2019) | ITIL v3 Foundation, AXELOS (2018)",
            styles["body"],
        )
    )

    story += section("Selected professional focus", styles)
    story.append(
        Paragraph(
            "VP, Head or Director of Product, payments infrastructure. Product leadership for payment networks, "
            "PSPs, acquiring, cross-border and regulated fintech. Program and transformation leadership where "
            "product, controls, partners and delivery must operate as one system.",
            styles["body"],
        )
    )

    story += section("Portfolio and contact", styles)
    story.append(
        Paragraph(
            'Selected work and payments writing: <link href="https://rzifi.com" color="#A6532B"><b>rzifi.com</b></link><br/>'
            'Book a 15-minute introduction: <link href="https://cal.com/rizwan-zafar-gws2uk/15min" color="#A6532B"><b>cal.com/rizwan-zafar-gws2uk/15min</b></link>',
            styles["body"],
        )
    )

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)


if __name__ == "__main__":
    destination = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("public/Rizwan_Zafar_Resume.pdf")
    build(destination)
    print(f"Wrote {destination}")
