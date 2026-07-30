'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ShieldAlert, Cpu, Play, Terminal, CheckCircle2, Loader2 } from 'lucide-react';

export default function Home() {
  const [code, setCode] = useState<string>(
`import sqlite3

def get_user(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # كود محتمل لثغرة SQL Injection
    cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
    return cursor.fetchall()`
  );
  const [language, setLanguage] = useState<string>('python');
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'حدث خطأ في السيرفر المحلي');
      }

      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء الاتصال بمحرك التحليل المحلي.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 dir-rtl" dir="rtl">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Code Risk Advisor & Architect
            </h1>
            <p className="text-sm text-slate-400">مهندس مستشار ومحلل مخاطر الكود (Local AI via Ollama)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>محلي 100% (Offline)</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: Code Input Section */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold">إدخال الكود للتحليل</span>
            </div>
            
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs rounded px-2 py-1 text-slate-200 outline-none focus:border-indigo-500"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[450px] bg-slate-950 p-4 font-mono text-sm text-slate-200 outline-none resize-none leading-relaxed"
            placeholder="أدخل الكود البرمجي هنا..."
          />

          <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium px-5 py-2.5 rounded-lg transition shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري تحليل المخاطر...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  تشغيل استشارة الكود
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Analysis Output Section */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold">تقرير المستشار البرمجي</span>
          </div>

          <div className="p-6 h-[515px] overflow-y-auto font-sans leading-relaxed text-slate-300">
            {error && (
              <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-300 text-sm">
                {error}
              </div>
            )}

            {!loading && !analysis && !error && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                <ShieldAlert className="w-12 h-12 mb-3 text-slate-700" />
                <p>قم بوضع الكود ثم اضغط على "تشغيل استشارة الكود" لبدء التحليل.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <p className="text-sm">يقوم الذكاء الاصطناعي المحلي بمراجعة الكود وفحص المخاطر...</p>
              </div>
            )}

            {analysis && (
              <div className="prose prose-invert prose-indigo max-w-none text-sm">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}