'use server';

export async function headerInspectorAction(url: string) {
  try {
    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD request to get only headers, not the full body
      redirect: 'follow', // Follow redirects to get final destination headers
       cache: 'no-store'
    });
    
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
        headers[key] = value;
    });

    return { success: true, headers, status: response.status, statusText: response.statusText };
  } catch (error: any) {
     if (error.cause && typeof error.cause === 'object' && 'code' in error.cause) {
       const cause = error.cause as { code: string };
       if (cause.code === 'ENOTFOUND') {
         return { success: false, error: `Could not resolve host: ${url}` };
       }
       if (cause.code === 'ECONNREFUSED') {
            return { success: false, error: `Connection refused for: ${url}` };
       }
    }
    return { success: false, error: 'Failed to fetch headers. The URL may be invalid, down, or blocking requests.' };
  }
}
