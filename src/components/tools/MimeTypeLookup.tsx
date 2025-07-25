'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mimeTypes } from '@/lib/data/mime-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MimeTypeLookup() {
  const [search, setSearch] = useState('');

  const filteredTypes = mimeTypes.filter(type => 
    type.extension.toLowerCase().includes(search.toLowerCase()) || 
    type.mime_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">MIME Type Lookup</CardTitle>
          <CardDescription>
            Find MIME types for file extensions, or find extensions for a MIME type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Search by extension or MIME type</Label>
            <Input 
              id="search"
              placeholder="e.g., .pdf or application/json"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="border rounded-md max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted">
                <TableRow>
                  <TableHead className="w-[150px]">Extension</TableHead>
                  <TableHead>MIME Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map(type => (
                  <TableRow key={type.extension}>
                    <TableCell className="font-medium">{type.extension}</TableCell>
                    <TableCell>{type.mime_type}</TableCell>
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