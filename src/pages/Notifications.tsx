import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Bell, 
  BellOff, 
  Check, 
  CheckCheck, 
  Trash2, 
  Car, 
  Wrench, 
  Fuel, 
  MapPin,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'trip' | 'maintenance' | 'fuel' | 'alert' | 'info';
  isRead: boolean;
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Trip Request',
    message: 'Dr. Perera has requested a vehicle for faculty meeting on Dec 10, 2025',
    type: 'trip',
    isRead: false,
    timestamp: '5 minutes ago',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Maintenance Due',
    message: 'Vehicle CAB-2345 is due for oil change and service. Current mileage: 45,000 km',
    type: 'maintenance',
    isRead: false,
    timestamp: '1 hour ago',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Fuel Anomaly Detected',
    message: 'Unusual fuel consumption detected for BUS-1001. 25% higher than average.',
    type: 'fuel',
    isRead: false,
    timestamp: '2 hours ago',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Trip Completed',
    message: 'Trip #TR-2024-089 to Kandy has been completed successfully by Driver Kamal.',
    type: 'trip',
    isRead: true,
    timestamp: '3 hours ago',
  },
  {
    id: '5',
    title: 'Vehicle Insurance Expiring',
    message: 'Insurance for VAN-3456 expires in 7 days. Please renew to avoid disruption.',
    type: 'alert',
    isRead: true,
    timestamp: '5 hours ago',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'Driver License Renewal',
    message: 'Driver Sunil\'s license expires next month. Reminder sent to the driver.',
    type: 'info',
    isRead: true,
    timestamp: '1 day ago',
  },
  {
    id: '7',
    title: 'Maintenance Completed',
    message: 'Vehicle SUV-7890 maintenance has been completed. Ready for operation.',
    type: 'maintenance',
    isRead: true,
    timestamp: '2 days ago',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return <MapPin className="h-5 w-5" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5" />;
      case 'fuel':
        return <Fuel className="h-5 w-5" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trip':
        return 'bg-blue-500/10 text-blue-600';
      case 'maintenance':
        return 'bg-orange-500/10 text-orange-600';
      case 'fuel':
        return 'bg-green-500/10 text-green-600';
      case 'alert':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filterNotifications = (filter: string) => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === filter);
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bell className="h-8 w-8 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">Stay updated with fleet activities and alerts</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <Button variant="destructive" size="sm" onClick={deleteSelected}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedIds.length})
              </Button>
            )}
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <BellOff className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">{notifications.filter(n => n.priority === 'high').length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <Tabs defaultValue="all">
            <CardHeader className="pb-2">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="trip">Trips</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="fuel">Fuel</TabsTrigger>
                <TabsTrigger value="alert">Alerts</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-4">
              {['all', 'unread', 'trip', 'maintenance', 'fuel', 'alert'].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                      {filterNotifications(tab).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                          <Bell className="h-12 w-12 mb-4 opacity-50" />
                          <p className="text-lg font-medium">No notifications</p>
                          <p className="text-sm">You're all caught up!</p>
                        </div>
                      ) : (
                        filterNotifications(tab).map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                              notification.isRead ? 'bg-card' : 'bg-primary/5 border-primary/20'
                            }`}
                          >
                            <Checkbox
                              checked={selectedIds.includes(notification.id)}
                              onCheckedChange={() => toggleSelect(notification.id)}
                            />
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </p>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 rounded-full bg-primary" />
                                )}
                                {notification.priority === 'high' && (
                                  <Badge variant="destructive" className="text-xs">High</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {notification.timestamp}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.isRead && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Notifications;
