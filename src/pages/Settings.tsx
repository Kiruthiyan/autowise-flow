import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Smartphone,
  Mail,
  AlertTriangle,
  Check,
  Save,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [tripAlerts, setTripAlerts] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [fuelAlerts, setFuelAlerts] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your application preferences and configurations</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-card border shadow-sm p-1 h-auto flex-wrap">
            <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <SettingsIcon className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Regional Settings
                  </CardTitle>
                  <CardDescription>Configure language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="si">සිංහල (Sinhala)</SelectItem>
                          <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="asia-colombo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-colombo">Asia/Colombo (GMT+5:30)</SelectItem>
                          <SelectItem value="asia-calcutta">Asia/Calcutta (GMT+5:30)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select defaultValue="lkr">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lkr">LKR (රු)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data & Storage
                  </CardTitle>
                  <CardDescription>Manage your data preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Auto-save drafts</p>
                      <p className="text-sm text-muted-foreground">Automatically save form drafts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Data export format</p>
                      <p className="text-sm text-muted-foreground">Default format for report exports</p>
                    </div>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Channels</h4>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Alert Types</h4>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Trip Updates</p>
                        <p className="text-sm text-muted-foreground">New bookings, approvals, and completions</p>
                      </div>
                      <Switch checked={tripAlerts} onCheckedChange={setTripAlerts} />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Maintenance Alerts</p>
                        <p className="text-sm text-muted-foreground">Service due reminders and requests</p>
                      </div>
                      <Switch checked={maintenanceAlerts} onCheckedChange={setMaintenanceAlerts} />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Fuel Anomalies</p>
                        <p className="text-sm text-muted-foreground">Unusual fuel consumption patterns</p>
                      </div>
                      <Switch checked={fuelAlerts} onCheckedChange={setFuelAlerts} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Password & Authentication
                  </CardTitle>
                  <CardDescription>Manage your security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                      </div>
                      <Button variant="outline">
                        <Lock className="h-4 w-4 mr-2" />
                        Change
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">Last changed 30 days ago</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={twoFactor ? 'success' : 'outline'}>{twoFactor ? 'Enabled' : 'Disabled'}</Badge>
                      <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Theme & Display
                </CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Theme Mode</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="w-full h-20 rounded-md bg-white border mb-3" />
                      <p className="font-medium text-sm">Light</p>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="w-full h-20 rounded-md bg-slate-900 border mb-3" />
                      <p className="font-medium text-sm">Dark</p>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`p-4 rounded-lg border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="w-full h-20 rounded-md bg-gradient-to-r from-white to-slate-900 border mb-3" />
                      <p className="font-medium text-sm">System</p>
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animations</p>
                    <p className="text-sm text-muted-foreground">Enable UI animations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button onClick={handleSaveSettings} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
