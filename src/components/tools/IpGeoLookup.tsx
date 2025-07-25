'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export default function IpGeoLookup() {
  const [ip, setIp] = useState('');
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIpInfo = async (ipAddress: string) => {
    setLoading(true);
    setError(null);
    setIpInfo(null);
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      if (!response.ok) {
        throw new Error('Could not fetch IP information.');
      }
      const data = await response.json();
      if(data.bogon) {
        throw new Error('The IP address is a bogon (private or reserved).');
      }
      setIpInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLookup = () => {
    if(ip) fetchIpInfo(ip);
  };
  
  const fetchMyIp = async () => {
    setLoading(true);
    setError(null);
    setIpInfo(null);
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        setIp(data.ip);
        setIpInfo(data);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">IP Geolocation Lookup</CardTitle>
          <CardDescription>Find the geographic location of an IP address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-grow space-y-2">
              <Label htmlFor="ip-input">IP Address</Label>
              <Input
                id="ip-input"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="e.g., 8.8.8.8"
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
              />
            </div>
            <Button onClick={handleLookup} disabled={loading} className="self-end">
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
              <span className="ml-2">Lookup</span>
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {ipInfo && (
            <Card className="bg-muted/50 p-4">
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {Object.entries(ipInfo).map(([key, value]) => (
                       <TableRow key={key}>
                         <TableCell className="font-medium capitalize py-2">{key}</TableCell>
                         <TableCell className="py-2">{value}</TableCell>
                       </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button variant="outline" onClick={fetchMyIp}>Use My IP Address</Button>
        </CardFooter>
      </Card>
    </div>
  );
}