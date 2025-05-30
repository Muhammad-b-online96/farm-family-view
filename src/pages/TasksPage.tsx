
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListChecks, PlusCircle, User, Clock, Edit, Trash2 } from 'lucide-react';
import { Task } from "@/data/mockData";
import { mockApi } from "@/services/mockApi";
import { useToast } from "@/hooks/use-toast";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await mockApi.deleteTask(id);
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      loadTasks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'To Do': return 'bg-gray-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Done': return 'bg-green-500';
      case 'Blocked': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'Low': return 'border-green-500 text-green-700';
      case 'Medium': return 'border-yellow-500 text-yellow-700';
      case 'High': return 'border-red-500 text-red-700';
      default: return 'border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <ListChecks className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Task & Employee Management</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <Card key={task.id} className="shadow-lg flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <Badge variant="outline" className={`${getPriorityColor(task.priority)} px-2 py-0.5 text-xs`}>{task.priority}</Badge>
                </div>
                {task.description && <CardDescription className="text-sm pt-1">{task.description}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-2 flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>{task.assignee}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Due: {task.dueDate.toLocaleDateString()}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Badge className={`${getStatusColor(task.status)} text-white`}>{task.status}</Badge>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!loading && tasks.length === 0 && (
        <div className="text-center py-10">
          <ListChecks className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new task.</p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
