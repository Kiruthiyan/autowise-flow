import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Building2, Briefcase, Calendar, Camera, Loader2, Save, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  department: string | null;
  position: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    avatar_url: '',
    phone: '',
    department: '',
    position: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || '',
          phone: data.phone || '',
          department: data.department || '',
          position: data.position || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          department: profile.department,
          position: profile.position,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Header Card */}
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary to-primary/80" />
              <CardContent className="relative pt-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-12">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-card shadow-xl">
                      <AvatarImage src={profile.avatar_url || ''} />
                      <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">
                        {getInitials(profile.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-2 right-2 rounded-full h-10 w-10 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 text-center sm:text-left pb-4">
                    <h2 className="text-2xl font-bold">{profile.full_name || 'Unnamed User'}</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                      <Badge variant="success">Verified</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+94 77 123 4567"
                        value={profile.phone || ''}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="department"
                        placeholder="e.g., Transport Division"
                        value={profile.department || ''}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="position">Position / Role</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="position"
                        placeholder="e.g., Fleet Manager"
                        value={profile.position || ''}
                        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription>Your account details and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Account Created</p>
                    <p className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Last Sign In</p>
                    <p className="font-medium">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Email Status</p>
                    <Badge variant="success">Verified</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-xs">{user?.id?.slice(0, 8)}...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
