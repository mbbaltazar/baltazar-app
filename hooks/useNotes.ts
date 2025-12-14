import { useEffect, useState } from 'react';

import { supabase } from '@/app/lib/supabase';
export type Note = {
  id: string;
  title: string;
  description: string;
  date_updated: string;
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('date_updated', { ascending: false });

    if (data) setNotes(data);
  };

  const getNoteById = (id: string) =>
    notes.find((note) => note.id === id);

  const createNote = async (note: Omit<Note, 'id' | 'date_updated'>) => {
    await supabase.from('notes').insert(note);
    fetchNotes();
  };

  const updateNote = async (
    id: string,
    updates: Partial<Omit<Note, 'id'>>
  ) => {
    await supabase.from('notes').update(updates).eq('id', id);
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    fetchNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
  };
}
