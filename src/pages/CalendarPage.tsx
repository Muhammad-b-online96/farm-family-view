
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarCheck, Zap, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { EventDialog } from "@/components/dialogs/EventDialog";
import { EventFormData } from "@/components/forms/EventForm";
import { toast } from "@/hooks/use-toast";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: 'market' | 'expenditure' | 'meeting' | 'other';
  description?: string;
  cost?: number;
  location?: string;
}

const initialEvents: CalendarEvent[] = [
  { 
    id: '1', 
    title: 'Farmers Market - Downtown', 
    date: new Date(2025, 5, 30), 
    time: '08:00',
    type: 'market', 
    description: 'Weekly farmers market booth',
    cost: 45,
    location: 'Downtown Square'
  },
  { 
    id: '2', 
    title: 'Packaging Supplies', 
    date: new Date(2025, 6, 2), 
    type: 'expenditure',
    description: 'Honey jars and labels',
    cost: 150
  },
  { 
    id: '3', 
    title: 'Organic Market - Westside', 
    date: new Date(2025, 6, 5), 
    time: '09:00',
    type: 'market',
    description: 'Monthly organic market',
    cost: 60,
    location: 'Westside Community Center'
  },
  { 
    id: '4', 
    title: 'Equipment Maintenance', 
    date: new Date(2025, 6, 8), 
    type: 'expenditure',
    description: 'Honey extractor servicing',
    cost: 200
  },
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'market': return 'bg-green-500';
      case 'expenditure': return 'bg-red-500';
      case 'meeting': return 'bg-blue-500';
      case 'other': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const today = new Date();
  today.setHours(0,0,0,0);

  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const totalMarketCosts = events
    .filter(event => event.type === 'market' && event.cost)
    .reduce((sum, event) => sum + (event.cost || 0), 0);

  const totalExpenditures = events
    .filter(event => event.type === 'expenditure' && event.cost)
    .reduce((sum, event) => sum + (event.cost || 0), 0);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setDialogOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setDialogOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast({
      title: "Event deleted",
      description: "The event has been successfully removed.",
    });
  };

  const handleSubmitEvent = async (data: EventFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const eventData: CalendarEvent = {
        id: editingEvent ? editingEvent.id : Date.now().toString(),
        title: data.title || 'Untitled Event',
        date: data.date,
        time: data.time,
        type: data.type,
        description: data.description,
        cost: data.cost,
        location: data.location,
      };

      if (editingEvent) {
        setEvents(prev => prev.map(event => 
          event.id === editingEvent.id ? eventData : event
        ));
        toast({
          title: "Event updated",
          description: "The event has been successfully updated.",
        });
      } else {
        setEvents(prev => [...prev, eventData]);
        toast({
          title: "Event added",
          description: "The new event has been successfully created.",
        });
      }

      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CalendarCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Calendar & Events</h1>
        </div>
        <Button onClick={handleAddEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Costs</p>
                <p className="text-2xl font-bold">${totalMarketCosts.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expenditures</p>
                <p className="text-2xl font-bold">${totalExpenditures.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
              <CalendarCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border p-0"
              classNames={{ cell: "h-12 w-12 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20" }}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-4">
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          {event.time && ` at ${event.time}`}
                        </p>
                        {event.cost && (
                          <p className="text-sm font-medium text-green-600">${event.cost.toFixed(2)}</p>
                        )}
                      </div>
                      <Badge variant="default" className={`${getEventTypeColor(event.type)} text-white capitalize`}>
                        {event.type}
                      </Badge>
                    </div>
                    {event.description && <p className="text-sm mt-1">{event.description}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No upcoming events.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    <Badge variant="default" className={`${getEventTypeColor(event.type)} text-white capitalize`}>
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {event.date.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    {event.time && ` ${event.time}`}
                  </TableCell>
                  <TableCell>
                    {event.cost ? `$${event.cost.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell>{event.location || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitEvent}
        title={editingEvent ? "Edit Event" : "Add New Event"}
        defaultValues={editingEvent || undefined}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CalendarPage;
