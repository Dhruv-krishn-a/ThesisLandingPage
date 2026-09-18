import json

with open("src/data/content.json", "r") as f:
    data = json.load(f)

# Hero Section
data["hero"]["headline"]["value"] = "Stuck on Your Thesis?\nGet Expert Guidance to Move Forward."
data["hero"]["description"] = [{"value": "From understanding your research to working through your thesis, get personalized guidance at every stage of your research journey."}]
data["hero"]["button1"]["value"] = "GET THESIS GUIDANCE"

# Struggling
data["whyTrustUs"]["heading"]["value"] = "Struggling to Navigate Your Thesis?"
data["whyTrustUs"]["intro"] = "You may be unsure about:"
data["whyTrustUs"]["features"] = [
    {
        "icon": "Search",
        "title": "Clear Problem",
        "description": "Is my research problem clearly defined?"
    },
    {
        "icon": "Target",
        "title": "Objectives",
        "description": "Are my research objectives appropriate and aligned with my study?"
    },
    {
        "icon": "Layers",
        "title": "Methodology",
        "description": "Am I using the right research methodology?"
    },
    {
        "icon": "BookOpen",
        "title": "Literature Review",
        "description": "How should I structure my literature review?"
    },
    {
        "icon": "BarChart2",
        "title": "Data Analysis",
        "description": "How do I analyse and interpret my research findings?"
    },
    {
        "icon": "Link",
        "title": "Structure",
        "description": "Are my thesis chapters logically connected?"
    }
]
if "quote" in data["whyTrustUs"]:
    data["whyTrustUs"]["quote"]["value"] = ""

# What Is Thesis Guidance
data["trustedPartner"]["heading"]["value"] = "What Is Thesis Guidance?"
data["trustedPartner"]["description"] = "Thesis Guidance is a one-on-one research support service that helps researchers understand how to approach and work on their thesis with expert guidance throughout their research journey."
data["trustedPartner"]["ctaText1"]["value"] = "We Don’t Write Your Thesis for You."
data["trustedPartner"]["ctaText2"]["value"] = "We guide you through the research process, explain what to do and why, review your work, and help you understand how to move forward."
data["trustedPartner"]["ctaHeading"] = {"value": "You do the work. We provide the guidance."}

data["trustedPartner"]["features"] = [
    {
        "step": "1",
        "title": "Research Direction",
        "description": "Understanding the research problem, objectives, research questions, and overall direction of the study."
    },
    {
        "step": "2",
        "title": "Thesis Structure",
        "description": "Understanding the key chapters and sections of a thesis and how they connect with each other."
    },
    {
        "step": "3",
        "title": "Research Methodology",
        "description": "Understanding appropriate research methods, research design, sampling, data collection, and other methodological aspects."
    },
    {
        "step": "4",
        "title": "Data Analysis & Interpretation",
        "description": "Understanding how to approach data analysis, interpret research findings, and connect the results with the research objectives."
    },
    {
        "step": "5",
        "title": "Expert Guidance & Feedback",
        "description": "Discussing research questions and challenges with experts and receiving feedback to improve clarity, approach, and overall research work."
    }
]
data["trustedPartner"]["outro"] = "You work on your thesis. We provide the guidance to help you understand how."

# What We Guide You With
data["services"]["heading"]["value"] = "What We Guide You With"
data["services"]["description"] = [{"value": "Guidance across the key elements of your thesis."}]
data["services"]["cards"] = [
    {
        "title": "01. Research Problem & Objectives",
        "desc": "Understand how to clarify your research problem, align your research objectives, and establish a clear direction for your thesis.",
        "icon": "Target"
    },
    {
        "title": "02. Literature Review",
        "desc": "Learn how to identify relevant studies, review existing research, identify research gaps, and connect the literature with your study.",
        "icon": "BookOpen"
    },
    {
        "title": "03. Research Methodology",
        "desc": "Understand how to approach research design, sampling, data collection, and other methodological aspects of your research.",
        "icon": "Layers"
    },
    {
        "title": "04. Data Analysis & Interpretation",
        "desc": "Learn how to approach data analysis, understand your research findings, and interpret the results in relation to your research objectives.",
        "icon": "BarChart2"
    },
    {
        "title": "05. Thesis Chapters & Structure",
        "desc": "Understand what each chapter of your thesis should communicate and how the different chapters connect with one another.",
        "icon": "Link"
    },
    {
        "title": "06. Findings, Discussion & Conclusion",
        "desc": "Learn how to present your findings, connect them with existing research, approach the discussion, and draw meaningful conclusions from your study.",
        "icon": "CheckCircle"
    }
]

