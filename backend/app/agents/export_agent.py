# export_agent
from docx import Document



def export_docx(text, filename="output.docx"):

    doc = Document()

    doc.add_paragraph(text)

    doc.save(filename)

    return filename