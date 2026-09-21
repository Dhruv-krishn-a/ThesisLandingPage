import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

old_block = '''                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-4"></div>
                <p className="text-slate-200 text-lg md:text-xl font-normal">
                  {Array.isArray(content.process?.description) ? content.process?.description?.map((p: { value: string }) => p.value).join(' ') : content.process?.description?.value}
                </p>'''

new_block = '''                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-4"></div>
                {content.process?.description && (
                  <p className="text-slate-200 text-lg md:text-xl font-normal mt-6">
                    {Array.isArray(content.process?.description) ? content.process?.description?.map((p: { value: string }) => p.value).join(' ') : content.process?.description?.value}
                  </p>
                )}'''

content = content.replace(old_block, new_block)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
