import { useState } from 'react'
import { 
  Bell, 
  Globe, 
  Lock, 
  Moon, 
  Palette, 
  Save, 
  Shield, 
  Sun, 
  User, 
  Users
} from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

export function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'appearance'>('general')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  return (
    <WorkspaceLayout dockContext="settings" showRightPanel={false}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button
                  variant={activeTab === 'general' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('general')}
                >
                  <User className="mr-2 h-4 w-4" />
                  General
                </Button>
                <Button
                  variant={activeTab === 'notifications' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === 'security' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('security')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button
                  variant={activeTab === 'appearance' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('appearance')}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Appearance
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'general' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Display Name</label>
                        <input
                          type="text"
                          defaultValue="Analyst A"
                          className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          defaultValue="analyst@metis.local"
                          className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <select className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Senior Analyst</option>
                        <option>Analyst</option>
                        <option>Reviewer</option>
                        <option>Viewer</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timezone</label>
                      <select className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>UTC-05:00 Eastern Time</option>
                        <option>UTC-08:00 Pacific Time</option>
                        <option>UTC+00:00 UTC</option>
                        <option>UTC+01:00 Central European Time</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Organization</CardTitle>
                    <CardDescription>
                      Your organization and team information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Organization</label>
                      <input
                        type="text"
                        defaultValue="Metis Intelligence Unit"
                        disabled
                        className="h-10 w-full rounded-lg border bg-muted px-3 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <input
                        type="text"
                        defaultValue="OSINT Analysis"
                        className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Member of 3 teams
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Watchlist matches', checked: true },
                        { label: 'High priority alerts', checked: true },
                        { label: 'Task assignments', checked: true },
                        { label: 'Case updates', checked: false },
                        { label: 'System maintenance', checked: true },
                      ].map((item) => (
                        <label key={item.label} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Real-time alerts', checked: true },
                        { label: 'Analysis complete', checked: true },
                        { label: 'Evidence processing', checked: false },
                        { label: 'Collaboration mentions', checked: true },
                      ].map((item) => (
                        <label key={item.label} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Digest Frequency</label>
                    <select className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Real-time</option>
                      <option>Hourly digest</option>
                      <option>Daily digest</option>
                      <option>Weekly digest</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <input
                        type="password"
                        className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <input
                        type="password"
                        className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <input
                        type="password"
                        className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <Button>
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">2FA Status</p>
                          <p className="text-sm text-muted-foreground">Not enabled</p>
                        </div>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage your API access keys
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Personal API Key</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">
                            ••••••••••••••••••••••••
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Show</Button>
                          <Button variant="outline" size="sm">Regenerate</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Theme</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors ${
                          theme === 'light' ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                        }`}
                      >
                        <Sun className="h-8 w-8" />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors ${
                          theme === 'dark' ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                        }`}
                      >
                        <Moon className="h-8 w-8" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={`flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors ${
                          theme === 'system' ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                        }`}
                      >
                        <Globe className="h-8 w-8" />
                        <span className="text-sm font-medium">System</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Interface Density</h3>
                    <div className="space-y-3">
                      {['Compact', 'Comfortable', 'Spacious'].map((density) => (
                        <label key={density} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="density"
                            defaultChecked={density === 'Comfortable'}
                            className="h-4 w-4"
                          />
                          <span className="text-sm">{density}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Sidebar</h3>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">Always show labels</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">Start collapsed</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <Button size="lg">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
