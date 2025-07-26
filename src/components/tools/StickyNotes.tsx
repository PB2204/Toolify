'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: number;
  content: string;
  color: string;
}

const noteColors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200'];

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('sticky-notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Failed to load notes from localStorage', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load saved notes.' });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sticky-notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes to localStorage', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save notes.' });
    }
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      content: '',
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: number, content: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content } : note));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold font-headline">Sticky Notes</h1>
            <Button onClick={addNote}>
                <Plus className="mr-2" /> Add Note
            </Button>
        </div>
        <p className="text-muted-foreground mb-4">Your notes are saved automatically in your browser's local storage.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notes.map(note => (
                <Card key={note.id} className={`${note.color} text-gray-800 shadow-lg`}>
                    <CardContent className="p-2">
                        <Textarea
                            value={note.content}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            className="bg-transparent border-none focus-visible:ring-0 resize-none h-40"
                            placeholder="Type your note here..."
                        />
                    </CardContent>
                    <CardFooter className="p-2 flex justify-end">
                         <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)} className="text-gray-500 hover:text-gray-800 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
