'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { httpStatusCodes } from '@/lib/data/http-status-codes';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HttpStatusCodeLookup() {
  const [search, setSearch] = useState('');

  const filteredCodes = httpStatusCodes.filter(code => 
    code.code.toString().includes(search) || 
    code.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">HTTP Status Code Lookup</CardTitle>
          <CardDescription>
            Quickly find the meaning of any HTTP status code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Search by code or message</Label>
            <Input 
              id="search"
              placeholder="e.g., 404 or Not Found"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="border rounded-md max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted">
                <TableRow>
                  <TableHead className="w-[100px]">Code</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCodes.map(code => (
                  <TableRow key={code.code}>
                    <TableCell className="font-medium">{code.code}</TableCell>
                    <TableCell>{code.message}</TableCell>
                    <TableCell>{code.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}