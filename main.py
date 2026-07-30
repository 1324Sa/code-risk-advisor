from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama

app = FastAPI(title="Code Risk Advisor & Architect (Local)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = "qwen2.5-coder:7b"

class CodeAnalysisRequest(BaseModel):
    code: str
    language: str = "python"

@app.get("/")
def read_root():
    return {"status": "online", "message": "Code Risk Advisor API is running"}

@app.post("/analyze")
async def analyze_code(payload: CodeAnalysisRequest):
    prompt = f"""
    أنت مهندس مستشار ومحلل مخاطر كود (Code Risk Advisor & Architect).
    قم بتحليل الكود التالي بلغة ({payload.language}):
    
    1. **تحليل النية (Intent Analysis)**: ما الهدف الأساسي من الكود؟
    2. **المخاطر (Risks)**: كشف الثغرات الأمنية ومشاكل الأداء مع تحديد مستوى الخطورة (عالي/متوسط/منخفض).
    3. **إعادة الصياغة (Refactored Code)**: تقديم كود مصلح ومحسن يتبع أفضل الممارسات البرمجية.

    الكود المراد تحليله:
    ```{payload.language}
    {payload.code}
    ```
    
    اكتب التقرير باللغة العربية مع إبقاء الكود باللغة البرمجية المناسبة واستخدم تنسيق Markdown منظم جداً.
    """

    try:
        # استخدام مكتبة Ollama الرسمية لتوليد الإجابة
        response = ollama.generate(
            model=MODEL_NAME,
            prompt=prompt
        )
        return {"analysis": response['response']}

    except Exception as e:
        print(f"Error Details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"خطأ في محرك Ollama: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)