import { NextResponse } from 'next/server';

function getFormattedDate() {
  const date = new Date();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[date.getMonth()];
  
  const day = date.getDate();
  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const dayWithOrdinal = getOrdinal(day);
  
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return `${month} ${dayWithOrdinal} ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ensure API Key exists
    const apiKey = process.env.CRM_API_KEY;
    if (!apiKey) {
      console.warn('CRM_API_KEY is not defined. Simulating success for local testing/demo.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Format payload as expected by CRM
    const payload = {
      full_name: body.name,
      phone_no: body.phone,
      email: body.email,
      message: body.message,
      date: getFormattedDate(),
      source: " Wrirk Publications"
    };

    // Forward request to CRM API
    const response = await fetch('https://crm.wrirk.com/api/addleads', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit lead to CRM');
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to send request.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
