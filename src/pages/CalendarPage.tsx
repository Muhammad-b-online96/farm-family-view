
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Zap } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'event' | 'reminder' | 'meeting';
  description?: string;
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Team Meeting', date: new Date(2025, 5, 28, 10, 0), type: 'meeting', description: 'Weekly team sync' },
  { id: '2', title: 'Project Alpha Deadline', date: new Date(2025, 6, 5), type: 'reminder' },
  { id: '3', title: 'Client Presentation', date: new Date(2025, 6, 10, 14, 0), type: 'event', description: 'Present new features' },
  { id: '4', title: 'Honey Harvest Festival', date: new Date(2025, 6, 15), type: 'event', description: 'Annual honey harvest celebration.'},
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'event': return 'bg-blue-500';
      case 'reminder': return 'bg-yellow-500';
      case 'meeting': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const today = new Date();
  today.setHours(0,0,0,0); // Normalize today's date

  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5); // Show next 5 upcoming events

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex items-center space-x-3">
        <CalendarCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Calendar & Events</h1>
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
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) !== '12:00 AM' ? ` at ${event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` : ''}
                        </p>
                      </div>
                      <Badge variant="default" className={`${getEventTypeColor(event.type)} text-white capitalize`}>{event.type}</Badge>
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
    </div>
  );
};

export default CalendarPage;
