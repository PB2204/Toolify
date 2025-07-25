'use server';

// NOTE: This is a placeholder. A real implementation would not use a public API on the server
// due to potential rate limiting and abuse. This should be a proper API call to a service like
// Google Cloud DNS or another provider.

export async function dnsLookupAction(domain: string, type: string) {
  try {
    // This is NOT a recommended production approach.
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`, {
        cache: 'no-store' // Ensure fresh data
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'DNS query failed.');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