# How Our Thesis Guidance Works
data["process"]["heading"]["value"] = "How Our Thesis Guidance Works"
data["process"]["description"] = [{"value": "Personalized guidance to support you at every stage of your thesis journey."}]
data["process"]["steps"] = [
    {
        "step": "1",
        "title": "Understand Your Research",
        "desc": "We first understand your research topic, objectives, requirements, current progress, and the challenges you are facing with your thesis."
    },
    {
        "step": "2",
        "title": "Identify What You Need",
        "desc": "We identify the specific areas where you need clarity or guidance to work on your thesis."
    },
    {
        "step": "3",
        "title": "Get Expert Guidance",
        "desc": "Our experts explain the relevant research concepts, methods, and approaches and guide you according to your research and thesis requirements."
    },
    {
        "step": "4",
        "title": "Learn & Apply",
        "desc": "You learn how to approach different parts of your thesis and apply that knowledge while working on it yourself."
    }
]

# Add missing sections
data["whyChoose"] = {
    "heading": "Why Choose WRIRK?",
    "reasons": [
        {
            "title": "One-on-One Guidance",
            "description": "Get personalized attention based on your research, thesis, and specific challenges."
        },
        {
            "title": "Experienced Research Mentors",
            "description": "Learn from experienced research professionals with expertise across diverse research domains."
        },
        {
            "title": "Domain-Specific Support",
            "description": "Receive guidance relevant to your research area rather than generic, one-size-fits-all instructions."
        },
        {
            "title": "Learn Through Expert Guidance",
            "description": "Understand the concepts, methods, and approaches behind your research and learn how to apply them yourself."
        },
        {
            "title": "Review & Feedback",
            "description": "Discuss your work with experts, clarify your doubts, and receive constructive feedback based on your research progress."
        },
        {
            "title": "Researcher-Centric Approach",
            "description": "You remain actively involved in your research at every stage. We provide the guidance and expertise while you make the research decisions."
        }
    ]
}

data["whoCanBenefit"] = {
    "heading": "Who Can Benefit?",
    "intro": "Thesis Guidance can help:",
    "audiences": [
        "PhD Scholars",
        "PhD Aspirants",
        "Doctoral Researchers",
        "Faculty Members & Academicians",
        "Independent Researchers",
        "Research Professionals"
    ]
}

# FAQs
if "faqs" not in data:
    data["faqs"] = {}
data["faqs"]["heading"] = {"value": "FAQs"}
data["faqs"]["items"] = [
    {
        "q": "1. Does WRIRK write the thesis for me?",
        "a": "No. We do not write the thesis for you."
    },
    {
        "q": "2. What does Thesis Guidance include?",
        "a": "We provide complete, one-on-one guidance throughout your thesis journey, based on your research, requirements, and understanding."
    },
    {
        "q": "3. Can I get guidance if I am new to thesis research?",
        "a": "Yes. Our experts explain research concepts and approaches in a way that helps you understand how to work on your thesis."
    },
    {
        "q": "4. Can you review my thesis work?",
        "a": "Yes. Our experts can review your work, provide constructive feedback, and help you understand areas that may need attention."
    },
    {
        "q": "5. Is the guidance specific to my research domain?",
        "a": "Yes. Guidance is customized to the research topic, domain, academic requirements, and stage of your work."
    },
    {
        "q": "6. Can you help me understand research methodology?",
        "a": "Yes. We explain relevant methodological approaches and help you understand how they relate to your research."
    },
    {
        "q": "7. Can I get guidance if my thesis is already prepared?",
        "a": "Yes. Guidance is personalized according to your research, current understanding, and the areas where you need further clarity."
    },
    {
        "q": "8. Is the guidance provided online?",
        "a": "Yes. Guidance is primarily provided through online interactions, subject to expert availability."
    },
    {
        "q": "9. Can I get guidance if I have already started my thesis?",
        "a": "Yes. You can receive guidance based on your current progress and discuss the areas where you need further clarity or feedback."
    },
    {
        "q": "10. Will the thesis remain my own work?",
        "a": "Absolutely. You remain the researcher and author. WRIRK provides guidance, mentorship, and feedback without writing the thesis on your behalf."
    }
]
data["faqs"]["description"] = {"value": "We don't write the thesis. We don't conduct the research. We teach, explain, guide, review, and help the researcher learn how to do it themselves."}

with open("src/data/content.json", "w") as f:
    json.dump(data, f, indent=2)
