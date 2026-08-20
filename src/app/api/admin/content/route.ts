export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentData, saveContentData } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

// Silent local write (won't crash on Vercel)
function silentWriteFile(filePath: string, data: string) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (e) {
    // Ignore error for serverless environments
  }
}

export async function GET(req: Request) {
  try {
    const data = await getContentData();
    if (!data) {
      return NextResponse.json({ success: false, message: 'Content file not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error (GET content):', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    // Save new content
    if (action === 'save') {
      if (!payload) return NextResponse.json({ success: false, message: 'No payload provided' }, { status: 400 });

      // Save to Supabase
      const dbSuccess = await saveContentData(payload);

      if (!dbSuccess) {
        return NextResponse.json({ success: false, message: 'Database save failed. Please check server logs.' }, { status: 500 });
      }

      // Local fallback
      silentWriteFile(CONTENT_FILE_PATH, JSON.stringify(payload, null, 2));

      // Force Next.js to purge its cache instantly!
      revalidatePath('/', 'page');
      revalidatePath('/');
      revalidatePath('/api/admin/content');

      return NextResponse.json({ success: true, message: 'Content saved successfully!' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('API Error (POST content):', error);
    return NextResponse.json({ success: false, message: 'Server error while modifying content' }, { status: 500 });
  }
}
